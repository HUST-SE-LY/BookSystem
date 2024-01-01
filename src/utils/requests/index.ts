import { RoleRes } from "../const";
import { http } from "../http";

interface RoleTypeRes {
  type: RoleRes.USER | RoleRes.SUPPLIER
}

export const getRoleType = () => http.get<RoleTypeRes>('/user_type');