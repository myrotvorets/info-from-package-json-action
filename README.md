# info-from-package-json-action

![Build and Test](https://github.com/myrotvorets/info-from-package-json-action/workflows/Build%20and%20Test/badge.svg)

This action gathers some information from `package.json` to make it available to other actions.

## Inputs

  * `workingdir`: Directory with package.json (default: current working directory)

## Outputs

  * `packageName`: `name` from `package.json`
  * `packageVersion`: `version` from `package.json`
  * `packageDescription`: `description` from `package.json`
  * `packageHomepage`: `homepage` from `package.json`
  * `packageBugsUrl`: `bugs.url` from `package.json`
  * `packageScmUrl`: `repository.url` from `package.json`

## Example usage

TBD
