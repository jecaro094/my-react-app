SRC=$(CURDIR)/src
TESTS=$(CURDIR)/tests

requirements:
	pip install -r $(CURDIR)/requirements.txt -r $(CURDIR)/requirements-dev.txt

format:
	isort $(SRC) $(TESTS)
	black $(SRC) $(TESTS)

test:
	python -m pytest -- $(CURDIR)/

build:
	docker-compose build

up-build:
	docker-compose up --build

up:
	docker-compose up

all: requirements format test