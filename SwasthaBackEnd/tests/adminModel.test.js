const SequelizeMock = require("sequelize-mock");
const dbMock = new SequelizeMock();

const AdminMock = dbMock.define("Admin", {
  id: 1,
  adminName: "Test Admin",
  adminEmail: "testadmin@gmail.com",
  password: "Admin@123",
  contact: "9809809111",
  type: "admin",
});

describe("Admin Model", () => {
  it("should create a admin", async () => {
    const admin = await AdminMock.create({
        adminName: "New Admin",
        adminEmail: "newadmin@gmail.com",
        password: "NewAdmin@123",
        contact: "9809809110",
        type: "admin",
    });

    expect(admin.adminName).toBe("New Admin");
    expect(admin.adminEmail).toBe("newadmin@gmail.com");
    expect(admin.password).toBe("NewAdmin@123");
    expect(admin.contact).toBe("9809809110");
    expect(admin.type).toBe("admin");
  });

  it("should require a admin name and  admin email", async () => {
    await expect(AdminMock.create({})).rejects.toThrow();
  });
});
