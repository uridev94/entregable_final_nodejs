const request = require("supertest");
const app = require("../app");

const BASE_URL = "/api/v1/users";

let TOKEN;

let userId



beforeAll(async () => {
    const body = {
        email: "pepepin@gmail.com",
        password: "pepito123",
    };

    const res = await request(app)
        .post(`${BASE_URL}/login`)
        .send(body);

        //    console.log(res.body) review the object through the console to verify what it is returning.

    TOKEN = res.body.token;


});

test("POST -> 'BASE_URL' should return statusCode 201 and res.body.firstName === user.firstName", async () => {

    const user = {
        firstName: "Jesus",
        lastName: "Carrasquilla",
        email: "jesus@gmail.com",
        password: "jesus1234",
        phone: "3424",
    };

    const res = await request(app)
    .post(BASE_URL)
    .send(user);

    userId = res.body.id


    expect(res.statusCode).toBe(201);
    expect(res.body).toBeDefined();
    expect(res.body.firstName).toBe(user.firstName);
});

test("GET -> 'BASE_URL' should return statusCode 200, and res.body.length === 2", async () => {
    const res = await request(app)
        .get(BASE_URL)
        .set('Authorization', `Bearer ${TOKEN}`);

    //console.log(res.body); // verifying if res.body is bringing back the user and the token.

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveLength(2);
});

test("PUT -> 'URL_BASE/:id', should return status code 200 and res.body.firstName === user.firstName", async()=>{

    const user = {
      firstName: "Leonel",
    }
  
    const res = await request(app)
      .put(`${BASE_URL}/${userId}`)
      .send(user)
      .set('Authorization', `Bearer ${TOKEN}`)
  
    expect(res.statusCode).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body.firstName).toBe(user.firstName)
});

test("POST ->'BASE_URL/login, should return statusCode 401", async () => {

    const body = {
        email: "jesus@gmail.com",
        password: "wrong",
    }

    const res = await request(app)
    .post(`${BASE_URL}/login`)
    .send(body)

    expect(res.statusCode).toBe(401)
});


test("POST -> 'BASE_URL/login, should return statusCode 200, res.body and res.body.token toBeDefined and res.body.user.email === body.email", async () => {
    

    const body = {
        email: "jesus@gmail.com",
        password: "jesus1234"
    }

    const res = await request(app)
        .post(`${BASE_URL}/login`)
        .send(body)


    // console.log(res.body.user) verifying the object's content to confirm we have user's data correctly

    expect(res.statusCode).toBe(200);
    expect(res.body).toBeDefined()
    expect(res.body.user).toBeDefined();
    expect(res.body.token).toBeDefined();
    expect(res.body.user.email).toBe(body.email);
});


test("DELETE -> 'URL_BASE/:id', should return status code 204", async () => {
    const res = await request(app)
    .delete(`${BASE_URL}/${userId}`)
    .set("Authorization", `Bearer ${TOKEN}`)
  
    expect(res.status).toBe(204)
  });