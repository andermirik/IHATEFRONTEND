package ru.itmo.lab.teamservice.model;

import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
@Builder
public class TeamDto {
    Long id;
    String name;
    List<HeroDto> heroes;
}
