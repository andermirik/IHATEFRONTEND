package ru.itmo.lab.model;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.*;
import ru.itmo.lab.enums.Mood;
import ru.itmo.lab.enums.WeaponType;

import javax.persistence.*;
import javax.validation.constraints.Max;
import java.time.Instant;
import java.util.Objects;

@Getter
@Setter
@ToString
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity
public class HumanBeing {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id", nullable = false)
    private Long id;

    @Column(name = "name", nullable = false)
    private String name;

    @ManyToOne(cascade=CascadeType.ALL)
    @JoinColumn(name = "coordinates_id", nullable = false)
    private Coordinates coordinates;

    @JsonFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss.SSSSSS'Z'", timezone = "UTC")
    @Column(name = "creationDate", nullable = false)
    private Instant creationDate;

    @Column(name = "realHero", nullable = false)
    private Boolean realHero;

    @Column(name = "hasToothpick")
    private boolean hasToothpick;

    @Max(759)
    @Column(name = "impactSpeed")
    private float impactSpeed;

    @Enumerated(EnumType.STRING)
    @Column(name = "weaponType", nullable = false)
    private WeaponType weaponType;

    @Enumerated(EnumType.STRING)
    @Column(name = "mood", nullable = false)
    private Mood mood;

    @ManyToOne(cascade=CascadeType.ALL)
    @JoinColumn(name = "car_id", nullable = false)
    private Car car;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        HumanBeing that = (HumanBeing) o;
        return id != null && Objects.equals(id, that.id);
    }

    @Override
    public int hashCode() {
        return getClass().hashCode();
    }

    @PrePersist
    void prePersist() {
        this.creationDate = Instant.now();
    }
}