'use strict';
const logger = require('winston');
const when = require('when');
const debug = require('debug')('CIRCLECIBUILD');
const request = require('request-when');
const config = require('./config')(logger);

const USERNAME = config.projects.filter.username;

when.map(when.filter(listProjects(), filterBuildsByUsernameOrOrganisation), startBuild).then(projects => {
  projects.forEach((project) => logger.info('Triggered a build for %s', project.reponame));

  if (projects.length === 0) {
    throw new Error(`No projects where found matching "${USERNAME}", are you sure you configured everything?`);
  }
}).otherwise(throws);

/////////////
// helpers //
/////////////

function listProjects() {
  return _callCircle('GET', '/projects');
}

function startBuild(project) {
  return _callCircle('POST', `/project/${project.username}/${project.reponame}/tree/master`);
}

function filterBuildsByUsernameOrOrganisation(project) {
  var lusername = project.username.toLowerCase();
  var rusername = USERNAME.toLowerCase();

  debug((lusername === rusername ? `Selecting ${lusername} for build` : `Skipping ${lusername} for build`) + `\t${lusername} === ${rusername}`);
  return lusername === rusername;
}

function _callCircle(httpMethod, path) {
  return request({
    url: config.api.endpoint + path,
    method: httpMethod,
    qs: {
      'circle-token': config.api.token
    },
    json: true
  });
}

function throws(err) {
  // don't let when catch this exception we want to crash the app
  process.nextTick(function () {
    throw err;
  });
}
