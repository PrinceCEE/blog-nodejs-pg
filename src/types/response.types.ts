export type IResponse = {
  status: boolean;
  message: string;
  data?: any;
};

export type IAccessToken = {
  email: string;
  userID: string;
};
