package backend.business;

import java.util.ArrayList;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import backend.model.Pais;
import jakarta.transaction.Transactional;

@Service
public class PaisService {

    @Autowired
    PaisRepository repository;

    public List<Pais> findAll() {
        List<Pais> result = new ArrayList<>();
        repository.findAll().forEach(e -> result.add(e));
        return result;
    }

    public Pais findById(int id) {
        return repository.findById(id).orElse(null);
    }

    @Transactional
    public Pais save(Pais pais) {
        return repository.save(pais);
    }

    @Transactional
    public Pais delete(int id) {
        Pais pais = findById(id);
        if (pais != null)
            repository.delete(pais);

        return pais;
    }

    public List<Pais> search(String term) {
        return repository.search("%" + term.toUpperCase() + "%");
    }

}