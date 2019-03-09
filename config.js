const path = require('path');
const root_folder = __dirname;
// vars
const configPath = 'configurations/'
const fullConfigsPath = path.resolve(root_folder, configPath);
const dist = path.resolve(root_folder + '/dist/');
const sourceRootFolder = path.resolve(root_folder + '/src/');

const mainSettings = {
  env: 'development',
  modulesDir: root_folder + '/src/Modules/**/*.js',
  assetsDir: root_folder + '/assets/',
  dist,
}

module.exports = {
  root_folder: root_folder,
  mainSettings,
  sourceRootFolder,
  configPath,
  fullConfigsPath: fullConfigsPath,
  componentsDir: {
    main: root_folder + '/src/',
    atoms: '01-atoms',
    molecules: '02-molecules',
    organisms: '03-organisms',
    pages: '04-pages',
  }
};
