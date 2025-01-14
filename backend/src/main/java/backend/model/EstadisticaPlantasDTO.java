package backend.model;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class EstadisticaPlantasDTO {

    public EstadisticaPlantasDTO(int lecturasOK, int alertasMedias, int alertasRojas, int sensoresDeshabilitados) {
        this.cantLecturasOK = lecturasOK;
        this.cantAlertasMedias = alertasMedias;
        this.cantAlertasRojas = alertasRojas;
        this.cantSensoresDeshabilitados = sensoresDeshabilitados;
    }

    private int cantLecturasOK;
    private int cantAlertasMedias;
    private int cantAlertasRojas;
    private int cantSensoresDeshabilitados;
}