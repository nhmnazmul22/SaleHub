import { clearDB, closeTestDB, connectTestDB } from "@/tests/test.db";

// Define all env
process.env.BASE_URL = "http://localhost:3000/api";

beforeAll(async () => {
  await connectTestDB();
});

afterEach(async () => {
  await clearDB();
});

afterAll(async () => {
  await closeTestDB();
});
