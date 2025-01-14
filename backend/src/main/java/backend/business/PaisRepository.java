package backend.business;

import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import backend.model.Pais;

@Repository
public interface PaisRepository extends CrudRepository<Pais, Integer> {
    @Query("SELECT e FROM Pais e WHERE UPPER(e.nombre) LIKE ?1")
    List<Pais> search(String string);

}