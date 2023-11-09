# Installing Node.js

On Windows: https://www.geeksforgeeks.org/installation-of-node-js-on-windows/?ref=lbp
or Linux: https://www.geeksforgeeks.org/installation-of-node-js-on-linux/?ref=lbp

# Managing Node versions using NVM

https://www.freecodecamp.org/news/node-version-manager-nvm-install-guide/
https://github.com/coreybutler/nvm-windows/releases

nvm install 19
nvm use ...

# React App

## Available Scripts

In the project directory, you can run:

### `npm start netlify dev`

Runs the app in the development mode.\
Open [http://localhost:8888](http://localhost:8888) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### Analyzing the Bundle Size

Tools to inspect the bundle size and composition: https://medium.com/@joeclever/three-simple-ways-to-inspect-a-webpack-bundle-7f6a8fe7195d

#### Webpack Analyzer

1. Execute `node_modules/.bin/webpack --profile --json | Out-file 'webpack-stats.json' -Encoding OEM`
2. Uploade or Drag & Drop the result file into the Webpack Analyzer https://webpack.github.io/analyse/
