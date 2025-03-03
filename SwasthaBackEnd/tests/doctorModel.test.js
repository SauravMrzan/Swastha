const SequelizeMock = require("sequelize-mock");
const dbMock = new SequelizeMock();
const DoctorMock = dbMock.define("Doctor", {
  id: 1,
  doctorName: "Test Doctor",
  doctorEmail: "doctest@gmail.com",
  password: "DocTest@123",
  speciality: "General Physician",
  medicalID: "123456",
  dob: "1990-01-01",
  address: "Testing Avenue",
  experience: "5 years",
  phone: "9809809800",
  doctorImage: "test.jpg",
  availableDays: ["Monday", "Tuesday"],
  availableTime: ["10:00 AM", "11:00 AM"],
  type: "doctor",
});
describe("Doctor Model", () => {
  it("should create a doctor", async () => {
    const doctor = await DoctorMock.create({
        doctorName: "New Doctor",
        doctorEmail: "newdoc@gmail.com",
        password: "NewDoc@123",
        speciality: "General Physician",
        medicalID: "123451",
        dob: "1990-01-01",
        address: "Testing Avenue",
        experience: "5 years",
        phone: "9809809110",
        doctorImage: "new.jpg",
        availableDays: ["Monday", "Tuesday"],
        availableTime: ["10:00 AM", "11:00 AM"],
        type: "doctor",
      });

    expect(doctor.doctorName).toBe("New DOctor");
    expect(doctor.doctorEmail).toBe("newdoc@gmail.com");
    expect(doctor.password).toBe("NewDoc@123");
    expect(doctor.speciality).toBe("General Physician");
    expect(doctor.medicalID).toBe("123451");
    expect(doctor.dob).toBe("1990-01-01");
    expect(doctor.address).toBe("Testing Avenue");
    expect(doctor.experience).toBe("5 years");
    expect(doctor.phone).toBe("9809809110");
    expect(doctor.doctorImage).toBe("new.jpg");
    expect(doctor.availableDays).toEqual(["Monday", "Tuesday"]);
    expect(doctor.availableTime).toEqual(["10:00 AM", "11:00 AM"]);
    expect(doctor.type).toBe("doctor");
  });
    

  it("should require a doctor name and email", async () => {
    await expect(DoctorMock.create({})).rejects.toThrow();
  });
});
