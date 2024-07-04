require('../models');
const request = require('supertest');
const app = require('../app');
const Product = require('../models/Product');


const BASE_URL = '/api/v1/cart';
const BASE_URL_LOG = '/api/v1/users'




let TOKEN
let cartItem
let cartProduct
let userId
let cart
let cartId
 

beforeAll(async () =>{

    const body = {
        email: "pepepin@gmail.com",
        password: "pepito123"
      };

    const res = await request(app)
    .post(`${BASE_URL_LOG}/login`)
    .send(body);

    TOKEN = res.body.token
    userId = res.body.user.id


    cartItem = {
        title: "Mac notebook pro 15",
        description: "Apple MacBook Pro 15 Retina Quad Core i7 16GB RAM 512GB SSD",
        price: 700
    }

    cartProduct = await Product.create(cartItem)

    cart = {
        quantity: 1,
        productId: cartProduct.id
    }


});


afterAll( async()=>{
    await cartProduct.destroy()
});


test("POST -> 'BASE_URL' should return statusCode 201 and res.body.quantity === cart.quantity", async()=>{

    const res = await request(app)
    .post(BASE_URL)
    .send(cart)
    .set('Authorization', `Bearer ${TOKEN}`)

    cartId = res.body.id

    expect(res.statusCode).toBe(201)
    expect(res.body).toBeDefined()
    expect(res.body.quantity).toBe(cart.quantity)
});

test("GET -> 'BASE_URL' should return statusCode 200 and res.body.length ===1, res.body toBeDefined and res.body[0].userId and res.body[0].productId === userId and productId", async()=>{
    const res = await request(app)
    .get(BASE_URL)
    .set('Authorization', `Bearer ${TOKEN}`)

    expect(res.statusCode).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body).toHaveLength(1)
    expect(res.body[0].userId).toBe(userId)
    expect(res.body[0].productId).toBe(cartProduct.id)
});


test("GET 'BASE_URL/:id' -> should return statusCode 200 and res.body.quantity === cart.quantity and res.body toBeDefined and res.body.productId === cartProduct.id", async()=>{
    const res = await request(app)
    .get(`${BASE_URL}/${cartId}`)
    .set('Authorization', `Bearer ${TOKEN}`)

    expect(res.statusCode).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body.quantity).toBe(cart.quantity)
    expect(res.body.productId).toBe(cartProduct.id)
});

test("PUT -> 'BASE_URL/:id shoud return statusCode 200 and res.body.quantity === cartUpdate.quantity", async()=>{
    const cartUpdate = {
        quantity: 3
    }

    const res = await request(app)
    .put(`${BASE_URL}/${cartId}`)
    .send(cartUpdate)
    .set('Authorization', `Bearer ${TOKEN}`)

    expect(res.statusCode).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body.quantity).toBe(cartUpdate.quantity)

});

test("DELETE -> 'BASE_URL/:id' should return statusCode 204", async () =>{
    const res = await request(app)
    .delete(`${BASE_URL}/${cartId}`)
    .set('Authorization', `Bearer ${TOKEN}`)

    expect(res.statusCode).toBe(204)
});





