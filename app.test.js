const supertest = require('supertest');
const app = require('./app');
const environment = process.env.NODE_ENV || 'development';
const configuration = require('./knexfile') [environment];
const database = require('knex')(configuration);

describe('App', () => {

  beforeEach(async () => {
    await database.seed.run()
  })

  describe('GET api/v1/projects', () => {
    it('should return all projects', async () => {
      const expectedProjects = await database('projects').select();
      const response = await request(app).get('/api/v1/project');

      const projects = response.body;

      expect(projects).toEqual(expectedProjects);
    });

    it('Happy Path: return a status of 200', async () => {
        const response = await request(app).get('/projects');

        expect(response.status).toBe(200);
    });
  });
  describe('GET /palettes', () => {
    it('should return all palettes', () => {
      
    });

    it('Happy Path: return a status of 200', () => {

    });
  });
  describe('GET /projects/:id', () => {
    it('should return a specific project', () => {

    });
    it('Happy Path: return a status of 200', () => {

    });
  });
  describe('GET /palette/:id', () => {
    it('should return a specific palette', () => {

    });
    it('Happy Path: return a status of 200', () => {

    });
  });
  describe('POST /project', () => {
    it('should post a new project', () => {

    });
    it('Happy Path: return a status of 201', () => {

    });
    it('Sad Path: return a status of 422', () => {

    });
  });
  describe('POST /palette', () => {
    it('should post a new palette', () => {

    });
    it('Happy Path: return a status of 201', () => {

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
