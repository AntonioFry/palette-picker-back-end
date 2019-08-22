const projectsData = require('../../../data/testProjects')
const palettesData = require('../../../data/testPalettes');

const findPalette = (currentPalette) => {
  return palettesData.find(palette => {
    return palette.palette_name === currentPalette;
  })
}

const createPalette = (knex, palette) => {
  return knex('palettes').insert(palette);
}

const createProject = (knex, project) => {
  return knex('projects').insert({
    "name": project.name
  }, "id")
    .then((projectId) => {
      let palettePromises = [];

      project.palettes.forEach(palette => {
        const foundPalette = findPalette(palette);
        palettePromises.push(
          createPalette(knex, {
            ...foundPalette,
            project_id: projectId[0]
          })
        )
      })

      return Promise.all(palettePromises);
    })
}

exports.seed = function (knex) {
  return knex('palettes').del()
    .then(() => knex('projects').del())
    .then(async () => {
      await knex.raw("TRUNCATE TABLE palettes RESTART IDENTITY CASCADE");
      await knex.raw("TRUNCATE TABLE projects RESTART IDENTITY CASCADE");
    })
    .then(() => {
      let projectsPromises = [];

      projectsData.forEach(project => {
        projectsPromises.push(createProject(knex, project))
      });

      return Promise.all(projectsPromises);
    })
    .then(() => console.log('seeding complete'))
    .catch((error) => {
      console.log(`error in seeding data: ${error.message}`);
    })
}

