package com.pluralsight.conference_demo.repositories;

import com.pluralsight.conference_demo.models.Pokemon;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PokemonRepository extends JpaRepository<Pokemon, Long> {

}
