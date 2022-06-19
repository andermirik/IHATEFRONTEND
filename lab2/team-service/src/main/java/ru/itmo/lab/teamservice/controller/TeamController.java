package ru.itmo.lab.teamservice.controller;

import feign.FeignException;
import lombok.RequiredArgsConstructor;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;
import ru.itmo.lab.teamservice.client.HumanBeingClient;
import ru.itmo.lab.teamservice.enums.Mood;
import ru.itmo.lab.teamservice.model.*;
import ru.itmo.lab.teamservice.repository.HeroRepository;
import ru.itmo.lab.teamservice.repository.TeamRepository;
import ru.itmo.lab.teamservice.service.HeroService;
import ru.itmo.lab.teamservice.service.TeamService;

import java.util.List;
import java.util.stream.Collectors;

//ужасный кусок кода который никогда никто не должен увидеть. Я клал на все правила и надеюсь никто это не увидит.
@ControllerAdvice
@RestController
@RequestMapping("/team")
@RequiredArgsConstructor
public class TeamController extends ResponseEntityExceptionHandler {

    private final HeroService heroService;
    private final TeamService teamService;

    @ExceptionHandler(IllegalArgumentException.class)
    public ResponseEntity<String> exceptionHandler(Exception ex) {
        return ResponseEntity.badRequest().body(ex.getMessage());
    }

    @ExceptionHandler(FeignException.FeignClientException.class)
    public ResponseEntity<String> feignExceptionHandler(Exception ex) {
        return ResponseEntity.badRequest().body("Нет связи с микросервисом герои. " + ex.getMessage());
    }

    @GetMapping
    ResponseEntity<List<TeamDto>> findAll() {
        return ResponseEntity.ok(
                teamService.findAll()
        );
    }

    @GetMapping("/{teamId}")
    ResponseEntity<TeamDto> findById(@PathVariable("teamId") Long teamId) {
        return ResponseEntity.ok(
                teamService.findById(teamId)
        );
    }

    @PostMapping("/make")
    ResponseEntity<TeamDto> makeTeam(@RequestParam("teamName") String teamName) {
        return ResponseEntity.ok(
                 teamService.makeTeam(teamName)
        );
    }

    @PostMapping("/{teamId}/add/{heroId}")
    ResponseEntity<TeamDto> addHeroToTeam(@PathVariable("teamId") Long teamId,
                                          @PathVariable("heroId") Long heroId) {
        return ResponseEntity.ok(
                heroService.addHeroToTeam(teamId, heroId)
        );
    }


    @PostMapping("/{teamId}/remove/{heroId}")
    ResponseEntity<List<TeamDto>> removeHeroFromTeam(@PathVariable("teamId") Long teamId,
                                                     @PathVariable("heroId") Long heroId) {

        heroService.removeHeroFromTeam(teamId, heroId);

        return ResponseEntity.ok(
                teamService.findAll()
        );
    }

    @PostMapping("/{teamId}/make-depressive")
    ResponseEntity<TeamDto> makeDepressive(@PathVariable("teamId") Long teamId) {
        return ResponseEntity.ok(heroService.makeDepressive(teamId));
    }



}
