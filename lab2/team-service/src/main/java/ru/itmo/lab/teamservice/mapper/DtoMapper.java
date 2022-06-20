package ru.itmo.lab.teamservice.mapper;

import org.springframework.stereotype.Service;
import ru.itmo.lab.teamservice.model.Hero;
import ru.itmo.lab.teamservice.model.HeroDto;
import ru.itmo.lab.teamservice.model.Team;
import ru.itmo.lab.teamservice.model.TeamDto;

import java.util.stream.Collectors;

@Service
public class DtoMapper {

    public TeamDto toDto(Team team) {
        if(team == null) return null;

        if(team.getHeroes() == null)
            return TeamDto.builder()
                    .id(team.getId())
                    .name(team.getName())
                    .build();

        return TeamDto.builder()
                .id(team.getId())
                .name(team.getName())
                .heroes(team.getHeroes().stream().map(this::toDto).collect(Collectors.toList()))
                .build();
    }

    public HeroDto toDto(Hero hero) {
        if(hero == null) return null;
        return HeroDto.builder()
                .id(hero.getHeroId())
                .build();
    }

}
