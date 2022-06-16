package ru.itmo.lab.teamservice.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ru.itmo.lab.teamservice.client.HumanBeingClient;
import ru.itmo.lab.teamservice.model.Hero;
import ru.itmo.lab.teamservice.model.HumanBeing;
import ru.itmo.lab.teamservice.model.Team;
import ru.itmo.lab.teamservice.repository.HeroRepository;
import ru.itmo.lab.teamservice.repository.TeamRepository;

import java.util.List;

@RestController
@RequestMapping("/team")
@RequiredArgsConstructor
public class TeamController {

    private final HeroRepository heroRepository;
    private final TeamRepository teamRepository;

    private final HumanBeingClient humanBeingClient;

    @PostMapping("/{teamId}/remove/{heroId}")
    ResponseEntity<List<Team>> removeHeroFromTeam(@PathVariable("teamId") Long teamId,
                                                  @PathVariable("heroId") Long heroId) {
        heroRepository.deleteHeroByTeamIdAndHeroId(teamId, heroId);
        return ResponseEntity.ok(
            teamRepository.findAll()
        );
    }

    @GetMapping
    ResponseEntity<List<Team>> findAll() {
        return ResponseEntity.ok(
                teamRepository.findAll()
        );
    }

    @PostMapping("/make")
    ResponseEntity<Team> makeTeam(@RequestParam("teamName") String teamName) {
        return ResponseEntity.ok(
                teamRepository.save(Team.builder().name(teamName).build())
        );
    }

    @PostMapping("/{teamId}/add/{heroId}")
    ResponseEntity<List<Team>> addHeroToTeam(@PathVariable("teamId") Long teamId,
                                              @PathVariable("heroId") Long heroId) {

        HumanBeing hero = humanBeingClient.findById(heroId);
        if(hero != null) {
            Team team = teamRepository.findById(teamId).orElse(null);
            if(team != null) {
                team.getHumans().add(Hero.builder().heroId(heroId).build());
            } else {
                throw new IllegalArgumentException("cant find team by id=" + teamId);
            }
        } else {
            throw new IllegalArgumentException("cant find hero by id=" + heroId);
        }

        heroRepository.deleteHeroByTeamIdAndHeroId(teamId, heroId);
        return ResponseEntity.ok(
                teamRepository.findAll()
        );
    }

}
