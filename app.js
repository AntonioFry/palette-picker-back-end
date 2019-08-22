const enviroment = process.env.NODE_ENV || 'development';
const configuration = require('./knexfile')[enviroment];
const database = require('knex')(configuration);
const express = require('express');
const app = express();
const cors = require('cors');
// const projectData = require('../data/projects')
require('dotenv').config();

app.set('port', process.env.PORT || 3001)
app.use(express.json())
app.use(cors())

app.get('/', (request, response) => {
response.send('Welcome to Palette Picker');
});

app.listen(app.get('port'), () => {
  console.log(`Palette Picker is running on http://localhost:${app.get('port')}.`);
});

// GET

app.get('/api/v1/palettes', (request, response) => {
  database('palettes').select()
    .then(palettes => {
      if(!palettes.length){
        return response.status(404).json('No data found')
      } else {
        return response.status(200).json(palettes)
      }
    })
    .catch(() => response.sendStatus(500));
});

app.get('/api/v1/palettes/:id', (request, response) => {
  const { id } = request.params;
  database('palettes').where("id", id)
    .then(palette => {
      if(!palette){
        return response.status(404).send(`No data found with id of ${id}`);
      } else {
        return response.status(200).json(palette);
      }
    })
    .catch(() => response.sendStatus(500));
});

app.get('/api/v1/projects', (request, response) => {
  database('projects').select()
    .then((projects) => {
      if (!projects.length) {
        response.status(404).send('No data found');
      } else {
        response.status(200).json(projects)
      }
    })
    .catch(() => response.sendStatus(500));
});

app.get('/api/v1/projects/:id', (request, response) => {
  const { id } = request.params;
  database('projects').where("id", id)
    .then(project => {
      if(!project){
        return response.status(404).send(`No entry found with id of ${id}.`);
      } else {
        return response.status(200).json(project);
      }
    })
    .catch(() => response.sendStatus(500));
});

// POST

app.post('/api/v1/palettes', (request, response) => {
  const palette = request.body;
  const required = ['project_id', 'palette_name', 'color_1', 'color_2', 'color_3', 'color_4', 'color_5'];
  for (let param of required) {
    if (!palette[required]) {
      return response.status(422).send(`Expected format: {project_id: <Number>, palette_name: <String>, color_1: <String>, color_2: <String>, color_3: <String>, color_4: <String>, color_5: <String>}, but you are missing the ${param} parameter`)
    }
  }
  database('palettes').insert(palette, '*')
    .then(palette => response.status(201).json(palette[0]))
    .catch(() => res.sendStatus(500));
})

app.post('/api/v1/projects', (request, response) => {
const project = request.body;
const required = ['name'];
for (let param of required) {
  if (!project[required]) {
    return response.status(422).send(`Expected format: ${required}. You are missing ${param}.`)
  }
};
database('projects').insert(project, '*')
  .then(project => {
	  response.status(201).json(project[0]);
  })
  .catch(() => response.sendStatus(500))
});

// DELETE

app.delete('/api/v1/palettes/:id', (request, response) => {
  const { id } = request.params
  database('palettes').where("id", id).del()
    .then(() => { 
      if(!palette){
        return response.status(404).send(`No data found with id of ${id}`);
      } else {
        response.status(200).send(`Palette successfully deleted.`);
      }
    })
    .catch(() => response.sendStatus(500));
});


app.delete('/api/v1/projects/:id', (request, response) => {
  const { id } = request.params
  database('palettes').where("id", project_id).del()
    .then(() => {
      database('projects').where("id", id).del()
        .then(project => {
          if(!project) {
            return response.status(404).send(`No data found with id of ${id}`)
          } else {
            return response.status(204).send('Project deleted successfully')
          }
        })
        .catch(() => response.sendStatus(500))
    })
});


// PATCH

app.patch('/api/v1/projects/:id', (request, response) => {
  const {id} = request.params
  const project = request.body
  const required = ['name'];
  
  for (let param of required) {
			return response.status(422).send(`Expected format: ${required}. You are missing ${param}.`);
  }
  
  database('projects').where("id", id).update(project)
  .then(project => {
    if (!project) {
      response.status(404).send('No data found')
    } else {
      response.status(200).send('Project successfully updated')
    }
  })
  .catch(() => response.sendStatus(500))
});

app.patch('/api/v1/palettes/:id', (request, response) => {
    const { id } = request.params
    const palette = request.body
    const required = ['project_id','palette_name', 'color_1', 'color_2', 'color_3', 'color_4', 'color_5'];
    for(let param of required){
      return response.status(422).send(`Expected format: {project_id: <Number>, palette_name: <String>, color_1: <String>, color_2: <String>, color_3: <String>, color_4: <String>, color_5: <String>}, but you are missing the ${param} parameter`)
    }
  database('palettes').where("id", id).update(palette)
    .then(palette => {
      if (!palette) {
        response.status(404).send('No data found')
      } else {
        response.status(200).send('Project successfully updated')
      }
    })
    .catch(() => response.sendStatus(500))
});

module.exports = app
