package lk.ijse.repo;

import lk.ijse.entity.Vehicle;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface VehicleRepo extends JpaRepository<Vehicle,String> {
    @Query(value = "SELECT vehicleId FROM vehicle ORDER BY vehicleId DESC LIMIT 1", nativeQuery = true)
    String generateVehicleId();

}
