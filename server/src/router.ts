import { Router } from "express";
import { body, param } from "express-validator";
import { createProduct, deleteProduct, updateAvailability } from "./handlers/product";
import { handleInputErrors } from "./middleware";
import { getProducts } from "./handlers/product";
import { getByProduct } from "./handlers/product";
import { updateProduct } from "./handlers/product";
const router = Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Product:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: The product ID
 *           example: 1
 *         name:
 *           type: string
 *           description: The product name
 *           example: Monitor curvo de 49 pulgadas
 *         price:
 *           type: number
 *           description: The product price
 *           example: 500
 *         availability:
 *           type: boolean
 *           description: The product availability
 *           example: true
 */


/**
 * @swagger
 * /api/products:
 *      get:
 *          summary: Get a list of products
 *          tags:
 *              - Products
 *          description: Return a list of products
 *          responses:
 *              200:
 *                  description: Successful response
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: array
 *                              items:
 *                                  $ref: '#/components/schemas/Product'
 * 
 */
router.get("/", getProducts);

/**
 * @swagger
 * /api/products/{id}:
 *      get:
 *          summary: Get a product by id
 *          tags:
 *              - Products
 *          description: Return one product based on product id
 *          parameters:
 *            - in: path
 *              name: id
 *              description: The ID of the product to retrive
 *              required: true
 *              schema:
 *                  type: integer
 *          responses:
 *              200:
 *                  description: Successful response
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/components/schemas/Product'
 *              404:
 *                  description: Not found
 *              400:
 *                  description: Bad request
 *                  
 *                              
 */

router.get("/:id",
    param('id').isInt().withMessage('El id debe ser un número entero'),
    handleInputErrors,
    getByProduct);

/**
 * @swagger
 * /api/products:
 *  post:
 *      summary: Creates a new product
 *      tags:
 *          - Products
 *      description: Returns a new record in the database
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          name:
 *                              type: string
 *                              example: "Monitor curvo de 49 pulgadas"
 *                          price:
 *                              type: number
 *                              example: 3000
 *      responses:
 *          201:
 *              description: Product created successfully
 *          400:
 *              description: Bad Request - Invalid Input Data
 */

router.post("/",
    // Validación de los datos enviados por el usuario
    body('name')
        .notEmpty().withMessage('El campo name no puede estar vacío'),
    body('price')
        .isNumeric().withMessage('Valor no válido')
        .notEmpty().withMessage('El campo price no puede estar vacío')
        .custom(value => value > 0).withMessage('El precio debe ser mayor a 0'),
    handleInputErrors,
    createProduct);

/**
 * @swagger
 * /api/products/{id}:
 *  put:
 *      summary: Update a product with user input
 *      tags:
 *          - Products
 *      description: Returns the updated product
 *      parameters:
 *            - in: path
 *              name: id
 *              description: The ID of the product to update
 *              required: true
 *              schema:
 *                  type: integer
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          name:
 *                              type: string
 *                              example: "Monitor curvo de 49 pulgadas"
 *                          price:
 *                              type: number
 *                              example: 3000
 *                          availability:
 *                              type: boolean
 *                              example: true
 *      responses:
 *          200:
*               description: Successful response
*               content:
*                      application/json:
*                          schema:
*                              $ref: '#/components/schemas/Product'
 *          404:
 *              description: Not found
 *          400:
 *              description: Bad Request - Invalid ID or Input Data
 */

router.put("/:id",
    param('id').isInt().withMessage('El id debe ser un número entero'),
    body('name')
        .notEmpty().withMessage('El campo name no puede estar vacío'),
    body('price')
        .isNumeric().withMessage('Valor no válido')
        .notEmpty().withMessage('El campo price no puede estar vacío')
        .custom(value => value > 0).withMessage('El precio debe ser mayor a 0'),
    body('availability')
        .isBoolean().withMessage('El campo availability debe ser un booleano')
        .notEmpty().withMessage('El campo availability no puede estar vacío'),
    handleInputErrors,
    updateProduct);

/**
 * @swagger
 * /api/products/{id}:
 *  patch:
 *      summary: Partial update for a product with user input
 *      tags:
 *          - Products
 *      description: Returns the partial updated product
 *      parameters:
 *            - in: path
 *              name: id
 *              description: The ID of the product to update
 *              required: true
 *              schema:
 *                  type: integer
 *      responses:
 *          200:
*               description: Successful response
*               content:
*                      application/json:
*                          schema:
*                              $ref: '#/components/schemas/Product'
 *          404:
 *              description: Not found
 *          400:
 *              description: Bad Request - Invalid ID or Input Data
 */


router.patch("/:id",
    param('id').isInt().withMessage('El id debe ser un número entero'),
    handleInputErrors,
    updateAvailability);
/**
 * @swagger
 * /api/products/{id}:
 *  delete:
 *      summary: Delete a specific product with user input
 *      tags:
 *          - Products
 *      description: Returns the deleted product
 *      parameters:
 *            - in: path
 *              name: id
 *              description: The ID of the product to delete
 *              required: true
 *              schema:
 *                  type: integer
 *      responses:
 *          200:
*               description: Successful response
*               content:
*                      application/json:
*                          schema:
*                              type: string
*                              value: 'Producto eliminado'
 *          404:
 *              description: Not found
 *          400:
 *              description: Bad Request - Invalid ID or Input Data
 */


router.delete("/:id",
    param('id').isInt().withMessage('El id debe ser un número entero'),
    handleInputErrors,
    deleteProduct);

export default router;