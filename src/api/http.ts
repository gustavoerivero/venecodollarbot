import axios, { AxiosInstance } from 'axios'

export const BASE_URL = process.env.API_URL ?? ''

export const http: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
})

