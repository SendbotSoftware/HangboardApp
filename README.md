HangboardApp
============

Hangboarding webapp to help you send all those super hard projects.

## How to run project:
1. Clone the project to your computer
2. Navigate into HangboardApp project
3. Get latest node_modules (<code>npm update</code> OR <code>sudo npm update</code>)

## Starting up the node server
There are three ways to go about achieving this:
1. <code>DEBUG=HangboardApp ./bin/www</code> [this will fire up the server on <b>port 3000</b>. The server will need to be restarted when any code is changed.]
2. <code>nodemon ./bin/www</code> [this will fire up the server on <b>port 3000</b> and auto-refresh the server when code changes are made]
3. <code>node-debug ./bin/www</code> [this will allow node server code to be debugged in the separate browser tab that gets spawned]

## Setup mongo
1. Install mongo on your developer machine using standard mongo installation instructions (e.g. <code>brew install mongo</brew>)
2. Fire up an instance of mongod
3. Open the mongo shell, and ensure a <code>climb</code> db is created
4. Within that <code>climb</code> db, ensure that a <code>workouts</code> collection is created
5. Insert some dummy data into the collection
6. You should see workout data load when you open up the app in your browser
