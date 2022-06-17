package ru.itmo.lab.teamservice.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ru.itmo.lab.teamservice.repository.HeroRepository;
import ru.itmo.lab.teamservice.repository.TeamRepository;

@Service
@RequiredArgsConstructor
public class TeamService {

    private final HeroRepository heroRepository;
    private final TeamRepository teamRepository;

    @Transactional
    public void removeHeroFromTeam(Long teamId, Long heroId) {

        if(heroRepository.findFirstByHeroId(heroId) == null)
            throw new IllegalArgumentException("Этот герой не принадлежит ни одной команде. heroId=" + heroId);

        if(heroRepository.findFirstByTeamIdAndHeroId(teamId, heroId) == null)
            throw new IllegalArgumentException("Этот герой в другой команде. heroId=" + heroId);

        heroRepository.deleteHeroByTeamIdAndHeroId(teamId, heroId);
    }
}
