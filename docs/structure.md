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
Because we have set up all of our dependencies, let's create a `.gitignore` file.  Inside of this file, we're going to simply put in there: `node_modules`.  This will tell GitHub to ignore this folder completely so that we are not backing up a whole bunch of files.  Our `package.json` will reference everything that we will need in case we need to reinstall at a later date.

- We need to connect to a port so that we can eventually connect it to our PgAdmin. Establishing this first makes sense
  - `app.js 3`: We're creating a few variables here, the first being one that pulls in 'express' so we can capture any dependencies within the express api.
  - `app.js 4`: A simple variable to make console.logging a little easier.
  - `app.js 8`: Similiar to our log varaibale, we are creating a variable that allows us to access the express method and target anything within it.
  - `app.js 10`: Middleware function within express that parses incoming requests.  It will return this parsed JSON. If no body is there to parse, it will throw an error.
  - `app.js 12-14`: an express method (.listen(port, cb)) that starts up our server from the first argument and then starts a callback function.  In this case, our function is just console.logging a string that we've hard coded in there.
## Step 2:
**.env & app.js**
We going to create a file called `.env`.  While we're here, let's also include this file as one of those items that GitHub ignores.  Inside of `.gitignore`, below the node modules, let's include `*.env`.

Inside of `.env`:
  - `.env 1`: PORT = 3002
  - `app.js 2`: We are requiring our dotenv variable and using the config method within it to connect our complete application to our .env file.  This will allow us to store environmental variables within the .env file and let us source those whenever we need.  
  - `app.js 17-19`: We are requiring our dotenv variable and using the config method within it to connect our complete application to our .env file.  This will allow us to store environmental variables within the .env file and let us source those whenever we need.  

Now, we did this to make our job easier.  Let's consider if we were working with another developer or a team of developers.  We may want to do this because it's easier to find one location to change some information rather than multiple locations.  We can also customize these variables for our local machines as we desire without concern of really messing up the base code.
  
## Step 3:
**db.js & app.js**
We need to connect what we have with PgAdmin.  We're going to create a file called `db.js` and build a simple function to do this.  
We are actually using `sequelize`, 

Inside `db.js`:
- `db.js 1`: We are creating a variable using Object destructuring and targeting the main class of Sequelize.
- `db.js 3`: We created a variable called **db** that constructs a connections to PgAdmin.  In this case, we are needing to highlight `location://user:password@url/database-name`.  For us, this looks like the code we input.

Inside of `.env`:
- `.env 2`: PASS = [USERPASSWORD]
- `.env 3`: PGDB = aptServer

This is important because we now can share our code without sharing our password.  We also have freed up the Database name so that whomever else works on it can point it to where they need to.  All that would need to be done is for them to create a `.env` file and include these variables.

Inside of `db.js`:
- `db.js 5`: In order for us to access this file, we need to export it.  With this being the only function we are going to export the variable **db**.

Insdie of `app.js`:
- `app.js 25-34`: .authenticate() is a promise, which means that we can follow it up with **.then**.  We are reaching out, then we attempt to **sync**, then we console log some feedback, OR we catch the error that comes back to us, logging that so we can respond.
  - In this case, we do have an error.  This is true since we never created a space for it in PgAdmin.  We'll need to do that now.

[Create a DB within PgAdmin that matches the name of the PGDB variable in `.env`]

We should now see
```
Executing (default): SELECT 1+1 AS result
Executing (default): SELECT 1+1 AS result
App is running on 3002
```

This is letting us know that we have a connection.  Looks like we're ready to make up a model.

## Step 4
**Creating a Model**
The model is how we shape our information that we are wanting to store.  Think of an excel sheet.  We can house columns to detail a type of information that we want such as **Name**, **address**, **phone number**, etc.  The only difference here is that we have to tell our database what that looks like exactly.

First, let's create a folder called **models**.  Inside of this folder, we're going to create two files: one called `index.js` and the other `apartments.js`.  We're going to look at `apartment.js` first.

Let's first highlight what we want to capture and what kind of data they will require:

- Unit Number (STRING)
- Number of Bedrooms (INTEGER)
- Cost of Rent (INTEGER)
- Occupied (BOOLEAN)

- `apartment.js 1`: We are pulling the Datatypes class that provides us access to the various data types that are available from sequelize.  
- `apartment.js 2`: We are requiring the `db.js` file so that we can ultimately sync up with our tables.  
- `apartment.js 4`: Creating a variable called `Apt` where we are connecting our db, using a define method to detail what our table looks like.  In this case, we are injecting the model (or table) name, follwoed by an object with our various sets of information.  
- `apartment.js 6-20`: We name the model key, in this case - `unit, beds, rent, occupied`.  These keys hold various sets of information, mainly their types of data.  There is also another key/value pair here that detail whether or not this information is required.  

**Why would we want a field to be required?**
What if a user were to register without a password?  Wouldn't be very secure.  If this were a table that housed all our user information and how they logged in and didn't keep their password or allowed a blank field, this could breaking for the application.

In our case, it simply doesn't make sense for at least 3 of these fields to be empty.  We could make them all required if we wanted.  

- `apartment.js 24`: Just like the `db.js` file, in order for us to access this model, we need to export it.

Before we can actually see anything, we have to call upon it.  
- `model/index.js 1-3`: We are exporting an object where the key/value pair notes our model.
- `app.js 22`: Let's create a variable for our model that pulls it in.
  - The **index.js** is a base file that we have within our folder, in this case, the model folder, where node is intuitive enough to see that first and search for any exports here.  This is incredible useful as we build multiple models within a project, we can target one specific location.

Opening up PgAdmin, we can see our table has been generated.  We can also see this being displayed within our terminal.  *notice that our table was actually titled "apartments" instead of "apartment" per our model.  This is a feature of Sequelize that is making it plural.  There is a way to turn this off per the docs, but I'll leave that up to you to find.  Just know that some naming conventions may sound odd.

## Step 5 
**Controller-POST**
## Step 5 
**Controller-POST**