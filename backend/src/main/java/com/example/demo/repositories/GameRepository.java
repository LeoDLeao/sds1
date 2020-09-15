package com.example.demo.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.demo.entities.Game;

@Repository
public interface GameRepository extends JpaRepository<Game, Long>{

}
