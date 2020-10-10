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

```yaml
- name: Retrieve information from package.json
  uses: myrotvorets/info-from-package-json-action@1.0.0
  id: ver
```

It can be useful, for example, together with [sonarcloud-github-action](https://github.com/SonarSource/sonarcloud-github-action):

```yaml
- name: Retrieve information from package.json
  uses: myrotvorets/info-from-package-json-action@0.0.2
  id: ver

- name: SonarCloud Scan
  uses: SonarSource/sonarcloud-github-action@master
  env:
    GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
    SONAR_TOKEN: ${{ secrets.SONAR_TOKEN }}
  with:
    args: >
      -Dsonar.projectName=${{ steps.ver.outputs.packageName }}
      -Dsonar.projectVersion=${{ steps.ver.outputs.packageVersion }}
      -Dsonar.links.homepage=${{ steps.ver.outputs.packageHomepage }}
      -Dsonar.links.issue=${{ steps.ver.outputs.packageBugsUrl }}
      -Dsonar.links.scm=${{ steps.ver.outputs.packageScmUrl }}
```
