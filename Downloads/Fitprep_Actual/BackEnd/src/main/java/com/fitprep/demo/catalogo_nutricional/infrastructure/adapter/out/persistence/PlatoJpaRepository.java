package com.fitprep.demo.catalogo_nutricional.infrastructure.adapter.out.persistence;

import org.springframework.data.jpa.repository.JpaRepository;

import org.springframework.data.jpa.repository.Query;
import java.util.List;

/**
 * Repositorio Spring Data sobre la entidad JPA. Detalle de infraestructura.
 */
interface PlatoJpaRepository extends JpaRepository<PlatoEntity, Long> {
    
    @Query(value = "SELECT * FROM plato WHERE disponible = true", nativeQuery = true)
    List<PlatoEntity> findAllCrossTenant();
}
