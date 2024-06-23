import { MouseEventHandler, ChangeEventHandler } from 'react'

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
  pokedex: string
}

export interface TextInputProps {
  text: string
  label: string
  handleChange: ChangeEventHandler<HTMLInputElement>
}

export interface NavigationButtonsProps {
  currentPage: number
  totalPages: number
  nextPage: MouseEventHandler<HTMLButtonElement>
  prevPage: MouseEventHandler<HTMLButtonElement>
  backPage: MouseEventHandler<HTMLButtonElement> | undefined
}

export interface TableProps {
  pokemons: Pokemon[] | undefined
  columns: string[]
  handlePokemonDetails: any
}
