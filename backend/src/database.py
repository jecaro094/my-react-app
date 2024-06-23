from typing import List, Optional, Tuple

from sqlalchemy import Column, Index, Integer, String, and_, create_engine, exists
from sqlalchemy.exc import IntegrityError
from sqlalchemy.ext.declarative import DeclarativeMeta, declarative_base
from sqlalchemy.orm import sessionmaker

from src.config import config
from src.services import Data, PokemonData, UserData

Base = declarative_base()


class User(Base):
    __tablename__ = "users"

    email = Column(String, primary_key=True)
    username = Column(String)
    password = Column(String)

    @property
    def json(self):
        return self.__dict__


class Pokemon(Base):
    __tablename__ = "pokemons"

    id = Column(Integer, primary_key=True)
    name = Column(String)
    type_1 = Column(String)
    type_2 = Column(String, nullable=True)
    sprite = Column(String)
    audio = Column(String)
    hp = Column(Integer)
    attack = Column(Integer)
    defense = Column(Integer)
    special_attack = Column(Integer)
    special_defense = Column(Integer)
    speed = Column(Integer)
    pokedex = Column(String)

    __table_args__ = (
        Index("idx_id", id),
        Index("idx_name", name),
        Index("idx_type_1", type_1),
        Index("idx_type_2", type_2),
    )

    @property
    def json(self):
        return self.__dict__


models_dict = {
    User: UserData,
    Pokemon: PokemonData,
}


class SqlAlchemy:
    def __init__(self) -> None:
        self.engine = create_engine(self.get_url())
        metadata = Base.metadata
        metadata.create_all(bind=self.engine, checkfirst=True)

    def get_url(self) -> str:
        return (
            f"postgresql://{config.DB_USER}:"
            f"{config.DB_PASSWORD}@{config.DB_HOST}"
            f":{config.DB_PORT}/{config.DB_NAME}"
        )

    def get_session(self):
        Session = sessionmaker(bind=self.engine)
        return Session()


# Unit of Work class
class UnitOfWork:
    def __init__(self) -> None:
        self.session = SqlAlchemy().get_session()

    def __enter__(self):
        self.session.begin()
        return self

    def __exit__(self, exc_type, exc_val, exc_tb) -> None:
        if exc_type is None:
            self.session.commit()
        else:
            self.session.rollback()
        self.session.close()

    def _get_primary_key_column(self, model: DeclarativeMeta) -> Column:
        return model.__table__.primary_key.columns.values()[0]

    def _row_exists(self, model: DeclarativeMeta, data: Data) -> bool:
        primary_key_column = self._get_primary_key_column(model)
        primary_key_column_name = str(primary_key_column).split(".")[-1]
        primary_key_value = data.json[primary_key_column_name]
        with self.session.no_autoflush:
            return self.session.query(
                exists().where(primary_key_column == primary_key_value)
            ).scalar()

    def insert(self, model: DeclarativeMeta, data: Data) -> None:
        try:
            if not self._row_exists(model, data):
                db_input_data = model(**data.json)
                self.session.add(db_input_data)
                self.session.commit()
                msg = f"Successfully inserted data: {data}"
            else:
                msg = f"Row already on DB, skip: {data}"
            print(msg)
        except IntegrityError as e:
            self.session.rollback()
            print("Error inserting data:", e)

    def get_one(self, model: DeclarativeMeta, primary_key_value: any) -> Data:
        primary_key_column = self._get_primary_key_column(model)
        db_row = (
            self.session.query(model)
            .filter(primary_key_column == primary_key_value)
            .first()
        )
        return models_dict[model](**db_row.json)

    def get_all(
        self,
        model: DeclarativeMeta,
        offset: Optional[str] = None,
        limit: Optional[str] = None,
        text: Optional[str] = None,
    ) -> Tuple[List[Data], Integer]:
        filter_name_condition = Pokemon.name.like(
            f"%{text}%"
        )  # not generalized for several models
        db_rows = (
            self.session.query(model)
            .filter(
                and_(
                    filter_name_condition,
                )
            )
            .order_by(Pokemon.id)  # Not generalized
            .offset(offset)
            .limit(limit)
            .all()
        )
        total = int(self.session.query(model).filter(filter_name_condition).count())
        return ([models_dict[model](**row.json) for row in db_rows], total)

    def delete(self):
        pass
