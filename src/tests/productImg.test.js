const request = require("supertest");
const app = require('../app')
const path = require('path')

const BASE_URL = '/api/v1/product_images'
const BASE_URL_LOG='/api/v1/users'

let TOKEN
let imageId



beforeAll( async () => {
    const body = {
        email: "pepepin@gmail.com",
        password: "pepito123",
    }

    const res = await request(app)
        .post(`${BASE_URL_LOG}/login`)
        .send(body);


    TOKEN = res.body.token;
    

});


test("POST -> 'BASE_URL' should return statusCode 201, res.body.url, res.body.filename toBeDefined", async () =>{

    const localImage = path.join(__dirname, 'createData', 'imageTest.jpg')

    const res = await request(app)
    .post(BASE_URL)
    .set('Authorization', `Bearer ${TOKEN}`)
    .attach('image', localImage)

    imageId = res.body.id

    expect(res.statusCode).toBe(201)
    expect(res.body.url).toBeDefined()
    expect(res.body.filename).toBeDefined()
})


test("DELETE -> 'BASE_URL' should return statusCode 204", async()=>{
    const res = await request(app)
    .delete(`${BASE_URL}/${imageId}`)
    .set('Authorization', `Bearer ${TOKEN}`)

    expect(res.statusCode).toBe(204)

})