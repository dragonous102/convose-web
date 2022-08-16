# This is the repository of the Convose Web Application

## Developer guides

### Run the app (Requires Git, Node 10+ and NPM)

1. Clone this repository `git clone git@github.com:I-am-Josh/convose-web` (ssh) or `git clone https://github.com/I-am-Josh/convose-web` (basic auth)
2. Install dependencies `npm i` or `yarn start` (within the convose-web directory)
3. Run the app `npm run start` or `yarn start`

### Develop the app

1. Clone the repository as above.
2. Create a feature or bugfix branch, eg `git checkout -b feature/my-fancy-new-feature`
3. Make changes on the new branch
4. Stage the changes `git add .`
5. Commit the changes, with a comment describing the changes made `git commit -m "Added a shiny new button!"`
6. Push changes to the remote respository `git push -u origin feature/my-fancy-new-feature`
7. Repeat steps 3 - 5 as necessary.
8. Consecutive pushes `git push`
9. Create Pull Request from `https://github.com/I-am-Josh/convose-web/pull/new/feature/my-fancy-new-feature`, adding helpful comments and reviewers. Creating a PR onto the master branch will trigger a 'deploy preview' build through netlify hooks. The deploy preview's url can be found in the 'Checks' tab of the PR.
10. Once the Pull Request is approved by reviewers and the deploy preview has been tested, merge the PR into master. This will trigger a netlify hook that builds the master branch onto the production environment.

## Repository Overviews

This repository contains the actual responsive web app.

- [legacy-convose-app](https://github.com/i-am-josh/legacy-convose-app)
  contains the backend code
- [convose-native](https://github.com/i-am-josh/convose-native)
  contains the React Native App

## Tech Stack

In this repository, we are using:

- React
- redux
- styled components

we are currently not doing any UNIT-tests, but plan to do so in the future. Right now, code style is maintened through the use of Prettier.

## Deployment/Infrastructure

Currently, the master is always deployed to netlify. Current Status:

[![Netlify Status](https://api.netlify.com/api/v1/badges/92024eb8-dcf3-4c9c-9f81-f9e3c9fef390/deploy-status)](https://app.netlify.com/sites/convose/deploys)
