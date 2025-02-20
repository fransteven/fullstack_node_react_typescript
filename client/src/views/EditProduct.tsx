import { Link,Form, useActionData, ActionFunctionArgs, redirect, LoaderFunctionArgs, useLoaderData } from "react-router-dom"
import ErrorMessage from "../components/ErrorMessage";
import { updateProduct } from "../services/ProductService";
import { getProdutcById } from "../services/ProductService";
import { Product } from "../types";
import ProductForm from "../components/ProductForm";

export async function loader({params}:LoaderFunctionArgs){
    if(params.id !=undefined){
        const product = await getProdutcById(+params.id)
        console.log(product);
        
        if(!product){
            throw new Response('',{status:404,statusText:'No Encontrado'})
        }
        return product
    }

}

export async function action({request,params}:ActionFunctionArgs) {
    //Los inputs del formulario son tomados del atributo name de cada input  en el formulario
    const data = Object.fromEntries(await request.formData())
    console.log(data);
    
    let error = '';
    if(Object.values(data).includes('')){
        error = 'Todos los campos son obligatorios'
    }
    //Una vez se retorne algo en un action, este valor va a estar disponible en
    //el form por medio del hook useActionData()
    if(error.length){
        return error
    }
    if(params.id !== undefined){
        await updateProduct(data,+params.id)
    }
    
    return redirect('/')
    
}

const availabilityOptions = [
    { name: 'Disponible', value: true},
    { name: 'No Disponible', value: false}
]

export default function EditProduct() {

    const product =useLoaderData() as Product   

    const error = useActionData() as string
    
    
    return (
        <>
        <div className="flex justify-between">
                <h2 className="text-4xl font-black text-slate-500">Editar Producto</h2>
                <Link
                    to={'/'}
                    className="bg-indigo-600 text-white text-sm rounded-lg font-bold p-4 uppercase shadow hover:bg-indigo-500"
                >
                    Editar Producto
                </Link>
            </div>

        {error && <ErrorMessage>{error}</ErrorMessage>}
        <Form
            className="mt-10"
            method="POST"      
        >
        
            <ProductForm
                product={product}
            />
            <div className="mb-4">
                <label
                    className="text-gray-800"
                    htmlFor="availability"
                >Disponibilidad:</label>
                <select 
                    id="availability"
                    className="mt-2 block w-full p-3 bg-gray-50"
                    name="availability"
                    defaultValue={product?.availability.toString()}
                >
                    {availabilityOptions.map(option => (
                        <option key={option.name} value={option.value.toString()}>{option.name}</option>
                    ))}
                </select>
            </div>
            <input
                type="submit"
                className="mt-5 w-full bg-indigo-600 p-2 text-white font-bold text-lg cursor-pointer rounded uppercase"
                value="Editar Producto"
            />
        </Form>
        </>
    )
}
