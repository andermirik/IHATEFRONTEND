package ru.itmo.lab.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ru.itmo.lab.dao.HumanBeingDao;
import ru.itmo.lab.enums.Mood;
import ru.itmo.lab.enums.WeaponType;
import ru.itmo.lab.model.Car;
import ru.itmo.lab.model.Coordinates;
import ru.itmo.lab.model.HumanBeing;

import javax.persistence.EntityNotFoundException;
import java.util.List;

@RestController
@RequestMapping(value = "/human", consumes = "application/json", produces = "application/json")
public class HumanBeingController {

    @Autowired
    private HumanBeingDao humanBeingDao;

    @GetMapping
    public ResponseEntity<List<HumanBeing>> findAll() {
        return ResponseEntity.ok(humanBeingDao.findAll());
    }

    @GetMapping("/fastest")
    public ResponseEntity<HumanBeing> findMax() {
        return ResponseEntity.ok(humanBeingDao.findMax());
    }

    @GetMapping("/biggersThan")
    public ResponseEntity<List<HumanBeing>> biggersThan(@RequestParam("impactSpeed") Float impactSpeed) {
        List<HumanBeing> humans = humanBeingDao.findBiggers(impactSpeed);
        HttpHeaders httpHeaders = new HttpHeaders();
        httpHeaders.set("X-total-count", String.valueOf(humans.size()));
        return ResponseEntity
                .ok()
                .headers(httpHeaders)
                .body(humans);
    }

    @GetMapping("/biggersThanCount")
    public ResponseEntity<Long> biggersThanCount(@RequestParam("impactSpeed") Float impactSpeed) {
        List<HumanBeing> humans = humanBeingDao.findBiggers(impactSpeed);
        return ResponseEntity
                .ok()
                .body((long)humans.size());
    }

    @PostMapping("/saveDummy")
    public ResponseEntity<List<HumanBeing>> saveDummy() {
        humanBeingDao.persist(HumanBeing.builder()
                .car(new Car())
                .coordinates(new Coordinates())
                .hasToothpick(false)
                .impactSpeed(400)
                .mood(Mood.CALM)
                .weaponType(WeaponType.KNIFE)
                .name("Dummy")
                .realHero(false)
                .build());
        return ResponseEntity.ok(humanBeingDao.findAll());
    }

    @PostMapping("/save")
    public ResponseEntity<HumanBeing> save(@RequestBody HumanBeing human) {
        Long persistedId = humanBeingDao.persist(human);
        return humanBeingDao.findById(persistedId)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.status(HttpStatus.NO_CONTENT).build());
    }

    @PostMapping("/update")
    public ResponseEntity<HumanBeing> update(@RequestBody HumanBeing human) {
        humanBeingDao.update(human);
        return humanBeingDao.findById(human.getId())
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.status(HttpStatus.NO_CONTENT).build());
    }

    @GetMapping("/{id}")
    public ResponseEntity<HumanBeing> findById(@PathVariable Long id) {
        return humanBeingDao.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.status(HttpStatus.NO_CONTENT).build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable Long id) {
        try {
            humanBeingDao.delete(id);
        } catch (EntityNotFoundException entityNotFoundException) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Entity not found by Id " + id);
        }
        return ResponseEntity.ok().build();
    }
}
