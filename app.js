const enviroment = process.env.NODE_ENV || 'development';
const configuration = require('./knexfile')[enviroment];
const database = require('./knexfile')(configuration);
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3001;
const cors = require('cors');

app.set('port', PORT)
app.use(express.json())
app.use(cors())

app.get('/', (request, response) => {

})

// GET

app.get('api/v1/palettes', (request, response) => {
  database('palettes').select()
    .then((palettes) => {
      response.status(200).json(palettes)
    })
    .catch((error) => {
      response.status(500).json({ error: error.message })
    })
})

app.get('api/v1/palettes/:id', (request, response) => {
  const { id } = request.params;
  database('palettes').where("id", id)
    .then((palette) => {
      response.status(200).json(palette)
    })
    .catch((error) => {
      response.status(500).json({ error: error.message })
    })
})

app.get('api/v1/projects', (request, response) => {
  database('projects').select()
    .then((projects) => {
      response.status(200).json(projects)
    })
    .catch((error) => {
      response.status(500).json({ error: error.message })
    })
})

app.get('api/v1/projects/:id', (request, response) => {
  const { id } = request.params;
  database('projects').where("id", id)
    .then((project) => {
      response.status(200).json(project)
    })
    .catch((error) => {
      response.status(500).json({ error: error.message })
    })
})

// POST

app.post('api/v1/palettes/:id', (request, response) => {

})

app.post('api/v1/projects/:id', (request, response) => {

})

// DELETE

app.delete('api/v1/palettes/:id', (request, response) => {
  const { id } = request.params
  database('palettes').where("id", id).del()
    .then(() => {
      response.status(204)
    })
    .catch((error) => {
      response.status(500).json({ error: error.message })
    })
})

app.delete('api/v1/projects/:id', (request, response) => {
  const { id } = request.params
  database('projects').where("id", id).del()
    .then(() => {
      response.status(204)
    })
    .catch((error) => {
      response.status(500).json({ error: error.message })
    })
})

// PATCH

app.patch('api/v1/projects/:id', (request, response) => {

})

app.patch('api/v1/palettes/:id', (request, response) => {

})
