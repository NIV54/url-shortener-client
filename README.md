# Nice URL - Client

Highly secured URL Shortener demo app.  
The purpose of this app is to show a real life example of a website that has users, and how it handles stuff like permission, authentication, API calls etc.

You can see a live example in [https://niceurl.vercel.app](https://niceurl.vercel.app).  
To see your short url in action, create one then with the given alias go to [https://niceurl.herokuapp.com/](https://niceurl.herokuapp.com/)your-alias (make sure to enter an alias after the server url)

> Note: this is part of a two repo project.  
> For the server see [https://github.com/niv54/url-shortener-server](https://github.com/niv54/url-shortener-server)

## Specs

Ordinary `React.js` app written in `Typescript` and bootstrapped with `create-react-app`.  
All the security related code is self implemented.  
The semi-looking *real time updates* are done with the help of the wonderful `react-query`.  
Styling is done with `bootstrap`.  
State management is done with the help of the `@redux/toolkit`.  

## What does this app offer?

### Security Wise

* Sign Up / Login  - username + password based
* Secured CRUD on short urls of each user
  * Create a URL
  * Update a URL
  * See all URLs that belong to the logged in user
  * Delete a URL
* JWT based authentication
  * Refresh token included
* Guest Login
  * allows to create short urls that do not belong to any user

### Client

* Smart redirects (based on server response)
* Input validation
* Indicative error messages (based on server response)
* An amazing table

## Run Me!

* Create an env variable that holds the server url under the name `REACT_APP_BACKEND_URL`
* `npm run build`
* `npm start`

You should see your app load on [http://localhost:3000](http://localhost:3000)
