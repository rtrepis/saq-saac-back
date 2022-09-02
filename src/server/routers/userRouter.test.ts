import request from "supertest";
import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import connectDB from "../../database/connectDB";
import app from "..";

let mongoServer: MongoMemoryServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const mongoUrl = mongoServer.getUri();

  await connectDB(mongoUrl);
});

afterAll(async () => {
  mongoose.connection.close();
  await mongoServer.stop();
});

describe("Give a endpoint POST /users/registers/ ", () => {
  describe("When receive json with userName 'Evarsito' and password 'queen' ", () => {
    test("Then it should response with status 201 and massage 'user created'w", async () => {
      const massage = "User successfully created";
      const user = { userName: "Evaristo", password: "queen" };

      const { body } = await request(app)
        .post("/users/register")
        .send(user)
        .expect(201);

      expect(body).toHaveProperty("message", massage);
    });

    describe("When it receives a request without password", () => {
      test("Then it should response with status 400 and a message 'Wrong data'", async () => {
        const message = "User or password invalid";
        const user = {
          userName: "Evaristo",
          password: "",
        };

        const { body } = await request(app)
          .post("/users/register")
          .send(user)
          .expect(400);

        expect(body).toHaveProperty("error", message);
      });
    });
  });
});
