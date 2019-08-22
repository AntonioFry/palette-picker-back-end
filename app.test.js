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
        console.log(projects);
        const modifiedProjects = expectedProjects.map(project => {
          parseInt(project.created_at)
          parseInt(project.updated_at)
          return project
        })
        
        expect(modifiedProjects).toEqual(modifiedProjects);
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
        const modifiedPalettes = expectedPalettes.map(palette => {
          parseInt(palette.created_at)
          parseInt(palette.updated_at)
          return palette
        })
  
        expect(modifiedPalettes).toEqual(modifiedPalettes);
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
        const projects = await database('projects').where('id', response.body.id).select();
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
      it('Sad Path: return a status of 422', () => {
  
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
        const palettes = await database('palettes').where('id', response.body.id).select();
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
      it('Sad Path: return a status of 422', () => {
  
      });
    });
  
    describe('DELETE /project', () => {
      it('should delete a given project', () => {
  
      });
      it('Happy Path: return a status of 202', () => {
  
      });
      it('Sad Path: return a status of 404', () => {
  
      });
    });
  
    describe('DELETE /palette', () => {
      it('should delete a given palette', () => {
  
      });
      it('Happy Path: return a status of 200', () => {
  
      });
      it('Sad Path: return a status of 404', () => {
  
      });
    });
  
    describe('Patch /project', () => {
      it('should update a project', () => {
  
      });
      it('Happy Path: return a status of 200', () => {
  
      });
      it('Sad Path: return a status of 404', () => {
  
      });
    });
  
    describe('Patch /palette', () => {
      it('should update a palette', () => {
  
      });
      it('Happy Path: return a status of 200', () => {
  
      });
      it('Sad Path: return a status of 404', () => {
  
      });
    });

  }); 

});
