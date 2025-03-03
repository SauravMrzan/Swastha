const SequelizeMock = require("sequelize-mock");
const dbMock = new SequelizeMock();

const BookingMock = dbMock.define("User", {
  bookingId: 1,
  userId: 1,
  doctorId: 1,
  date: "Monday",
  startTime: "10:00 AM",
});

describe("Booking Model", () => {
  it("should create a booking", async () => {
    const booking = await BookingMock.create({
        userId: 2,
  doctorId: 2,
  date: "Tuesday",
  startTime: "10:00 AM",
});

    expect(booking.userId).toBe(2);
    expect(booking.doctorId).toBe(2);
    expect(booking.date).toBe("Tuesday");
    expect(booking.startTime).toBe("10:00 AM");
    
  });

  it("should require a date and startTime", async () => {
    await expect(BookingMock.create({})).rejects.toThrow();
  });
});
