const path = require('path');
const root_folder = __dirname;
let configPath = 'configurations/';

module.exports = {
  root_folder: root_folder,
  configPath: configPath,
  fullConfigsPath: path.resolve(root_folder, configPath),
  env: 'development',
  appName: 'Novicell Frontend', // name for webapp
  appColor: '#ffffff', // color for webapp icons
  appDescription: 'Novicell Progressive WebApp',
  modulesDir: root_folder + '/src/_base/modules/*.js',
  output: {
    scripts: path.resolve(root_folder, 'dist/scripts/'),
    css: path.resolve(root_folder, 'dist/css/')
  }
};