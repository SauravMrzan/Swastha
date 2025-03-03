const SequelizeMock = require("sequelize-mock");
const dbMock = new SequelizeMock();

const UserMock = dbMock.define("User", {
  id: 1,
  username: "Test User",
  email: "test@gmail.com",
  phone: "9809809800",
  address: "Testing Avenue",
  password: "Test@123",
  type: "user",
});

describe("User Model", () => {
  it("should create a user", async () => {
    const user = await UserMock.create({
        username: "New User",
        email: "new@gmail.com",
        phone: "9809809810",
        address: "Testing Avenue",
        password: "User@123",
        type: "user",
    });

    expect(user.username).toBe("New User");
    expect(user.email).toBe("new@gmail.com");
    expect(user.phone).toBe("9809809810");
    expect(user.address).toBe("Testing Avenue");
    expect(user.password).toBe("User@123"); 
    expect(user.type).toBe("user");
  });

  it("should require a username and email", async () => {
    await expect(UserMock.create({})).rejects.toThrow();
  });
});
