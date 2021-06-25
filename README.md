# RentX

RentX is a car rent application. On this repository you'll find the codebase for the backend of this application. It was built during the Ignite Bootcamp by @Rocketseat.

## Techs

- Typescript
- Node.js
- Postgres
- TypeORM
- Docker
- Jest

## Description

This application is meant to be used by admin users and regular users. Admins are meant to populate the database with cars, their categories and specifications which can be used by regular users to search, filter and rent cars.  
Besides listing features, all routes in this application need authentication. For this purpose, a JWT is returned from a request to the _/sessions_ route and it can be used to access other routes.

## Get it running

In order to get RentX up and running, follow the next steps.

**1. Clone this repository on your machine.**

Run this command on your preferred shell:

```bash
git clone https://github.com/jose-azevedo/rentx
```

**2. Start database and redis containers**

For application to run properly, you need to get it's database up before running the application itself. After installing [Docker](https://docs.docker.com/engine/install/), run the following command to get both the database and redis containers running:

```bash
docker-compose up --detach
```

**3. Rename ORM config and environment variables files**

Rename *ormconfig.example.json* to *ormconfig.json* and *.env.example* to *.env*.

**5. Install dependencies**

After installing [Yarn](https://yarnpkg.com/) package manager, simply run `yarn` to install all it's dependencies

**4. Start the application**

To finally start the application, run the following script:

```bash
yarn dev
```

## Usage

Since the database is going to be empty once you clone this repository, you'll want to have an admin user to use all features. To create one just run

```bash
yarn seed:admin
```

After that, you can start a session with that user with the email `admin@rentx.com` and password `admin`. You can then start to populate the database and create other users to interact with it.  

Once the application is up and running, you can access detailed information about endpoints and expected responses at http://localhost:3333/api-docs/.