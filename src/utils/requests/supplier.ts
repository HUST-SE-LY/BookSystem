import { SingleSupply } from "../../pages/supplier/supply";
import { SupplierInfo } from "../../stores/useAuthStore";
import { http } from "../http";

interface SupplierLoginParams {
  account: string;
  password: string;
}

interface SupplierLoginRes {
  token: string;
}

interface SupplierRegisterParams {
  account: string;
  name: string;
  password: string;
  phone: string;
  address: string;
}

interface SupplierRegisterRes {
  token: string;
}

interface SupplierAddSupplyParams {
  title: string;
  publisher: string;
  price: number;
  amount: number;
  authors: string[];
  keywords: string[];
}

interface SupplierAddSupplyRes {
  id: number;
  title: string;
  publisher: string;
  price: number;
  amount: number;
  authors: string[];
  keywords: string[];
  supplierId: number;
}

interface SupplierChangeInfoParams {
  name: string;
  address: string;
  phone: string;
}

interface SupplierChangePasswordParams {
  password: string;
}

interface SupplierGetInfoRes {
  info: SupplierInfo;
}


interface SupplierGetSuppliesRes {
  supplies: SingleSupply[];
}

interface SupplierDeleteSupplyParams {
  id: number;
}

interface SupplierChangeSupplyRes {
  supply: SingleSupply;
}

interface SupplierChangeSupplyParams {
  id: number;
  title: string;
  publisher: string;
  price: number;
  amount: number;
  authors: string[];
  keywords: string[];
}

export const supplierLogin = (params: SupplierLoginParams) =>
  http.post<SupplierLoginRes>("/supplier/login", params);

export const supplierRegister = (params: SupplierRegisterParams) =>
  http.post<SupplierRegisterRes>("/supplier/register", params);

export const supplierAddSupply = (params: SupplierAddSupplyParams) =>
  http.post<SupplierAddSupplyRes>("/supplier/add_supply", params);

export const supplierChangeInfo = (params: SupplierChangeInfoParams) =>
  http.post("/supplier/change_info", params);

export const supplierChangePassword = (params: SupplierChangePasswordParams) =>
  http.post("/supplier/change_password", params);

export const supplierGetInfo = () =>
  http.get<SupplierGetInfoRes>("/supplier/info");

export const supplierGetSupplies = () =>
  http.get<SupplierGetSuppliesRes>("/supplier/supplies");

export const supplierChangeSupply = (params: SupplierChangeSupplyParams) =>
  http.post<SupplierChangeSupplyRes>("/supplier/change_supply", params);

export const supplierDeleteSupply = (params: SupplierDeleteSupplyParams) =>
  http.delete("/supplier/supply", params);
