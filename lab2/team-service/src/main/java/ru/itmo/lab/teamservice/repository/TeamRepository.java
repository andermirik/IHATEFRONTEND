package ru.itmo.lab.teamservice.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import ru.itmo.lab.teamservice.model.Team;

public interface TeamRepository extends JpaRepository<Team, Long> {

    

}
