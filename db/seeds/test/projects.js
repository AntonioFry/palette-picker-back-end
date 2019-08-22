// const projects = require('../../../data/projects');
// const randomColor = require('randomcolor');

const findPalette = (currentPalette) => {
  return palettesData.find(palette => {
    return palette.palette_name === currentPalette;
  })
}

// const findPalette = (currentPalette) => {
//   return palettesData.find(palette => {
//     console.log(currentPalette)
//     console.log(palette.palette_name)
//     return palette.palette_name === currentPalette;
//   })
// }

// const createPalette = (knex, palette) => {
//     return knex('palettes').insert(palette);
// }

// const createProject = (knex, project) => {
//   return knex('projects').insert({
//     "name": project.name
//   }, "id")
//   .then((projectId) => {
//     let palettePromises = [];

//     project.palettes.forEach(palette => {
//       const foundPalette = findPalette(palette);
//       palettePromises.push(
//         createPalette(knex, {
//           ...foundPalette,
//           project_id: projectId[0]
//         })
//       )
//     })

//     return Promise.all(palettePromises);
//   })
// }

// exports.seed = function(knex) {
//   return knex('palettes').del()
//     .then(() => knex('projects').del())
//     .then( async () => {
//       await knex.raw("TRUNCATE TABLE palettes RESTART IDENTITY CASCADE");
//       await knex.raw("TRUNCATE TABLE projects RESTART IDENTITY CASCADE");
//     })
//     .then(() => {
//       let projectsPromises = [];

//       projectsData.forEach(project => {
//         projectsPromises.push(createProject(knex, project))
//       });

//       return Promise.all(projectsPromises);
//     })
//     .then(() => console.log('seeding complete'))
//     .catch((error) => {
//       console.log(`error in seeding data: ${error.message}`);
//     })
// }


const projects = require('../../../data/projects')
const palettes = require('../../../data/palettes');

const seedPalettes = (knex, palette) => {
  return knex('projects').where('id', palette.project_id).first()
    .then((project) => {
      return knex('palettes').insert({...palette,
        project_id: project.id});
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
