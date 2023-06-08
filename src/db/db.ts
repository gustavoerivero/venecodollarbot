import { db } from '@vercel/postgres'
import createDebug from 'debug'

const debug = createDebug('database:init')

export const init = async () => {
  try {
    const client = await db.connect()

    debug(`Creating tables`)
    await client.sql`CREATE TABLE IF NOT EXISTS Users ( 
      id SERIAL PRIMARY KEY,
      firstName VARCHAR(255) NOT NULL, 
      lastName VARCHAR(255) NULL, 
      username VARCHAR(255) NULL, 
      userID VARCHAR(255) NOT NULL, 
      chatID VARCHAR(255) NOT NULL, 
      alertStatus BOOLEAN, 
      status BOOLEAN,
      CONSTRAINT user_unique UNIQUE (chatID)
    )`
    debug(`User table created`)

  } catch (error) {
    console.log(`User create table error: `, error)
    debug(`User create table error: ${error}`)
  }
}

export const get = async (tableName: string) => {
  try {

    const client = await db.connect()
    const { rows } = await client.query(`SELECT * FROM ${tableName};`)

    debug(`${tableName} got`)
    return rows

  } catch (error) {
    console.log(`${tableName} get error: `, error)
    debug(`${tableName} get error: ${error}`)
  }
}

export const getByID = async (tableName: string, id: string) => {
  try {

    const client = await db.connect()
    const { rows } = await client.query(`SELECT * FROM ${tableName} WHERE id = ${id};`)

    debug(`${tableName} got`)
    return rows

  } catch (error) {
    console.log(`${tableName} get error: `, error)
    debug(`${tableName} get error: ${error}`)
  }
}

export const getByColumn = async (
  tableName: string,
  columns: string | string[],
  data: string | number | boolean | (string | number | boolean)[]
) => {
  try {

    const columnsArray = Array.isArray(columns) ? columns : [columns]
    const dataArray = Array.isArray(data) ? data : [data]

    const whereClause = columnsArray
      .map((column, index) => `${column} = '${dataArray[index]}'`)
      .join(' AND ')

    const client = await db.connect()
    const { rows } = await client.query(`SELECT * FROM ${tableName} WHERE ${whereClause};`)

    debug(`${tableName} got`)
    return rows

  } catch (error) {
    console.log(`${tableName} get error: `, error)
    debug(`${tableName} get error: ${error}`)
  }
}

export const update = async (
  tableName: string,
  columns: string | string[],
  data: string | number | boolean | (string | number | boolean)[],
  conditions?: string
) => {
  try {

    const columnsArray = Array.isArray(columns) ? columns : [columns]
    const dataArray = Array.isArray(data) ? data : [data]

    const setClause = columnsArray
      .map((column, index) => `${column} = '${dataArray[index]}'`)
      .join(', ')

    console.log(setClause)

    const whereClause = `WHERE ${conditions}`

    const client = await db.connect()
    await client.query(`UPDATE ${tableName} SET ${setClause} ${whereClause};`)

    debug(`${tableName} update`)
    return true

  } catch (error) {
    console.log(`${tableName} update error: `, error)
    debug(`${tableName} update error: ${error}`)
    return false
  }
}