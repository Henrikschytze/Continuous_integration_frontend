#! /usr/bin/env node

const fs = require('fs');
const args = require('minimist')(process.argv.slice(2));
const chalk = require('chalk');
const options = require('../../config');

const log = console.log;

const componentsDir = options.componentsDir.main;

// Templates
function getAtomTemplate(name) {
  return `
<h3 class="title">{{ greeting }}</h3>
<div class="{{ class }}">{{ introduction }}</div>
`;
}

function getAtomJSON(name) {
  return `
{
    "title": "Component",
    "status": "prototype",
    "context": {
        "greeting": "Hi from ${name} component",
        "introduction": "${name} component was generated by Novicell-generator"
    }
    }
`;
}

function getMoleculeTemplate(name) {
  return `
<div class="">
    <h3>{{ greeting }}</h3>
    {{#if condition }}
        <div class="">
            {{ render '@image' image }}
        </div>
    {{/if}}
    <div class="">
        {{#block "content"}}
        <p>{{ box.content }}</p>
        {{/block}}
    </div>
</div>
`;
}

function getMoleculeJSON(name) {
  return `
{
    "title": "Molecule",
    "status": "prototype",
    "context": {
        "greeting": {
            "text": "Hello from ${name} molecule"
        },
        "image": {
            "url": "...",
            "alt": "Image"
        },
        "box": {
            "content": "Box content from ${name}",
            "url": "..."
        }
    }
}
`;
}

function getOrganismTemplate(name) {
  return `
<div class="container">
    <div class="row">
        <div class="">
            {{ render '...' text1 }}
        </div>
        <div class="">
            {{ render '...' text2 }}
        </div>
    </div>
</div>
`;
}

function getOrganismJSON(name) {
  return `
{
    "title": "Organism",
    "status": "prototype",
    "context": {
        "text1": {
            "heading": {
                "text": "${name} Organism"
            },
            "textBoxContent": "The Pattern Library is based on the Atomic Design method by Brad Frost."
        },
        "text2": {
            "heading": {
                "text": "${name} Organism"
            },
            "textBoxContent": "Build using our own tools and best practices for building websites."
        },
    }
}
`
}

function getPageTemplate(name) {
  return `
{{ render '@header' }}

<div class="">
    <h1 class="{{ modifier }} {{ class }}">{{ text }}</h1>
</div>

<script defer src="{{ path '...' }}"></script>

{{ render '@footer' }}
`;
}

function getPageJSON(name) {
  return `
{
    "title": "Page",
    "status": "prototype",
    "context": {
        "url": "...",
        "alt": "Image",
        "text": "Hi from${name} Page"
    }
}
`
}
// Helpers
function createDir(dir) {
  // Check if the folder exits, if not - create one
  console.log(dir);

  if (!fs.existsSync(dir)) {
    checkAndCreateDestinationPath(dir);
    log(chalk.bgGreen(`Created folder in ${dir}`));
  }
}

function checkAndCreateDestinationPath(fileDestination) {
  const dirPath = fileDestination.split('/');
  dirPath.forEach((element, index) => {
    const joined = dirPath.slice(0, index + 1).join('/');
    if (!fs.existsSync(joined)) {
      fs.mkdirSync(joined);
    }
  });
}

const writeFile = function (filetype, dir, data, name) {
  fs.writeFile(`${dir}/${name}.${filetype}`, data, {
    flag: 'wx'
  }, (err) => {
    if (err) {
      log(chalk.bgRed(`File already exits for ${name}`));
      return;
    }
    log(chalk.bgGreen(`${name}.${filetype} was created`));
  });
}
const dataCss = '/* Insert css here */';

function createAtom(name) {
  const dir = `${componentsDir}/${options.componentsDir.atoms}/${name}`;
  createDir(dir);
  // Create the hbs.file
  writeFile('hbs', dir, getAtomTemplate(name), name);
  writeFile('config.json', dir, getAtomJSON(name), name);
  writeFile('css', dir, dataCss, name);
}

function createMolecule(name) {
  const dir = `${componentsDir}/${options.componentsDir.molecules}/${name}`;
  createDir(dir);

  writeFile('hbs', dir, getMoleculeTemplate(name), name);
  writeFile('config.json', dir, getMoleculeJSON(name), name);
  writeFile('css', dir, dataCss, name);
}

function createOrganism(name) {
  const dir = `${componentsDir}/${options.componentsDir.organisms}/${name}`;
  createDir(dir);

  writeFile('hbs', dir, getOrganismTemplate(name), name);
  writeFile('config.json', dir, getOrganismJSON(name), name);
  writeFile('css', dir, dataCss, name);
}

function createPage(name) {
  const dir = `${componentsDir}/${options.componentsDir.pages}/${name}`;
  createDir(dir);

  writeFile('hbs', dir, getPageTemplate(name), name);
  writeFile('config.json', dir, getPageJSON(name), name);
  writeFile('css', dir, dataCss, name);
}

const type = args.t;
const name = args.n;

if (!type || !name) {
  log(chalk.red('Both type and name must be specificed - look in readme for more information'));
  return;
}
switch (type) {
  case 'a':
    createAtom(name);
    break;
  case 'm':
    createMolecule(name);
    break;
  case 'o':
    createOrganism(name);
    break;
  case 'p':
    createPage(name);
    break;
  default:
    log(chalk.red('Could not recognize the type'));
    break;
}