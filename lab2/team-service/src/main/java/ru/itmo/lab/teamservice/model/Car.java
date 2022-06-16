package ru.itmo.lab.teamservice.model;

import lombok.Data;
import lombok.RequiredArgsConstructor;

@Data
@RequiredArgsConstructor
public class Car {
    private Long id;

    private String name;
}