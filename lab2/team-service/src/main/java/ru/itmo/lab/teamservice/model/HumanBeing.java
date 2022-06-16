package ru.itmo.lab.teamservice.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import ru.itmo.lab.teamservice.enums.Mood;
import ru.itmo.lab.teamservice.enums.WeaponType;

import java.time.Instant;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class HumanBeing {
    private Long id;
    private String name;
    private Coordinates coordinates;
    private Instant creationDate;

    private Boolean realHero;

    private boolean hasToothpick;

    private float impactSpeed;

    private WeaponType weaponType;

    private Mood mood;

    private Car car;
}
