import sys
import os

current_dir = os.path.dirname(os.path.realpath(__file__))
parent_dir = os.path.abspath(os.path.join(current_dir, os.pardir))
print(parent_dir)
sys.path.append(parent_dir)

from src.services import PokemonData
from src.utils.pokebase import PokemonAPIConnector
from src.database import UnitOfWork, Pokemon


pkmnCon = PokemonAPIConnector()

with UnitOfWork() as uow:
    pokemons = uow.session.query(Pokemon).order_by(Pokemon.id).all()
    for pkm in pokemons:
        print(f"pokemon: '{pkm.name}'")
        pokedexes = pkmnCon._get_pokedex_entry(pkm.name)
        pkm.pokedex = next(iter(pokedexes.values())) if pokedexes else ""
        uow.session.commit()

    

