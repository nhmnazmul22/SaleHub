import { GET, POST } from "@/app/api/branches/route";
import BranchModel from "@/features/branch/server/branch.model";
import { NextRequest } from "next/server";

/**
 * @Test Admin can get all branch
 */
describe("Branch Feature Test: /api/branches", () => {
  it("Should return all branches", async () => {
    // Arrange
    await BranchModel.create([
      { name: "Main Branch", address: "Dhaka", isActive: true },
      { name: "Second Branch", address: "CTG", isActive: true },
    ]);

    // Act
    const res = await GET();
    const data = await res.json();

    // Assert
    expect(res.status).toBe(200);
    expect(data.success).toBe(true);
    expect(Array.isArray(data.data)).toBe(true);
  });

  it("Can create a new branch", async () => {
    // Arrange
    const payload = {
      name: "Rajsahi Branch",
      address: "Rajsahi, Bangladesh",
      phone: "01604017164",
      email: "branch.cumilla@example.com",
      contactPerson: "Md. Maleh",
    };

    // Act
    const req = new Request(`${process.env.BASE_URL}/branches`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(payload),
    });
    const res = await POST(req as NextRequest);
    const data = await res.json();

    // Assert
    expect(res.status).toBe(201);
    expect(data.success).toBe(true);
    expect(data.data.name).toBe(payload.name);
  });

  it("should fail when name is missing", async () => {
    const req = new Request("http://test/branches", {
      method: "POST",
      body: JSON.stringify({}),
    });

    const res = await POST(req as NextRequest);

    expect(res.status).toBe(422);
  });
});
