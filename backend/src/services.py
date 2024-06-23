from abc import ABC, abstractmethod
from typing import Optional

from pydantic import BaseModel, EmailStr


class EmailPasswordForm(BaseModel):
    email: EmailStr
    password: str


class Data(ABC, BaseModel):
    @property
    @abstractmethod
    def json(self):
        pass

    @abstractmethod
    def __str__(self) -> str:
        pass


class UserData(Data):
    username: str
    email: str
    password: str

    @property
    def json(self):
        return self.__dict__

    def __str__(self) -> str:
        return (
            f"{self.__class__.__name__}("
            f"username: '{self.username}', "
            f"email: '{self.email}')"
        )


class PokemonData(Data):
    id: int
    name: str
    type_1: str
    type_2: Optional[str] = None
    sprite: str
    audio: str
    hp: int
    attack: int
    defense: int
    special_attack: int
    special_defense: int
    speed: int
    pokedex: str

    @property
    def json(self):
        self.name = self.name.capitalize()
        return self.__dict__

    def __str__(self) -> str:
        return f"{self.__class__.__name__}(" f"id: {self.id}, " f"name: '{self.name}')"
