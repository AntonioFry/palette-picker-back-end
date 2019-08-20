const projects = require('');
const palettes = require('');

const seedPalettes = (knex, palette) => {
  return knex('projects').where('id', palette.project_id).first()
    .then((project) => {
      return knex('palettes').insert({
        project_id: project.id,
        palette_name: palette.palette_name,
        color_1: palette.color_1,
        color_2: palette.color_2,
        color_3: palette.color_3,
        color_4: palette.color_4,
        color_5: palette.color_5,
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
