[![Build Status](https://travis-ci.org/rehret/pips.svg?branch=master)](https://travis-ci.org/rehret/pips)
[![Coverage Status](https://coveralls.io/repos/github/rehret/pips/badge.svg?branch=master)](https://coveralls.io/github/rehret/pips?branch=master)
[![FOSSA Status](https://app.fossa.io/api/projects/git%2Bgithub.com%2Frehret%2Fpips.svg?type=shield)](https://app.fossa.io/projects/git%2Bgithub.com%2Frehret%2Fpips?ref=badge_shield)

# Pips
>Pips are dots indicating a unit of numerical value on dice or dominoes

A tiny service which returns dice rolls for a given d20 string (ex: "1d6")

## Getting Started
#### Prerequisites
[NodeJS](https://nodejs.org/) is required. It can be installed [here](https://nodejs.org/en/download/).

This project uses [yarn](https://yarnpkg.com) in place of npm. Follow [these instructions](https://yarnpkg.com/en/docs/install) to install yarn globally.

> Warning: Windows users should not install [yarn](https://yarnpkg.com) via NPM, instead use the [downloadable](https://yarnpkg.com/latest.msi) MSI executable.

Once installed, yarn is used to install all dependencies.
```bash
yarn install
```

#### Local Development
```bash
yarn develop
```

#### Running
```bash
yarn build
yarn start
```

#### Testing
```bash
yarn test
```

## Contributing
Make sure you have [tslint](https://www.npmjs.com/package/tslint) installed globally. This project is linted before each build. All code contributions should have zero linting errors.

Also, install [EditorConfig](http://editorconfig.org/) in your editor. This will help keep a consistent code style throughout the project.

This project makes use of [GitHub Flow](https://guides.github.com/introduction/flow/). As such, work should be done on a feature branch and a pull request opened against `master` once the work is complete. Feature branches should following the naming convention `feature/<feature-name>`.

## Pull Request Process
Pull requests will undergo a technical and functional review. After both reviews have passed, and given that the base and feature branches are correct (as stated above), the pull request will be merged by the maintainer.

#### Issues
- Before opening a new [GitHub issue](https://github.com/rehret/pips/issues), please search the existing issues to see if it has already been reported.
- When opening a new issue, please provide as much detail as possible, including, but not limited to: the full error message, file name and line number, and steps to reproduce.
- Please avoid adding "+1" comments to issues. Instead, add the :+1: reaction to the orignal issue message.

#### Versioning
Version numbers will follow [SemVer](https://semver.org/) versioning:
> Major.Minor.Patch

For example, this is a valid version number:
> 1.2.345

Any changes that affect the major, minor, or patch versioning should have a tag pushed to `origin` with the SemVer version (consisting of major, minor, and patch).
For example, if the project was at version `0.1.0` and it was decided that it was ready for official release, the tag `1.0.0` would be pushed to origin at that commit.

## License
See [LICENSE](LICENSE)


[![FOSSA Status](https://app.fossa.io/api/projects/git%2Bgithub.com%2Frehret%2Fpips.svg?type=large)](https://app.fossa.io/projects/git%2Bgithub.com%2Frehret%2Fpips?ref=badge_large)