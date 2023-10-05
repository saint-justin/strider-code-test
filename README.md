# Strider Orders Code Test

## Notes to reviewer

Howdy! Welcome to the README. Some of what's in here is boiler plate from create-react-app, but some of it will be specific notes from the dev (Justin) to clarify parts of the system. 

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.


## Notes:

Usually I wouldn't use create-react-app for my default, I'd probably use something like nano-react-app to use Vercel + Webpack and beacuse of that some of the things I do here may not be optimized for this setup (e.g. tree shaking isn't enabled but  I still use the `import { part } from 'lib';` format.) I'm mostly just looking to get something up and running and would worry about optimizations later.
