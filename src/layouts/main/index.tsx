import { Message } from "@arco-design/web-react"
import { useEffect } from "react"
import { RoleRes } from "../../utils/const"
import { UserHomeLayout } from "./user"
import { getRoleType } from "../../utils/requests"
import { useAuthStore } from "../../stores/useAuthStore"
import { Navigate } from "react-router-dom"
import { getUserInfo } from "../../utils/requests/user"

export const MainLayout = () => {
  const {type, setType, setInfo} = useAuthStore()
  useEffect(() => {
    getRoleType().then((res) => {setType(res.type)}).catch(() => {
      Message.error("获取用户类型错误")
    })
  },[setType])
  useEffect(() => {
    getUserInfo().then((res) => {
      setInfo(res.info);
    });
  }, [setInfo]);
  if(!type) {
    return <div>获取用户中</div>
  }
  if(type === RoleRes.ADMIN) return <Navigate to="/admin" />
  if(type === RoleRes.USER) return <UserHomeLayout />
  if(type === RoleRes.SUPPLIER) return <Navigate to="/supplier" />
}