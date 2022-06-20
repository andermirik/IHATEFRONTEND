package ru.itmo.lab.teamservice.service;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import ru.itmo.lab.teamservice.mapper.DtoMapper;
import ru.itmo.lab.teamservice.model.Team;
import ru.itmo.lab.teamservice.model.TeamDto;
import ru.itmo.lab.teamservice.repository.TeamRepository;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class TeamService {

    private final TeamRepository teamRepository;
    private final DtoMapper dtoMapper;

    public List<TeamDto> findAll() {
        return teamRepository.findAll().stream()
                        .map(dtoMapper::toDto)
                        .collect(Collectors.toList());
    }

    public TeamDto findById(Long teamId) {
        return dtoMapper.toDto(teamRepository.findById(teamId).orElse(null));
    }

    public TeamDto makeTeam(String teamName) {
        return dtoMapper.toDto(teamRepository.save(Team.builder().name(teamName).build()));
    }
}
