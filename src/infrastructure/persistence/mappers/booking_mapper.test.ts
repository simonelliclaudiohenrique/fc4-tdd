import { Booking } from "../../../domain/entities/booking";
import { Property } from "../../../domain/entities/property";
import { User } from "../../../domain/entities/user";
import { DateRange } from "../../../domain/value_objects/date_range";
import { BookingEntity } from "../entities/booking_entity";
import { BookingMapper } from "./booking_mapper";

describe("BookingMapper", () => {
  it("deve converter BookingEntity para Booking", () => {
    const booKingEntity = new BookingEntity();

    booKingEntity.id = "1";
    booKingEntity.property = {
      id: "1",
      name: "Casa na Praia",
      description: "Vista para o mar",
      maxGuests: 6,
      basePricePerNight: 200,
      bookings: [],
    };
    booKingEntity.guest = { id: "1", name: "Son Goku" };
    booKingEntity.startDate = new Date("2025-02-17");
    booKingEntity.endDate = new Date("2025-02-24");
    booKingEntity.guestCount = 2;
    booKingEntity.totalPrice = 400;
    booKingEntity.status = "CONFIRMED";

    const booking = BookingMapper.toDomain(booKingEntity);

    expect(booking.getId()).toBe("1");
    expect(booking.getGuest().getId()).toBe("1");
    expect(booking.getDateRange().getStartDate()).toEqual(
      new Date("2025-02-17")
    );
    expect(booking.getDateRange().getEndDate()).toEqual(new Date("2025-02-24"));
    expect(booking.getGuestCount()).toBe(2);
    expect(booking.getTotalPrice()).toBe(400);
    expect(booking.getStatus()).toBe("CONFIRMED");
  });

  it("deve converter Booking para BookingEntity", () => {
    const booking = new Booking(
      "1",
      new Property("1", "Casa na Praia", "Vista para o mar", 6, 200),
      new User("1", "Son Goku"),
      new DateRange(new Date("2025-02-17"), new Date("2025-02-24")),
      2
    );

    booking["totalPrice"] = 400;
    booking["status"] = "CONFIRMED";

    const bookingEntity = BookingMapper.toPersistence(booking);

    expect(bookingEntity.id).toBe("1");
    expect(bookingEntity.property.id).toBe("1");
    expect(bookingEntity.guest.id).toBe("1");
    expect(bookingEntity.startDate).toEqual(new Date("2025-02-17"));
    expect(bookingEntity.endDate).toEqual(new Date("2025-02-24"));
    expect(bookingEntity.guestCount).toBe(2);
    expect(bookingEntity.totalPrice).toBe(400);
    expect(bookingEntity.status).toBe("CONFIRMED");
  });

  it("deve lançar erro de validação ao faltar campos obrigatórios no BookingEntity", () => {
    const incompleteEntity: Partial<BookingEntity> = {
      id: "1",
      startDate: new Date("2025-01-01"),
      endDate: new Date("2025-01-07"),
      guestCount: 2,
    };

    expect(() =>
      BookingMapper.toDomain(incompleteEntity as BookingEntity)
    ).toThrow("Campos obrigatórios ausentes em BookingEntity");
  });
});
