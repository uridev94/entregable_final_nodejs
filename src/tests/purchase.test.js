require("../models")
const request = require("supertest");
const app = require("../app");
const Product = require("../models/Product");

const BASE_URL_LOG = '/api/v1/users'
const BASE_URL = '/api/v1/purchase'


let TOKEN
let userId
let productItem
let product
let finalCart



beforeAll(async ()=>{

    const body = {
        email: "pepepin@gmail.com",
        password: "pepito123",
    };

    const res = await request(app)
        .post(`${BASE_URL_LOG}/login`)
        .send(body)


        TOKEN = res.body.token
        userId = res.body.user.id 

        productItem = {
            title: "Echo dot",
            description: "Echo Dot (5.ª generation 2022) | speaker  wifi and Bluetooth with Alexa | color Blue",
            price: 65
        }

    product = await Product.create(productItem)


    finalCart = {
        quantity: 1,
        productId: product.id,
        userId: res.body.user.id
    }

    await request(app)
    .post('/api/v1/cart')
    .send(finalCart)
    .set("Authorization", `Bearer ${TOKEN}`)

})

afterAll( async()=> {
    await product.destroy()

});


test("POST -> 'BASE_URL' should return statusCode 201 and res.body toBeDefined finalCart", async()=>{
    const res = await request(app)
    .post(BASE_URL)
    .set('Authorization', `Bearer ${TOKEN}`)
    // .send(finalCart)

    // console.log(res.body)
    expect(res.statusCode).toBe(201)
    expect(res.body).toBeDefined()
    expect(res.body).toBe(finalCart.quantity)
});


test("GET -> 'BASE_URL' should return statusCode 200 and res.body.length === 1", async () => {

    const res = await request(app)
      .get(BASE_URL)
      .set("Authorization", `Bearer ${TOKEN}`)
  
    expect(res.status).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body).toHaveLength(1)

    // console.log(res.body)
  
    expect(res.body[0].userId).toBeDefined()
    expect(res.body[0].userId).toBe(userId)
  
    expect(res.body[0].product).toBeDefined()
    expect(res.body[0].productId).toBe(product.id)
  
  })




