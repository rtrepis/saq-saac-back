import request from "supertest";
import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import connectDB from "../../database/connectDB";
import app from "..";
import { hashCreator } from "../../utils/auth";
import User from "../../database/models/User";

let mongoServer: MongoMemoryServer;

const userDB = {
  userName: "TestUser",
  password: "Validate",
};

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const mongoUrl = mongoServer.getUri();
  await connectDB(mongoUrl);

  userDB.password = await hashCreator(userDB.password);
  await User.create(userDB);
});

afterAll(async () => {
  mongoose.connection.close();
  await mongoServer.stop();
});

describe("Give a endpoint POST /users/register/ ", () => {
  describe("When receive json with userName 'Evarsito' and password 'queen' ", () => {
    test("Then it should response with status 201 and massage 'user created'", async () => {
      const massage = "User successfully created";
      const userRegister = { userName: "Evaristo", password: "queen" };

      const { body } = await request(app)
        .post("/users/register")
        .send(userRegister)
        .expect(201);

      expect(body).toHaveProperty("message", massage);
    });

    describe("When it receives a request without password", () => {
      test("Then it should response with status 400 and a message 'Wrong data'", async () => {
        const message = "User or password invalid";
        const userRegister = {
          userName: "Evaristo",
          password: "",
        };

        const { body } = await request(app)
          .post("/users/register")
          .send(userRegister)
          .expect(400);

        expect(body).toHaveProperty("error", message);
      });
    });
  });
});

describe("Give a endpoint POST /users/login/ ", () => {
  describe("When receive json with userName 'TestUser' and password 'Validate' ", () => {
    test("Then it should response with status code 200", async () => {
      const userLogin = {
        userName: "TestUser",
        password: "Validate",
      };
      const expectStatusCode = 200;

      await request(app)
        .post("/users/login")
        .send(userLogin)
        .expect(expectStatusCode);
    });
  });
  describe("When receive json with userName 'TestUser' and password 'Invalidate' ", () => {
    test("Then it should response with code status 403 forbidden", async () => {
      const userLogin = {
        userName: "TestUser",
        password: "Invalidate",
      };
      const expectStatusCode = 403;

      await request(app)
        .post("/users/login")
        .send(userLogin)
        .expect(expectStatusCode);
    });
  });
  describe("When receive json with userName 'NotDBUser' ", () => {
    test("Then it should response with code status 400 bad request", async () => {
      const userLogin = {
        userName: "NotDBUser",
        password: "",
      };
      const expectStatusCode = 400;

      await request(app)
        .post("/users/login")
        .send(userLogin)
        .expect(expectStatusCode);
    });
  });
});
