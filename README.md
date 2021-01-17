# Shoppies App
This project is using create-react-app. It is a boilerplate that comes with built in webpack, bundle. jest, etc. Site is deployed on heroku at [https://cp-shoppies.herokuapp.com/](https://cp-shoppies.herokuapp.com/)

##### Acceptance Criteria
- [x] Search results should come from OMDB's API (free API key: http://www.omdbapi.com/apikey.aspx)
- [x] Each search result should list at least its title, year of release and a button to nominate that film
- [x] Updates to the search terms should update the result list
- [x] Movies in search results can be added and removed from the nomination list
- [x] If a search result has already been nominated, disable its nominate button
- [x] Display a banner when the user has 5 nominations

### Starting the App in Development
This app can be started using npm.
```
npm start
```

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will update in real time if you make edits.\
You will also see any lint errors in the console.

### Additional Features Added
* Implemented localstorage to perserve current nomination list of movies in the event of disconnections, refreshes, or navigating away and back
* The URL is a sharable link that will query both the search results and nomination list
