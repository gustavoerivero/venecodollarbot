import { http } from '../http'
import { AxiosResponse } from 'axios'

import { TResponseData } from '../../types'

class EuroAPI {

  private BASE_URL: string

  constructor() {
    this.BASE_URL = 'euro'
  }

  public async get(): Promise<AxiosResponse<TResponseData>> {
    const response = await http.get(`${this.BASE_URL}`)
    return response
  }

  public async getEntity(entity: string = ''): Promise<AxiosResponse<TResponseData>> {
    const response = await http.get(`${this.BASE_URL}/entity?name=${entity}`)
    return response
  }

  public async toEuro(bs: number = 0, entity: string = ''): Promise<AxiosResponse<TResponseData>> {
    const response = await http.get(`${this.BASE_URL}/toEuro?bs=${bs}&entity=${entity}`)
    return response
  }

  public async toBs(euro: number = 0, entity: string = ''): Promise<AxiosResponse<TResponseData>> {
    const response = await http.get(`${this.BASE_URL}/toBs?euro=${euro}&entity=${entity}`)
    return response
  }

}

export default EuroAPI