# To Start
- npm init
     - structure server as necessary.
       - app.js
       - description: learning basics of a server build

# What do we want to build?
We are going to build a quick server that will allow us to store information on a small apartment complex.  The information that we want to capture will be:
  - Unit Number
  - Number of Bedrooms
  - Cost of Rent
  - Is it Occupied

## What is there to consider? What do we need?
  - a place to store this information.
  - a way to communicate with it.
    - This could be add, changing, obtaining, and even removing information.
  - to detail the information that we want to store.

We'll need to install some dependencies.

## Dependencies:
dotenv: `npm install dotenv`
express: `npm install express`
sequelize: `npm install sequelize`
pg & pg-hstore: `npm install pg pg-hstore`

Group install:
`npm install dotenv express sequelize pg pg-hstore`

Injected into **package.json**
`"scripts"`
- start: `node app.js`
- dev: `nodemon`
```
"devDependencies": {
    "nodemon": "^2.0.7"
}
```
run `npm install` to make sure everything is up to date.

### Quick Overview of what these dependencies are doing:
Our main ones to focus on will be `express sequelize pg pg-hstore`.  
- **EXPRESS** is an API that we are injecting into our Node.js build that provides us access to toolsets (methods) to handle the tasks we are trying to accomplish such as routing various requests and responding to them as necessary.
- **PG** and **PG-HSTORE** is Pg-Admin, an open source database where we will be storing our information.
- **SEQUELIZE** is another API that provides us another set of tools to help us communicate between our application and the database associated with it.  
- **NODEMON** is a tool that helps restart our server each time we make changes and save them.  This is just a useful because while we are building, we don't have to constantly start our server up just to see if something worked.
- **DOTENV** is our last little tool that is both for our protection when collaborating on a project and storing useful details such as a Password for our PgAdmin connection.

### Quick Resources:
- [What is Sequelize](https://medium.com/the-javascript-dojo/introduction-to-sequelize-1cbfc2d2d1bf)
- [What is Nodejs](https://www.freecodecamp.org/news/what-exactly-is-node-js-and-why-should-you-use-it-8043a3624e3c/)
- [Express](https://expressjs.com/)

# Start Building    
- Start app.js
  - Start running port connection
  - introduce .env (PORT)
- db.js
  - connect to PgAdmin
- models
  - Build structure
- Controllers
  - Postman

# Connecting to a Port
## Step 1:
**app.js**
- We need to connect to a port so that we can eventually connect it to our PgAdmin. Establishing this first makes sense
  - `app.js 3`: We're creating a few variables here, the first being one that pulls in 'express' so we can capture any dependencies within the express api.
  - `app.js 4`: A simple variable to make console.logging a little easier.
  - `app.js 6`: Similiar to our log varaibale, we are creating a variable that allows us to access the express method and target anything within it.
  - `app.js 8`: Middleware function within express that parses incoming requests.  It will return this parsed JSON. If no body is there to parse, it will throw an error.
  - `app.js 10-12`: an express method (.listen(port, cb)) that starts up our server from the first argument and then starts a callback function.  In this case, our function is just console.logging a string that we've hard coded in there.
## Step 2:
**.env & app.js**
  - `.env 1`: PORT = 3002
  - `app.js 2`: We are requiring our dotenv variable and using the config method within it to connect our complete application to our .env file.  This will allow us to store environmental variables within the .env file and let us source those whenever we need.  
  - `app.js 15-17`: We are requiring our dotenv variable and using the config method within it to connect our complete application to our .env file.  This will allow us to store environmental variables within the .env file and let us source those whenever we need.  

Now, we did this to make our job easier.  Let's consider if we were working with another developer or a team of developers.  We may want to do this because it's easier to find one location to change some information rather than multiple locations.  We can also customize these variables for our local machines as we desire without concern of really messing up the base code.
  
## Step 3:
**db.js & app.js**