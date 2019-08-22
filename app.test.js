const request = require('supertest');
const app = require('./app');
const environment = process.env.NODE_ENV || 'development';
const configuration = require('./knexfile') [environment];
const database = require('knex')(configuration);

describe('App', () => {

  describe('init', () => {
    it('should return a 200 status', async () => {
      const res = await request(app).get('/')
      expect(res.status).toBe(200)
    })
  })

  describe('API', () => {

    beforeEach(async () => {
      await database.seed.run()
    })
  
    describe('GET /api/v1/projects', () => {
      
      
      it('should return all projects', async () => {
        const expectedProjects = await database('projects').select();
        
        const response = await request(app).get('/api/v1/projects');
        const projects = response.body;
        
        expect(expectedProjects.length).toEqual(projects.length);
      });
  
      it('Happy Path: return a status of 200', async () => {
          const response = await request(app).get('/api/v1/projects');
  
          expect(response.status).toBe(200);
      });
    });
  
    describe('GET /api/v1/palettes', () => {
      it('should return all palettes', async () => {
        const expectedPalettes = await database('palettes').select();
  
        const response = await request(app).get('/api/v1/palettes');
        const palettes = response.body;
  
        expect(expectedPalettes.length).toEqual(palettes.length);
      });
  
      it('Happy Path: return a status of 200', async () => {
        const response = await request(app).get('/api/v1/palettes');
  
        expect(response.status).toBe(200);
      });
    });
  
    describe('GET /api/v1/projects/:id', () => {
      it('should return a specific project', async () => {
        const response = await request(app).get('/api/v1/projects/1');
        const projectId = response.body[0].id
  
        expect(projectId).toBe(1)
      });
  
      it('Happy Path: return a status of 200', async () => {
        const response = await request(app).get('/api/v1/projects/1');

        expect(response.status).toBe(200)
      });
  
    });
  
    describe('GET /api/v1/palettes/:id', () => {
      it('should return a specific palette', async () => {
        const response = await request(app).get('/api/v1/palettes/1');
        const projectId = response.body[0].id

        expect(projectId).toBe(1)
      });
      it('Happy Path: return a status of 200', async () => {
        const response = await request(app).get('/api/v1/palettes/1');

        expect(response.status).toBe(200)
      });
    });
  
    describe('POST /api/v1/projects', () => {
      it('should post a new project', async () => {
        const newProject = {
          name: "Dog Party"
        }

        const response = await request(app).post('/api/v1/projects').send(newProject);
        const projects = await database('projects').where('id', response.body[0]).select();
        const project = projects[0];

        expect(project.name).toEqual(newProject.name);
      });
      it('Happy Path: return a status of 201', async () => {
        const newProject = {
          name: "Dog Party"
        }

        const response = await request(app).post('/api/v1/projects').send(newProject);

        expect(response.status).toBe(201)
      });
      it('Sad Path: return a status of 422', async () => {
        const newProject = {
          
        }

        const response = await request(app).post('/api/v1/projects').send(newProject);

        expect(response.status).toBe(422)
      });
    });
  
    describe('POST /api/v1/palettes', () => {
      it('should post a new palette', async () => {
        const newPalette = {
          palette_name: "Plain Colors",
          color_1: "#800000",
          color_2: "#FC1501",
          color_3: "#F87531",
          color_4: "#FF8000",
          color_5: "#FFCC11"
        }

        const response = await request(app).post('/api/v1/palettes').send(newPalette);
        const palettes = await database('palettes').where('id', response.body[0]).select();
        const palette = palettes[0];

        expect(palette.palette_name).toEqual(newPalette.palette_name);
      });
      it('Happy Path: return a status of 201', async () => {
        const newPalette = {
          palette_name: "Plain Colors",
          color_1: "#800000",
          color_2: "#FC1501",
          color_3: "#F87531",
          color_4: "#FF8000",
          color_5: "#FFCC11"
        }

        const response = await request(app).post('/api/v1/palettes').send(newPalette);

        expect(response.status).toBe(201);
      });
      it('Sad Path: return a status of 422', async () => {
        const newPalette = {
          palette_name: "Plain Colors",
          color_2: "#FC1501",
          color_3: "#F87531",
          color_4: "#FF8000",
          color_5: "#FFCC11"
        }

        const response = await request(app).post('/api/v1/palettes').send(newPalette);

        expect(response.status).toBe(422);
      });
    });
  
    describe('DELETE /api/v1/projects', () => {
      it('Happy Path: return a status of 202', async () => {
        const projectId = await database('projects').first('id');
        const response = await request(app).delete(`/api/v1/projects/${projectId.id}`)

        expect(response.status).toBe(204)
      });
      it('Sad Path: return a status of 404', () => {
  
      });
    });
  
    describe('DELETE /api/v1/palettes', () => {
      it('Happy Path: return a status of 200', async () => {
        const paletteId = await database('palettes').first('id');
        const response = await request(app).delete(`/api/v1/palettes/${paletteId.id}`)
  
        expect(response.status).toBe(204)
      });
      it('Sad Path: return a status of 404', () => {
  
      });
    });
  
    describe('PATCH /api/v1/project/:id', () => {
      it('should update a project', async () => {
        const updatedProjects = {
          name: "Dog Party",
        }

        const response = await request(app)
          .patch("/api/v1/projects/1")
          .send(updatedProjects);
        const projects = await database('projects').where('id', 1).select();
        const project = projects[0];


        expect(project.name).toEqual(updatedProjects.name);
      });
      it('Happy Path: return a status of 200', async () => {
        const updatedProjects = {
          name: "Dog Party",
        }

        const response = await request(app)
          .patch("/api/v1/projects/1")
          .send(updatedProjects);

        expect(response.status).toBe(200);
        expect(response.text).toBe("Project successfully updated");
      });
      it('should return a status of 422 if missing parameter', async () => {
        const updatedProjects = {
          name: null
        }
        const response = await request(app)
          .patch("/api/v1/projects/6")
          .send(updatedProjects);

        expect(response.status).toBe(422);
      });
      it('SAD PATH: should return status of 404', async () => {
        const updatedProjects = {
          name: "Dog Party",
        }

        const response = await request(app)
          .patch("/api/v1/projects/6")
          .send(updatedProjects);

        expect(response.status).toBe(404)
      })
    });

    describe('PATCH /api/v1/palette/:id', () => {
      it('should update a palette', async () => {
        const updatedPalette = {
          palette_name: "Boring Colors",
          color_1: "#800000",
          color_2: "#FC1501",
          color_3: "#F87531",
          color_4: "#FF8000",
          color_5: "#FFCC11"
        }
        const response = await request(app)
          .patch("/api/v1/palettes/1")
          .send(updatedPalette);
        const palettes = database('palettes').where("project_id", 1).select();

        const palette = palettes[0];
        
        expect(palette.palette_name).toEqual(updatedPalette.palette_name);
      });
      it('Happy Path: return a status of 200', async () => {
        const updatedPalette = {
          palette_name: "Boring Colors",
          color_1: "#809000",
          color_2: "#FC1501",
          color_3: "#F87531",
          color_4: "#FF8000",
          color_5: "#FFCC11"
        }
  
        const response = await request(app).patch('/api/v1/palettes/1').send(updatedPalette);

        expect(response.status).toBe(200);
        expect(response.text).toBe("Palette successfully updated");
      });
      it('Sad Path: return a status of 404', async () => {
        const updatedPalette = {
          palette_name: "Boring Colors",
          color_1: "#809000",
          color_2: "#FC1501",
          color_3: "#F87531",
          color_4: "#FF8000",
          color_5: "#FFCC11"
        }

        const response = await request(app).patch('/api/v1/palettes/6').send(updatedPalette);

        expect(response.status).toBe(404)
      });

      it('should return a status of 422 if missing parameter', async () => {
        const updatedPalette = {
          color_1: "#800000",
          color_3: "#F87531",
          color_4: "#FF8000",
          color_5: "#FFCC11"
        }
        const response = await request(app)
          .patch("/api/v1/palettes/1")
          .send(updatedPalette);
        expect(response.status).toBe(422);
      })
    });
  });
});
       //change in app.js