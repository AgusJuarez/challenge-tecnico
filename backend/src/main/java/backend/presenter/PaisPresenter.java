package backend.presenter;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import backend.Response;
import backend.business.PaisService;
import backend.model.Pais;

@RestController
@RequestMapping("pais")
@CrossOrigin(origins = { "http://localhost:4200" })
public class PaisPresenter {

    @Autowired
    PaisService service;

    @RequestMapping(method = RequestMethod.GET)
    public ResponseEntity<Object> findAll() {
        return Response.ok(service.findAll());
    }

    @RequestMapping(value = "/id/{id}", method = RequestMethod.GET)
    public ResponseEntity<Object> findById(@PathVariable("id") int id) {
        Pais paisOrNull = service.findById(id);
        return (paisOrNull != null) ? Response.ok(paisOrNull)
                : Response.notFound("Pais con ID " + id + " no encontrada.");
    }

    @RequestMapping(method = RequestMethod.PUT)
    public ResponseEntity<Object> update(@RequestBody Pais pais) {
        if (pais.getId() == 0) {
            return Response.error("pais no existe, imposible modificar");
        }
        return Response.ok(service.save(pais), "Datos de pais actualizada correctamente");

    }

    @RequestMapping(method = RequestMethod.POST)
    public ResponseEntity<Object> create(@RequestBody Pais pais) {
        try {
            return Response.ok(service.save(pais),
                    pais.getNombre() + " de " + pais.getNombre() + " ingresado/a correctamente");
        } catch (DataIntegrityViolationException e) {
            return Response.response(HttpStatus.CONFLICT, "La pais con el id " + pais.getId()
                    + " ya existe", null);
        }
    }

    @RequestMapping(value = "/id/{id}", method = RequestMethod.DELETE)
    public ResponseEntity<Object> delete(@PathVariable("id") int id) {
        Pais aPaisOrNull = service.findById(id);
        return (aPaisOrNull != null) ? Response.ok(service.delete(id), "pais eliminada exitosamente.")
                : Response.notFound("No se puede eliminar.");
    }

    @RequestMapping(value = "/search/{term}", method = RequestMethod.GET)
    public ResponseEntity<Object> search(@PathVariable("term") String term) {
        return Response.ok(service.search(term));
    }

}