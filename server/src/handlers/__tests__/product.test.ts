import request from 'supertest'
import server from '../../server'
import { response } from 'express'

describe('POST /api/products',()=>{
    it('Should display validation errors', async ()=>{
        const response  = await request(server).post('/api/products').send({})
        expect(response.status).toBe(400)
        expect(response.body).toHaveProperty('errors')
        expect(response.body.errors).toHaveLength(4)
    })
    it('Should create a new product', async ()=>{
        const response  = await request(server).post('/api/products').send({
            name: "Monitor Gamer",
            price: 700
        })
        expect(response.status).toBe(201)
        expect(response.body).toHaveProperty('data')
    })
    it('Should raise exception where price to be less than zero and the price is not a number',async()=>{
        const response  = await request(server).post('/api/products').send({
            name: "Monitor Gamer",
            price: "hola"
        })
        expect(response.status).toBe(400)
        expect(response.body.errors[1].msg).toBe('El precio debe ser mayor a 0')
        expect(response.body).toHaveProperty('errors')  
        expect(response.body.errors).toHaveLength(2)

        expect(response.status).not.toBe(404)
        expect(response.body.errors).not.toHaveLength(4)
    })
})
describe('GET /api/products',()=>{
    it('GET a JSON Response with products', async ()=>{
        const response  = await request(server).get('/api/products')
        expect(response.status).not.toBe(404)
    })
    it('GET a JSON Response with products', async ()=>{
        const response  = await request(server).get('/api/products')
        expect(response.status).toBe(200)
        expect(response.body).toHaveProperty('data')
        expect(response.body.data).toHaveLength(1)
        expect(response.headers['content-type']).toMatch(/json/)
        
        expect(response.body).not.toHaveProperty('errors')

    })
})
describe('GET /api/products/:id',()=>{
    it('Should return a 404 response for a non-existent product', async ()=>{
        const productId = 2000
        const response  = await request(server).get(`/api/products/${productId}`)
        expect(response.status).toBe(404)
        expect(response.body.message).toBe('Producto no encontrado')

    })
    it('Should check a valid ID in the URL', async ()=>{
        const response  = await request(server).get('/api/products/not-valid-url')
        expect(response.status).toBe(400)
        expect(response.body).toHaveProperty('errors')
        expect(response.body.errors).toHaveLength(1)
        expect(response.body.errors[0].msg).toBe('El id debe ser un número entero')
    })
    it('GET a JSON response for a single product', async ()=>{
        const response  = await request(server).get('/api/products/1')
        expect(response.status).toBe(200)
        expect(response.body).toHaveProperty('data')
        expect(response.body.data.id).toBe(1)
    })
}) 
describe('PUT /api/products/:id', ()=>{
    it('Should check a valid ID in the URL', async ()=>{
        const response  = await request(server)
                                        .put('/api/products/not-valid-url')
                                        .send({
                                            name : "Monitor curvo",
                                            availability : true,
                                            price : 300
                                        })
        expect(response.status).toBe(400)
        expect(response.body).toHaveProperty('errors')
        expect(response.body.errors).toHaveLength(1)
        expect(response.body.errors[0].msg).toBe('El id debe ser un número entero')
    })
    it('Should display validation error messages when updating a product', async()=>{
        const response = await request(server).put('/api/products/1').send({})
        expect(response.status).toBe(400)
        expect(response.body).toHaveProperty('errors')
        expect(response.body.errors).toBeTruthy()
        expect(response.body.errors).toHaveLength(6)

        expect(response.status).not.toBe(200)
        expect(response.body).not.toHaveProperty('data')
    })
    it('Should validate that the price is greater than 0', async()=>{
        const response = await request(server).put('/api/products/1').send({
            name : "Monitor curvo",
            availability : true,
            price : -300
        })
        expect(response.status).toBe(400)
        expect(response.body).toHaveProperty('errors')
        expect(response.body.errors[0].msg).toBe('El precio debe ser mayor a 0')
        expect(response.body.errors).toHaveLength(1)

        expect(response.status).not.toBe(200)
        expect(response.body).not.toHaveProperty('data')
    })
    it('Should return a 404 for a non-existent product', async()=>{
        const productId = 2000
        const response = await request(server).put(`/api/products/${productId}`).send({
            name : "Monitor curvo",
            availability : true,
            price : 300
        })
        expect(response.status).toBe(404)
        expect(response.body.message).toBe('Producto no encontrado')

        expect(response.status).not.toBe(200)
        expect(response.body).not.toHaveProperty('data')
    })
    it('Should update an existing product with valid data', async()=>{
        const response = await request(server).put('/api/products/1').send({
            name : "Monitor curvo",
            availability : true,
            price : 300
        })
        expect(response.status).toBe(200)
        expect(response.body).toHaveProperty('data')

        expect(response.status).not.toBe(400)
        expect(response.body).not.toHaveProperty('errors')
    })
})

describe('PATCH /api/products/:id',()=>{
    it('Should return a 404 response for a non-existing product',async()=>{
        const produtId = 2000
        const response = await request(server).patch(`/api/products/${produtId}`)

        expect(response.status).toBe(404)
        expect(response.body.message).toBe('Producto no encontrado')
    })
    it('Should update the product availability',async()=>{
        const response = await request(server).patch('/api/products/1')
        expect(response.status).toBe(200)
        expect(response.body).toHaveProperty('data')
        expect(response.body.data).toHaveProperty('availability')

    })
})

describe('DELETE /api/products/:id', ()=>{
    it('Should delete a product with specific ID',async()=>{
        const response = await request(server).delete('/api/products/1')
        expect(response.status).toBe(200)
        expect(response.body.message).toBe('Producto eliminado')

        expect(response.body).toHaveProperty('data')
        expect(response.status).not.toBe(404)
        expect(response.status).not.toBe(400)
    })
    it('Should check a valid ID', async ()=>{
        const response = await request(server).delete('/api/products/not-valid-id')
        expect(response.status).toBe(400)
        expect(response.body).toHaveProperty('errors')
        expect(response.body.errors[0].msg).toBe('El id debe ser un número entero')
    })
    it('Should return a 404 response for a non-existent product',async()=>{
        const productId = 2000
        const response = await request(server).delete(`/api/products/${productId}`)
        expect(response.status).toBe(404)
        expect(response.body.message).toBe('Producto no encontrado')

        expect(response.status).not.toBe(200)
    })
    
})