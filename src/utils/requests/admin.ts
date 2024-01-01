import { SingleBook } from "../../pages/admin/bookManage";
import { SingleMissingRecord } from "../../pages/admin/missingRecordManage";
import { SinglePurchase } from "../../pages/admin/purchaseManage";
import { AdminSupply } from "../../pages/admin/supplies";
import { SingleUser } from "../../pages/admin/userManage";
import { SingleSupply } from "../../pages/supplier/supply";
import { SingleOrder } from "../../pages/user/orders";
import { http } from "../http";

interface AdminLoginParams {
  account: string;
  password: string;
}

interface AdminLoginRes {
  token: string;
}

interface AdminGetUsersRes {
  users: SingleUser[];
}

interface AdminSetCreditLevelParams {
  id: number;
  level: number;
}

interface AdminGetSuppliesRes {
  supplies: AdminSupply[];
}

interface AdminAddMissingRecordsParams {
  amount: number;
  supply_id: number;
}

interface AdminAddMissingRecordsRes {
  record: SingleSupply[];
}

interface AdminDeleteMissingRecordsParams {
  id: number;
}

interface AdminChangeMissingRecordsParams {
  id: number;
  amount: number;
}

interface AdminGetMissingRecordsRes {
  records: SingleMissingRecord[];
}

interface AdminAddPurchaseRecordParams {
  missingRecordId: number;
  amount: number;
}

interface AdminFinishPurchaseParams {
  id: number;
}

interface AdminGetPurchaseRecordsRes {
  records: SinglePurchase[];
}

interface AdminGetBooksRes {
  books: SingleBook[];
}

interface AdminSetPriceParams {
  id: number;
  price: number;
}

interface AdminStartSaleBookParams {
  id: number;
}

interface AdminUnSaleBookParams {
  id: number;
}

interface AdminGetOrdersRes {
  orders: SingleOrder[];
}

interface AdminStartDeliverParams {
  id: number;
}


export const adminLogin = (params: AdminLoginParams) =>
  http.post<AdminLoginRes>("/admin/login", params);

export const adminGetUsers = () =>
  http.get<AdminGetUsersRes>("/admin/users");

export const adminSetCreditLevel = (params: AdminSetCreditLevelParams) =>
  http.post("/admin/set_credit", params);

export const adminGetSupplies = () => http.get<AdminGetSuppliesRes>('/admin/supply');

export const adminAddMissingRecord = (params: AdminAddMissingRecordsParams) => http.post<AdminAddMissingRecordsRes>("/admin/add_missing_record", params);

export const adminChangeMissingRecord = (params: AdminChangeMissingRecordsParams) => http.post('/admin/change_missing_record', params);

export const adminDeleteMissingRecord = (params: AdminDeleteMissingRecordsParams) => http.delete('/admin/delete_missing_record', params);

export const adminGetMissingRecords = () => http.get<AdminGetMissingRecordsRes>('/admin/missing_record');

export const adminAddPurchaseRecord = (params: AdminAddPurchaseRecordParams) => http.post('/admin/purchase', params)

export const adminFinishPurchase = (params: AdminFinishPurchaseParams) => http.post('/admin/finish_purchase', params);

export const adminGetPurchaseRecords = () => http.get<AdminGetPurchaseRecordsRes>('/admin/purchase');

export const adminGetBooks = () => http.get<AdminGetBooksRes>('/admin/book'); 

export const adminSetPrice = (params: AdminSetPriceParams) => http.post('/admin/price', params);

export const adminStartSaleBook = (params: AdminStartSaleBookParams) => http.post('/admin/sale', params);

export const adminUnSaleBook = (params: AdminUnSaleBookParams) => http.post('/admin/unsale', params)

export const adminGetOrders = () => http.get<AdminGetOrdersRes>('/admin/order');

export const adminStartDeliver = (params: AdminStartDeliverParams) => http.post('/admin/deliver', params); 