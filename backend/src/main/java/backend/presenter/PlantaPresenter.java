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
import backend.business.PlantaService;
import backend.model.EstadisticaPlantasDTO;
import backend.model.Planta;

@RestController
@RequestMapping("/plantas")
@CrossOrigin(origins = { "http://localhost:4200" })
public class PlantaPresenter {

    @Autowired
    PlantaService service;

    @RequestMapping(method = RequestMethod.GET)
    public ResponseEntity<Object> findAll() {
        return Response.ok(service.findAll());
    }

    @RequestMapping(value = "/id/{id}", method = RequestMethod.GET)
    public ResponseEntity<Object> findById(@PathVariable("id") int id) {
        Planta plantaOrNull = service.findById(id);
        return (plantaOrNull != null) ? Response.ok(plantaOrNull)
                : Response.notFound("Planta con ID " + id + " no encontrada.");
    }

    @RequestMapping(method = RequestMethod.PUT)
    public ResponseEntity<Object> update(@RequestBody Planta planta) {
        if (planta.getId() == 0) {
            return Response.error("Planta no existe, imposible modificar");
        }
        return Response.ok(service.save(planta), "Datos de planta actualizada correctamente");

    }

    @RequestMapping(method = RequestMethod.POST)
    public ResponseEntity<Object> create(@RequestBody Planta planta) {
        try {
            return Response.ok(service.save(planta),
                    planta.getNombre() + " de " + planta.getPais().getNombre() + " ingresado/a correctamente");
        } catch (DataIntegrityViolationException e) {
            return Response.response(HttpStatus.CONFLICT, "La planta con el id " + planta.getId()
                    + " ya existe", null);
        }
    }

    @RequestMapping(value = "/id/{id}", method = RequestMethod.DELETE)
    public ResponseEntity<Object> delete(@PathVariable("id") int id) {
        Planta aPlantaOrNull = service.findById(id);
        return (aPlantaOrNull != null) ? Response.ok(service.delete(id), "Planta eliminada exitosamente.")
                : Response.notFound("No se puede eliminar.");
    }

    @RequestMapping(value = "/estadisticas", method = RequestMethod.GET)
    public ResponseEntity<Object> getEstadisticas() {
        EstadisticaPlantasDTO estadisticas = service.getEstadisticas();
        return (estadisticas != null) ? Response.ok(estadisticas)
                : Response.error("Error al obtener estadisticas.");
    }

}