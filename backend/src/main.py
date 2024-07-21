import random
from typing import List, Optional

from fastapi import Depends, FastAPI, HTTPException, Query, Response, Security, status, APIRouter
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse

from src.database import Pokemon, UnitOfWork, User
from src.services import EmailPasswordForm, PokemonData, UserData
from src.utils.pokebase import PokemonAPIConnector
from src.utils.token import authenticate_user, create_access_token, validate_token
from src.utils.weather import get_weather
from src.config import config

# db = SqlAlchemy()
pokemonConnector = PokemonAPIConnector()
app = FastAPI()


origins = [
    config.DB_CORS_URL,  # React app running on localhost:3000
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,  # Allow cookies to be included in cross-origin requests
    allow_methods=["*"],
    allow_headers=["*"],
)

router = APIRouter()

def define_random_list(list_size):
    returned_list = []
    for x in range(0, list_size):
        returned_list.append(random.randint(0, 9))
    return returned_list


@router.post("/logout")
async def logout(response: Response):
    response.delete_cookie(key="access_token")
    return {"message": "Logged out successfully"}


@router.post("/token")
async def login(response: Response, form_data: EmailPasswordForm):
    user = authenticate_user(form_data.email, form_data.password)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    access_token = create_access_token(data={"sub": user.username})
    response.set_cookie(
        key="access_token",
        value=f"Bearer {access_token}",
        httponly=True,
        samesite="None",  # Use 'Lax' for most scenarios, 'None' if cross-site
        secure=False,  # Don't set Secure attribute for HTTP
    )
    return {"message": "Login successful"}


@router.put("/user")
async def put_user_on_db(user: UserData) -> str:
    with UnitOfWork() as uow:
        uow.insert(User, user)

    return "done"


@router.put("/pokemon")
async def put_pokemon_on_db(payload: dict) -> JSONResponse:
    pokemon_id = payload.get("pokemon_id")
    with UnitOfWork() as uow:
        for i in range(1, pokemon_id + 1):
            pokemon: PokemonData = pokemonConnector.get_pokemon_data(i)
            uow.insert(Pokemon, pokemon)

    return JSONResponse(
        content={"status": f"{pokemon_id} pokemon created!"},
        status_code=status.HTTP_200_OK,
    )


@router.get("/pokemon")
async def get_pokemons(
    offset: str = Query(...),
    limit: str = Query(...),
    text: Optional[str] = Query(...),
    current_user: dict = Depends(validate_token),
):
    """
    Returns pokemons json data (custom)
    """
    if id == "":
        return {}

    with UnitOfWork() as uow:
        pokemon_list: List[PokemonData] = []
        (pokemon_list, total) = uow.get_all(Pokemon, str(offset), str(limit), text)

    print("current_user: ", current_user)

    return JSONResponse(
        content={"pokemons": [p.json for p in pokemon_list], "total": total},
        status_code=status.HTTP_200_OK,
    )


@router.get("/")
async def root():
    return {"random_number": "changed"}


@router.get("/weather")
async def get_weather_(city_name: str) -> dict:
    if not city_name:
        return {}
    weather_from_city = get_weather(city_name)
    weather_from_city["main"].pop("pressure")
    weather_from_city["main"].pop("humidity")
    for temp_key in ["temp", "temp_min", "temp_max", "feels_like"]:
        weather_from_city["main"][temp_key] -= 273.15
    return weather_from_city


app.include_router(router, prefix="/api")