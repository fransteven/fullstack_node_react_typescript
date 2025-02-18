import { Request,Response } from "express";
import Products from "../models/Product.model";


/*
req = contiene los parámetros de consulta (query), parámetros de ruta (params), cuerpo de la solicitud (body) y otros datos relevantes.
{
  "query": {}, // Parámetros de consulta en la URL, por ejemplo, ?limit=10&offset=20
  "params": {}, // Parámetros de ruta, si los hubiera, por ejemplo /products/:id
    "body": {
        "name": "Sample Product",
        "price": 9.99,
        "availability": true // Datos del cuerpo de la solicitud
    },
    "headers": {
        "content-type": "application/json"
    }
}
*/


export const getProducts = async (req:Request, res:Response) => {
    const products = await Products.findAll({
        order:[
            ['id','asc']
        ],
        attributes:{exclude:['createdAt','updatedAt']}
    });
    res.json({data:products});
}

export const getByProduct = async (req:Request, res:Response) => {
    try {
        const product = await Products.findByPk(req.params.id,{
            attributes:{exclude:['createdAt','updatedAt']}
        })
        if(!product){
            res.status(404).json({message:'Producto no encontrado'});
        }
        res.json({data:product});
        
    } catch (error) {
        console.log(error);
    }
}

//Cada vez que se cree una función que interactue con la base de datos, se debe utilizar async
export const createProduct = async (req: Request, res: Response) => {
    const product = await Products.create(req.body);
        res.status(201).json({data:product});
}

export const updateProduct = async(req:Request, res:Response) => {
    const product = await Products.findByPk(req.params.id);
        if(!product){
            res.status(404).json({message:'Producto no encontrado'});
            return
        }
        //Actualiza el producto con los datos enviados por el usuario
        await product.update(req.body);
        //Guarda los cambios en la base de datos
        await product.save();
        res.json({data:product});
}

export const updateAvailability = async(req:Request, res:Response) => {
    const product = await Products.findByPk(req.params.id);
    if(!product){
        res.status(404).json({message:'Producto no encontrado'});
        return
    }
    product.availability = !product.dataValues.availability;
    await product.save();
    res.json({data:product});
}

export const deleteProduct = async (req: Request, res: Response): Promise<void> => {
    const product = await Products.findByPk(req.params.id);
        if (!product) {
            res.status(404).json({ message: 'Producto no encontrado' });
            return; // <-- Detener ejecución después de responder
        }
        await product.destroy();
        res.json({ message: "Producto eliminado", data: product });
};
