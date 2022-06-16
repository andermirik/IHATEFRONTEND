package ru.itmo.lab.teamservice.model;

import lombok.Data;
import lombok.RequiredArgsConstructor;

@Data
@RequiredArgsConstructor
public class Coordinates {
    private Long id;

    private long x;
    private double y;
}
