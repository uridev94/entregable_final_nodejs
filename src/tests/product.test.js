require('../models')
const request = require("supertest");
const app = require('../app');
const Category = require("../models/Category");


const BASE_URL_LOG = '/api/v1/users'
const BASE_URL = '/api/v1/products'

let category
let productId
let product


beforeAll(async () => {
    const body = {
        email: "pepepin@gmail.com",
        password: "pepito123",
    };

    const res = await request(app)
        .post(`${BASE_URL_LOG}/login`)
        .send(body);


    TOKEN = res.body.token;
    
    const categBody = {
        name: "Professional sound"
    }


    
    category = await Category.create(categBody)

    product = {
        title: 'Bose speaker',
        description: 'Inalambric speaker, stereo sound, bluetooth and usb port',
        price: 120,
        categoryId: category.id
    };

});


afterAll( async()=>{
    await category.destroy()
});





test("POST -> 'BASE_URL' should return statusCode 201, res.body toBeDefined and as a protected route should pass test for authorization", async()=>{

    const res = await request(app)
    .post(BASE_URL)
    .send(product)
    .set('Authorization', `Bearer ${TOKEN}`)

    console.log(res.body)

    productId = res.body.id

    expect(res.statusCode).toBe(201)
    expect(res.body).toBeDefined()
    expect(res.body.title).toBe(product.title)

});

test("GET -> 'BASE_URL should return statusCode 200, res.body toBeDefined and res.body[0].title === product[0].title'", async()=>{
    const res = await request(app)

    .get(BASE_URL)

    expect(res.statusCode).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body).toHaveLength(1)
});



test("GETONE -> 'BASE_URL/:id', should return status code 200 and res.body.title === product.title, res.body.description === product description, res.body.categoryId === product.categoryId, res.body.price === product.price", async()=>{

    const res = await request(app)
    .get(`${BASE_URL}/${productId}`)

    // console.log(res.body)

    expect(res.statusCode).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body.title).toBe(product.title)
    expect(res.body.description).toBe(product.description)
    expect(res.body.categoryId).toBe(product.categoryId)
    expect(res.body.price).toBe(product.price)
});

test("PUT -> 'BASE_URL/:id' should return statusCode 200, res.body toBeDefined and res.body.title === productUpdate.title", async()=>{

    const productUpdate = {
        title: 'JBL speaker'
    }

    const res = await request(app)
    .put(`${BASE_URL}/${productId}`)
    .send(productUpdate)
    .set('Authorization', `Bearer ${TOKEN}`)

    expect(res.statusCode).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body.title).toBe(productUpdate.title)

});


test("DELELTE -> 'BASE_URL/:id', should return status code 204", async()=>{

    const res = await request(app)
    .delete(`${BASE_URL}/${productId}`)
    .set('Authorization', `Bearer ${TOKEN}`)

    expect(res.statusCode).toBe(204)
});
