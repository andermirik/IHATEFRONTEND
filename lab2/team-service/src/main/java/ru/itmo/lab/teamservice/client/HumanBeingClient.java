package ru.itmo.lab.teamservice.client;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.*;
import ru.itmo.lab.teamservice.model.HumanBeing;

import java.util.List;

@FeignClient(name = "humanBeingClient", url = "${feign.client.url.hero-client}/human")
public interface HumanBeingClient {

    @GetMapping
    List<HumanBeing> findAll();

    @GetMapping("/fastest")
    HumanBeing findMax();

    @GetMapping("/biggersThan")
    List<HumanBeing> biggersThan(@RequestParam("impactSpeed") Float impactSpeed);

    @GetMapping("/biggersThanCount")
    Long biggersThanCount(@RequestParam("impactSpeed") Float impactSpeed);

    @PostMapping("/saveDummy")
    List<HumanBeing> saveDummy();

    @PostMapping("/save")
    HumanBeing save(@RequestBody HumanBeing human);

    @PostMapping("/update")
    HumanBeing update(@RequestBody HumanBeing human);

    @GetMapping("/{id}")
    HumanBeing findById(@PathVariable Long id);

    @DeleteMapping("/{id}")
    void delete(@PathVariable Long id);

}
 
