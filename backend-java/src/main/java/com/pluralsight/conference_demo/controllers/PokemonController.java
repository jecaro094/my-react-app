package com.pluralsight.conference_demo.controllers;

import com.pluralsight.conference_demo.dto.PokemonDTO;
import com.pluralsight.conference_demo.models.Pokemon;
import com.pluralsight.conference_demo.repositories.PokemonRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/v1/pokemons")
public class PokemonController {
    @Autowired
    private PokemonRepository pokemonRepository;

    @Autowired
    private ModelMapper modelMapper;

    @GetMapping
    public List<PokemonDTO> list(){
        List<Pokemon> pokemons = pokemonRepository.findAll();
        return pokemons.stream()
                .map(pokemon -> modelMapper.map(pokemon, PokemonDTO.class))
                .toList();
    }

    @GetMapping
    @RequestMapping("{id}")
    @ResponseStatus(HttpStatus.ACCEPTED)
    public ResponseEntity<PokemonDTO> get(@PathVariable Long id){
        Pokemon pokemon = pokemonRepository.getReferenceById(id);
        PokemonDTO pokemonDTO = modelMapper.map(pokemon, PokemonDTO.class);
        return ResponseEntity.ok(pokemonDTO);
    }


}
