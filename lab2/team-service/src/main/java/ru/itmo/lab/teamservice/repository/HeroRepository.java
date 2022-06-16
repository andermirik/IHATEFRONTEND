package ru.itmo.lab.teamservice.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import ru.itmo.lab.teamservice.model.Hero;

public interface HeroRepository extends JpaRepository<Hero, Long> {

    void deleteHeroByTeamIdAndHeroId(Long teamId, Long heroId);

}
