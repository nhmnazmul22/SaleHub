import { GET } from "@/app/api/branches/route";
import BranchModel from "@/features/branch/server/branch.model";

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
});
