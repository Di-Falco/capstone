# Movie Rental Website

### by Anthony DiFalco

## Project Overview

A website inspired by moviemadness.org and dedicated to the lost era of the video rental store.

The landing page will be styled using bootstrap and custom styles. Landing page display is tbd, but will use some universal components such as a header with a nav bar and a footer with mock store information. The site will have a database of movies in the inventory, including a details page for each movie with in-depth information and a poster image. Additional pages will include a list of upcoming screenings based on TMDB's trending movie data and a user login with some features included in the stretch goals

### Technologies:

* React
* Firebase (FireStore)
* TMDB API
* Bootstrap

## Stretch Goals

* Add extra features to user accounts, possible profile personalization, history of rented titles, display page for favorite movies, etc.
* Similarly, add user data to movie details pages, including user ratings/review, comments, etc.
* Add custom displays for film based on the film's format, i.e. movies on VHS would appear differently from films on DVD
* Add a page where users can watch the 1963 movie _Charade_, which was entered into the public domain immediately upon its release owing to a loophole in the copyright laws at the time and is viewable in its entirety on its own wikipedia article
* Incorporate functionality from letterboxd.com to connect users with their pre-exisiting movie logs and profile personalization
* more TBD

### Additional Technologies:

* Letterboxd API
* SASS / SCSS

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

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

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Project History

### 9/16/2022 10:00 - 16:30 (6:30)

* 10:00 - 11:30 Set up create-react-app with placeholder components for displaying the movie list and movie detail pages
* 11:30 - 12:00 Write first draft of project proposal
* 12:30 - 13:00 Look into API fetch with React
* 13:00 - 13:30 Install Tailwind, then second guess my decision and look into alternatives
* 13:30 - 14:00 Start setting up routes with React router dom
* 14:00 - 14:30 Set up basic nav bar to incorporate routes
* 14:45 - 15:30 Clean up navbar styles
* 15:30 - 16:30 Take pen & paper inventory of my movie collection to gather database seed data
* Continually updated styles to get an idea for layout.

### 9/21/2022 12:00 - 12:30, 18:00 - 19:00, 19:30 - 20:45 (3:15)

* Spend close to 4 hours after class 9/20 researching database hosting options (azure with c# api backend, mongodb with node api backend)
* Revert commit after deciding to stick with firebase for simplicity...
* 12:00 - 12:30 update navbar to use react bootstrap
* 18:00 - 19:00 WIP: configure firebase/firestore
* 19:30 - 20:00 add firestore
* 20:00 - 20:45 do some light styling, as a treat
* Ongoing: Check movie db seed data spreadsheet for accuracy

### 9/22/2022 21:00 - 22:00 (1:00)

* 21:00 - 22:00 Manual data entry

### 9/25/2022 16:30 - 

* 16:30 - 17:15 Set up node app to import movie list data to firebase (458 movies)
* 17:15 - 18:30 Set up first draft of a function for automatically retrieving data for any new movie entries from tmdb