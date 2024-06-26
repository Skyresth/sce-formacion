package org.gobcan.sce.apps.form.formacion.data.repositories;

import java.util.List;

import org.gobcan.sce.apps.form.formacion.data.entities.Centros;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.querydsl.QueryDslPredicateExecutor;
import org.springframework.stereotype.Repository;

@Repository
public interface CentrosRepository extends JpaRepository<Centros, String>, QueryDslPredicateExecutor<Centros>, JpaSpecificationExecutor<Centros> {
    public List<Centros> findByNif(String nif);
}
