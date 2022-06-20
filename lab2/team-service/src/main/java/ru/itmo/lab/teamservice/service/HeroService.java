package ru.itmo.lab.teamservice.service;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import ru.itmo.lab.teamservice.client.HumanBeingClient;
import ru.itmo.lab.teamservice.enums.Mood;
import ru.itmo.lab.teamservice.mapper.DtoMapper;
import ru.itmo.lab.teamservice.model.Hero;
import ru.itmo.lab.teamservice.model.HumanBeing;
import ru.itmo.lab.teamservice.model.Team;
import ru.itmo.lab.teamservice.model.TeamDto;
import ru.itmo.lab.teamservice.repository.HeroRepository;
import ru.itmo.lab.teamservice.repository.TeamRepository;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class HeroService {

    private final HeroRepository heroRepository;
    private final TeamRepository teamService;
    private final DtoMapper dtoMapper;
    private final HumanBeingClient humanBeingClient;

    @Transactional
    public void removeHeroFromTeam(Long teamId, Long heroId) {

        if(heroRepository.findFirstByHeroId(heroId) == null)
            throw new IllegalArgumentException("Этот герой не принадлежит ни одной команде. heroId=" + heroId);

        if(heroRepository.findFirstByTeamIdAndHeroId(teamId, heroId) == null)
            throw new IllegalArgumentException("Этот герой в другой команде. heroId=" + heroId);

        heroRepository.deleteHeroByTeamIdAndHeroId(teamId, heroId);
    }

    public TeamDto addHeroToTeam(Long teamId, Long heroId) {

        if(heroRepository.findFirstByHeroId(heroId) != null)
            throw new IllegalArgumentException("Этот герой уже в команде. heroId=" + heroId);

        HumanBeing human = humanBeingClient.findById(heroId);
        if(human == null)
            throw new IllegalArgumentException("Не могу найти героя. heroId=" + heroId);

        Team team = teamService.findById(teamId).orElse(null);
        if(team == null)
            throw new IllegalArgumentException("Не могу найти команду. teamId=" + teamId);

        Hero hero = Hero.builder().heroId(heroId).build();
        heroRepository.save(hero);
        team.getHeroes().add(hero);

        return dtoMapper.toDto(teamService.save(team));
    }

    public TeamDto makeDepressive(Long teamId) {

        Team team = teamService.findById(teamId).orElse(null);
        if (team == null)
            throw new IllegalArgumentException("Команда не существует. teamId==" + teamId);

        List<HumanBeing> humans = team.getHeroes().stream().map(hero -> {
            HumanBeing human = null;
            try {
                human = humanBeingClient.findById(hero.getHeroId());
                human.setMood(Mood.GLOOM);
            } catch (Exception ignored) {

            }
            if(human == null) {
                try {
                    heroRepository.delete(hero);
                }catch (Exception e) {
                    throw new IllegalArgumentException("Что-то случилось при попытке удалить героя. Упс. " + e.getMessage());
                }
                throw new IllegalArgumentException("Герой не ответил. Он был вычеркнут из команды. heroId=" + hero.getHeroId());
            }
            return human;
        }).collect(Collectors.toList());
        for(var human : humans) {
            humanBeingClient.update(human);
        }
        return dtoMapper.toDto(team);
    }
}
