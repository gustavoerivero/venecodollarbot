import { db } from '@vercel/postgres'
import createDebug from 'debug'
import { getByColumn } from './db'

const debug = createDebug('database:user')

export class UserDB {

  private id: number | null | undefined
  private firstName: string
  private lastName: string | null
  private username: string | null
  private userID: string
  private chatID: string
  private alertStatus: boolean
  private status: boolean

  constructor(userID: string, chatID: string, firstName: string, lastName: string | null, username: string | null, alertStatus: boolean = true, status: boolean = true) {
    this.userID = userID
    this.chatID = chatID
    this.firstName = firstName
    this.lastName = lastName
    this.username = username
    this.alertStatus = alertStatus
    this.status = status
  }

  public create = async () => {
    try {

      const client = await db.connect()

      await client.query(`
      INSERT INTO Users (
        firstName, 
        lastName, 
        username, 
        userID, 
        chatID, 
        alertStatus, 
        status
      ) VALUES (
        '${this.firstName}', 
        '${this.lastName}', 
        '${this.username}', 
        '${this.userID}', 
        '${this.chatID}', 
        '${this.alertStatus}', 
        '${this.status}'
      ) ON CONFLICT ON CONSTRAINT user_unique
      DO UPDATE SET chatID = EXCLUDED.chatID,
      alertStatus = 'true';
    `)

      const result = await getByColumn('Users', 'userID', `${this.userID}`)
      if (result) {
        this.id = Number(result[0].id)
      }

      debug(`User ${this.userID} created`)

    } catch (error) {
      console.log(`User create error: `, error)
      debug(`User create error: ${error}`)
    }
  }

}
