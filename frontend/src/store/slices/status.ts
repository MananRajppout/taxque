export enum STATUSES {
  LOADING = "loading",
  IDLE = "idle",
  ERROR = "error"
}

export interface LocationData {
  State: string;
  City: string;
  Pincode: string | number;
  PostOffice: string ;
}
