import { createBrowserRouter } from "react-router-dom"
import Layout from "./layout/Layout"
import Products, {loader as porductsLoader} from "./views/Products"
import NewProduct, {action as NewProductAction} from "./views/NewProduct"
import EditProduct, {loader as editProductLoader} from "./views/EditProduct"

export const router = createBrowserRouter([
    {
        path: '/',
        element:<Layout/>,
        children:[
            {
                index:true,
                element: <Products/>,
                loader:porductsLoader
            },
            {
                path:'/productos/nuevo',
                element:<NewProduct/>,
                action: NewProductAction
            },
            {
                path:'/productos/:id/editar',//ROA pattern - Resource-oriented desing
                element: <EditProduct/>,
                loader: editProductLoader
            }
        ]
    }
])