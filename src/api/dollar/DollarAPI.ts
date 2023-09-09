import { http } from "../http"
import { AxiosResponse } from "axios"

import { TResponseData } from "../../types"

class DollarAPI {

  private BASE_URL: string

  constructor() {
    this.BASE_URL = "dollar"
  }

  public async get(): Promise<AxiosResponse<TResponseData>> {
    const response = await http.get(`${this.BASE_URL}`)
    return response
  }

  public async getEntity(entity: string = ""): Promise<AxiosResponse<TResponseData>> {
    const response = await http.get(`${this.BASE_URL}/entity?name=${entity}`)
    return response
  }

  public async toDollar(bs: number = 0, entity: string = ""): Promise<AxiosResponse<TResponseData>> {
    const response = await http.get(`${this.BASE_URL}/toDollar?bs=${bs}&entity=${entity}`)
    return response
  }

  public async toBs(dollar: number = 0, entity: string = ""): Promise<AxiosResponse<TResponseData>> {
    const response = await http.get(`${this.BASE_URL}/toBs?dollar=${dollar}&entity=${entity}`)
    return response
  }

}

export default DollarAPI