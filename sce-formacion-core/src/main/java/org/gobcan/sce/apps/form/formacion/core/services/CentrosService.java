package org.gobcan.sce.apps.form.formacion.core.services;

import java.util.List;
import java.util.stream.Collectors;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;

import org.gobcan.sce.apps.form.formacion.data.dto.BusquedaCentrosDto;
import org.gobcan.sce.apps.form.formacion.data.dto.CentrosDto;
import org.gobcan.sce.apps.form.formacion.data.dto.DetalleCentrosDto;
import org.gobcan.sce.apps.form.formacion.core.utils.SceBeanUtils;
import org.gobcan.sce.apps.form.formacion.core.utils.ScePageUtils;
import org.gobcan.sce.apps.form.formacion.data.entities.Centros;
import org.gobcan.sce.apps.form.formacion.data.repositories.CentrosRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.querydsl.core.types.ExpressionUtils;
import com.querydsl.core.types.Predicate;
import com.querydsl.jpa.JPAExpressions;

@Service
public class CentrosService {
    @Autowired
    private CentrosRepository repository;

    @PersistenceContext
    private EntityManager entityManager;

    public CentrosService() {
    }

    public List<BusquedaCentrosDto> searchCentros(String nif, String nombre) {
        String sql = "SELECT Tnif.nif, SUBSTR(Tdenominacion.denominacion, 1, 65) " +
                     "FROM (SELECT DISTINCT vc.nif FROM cursos_icfem.vicfemcentros vc " +
                     "WHERE (:nif IS NULL OR vc.nif LIKE :nif) " +
                     "AND (:nombre IS NULL OR vc.denominacion LIKE :nombre) " +
                     "AND vc.tipo = 'C') Tnif, " +
                     "(SELECT v2.nif, min(posicion) as posicion FROM (SELECT v1.*, rownum as posicion FROM " +
                     "(SELECT vc.nif, vc.denominacion FROM cursos_icfem.vicfemcentros vc " +
                     "ORDER BY vc.nif, nlssort(vc.centro, 'NLS_SORT=spanish')) v1) v2 " +
                     "GROUP BY v2.nif) Tposicion, " +
                     "(SELECT v1.*, rownum as posicion FROM (SELECT vc.nif, vc.denominacion " +
                     "FROM cursos_icfem.vicfemcentros vc ORDER BY vc.nif, nlssort(vc.centro, 'NLS_SORT=spanish')) v1) Tdenominacion " +
                     "WHERE Tnif.nif = Tposicion.nif AND Tposicion.posicion = Tdenominacion.posicion " +
                     "ORDER BY SUBSTR(Tdenominacion.denominacion, 1, 65)";

        Query query = entityManager.createNativeQuery(sql);
        query.setParameter("nif", nif == null ? null : "%" + nif + "%");
        query.setParameter("nombre", nombre == null ? null : "%" + nombre + "%");

        List<Object[]> results = query.getResultList();
        return results.stream().map(result -> {
            BusquedaCentrosDto dto = new BusquedaCentrosDto();
            dto.setNif((String) result[0]);
            dto.setDenominacion((String) result[1]);
            return dto;
        }).collect(Collectors.toList());
    }

    public DetalleCentrosDto getCentroDetailByNif(String nif) {
        String sql = "SELECT c.NIF AS \"Nº CIF/NIF/NIE\", c.DENOMINACION AS \"RAZON SOCIAL\", " +
                     "c.NOMBRE_COMERCIAL AS \"NOMBRE COMERCIAL\", c.DOMICILIO_NOT ||', '|| c.CODPOSTAL_NOT AS \"DOMICILIO DE NOTIFICACIÓN\", " +
                     "c.TELEFONO, c.FAX, c.CORREO, c.CENTRO as \"Nº de inscripción\", c.CODMUNI " +
                     "FROM cursos_icfem.VICFEMCENTROS c WHERE c.nif = :nif";
        
        Query query = entityManager.createNativeQuery(sql);
        query.setParameter("nif", nif);

        Object[] result = (Object[]) query.getSingleResult();
        DetalleCentrosDto dto = new DetalleCentrosDto();
        dto.setNif((String) result[0]);
        dto.setRazonSocial((String) result[1]);
        dto.setNombreComercial((String) result[2]);
        dto.setDomicilioNotificacion((String) result[3]);
        dto.setTelefono((String) result[4]);
        dto.setFax((String) result[5]);
        dto.setCorreo((String) result[6]);
        dto.setNumeroInscripcion((String) result[7]);
        dto.setCodmuni((String) result[8]);

        return dto;
    }
}
