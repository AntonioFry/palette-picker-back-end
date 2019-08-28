<h1 align="center">Welcome to 🎨 Palette Picker 🖌</h1>

## Table of Contents
* [Learning Goals](#Learning-Goals)
* [Challenges](#Challenges)
* [Successes](#Successes)
* [Tech Stack](#Tech-Stack)
* [How To Use](#How-To-Use)
* [Endpoints](#Endpoints)
* [GET](#GET-Projects)
* [POST](#POST-Projects)
* [PATCH](#PATCH-Projects)
* [DELETE](#DELETE-Projects)
* [Developers](#Developer)

> Palette Picker was created to help designers and developers pick the perfect color palette for their site or application. The project was developed with Express, Knex, Node.js, and React. It is deployed on Heroku and tested using Supertest. 

## Learning Goals

The primary learning goals for this project are:

* server-side testing
* further understanding of complete CRUD endpoints
* connecting BE & FE repositories using CORS
* multiple environments:
* testing
* making use of automatic continuous integration with TravisCI
* deployment with Heroku

The second focus for this project is developing professional-level workflow habits. This includes:

* using a PR template
* conducting actual code reviews in your PRs
* detailed agile workflow using a kanban system or GH issues
* keeping track of MVP features and nice-to-have features
* agreeing to a commit message template
* exploring git rebase and squashing
* Highly semantic, specific, professional documentation (README, API documentation, etc)

## Challenges

## Successes

## Tech Stack

* React
* Express
* Knex
* Node.js
* Supertest
* Jest

# How To Use

## Install

```sh
npm install
```

## Usage

```sh
npm run start
```

## Run tests

```sh
npm run test
```

## Endpoints

### GET Projects

METHOD: GET

ENDPOINT: /api/v1/projects

EXAMPLE RESPONSE:

```
[
    {
        "id": 1,
        "name": "GameTime",
        "created_at": "2019-08-22T14:06:43.538Z",
        "updated_at": "2019-08-22T14:06:43.538Z"
    },
    {
        "id": 2,
        "name": "BYOB",
        "created_at": "2019-08-22T14:06:43.538Z",
        "updated_at": "2019-08-22T14:06:43.538Z"
    },
    {
        "id": 3,
        "name": "Whateverly",
        "created_at": "2019-08-22T14:06:43.538Z",
        "updated_at": "2019-08-22T14:06:43.538Z"
    }
]
```


### GET Projects/:id

METHOD: GET

ENDPOINT: /api/v1/projects/:id

EXAMPLE RESPONSE:

```
[
    {
        "id": 1,
        "name": "GameTime",
        "created_at": "2019-08-22T14:06:43.538Z",
        "updated_at": "2019-08-22T14:06:43.538Z"
    }
]
```


### GET Palettes

METHOD: GET

ENDPOINT: /api/v1/palettes

EXAMPLE RESPONSE:

```
[
    {
        "id": 1,
        "palette_name": "Neutral Colors",
        "color_1": "#A96A44",
        "color_2": "#923F0C",
        "color_3": "#5F5F13",
        "color_4": "#8B8B3E",
        "color_5": "#782011",
        "project_id": 3,
        "created_at": "2019-08-22T14:06:43.550Z",
        "updated_at": "2019-08-22T14:06:43.550Z"
    },
    {
        "id": 2,
        "palette_name": "Cool Colors",
        "color_1": "#A4FAD7",
        "color_2": "#A4FAED",
        "color_3": "#0B9EE3",
        "color_4": "#0B56E3",
        "color_5": "#600BE3",
        "project_id": 2,
        "created_at": "2019-08-22T14:06:43.549Z",
        "updated_at": "2019-08-22T14:06:43.549Z"
    },
    {
        "id": 3,
        "palette_name": "Warm Colors",
        "color_1": "#800000",
        "color_2": "#FC1501",
        "color_3": "#F87531",
        "color_4": "#FF8000",
        "color_5": "#FFCC11",
        "project_id": 1,
        "created_at": "2019-08-22T14:06:43.549Z",
        "updated_at": "2019-08-22T14:06:43.549Z"
    }
]
```


### GET Palettes/:id

METHOD: GET

ENDPOINT: /api/v1/palettes/:id

EXAMPLE RESPONSE:

```
[
    {
        "id": 1,
        "palette_name": "Neutral Colors",
        "color_1": "#A96A44",
        "color_2": "#923F0C",
        "color_3": "#5F5F13",
        "color_4": "#8B8B3E",
        "color_5": "#782011",
        "project_id": 3,
        "created_at": "2019-08-22T14:06:43.550Z",
        "updated_at": "2019-08-22T14:06:43.550Z"
    }
]
```


### POST Project

METHOD: POST

ENDPOINT: /api/v1/projects

PARAMETERS: {name: "<String>"}

EXAMPLE RESPONSE:

```
{
    "id": 4,
    "name": "Dog Party",
    "created_at": "2019-08-23T20:40:26.309Z",
    "updated_at": "2019-08-23T20:40:26.309Z"
}
```


### POST Palette

METHOD: POST

ENDPOINT: /api/v1/palettes

PARAMETERS: {project_id: <Number>, palette_name: <String>, color_1: <String>, color_2: <String>, color_3: <String>, color_4: <String>, color_5: <String>}

EXAMPLE RESPONSE:

```
{
    "id": 4,
    "palette_name": "Dog Party",
    "color_1": "#000000",
    "color_2": "#000000",
    "color_3": "#000000",
    "color_4": "#000000",
    "color_5": "#000000",
    "project_id": 6,
    "created_at": "2019-08-25T20:38:12.527Z",
    "updated_at": "2019-08-25T20:38:12.527Z"
}
```


### PATCH Project

METHOD: PATCH

ENDPOINT: /api/v1/projects/:id

PARAMETERS: {name: "<String>"}

EXAMPLE RESPONSE: 

```
Project successfully updated
```


### PATCH Palette

METHOD: PATCH

ENDPOINT: /api/v1/palettes/:id

PARAMETERS: {project_id: <Number>, palette_name: <String>, color_1: <String>, color_2: <String>, color_3: <String>, color_4: <String>, color_5: <String>}

EXAMPLE RESPONSE: 

```
Palette successfully updated
```


### DELETE Project

METHOD: DELETE

ENDPOINT: /api/v1/projects/:id

EXAMPLE RESPONSE:


### DELETE Palette

METHOD: DELETE

ENDPOINT: /api/v1/palettes/:id 

EXAMPLE RESPONSE:

## Developers

👤 **Katie Lewis and Antonio Fry**

* Github: [@Kalex19](https://github.com/Kalex19)
* Github: [@AntonioFry](https://github.com/AntonioFry)

## Show your support

Give a ⭐️ if this project helped you!

***
_This README was generated with ❤️ by [readme-md-generator](https://github.com/kefranabg/readme-md-generator)_
