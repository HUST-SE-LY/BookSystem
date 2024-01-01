import { SingleBook } from "../../pages/user/books";
import { SingleOrder } from "../../pages/user/orders";
import { UserInfo } from "../../stores/useAuthStore";
import { http } from "../http";

interface UserRegisterParams {
  account: string;
  name: string;
  password: string;
  phone: string;
  address: string;
}

interface UserRegisterRes {
  token: string;
}

interface UserLoginParams {
  account: string;
  password: string;
}

interface UserLoginRes {
  token: string;
}

interface GetUserInfoRes {
  info: UserInfo;
}

interface UserTopUpParams {
  number: number;
}

interface UserChangePasswordParams {
  password: string;
}

interface UserChangeInfoParams {
  name: string;
  address: string;
  phone: string;
}

interface UserGetBooksRes {
  books: SingleBook[];
}

interface UserBuyBookParams {
  id: number;
  amount: number;
}

interface UserConfirmBookParams {
  id: number
}

interface UserGetOrdersRes {
  orders: SingleOrder[];
}

export const userRegister = async (params: UserRegisterParams) => http.post<UserRegisterRes>('/user/register', params)

export const userLogin = async (params: UserLoginParams) => http.post<UserLoginRes>('/user/login', params)

export const getUserInfo = async () => http.get<GetUserInfoRes>('/user/info');

export const userTopUp = async (params: UserTopUpParams) => http.post('/user/top_up', params);

export const userChangePassword = async (params: UserChangePasswordParams) => http.post('/user/change_password', params);

export const userChangeInfo = async (params: UserChangeInfoParams) => http.post("/user/change_info", params)

export const userGetBooks = async () => http.get<UserGetBooksRes>("/user/book");

export const userBuyBook = async (params: UserBuyBookParams) => http.post("/user/buy", params);

export const userConfirmBook = async (params: UserConfirmBookParams) => http.post("/user/confirm", params);

export const userGetOrders = async () => http.get<UserGetOrdersRes>("/user/order");

