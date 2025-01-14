package backend.business;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import backend.model.Planta;

@Repository
public interface PlantaRepository extends CrudRepository<Planta, Integer> {
    @Query("SELECT SUM(p.cantLecturasOK) FROM Planta p")
    Integer getLecturasOK();

    @Query("SELECT SUM(p.cantAlertasMedias) FROM Planta p")
    Integer getAlertasMedias();

    @Query("SELECT SUM(p.cantAlertasRojas) FROM Planta p")
    Integer getAlertasRojas();
}