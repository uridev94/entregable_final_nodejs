const request = require("supertest");
const app = require('../app');

let categoryId

const BASE_URL_LOG = '/api/v1/users';
const BASE_URL = '/api/v1/categories';

let TOKEN

beforeAll(async () => {
    const body = {
      email: "pepepin@gmail.com",
      password: "pepito123"
    };
  
    const res = await request(app)
    .post(`${BASE_URL_LOG}/login`)
    .send(body)
  
   TOKEN = res.body.token 
  
  //   console.log(res.body) review the object through the console to verify what it is returning.
  });


test("POST -> 'BASE_URL' should return status code 201, res.body toBeDefined and res.body.name === category.name", async () =>{

    const category = {
        name: 'Tech & gadgets'
    }


    const res = await request(app)
    .post(BASE_URL)
    .set('Authorization',`Bearer ${TOKEN}`)
    .send(category)

    categoryId = res.body.id

    expect(res.statusCode).toBe(201)
    expect(res.body).toBeDefined()
    expect(res.body.name).toBe(category.name)
});

test("GET -> 'BASE_URL' should return statusCode 200 and res.body[0].name === category[0].name", async()=>{
    const res = await request(app)
    .get(BASE_URL)

    expect(res.statusCode).toBe(200)
    expect(res.body).toBeDefined()
});


test("DELETE -> 'BASE_URL/:id' should return statusCode 204", async()=>{
    const res = await request(app)
    .delete(`${BASE_URL}/${categoryId}`)
    .set('Authorization', `Bearer ${TOKEN}`)
    

    expect(res.statusCode).toBe(204)
})