# circleci-build [![Deps](https://david-dm.org/FGRibreau/circleci-build.png)](https://david-dm.org/FGRibreau/circleci-build) [![Version](http://badge.fury.io/js/circleci-build.png)](https://david-dm.org/FGRibreau/circleci-build) [![Version](https://travis-ci.org/FGRibreau/circleci-build.svg)](https://travis-ci.org/FGRibreau/circleci-build) [![Downloads](http://img.shields.io/npm/dm/circleci-build.svg)](https://www.npmjs.com/package/circleci-build)

Little script that triggers a build for every projects related to Github username or organization.

# usage

```shell
npm install circleci-build
cd ./node_modules/circleci-build-every-projects
API_TOKEN="circleci-token" PROJECTS_FILTER_USERNAME="github-orga-or-username" npm start
```
