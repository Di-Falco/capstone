# H1 Video

#### By Anthony DiFalco

_A React webpage for my personal video rental store_ 

#### View the project at <a href='https://movie-db-bd74b.web.app/'>this link</a>

### Table of Contents

[Technologies Used](#technologies-used)  

[Capstone Proposal](#capstone-proposal)
 
[Description](#description)

[Setup/Installation Requirements](#setup-and-installation-requirements)

[Known Bugs](#known-bugs) 

### Technologies used

* React
* Javascript
* Firestore / Firebase
* CSS / SASS

### Capstone Proposal 

_The project is a database of my home video collection set up to emulate a movie rental website. Concept takes inspiration from Portland's Movie Madness video rental store and is meant as a memorial to the late greats: Blockbuster, Hollywood Video, and all the family-run video stores that used to be a cornerstone of american life. Theme takes inspiration from one of my VCRs_

<!-- ![Main app image.]() -->

### Description 


_The webpage is a React application set up with create-react-app. It uses a Firebase database to store a list of ~450 movies with a dozen or so fields like title, overview, poster url, and video formats. Most information is gathered from TMDB's API and then assigned to the database. Currently supports user authentication, but the only features requiring authorization are some tools meant to help me seed database information from the API. All movies are from my collection, the API is only used to seed data to the Firestore db and get images._ 

_Ongoing goals:_
* _Add "purchase" functionality_
* _Add user profile customization_
* _Create seperate search for movies outside of the db_
* _Add user interactions (ratings, likes / dislikes) to movie detail pages_
* _Add functionality for admin users to add edit and delete movies from the site_
* _Refactor nearly everything (stylesheet esp)_

### Setup and installation Requirements

<details>
<summary>Setup</summary>

* Visit the firebase page at https://movie-db-bd74b.web.app/

_OR:_

* Fork this repository from github: https://github.com/Di-Falco/capstone to your desktop

* Navigate to the top level of the directory.

* In your terminal `$npm install`

* Run the app `$npm run start`

* Only the hosted site can access the movie db. Setup instructions for your own Firestore database in the works...

</details>

## Known Bugs

* Firebase hosting has some issues presenting the webpage
* Views are only formatted for a narrow range of screen sizes

## Contact Information 

_Feel free to reach out via [github](https://github.com/Di-Falco)_
_Or by email at aodifalco@gmail.com_
