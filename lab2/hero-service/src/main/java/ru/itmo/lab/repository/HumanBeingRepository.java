package ru.itmo.lab.repository;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import ru.itmo.lab.model.HumanBeing;

import java.util.List;

public interface HumanBeingRepository extends CrudRepository<HumanBeing, Long> {
//    @Query(value = "SELECT * FROM HumanBeing  where impactSpeed > :impactSpeed", nativeQuery = true)
    List<HumanBeing> findHumanBeingByImpactSpeedIsGreaterThan(Float impactSpeed);

    List<HumanBeing> findAll();

    @Query(value = "SELECT DISTINCT ON(impactSpeed) * FROM HumanBeing  where impactSpeed = (select MAX(impactSpeed) from HumanBeing)", nativeQuery = true)
    HumanBeing findMax();
}