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
  await mongoose.connection.close();
  await mongoServer.stop();
});

describe("Give a endpoint POST /users/registers/ ", () => {
  describe("When receive json with userName 'Evarsito' and password 'queen' ", () => {
    test("Then it should response with status 201 and massage 'user created'w", async () => {
      const massage = "User successfully created";
      const { body } = await request(app)
        .post("/users/register")
        .send({ userName: "Evaristo", password: "queen" })
        .expect(201);

      expect(body).toHaveProperty("massage", massage);
    });
  });
});
