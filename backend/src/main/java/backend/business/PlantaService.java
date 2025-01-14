package backend.business;

import java.util.ArrayList;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import backend.model.EstadisticaPlantasDTO;
import backend.model.Planta;
import jakarta.transaction.Transactional;

@Service
public class PlantaService {

    @Autowired
    PlantaRepository repository;

    public List<Planta> findAll() {
        List<Planta> result = new ArrayList<>();
        repository.findAll().forEach(e -> result.add(e));
        return result;
    }

    public Planta findById(int id) {
        return repository.findById(id).orElse(null);
    }

    @Transactional
    public Planta save(Planta planta) {
        return repository.save(planta);
    }

    @Transactional
    public Planta delete(int id) {
        Planta planta = findById(id);
        if (planta != null)
            repository.delete(planta);

        return planta;
    }

    @Transactional
    public EstadisticaPlantasDTO getEstadisticas() {
        int lecturasOK = repository.getLecturasOK();
        int alertasMedias = repository.getAlertasMedias();
        int alertasRojas = repository.getAlertasRojas();
        return new EstadisticaPlantasDTO(lecturasOK, alertasMedias, alertasRojas, 0);
    }

}