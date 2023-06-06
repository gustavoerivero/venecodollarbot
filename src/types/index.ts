export type TEntity = {
  entity: string,
  info: TEntityInfo
}

export type TEntityInfo = {
  title: string
  dollar: number
  updatedDate: string
}

export type TResponseData = {
  OK: number,
  Data: {
    date?: string
    average?: number
    entities?: TEntity[]
    entity?: string,
    info?: TEntityInfo
  }
}