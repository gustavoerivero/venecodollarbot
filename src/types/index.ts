export type TDate = {
  dayWeek: string; 
  day: number; 
  month: string; 
  year: number;
};

export type TEntity = {
  entity: string;
  info: TEntityInfo;
  euroCalculated?: number;
  dollarCalculated?: number;
  bolivarCalculated?: number;
};

export type TEntityInfo = {
  title: string;
  euro?: number
  dollar?: number;
  updatedDate: string;
}

export type TResponseData = {
  OK: number;
  Data: {
    date?: string;
    average?: number;
    entities?: TEntity[];
    entity?: string;
    info?: TEntityInfo;
    dollarCalculated?: number;
    euroCalculated?: number;
    bolivarCalculated?: number;
  };
};

export type TUserBD = {
  id?: number;
  firstname?: string;
  lastname?: string;
  username?: string;
  userid?: string;
  chatid?: string;
  alertstatus?: boolean;
  status?: boolean;
};