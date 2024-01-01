import { createBrowserRouter, type RouteObject } from "react-router-dom";
import { MainLayout } from "../layouts/main";
import { LoginLayout } from "../layouts/login";
import { Login } from "../pages/login";
import { Register } from "../pages/login/register";
import { UserInfo } from "../pages/user/userInfo";
import { AdminHomeLayout } from "../layouts/admin";
import { UserManage } from "../pages/admin/userManage";
import { SupplierHomeLayout } from "../layouts/supplier";
import { SupplierInfo } from "../pages/supplier/info";
import { AddSupply } from "../pages/supplier/addSupply";
import { MySupplies } from "../pages/supplier/supply";
import { Supplies } from "../pages/admin/supplies";
import { MissingRecordManage } from "../pages/admin/missingRecordManage";
import { PurchaseManage } from "../pages/admin/purchaseManage";
import { BookManage } from "../pages/admin/bookManage";
import { Books } from "../pages/user/books";
import { Orders } from "../pages/user/orders";
import { OrderManage } from "../pages/admin/orderManage";
const routes: RouteObject[] = [
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <UserInfo />,
      },
      {
        path: '/books',
        element: <Books />
      },{
        path: '/orders',
        element: <Orders />
      }
    ],
  },
  {
    path: "/login",
    element: <LoginLayout />,
    children: [
      {
        index: true,
        element: <Login />,
      },
      {
        path: "/login/register",
        element: <Register />,
      },
    ],
  },
  {
    path: "/admin",
    element: <AdminHomeLayout />,
    children: [
      {
        index: true,
        element: <UserManage />,
      },
      {
        path: "/admin/supply",
        element: <Supplies />,
      },
      {
        path: "/admin/missing_records",
        element: <MissingRecordManage />,
      },
      {
        path: "/admin/purchase",
        element: <PurchaseManage />,
      },
      {
        path: '/admin/book',
        element: <BookManage />
      },
      {
        path: '/admin/orders',
        element: <OrderManage />
      }
    ],
  },
  {
    path: "/supplier",
    element: <SupplierHomeLayout />,
    children: [
      {
        index: true,
        element: <SupplierInfo />,
      },
      {
        path: "/supplier/add",
        element: <AddSupply />,
      },
      {
        path: "/supplier/supply",
        element: <MySupplies />,
      },
    ],
  },
];

export const router = createBrowserRouter(routes);
