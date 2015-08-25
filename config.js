'use strict';

module.exports = (logger) => {
  const env = require('common-env/withLogger')(logger);
  return env.getOrElseAll({
    api: {
      endpoint: 'https://circleci.com/api/v1',
      token: 'my-circleci-token'
    },
    projects: {
      filter: {
        // user or organization name
        'username': 'fgribreau'
      }
    }
  });
};
