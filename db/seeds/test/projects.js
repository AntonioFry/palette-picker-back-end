const projects = require('../../../data/projects');
const randomColor = require('randomcolor');
const testData = require('../../../data/testData')

const seedPalettes = (knex, palette) => {
  return knex('projects').where('id', palette.project_id).first()
    .then((project) => {
      return knex('palettes').insert({
        project_id: project.id,
        palette_name: palette.palette_name,
        color_1: randomColor,
        color_2: randomColor,
        color_3: randomColor,
        color_4: randomColor,
        color_5: randomColor,
      });
    })
}

exports.seed = function(knex) {
  return knex('palettes').del()
    .then(() => knex('projects').del())
    .then( async () => {
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
