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
  image?: string;
  difference?: number;
  differencePercentage?: string;
  tendency?: string;
  tendencyColor?: string;
}

export type TData = {
  date?: string;
  average?: number;
  entities?: TEntity[];
  entity?: string;
  info?: TEntityInfo;
  dollarCalculated?: number;
  euroCalculated?: number;
  bolivarCalculated?: number;
}

export type TResponseData = {
  OK: number;
  Data: TData;
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