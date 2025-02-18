import { Link,Form, useActionData, ActionFunctionArgs, redirect } from "react-router-dom"
import ErrorMessage from "../components/ErrorMessage";
import { addProduct } from "../services/ProductService";

export async function action({request}:ActionFunctionArgs) {
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
    await addProduct(data)
    return redirect('/')
    
}

export default function NewProduct() {

    const error = useActionData() as string
    console.log(error);
    
    return (
        <>
        <div className="flex justify-between">
                <h2 className="text-4xl font-black text-slate-500">Productos</h2>
                <Link
                    to={'/'}
                    className="bg-indigo-600 text-white text-sm rounded-lg font-bold p-4 uppercase shadow hover:bg-indigo-500"
                >
                    Registrar Producto
                </Link>
            </div>

        {error && <ErrorMessage>{error}</ErrorMessage>}
        <Form
            className="mt-10"
            method="POST"      
        >
        
            <div className="mb-4">
                <label
                    className="text-gray-800"
                    htmlFor="name"
                >Nombre Producto:</label>
                <input 
                    id="name"
                    type="text"
                    className="mt-2 block w-full p-3 bg-gray-50"
                    placeholder="Nombre del Producto"
                    name="name"
                />
            </div>
            <div className="mb-4">
                <label
                    className="text-gray-800"
                    htmlFor="price"
                >Precio:</label>
                <input 
                    id="price"
                    type="number"
                    className="mt-2 block w-full p-3 bg-gray-50"
                    placeholder="Precio Producto. ej. 200, 300"
                    name="price"
                />
            </div>
            <input
            type="submit"
            className="mt-5 w-full bg-indigo-600 p-2 text-white font-bold text-lg cursor-pointer rounded"
            value="Registrar Producto"
            />
        </Form>
        </>
    )
}
