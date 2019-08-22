const projects = require('../../../data/projects')
const palettes = require('../../../data/palettes');

const seedPalettes = (knex, palette) => {
  return knex('projects').where('id', palette.project_id).first()
    .then((project) => {
      return knex('palettes').insert({
        ...palette,
        project_id: project.id
      });
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
      return knex('projects').insert(projects);
    })
    .then(() => {
      let palettePromises = [];
      palettes.forEach(palette => {
        palettePromises.push(seedPalettes(knex, palette))
      })
      return Promise.all(palettePromises);
    })
    .then(() => console.log('seeding complete'))
    .catch((error) => {
      console.log(`error in seeding data: ${error.message}`);
    })
}