import { RoleRes } from "../utils/const";
import { create } from "zustand";
import { produce } from "immer";
export interface UserInfo {
  id: number;
  name: string;
  account: string;
  address: string;
  phone: string;
  creditLevel: 1 | 2 | 3 | 4 | 5;
  remain: number;
}

interface AdminInfo {
  account: string;
  name: string;
  id: number;
}

export interface SupplierInfo {
  id: number;
  name: string;
  account: string;
  address: string;
  phone: string;
}

type RoleInfo = UserInfo | SupplierInfo | AdminInfo;

interface States {
  type: RoleRes | undefined;
  info: RoleInfo | undefined;
}

interface Actions {
  setAll: (type: RoleRes, info: RoleInfo) => void;
  setInfo: (info: RoleInfo) => void;
  setType: (type: RoleRes) => void;
  topUpRemain: (number: number) => void;
}

export const useAuthStore = create<States & Actions>((set) => ({
  type: undefined,
  info: undefined,
  setAll: (type: RoleRes, info: RoleInfo) => set(() => ({ type, info })),
  setInfo: (info: RoleInfo) => {
    console.log(info);

    return set(() => ({ info }));
  },
  setType: (type: RoleRes) => {
    console.log(type);
    return set(() => ({ type }));
  },
  topUpRemain: (number: number) => set(produce((state: States) => {(state.info as UserInfo).remain += number})),
}));
