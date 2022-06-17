package ru.itmo.lab.dao;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ru.itmo.lab.model.HumanBeing;
import ru.itmo.lab.repository.HumanBeingRepository;

import javax.persistence.EntityNotFoundException;
import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class HumanBeingDao {

    @Autowired
    private HumanBeingRepository repository;

    public Optional<HumanBeing> findById(Long id) {
        return repository.findById(id);
    }

    public HumanBeing findMax() {
        return repository.findMax();
        //return null;
    }

    public List<HumanBeing> findBiggers(Float impactSpeed) {
        return repository.findHumanBeingByImpactSpeedIsGreaterThan(impactSpeed);
        //return null;
    }

    public List<HumanBeing> findAll() {
        return repository.findAll();
    }

    public Long persist(HumanBeing humanBeing) {
        if(humanBeing.getId()!= null)
            humanBeing.setId(null);
        return repository.save(humanBeing).getId();
    }

    public void update(HumanBeing humanBeing) {
        if(humanBeing.getId()==null)
            throw new IllegalArgumentException("NO NO NO. Need Id");
        repository.save(humanBeing);
    }

    public void delete(Long id) {
        var user = repository.findById(id).orElse(null);
        if(user == null) throw new EntityNotFoundException("entity not exists");
        repository.delete(user);
    }
}
