package ru.itmo.lab.teamservice.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;
import ru.itmo.lab.teamservice.client.HumanBeingClient;
import ru.itmo.lab.teamservice.enums.Mood;
import ru.itmo.lab.teamservice.model.*;
import ru.itmo.lab.teamservice.repository.HeroRepository;
import ru.itmo.lab.teamservice.repository.TeamRepository;
import ru.itmo.lab.teamservice.service.TeamService;

import java.util.List;
import java.util.stream.Collectors;

//ужасный кусок кода который никогда никто не должен увидеть. Я клал на все правила и надеюсь никто это не увидит.
@ControllerAdvice
@RestController
@RequestMapping("/team")
@RequiredArgsConstructor
public class TeamController extends ResponseEntityExceptionHandler {

    private final HeroRepository heroRepository;
    private final TeamRepository teamRepository;
    private final TeamService teamService;

    private final HumanBeingClient humanBeingClient;

    @ExceptionHandler(IllegalArgumentException.class)
    public ResponseEntity<String> exceptionHandler(Exception ex) {
        return ResponseEntity.badRequest().body(ex.getMessage());
    }

    @GetMapping
    ResponseEntity<List<TeamDto>> findAll() {
        return ResponseEntity.ok(
                teamRepository.findAll().stream().map(this::toDto).collect(Collectors.toList())
        );
    }

    @GetMapping("/{teamId}")
    ResponseEntity<TeamDto> findById(@PathVariable("teamId") Long teamId) {
        return ResponseEntity.ok(
                toDto(teamRepository.findById(teamId).orElse(null))
        );
    }

    @PostMapping("/make")
    ResponseEntity<TeamDto> makeTeam(@RequestParam("teamName") String teamName) {
        return ResponseEntity.ok(
                toDto(teamRepository.save(Team.builder().name(teamName).build()))
        );
    }

    @PostMapping("/{teamId}/add/{heroId}")
    ResponseEntity<TeamDto> addHeroToTeam(@PathVariable("teamId") Long teamId,
                                          @PathVariable("heroId") Long heroId) {

        if(heroRepository.findFirstByHeroId(heroId) != null)
            throw new IllegalArgumentException("Этот герой уже в команде. heroId=" + heroId);

        HumanBeing human = humanBeingClient.findById(heroId);
        if(human == null)
            throw new IllegalArgumentException("Не могу найти героя. heroId=" + heroId);

        Team team = teamRepository.findById(teamId).orElse(null);
        if(team == null)
            throw new IllegalArgumentException("Не могу найти команду. teamId=" + teamId);

        Hero hero = Hero.builder().heroId(heroId).build();
        heroRepository.save(hero);
        team.getHeroes().add(hero);

        return ResponseEntity.ok(
                toDto(teamRepository.save(team))
        );
    }


    @PostMapping("/{teamId}/remove/{heroId}")
    ResponseEntity<List<TeamDto>> removeHeroFromTeam(@PathVariable("teamId") Long teamId,
                                                     @PathVariable("heroId") Long heroId) {

        teamService.removeHeroFromTeam(teamId, heroId);

        return ResponseEntity.ok(
                teamRepository.findAll().stream().map(this::toDto).collect(Collectors.toList())
        );
    }

    @PostMapping("/{teamId}/make-depressive")
    ResponseEntity<TeamDto> makeDepressive(@PathVariable("teamId") Long teamId) {

        Team team = teamRepository.findById(teamId).orElse(null);
        if (team == null)
            throw new IllegalArgumentException("Команда не существует. teamId==" + teamId);

        List<HumanBeing> humans = team.getHeroes().stream().map(hero -> {
            HumanBeing human = null;
            try {
                human = humanBeingClient.findById(hero.getHeroId());
                human.setMood(Mood.GLOOM);
            } catch (Exception ignored) {}

            if(human == null) {
                try {
                    humanBeingClient.delete(hero.getHeroId());
                }catch (Exception e) {
                    throw new IllegalArgumentException("Что-то случилось на сервере. Упс.");
                }
                throw new IllegalArgumentException("Член команды не найден. Он был удален из команды heroId=" + hero.getHeroId());
            }

            return human;
        }).toList();
        for(var human : humans) {
            humanBeingClient.update(human);
        }
        return ResponseEntity.ok(toDto(team));
    }

    TeamDto toDto(Team team) {
        if(team == null) return null;

        if(team.getHeroes() == null)
            return TeamDto.builder()
                    .id(team.getId())
                    .name(team.getName())
                    .build();

        return TeamDto.builder()
                .id(team.getId())
                .name(team.getName())
                .heroes(team.getHeroes().stream().map(this::toDto).toList())
                .build();
    }

    HeroDto toDto(Hero hero) {
        if(hero == null) return null;
        return HeroDto.builder()
                .id(hero.getHeroId())
                .build();
    }

}
