package com.example.demo.services;

import java.time.Instant;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.demo.dto.RecordDTO;
import com.example.demo.dto.RecordInsertDTO;
import com.example.demo.entities.Game;
import com.example.demo.entities.Record;
import com.example.demo.repositories.GameRepository;
import com.example.demo.repositories.RecordRepository;

@Service
public class RecordService {
	
	@Autowired
	private RecordRepository repository;
	
	@Autowired
	private GameRepository gameRepository;
	
	@Transactional
	public RecordDTO insert (RecordInsertDTO dto) {
		Record entity = new Record();
		entity.setName(dto.getName());
		entity.setAge(dto.getAge());
		entity.setMoment(Instant.now());
		
		Game game = gameRepository.getOne(dto.getGameId());
		
		entity.setGame(game);
		repository.save(entity);
		
		return new RecordDTO(entity);
	}

	public Page<RecordDTO> findbyMoments(Instant min, Instant max, PageRequest pageRequest) {
		
		return repository.findByMoments(min, max, pageRequest).map(entity -> new RecordDTO(entity));
	}

}
