
import { useNavigate } from "react-router-dom"
import { Product } from "../types"
import { formatCurrency } from "../utils"

type ProductDetailsProps= {
    product: Product
}

export default function ProductDetails({product}:ProductDetailsProps) {
    const navigate = useNavigate()
    const isAvailable = product.availability
    return (
        <tr className="border-b ">
            <td className="p-3 text-lg text-gray-800">
                {product.name}
            </td>
            <td className="p-3 text-lg text-gray-800">
                {formatCurrency(product.price)}
            </td>
            <td className="p-3 text-lg text-gray-800">
                {isAvailable ? 'Disponible':'No Disponible'}
            </td>
            <td className="p-3 text-lg text-gray-800 ">
                <div className="flex justify-between gap-3">
                    <button
                        onClick={
                            /*navigate recibe dos parámetros y el segundo es opcional
                            url
                            options: puede ser un state, el cual vamos a recuperar nuevamente en la url a la que estamos redirigiendo al usuario
                            */
                            ()=>navigate(
                                
                                `/productos/${product.id}/editar`
                                // {
                                //     state:product
                                // }
                            )}
                        className="bg-indigo-600 text-white rounded-lg w-1/2 p-1 uppercase font-bold text-xs text-center"
                    >Editar</button>
                    <button
                        className="bg-red-600 text-white rounded-lg w-1/2 p-1 uppercase font-bold text-xs text-center"
                    >Eliminar</button>
                </div>
            </td>
    </tr> 
    )
}
