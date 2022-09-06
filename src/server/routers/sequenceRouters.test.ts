import request from "supertest";
import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import connectDB from "../../database/connectDB";
import app from "..";
import Sequence from "../../database/models/Sequence";

let mongoServer: MongoMemoryServer;

const sequenceDB = {
  name: "Rentar mans",
  pictograms: [11737, 8975, 35729, 2443, 11739],
};

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const mongoUrl = mongoServer.getUri();

  Sequence.create(sequenceDB);
  await connectDB(mongoUrl);
});

afterAll(async () => {
  Sequence.deleteMany();
  await mongoose.connection.close();
  await mongoServer.stop();
});

describe("Give a endpoint GET /sequences/ ", () => {
  describe("When receive a request", () => {
    test("Then it should response with status 200 and json", async () => {
      const { body } = await request(app).get("/sequences/").expect(200);

      expect(body);
    });
  });
});
