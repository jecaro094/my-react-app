export interface Pokemon {
  id: string
  name: string
  type_1: string
  type_2: string
  sprite: string
  audio: string
  hp: number
  attack: number
  defense: number
  special_attack: number
  special_defense: number
  speed: number
}

export interface PokemonListProps {
  pokemons: Pokemon[] | undefined
}
