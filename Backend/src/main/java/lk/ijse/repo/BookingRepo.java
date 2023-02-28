package lk.ijse.repo;

import lk.ijse.dto.BookingDTO;
import lk.ijse.entity.Booking;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BookingRepo extends JpaRepository<Booking, String> {
    BookingDTO getBookingByBookingID(String id);
}
