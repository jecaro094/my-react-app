import json

import requests

from src.services import PokemonData

POKE_BASE_URL = "https://pokeapi.co/api/v2/"


class PokemonAPIConnector:
    def __init__(self) -> None:
        pass

    def format_kwargs(self, **kwargs) -> dict:
        return {key.replace("-", "_"): value for key, value in kwargs.items()}

    def _get_data(self, resource: str = None, value: str = None) -> dict:
        returned_url = POKE_BASE_URL
        if resource:
            returned_url += f"{resource}/"
        if value:
            returned_url += f"{value}/"

        res = requests.get(returned_url)
        return res.json() if res.status_code == 200 else None

    def get_pokemon_data(self, id) -> PokemonData:
        pokemon_data = self._get_data("pokemon", id)
        return PokemonData(
            id=pokemon_data["id"],
            name=pokemon_data["name"],
            **self.format_kwargs(**self._get_stats(pokemon_data)),
            sprite=pokemon_data["sprites"]["front_default"],
            audio=pokemon_data["cries"]["latest"],
            **self._get_types(pokemon_data),
            pokedex="",
        )

    def _get_pokedex_entry(self, pokemon_name: str) -> dict:
        """
        Returns pokedex description in english (value) from the game
        version considered (key).
        """
        pokemon_data = self._get_data("pokemon-species", pokemon_name)
        if pokemon_data is None:
            return {}
        filter_result = filter(
            lambda pokedex_data: pokedex_data["language"]["name"] == "en",
            pokemon_data["flavor_text_entries"],
        )
        return dict(
            map(
                lambda pokedex_data: (
                    pokedex_data["version"]["name"],
                    pokedex_data["flavor_text"].replace("\n", " ").replace("\f", " "),
                ),
                filter_result,
            )
        )

    def _get_stats(self, pokemon_data: dict) -> dict:
        """
        Returns pokemon stats as dictionary
        """

        return dict(
            map(
                lambda stat: (stat["stat"]["name"], stat["base_stat"]),
                pokemon_data["stats"],
            )
        )

    def _get_types(self, pokemon_data: dict) -> dict:
        """
        Returns pokemon types
        """

        return dict(
            map(
                lambda idx_val: (f"type_{idx_val[0]+1}", idx_val[1]["type"]["name"]),
                enumerate(pokemon_data["types"]),
            )
        )


def _get_pokemon_data(pokemon_name: str) -> dict:
    """
    Returns pokemon json data from API, given pokemon name as parameter
    """
    return requests.get(f"{POKE_BASE_URL}/pokemon/{pokemon_name.lower()}").json()


def get_pokemon_stats(pokemon_data: dict) -> dict:
    """
    Returns pokemon stats as dictionary
    
    >>> pokemon_data = get_pokemon_data("Pikachu")
    >>> get_pokemon_stats(pokemon_data)
    {'hp': 35, 'attack': 55, 'defense': 40, \
'special-attack': 50, 'special-defense': 50, 'speed': 90}
    """

    return dict(
        map(
            lambda stat: (stat["stat"]["name"], stat["base_stat"]),
            pokemon_data["stats"],
        )
    )


def get_pokemon_types(pokemon_data: dict):
    """
    Returns pokemon types

    >>> pokemon_data = get_pokemon_data("mewtwo")
    >>> get_pokemon_types(pokemon_data)
    ['psychic']

    >>> pokemon_data = get_pokemon_data("blaziken")
    >>> get_pokemon_types(pokemon_data)
    ['fire', 'fighting']
    """

    return list(
        map(
            lambda type: type["type"]["name"],
            pokemon_data["types"],
        )
    )


def get_pokemon_json(pokemon: str) -> dict:
    """
    Returns all pokemon data considered in the frontend
    """
    pokemon_data = _get_pokemon_data(pokemon)
    return {
        "name": pokemon,
        "types": get_pokemon_types(pokemon_data),
        "sprite": pokemon_data["sprites"]["front_default"],
        "stats": get_pokemon_stats(pokemon_data),
        "audio": pokemon_data["cries"]["latest"],
    }
