import axios from 'axios'
import { DraftProductSchema, Product, ProductSchema, ProductsSchema } from '../types'
import { safeParse,coerce, number,parse, pipe, string, transform } from 'valibot'
import { toBoolean } from '../utils';
type ProductData = {
    [k: string]: FormDataEntryValue;
}

export async function addProduct(data:ProductData){
    try {
        const result = safeParse(DraftProductSchema,{
            name: data.name,
            price: +data.price
        })
        if(result.success){
            const url = `${import.meta.env.VITE_API_URL}/api/products`
            await axios.post(url,{
                name: result.output.name,
                price: result.output.price,
            })
            
        }else{
            throw new Error('Datos no válidos')
        }
        
    } catch (error) {
        console.log(error)
    }
}

export async function getProducts() {
    try {
        const url = `${import.meta.env.VITE_API_URL}/api/products`
        const {data} = await axios.get(url)
        
        const result = safeParse(ProductsSchema,data.data)
        
        if(result.success){
            return result.output
        }
        else{
            throw new Error("Hubo un error en el tipado de datos.")
        }
    } catch (error) {
        console.log(error);
        
    }
}

export async function getProdutcById(id:Product['id']) {
    try {
        const url = `${import.meta.env.VITE_API_URL}/api/products/${id}`
        const {data} = await axios.get(url)

        const result = safeParse(ProductSchema,data.data)
        if(result.success){
            return result.output
        }
        else{
            throw new Error("Hubo un error en el tipado de datos.")
        }
    } catch (error) {
        console.log(error);
        
    }
}

export async function updateProduct(data:ProductData,id:Product['id']){

    const  NumberSchema = pipe(string(),transform(Number),number())

    try {
        const result = safeParse(ProductSchema,{
            id,
            name: data.name,
            price: parse(NumberSchema,data.price),
            availability: toBoolean(data.availability.toString())
        })
        if(result.success){
            const url = `${import.meta.env.VITE_API_URL}/api/products/${id}`
            await axios.put(url,result.output)
            
        }else{
            throw new Error('Datos no válidos')
        }
        
    } catch (error) {
        console.log(error)
    }
}