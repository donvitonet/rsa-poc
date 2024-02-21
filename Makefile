.PHONY: build down up logs login

build:
	docker-compose build rsa-poc

down:
	docker-compose down

up:
	docker-compose up -d

logs:
	docker-compose logs -f -t rsa-poc >> /dev/stdout

login:
	docker-compose run rsa-poc sh
