HangboardApp
============

Hangboarding webapp to help you send all those super hard projects.

# How to run project:
1. Clone the project to your computer
2. Navigate into HangboardApp project
3. Get latest node_modules (<code>npm update</code> OR <code>sudo npm update</code>)
4. <code>DEBUG=HangboardApp ./bin/www</code> [this will fire up the server on <b>port 3000</b>]

The server will need to get terminated and restarted every time changes are made to the code. For this reason, it's
recommended that <code>nodemon</code> is installed (<code>sudo npm install -g nodemon</code>), and used to fire up the server.

5. <code>nodemon ./bin/www</code>

# Setup mongo
1. Install mongo on your developer machine using standard mongo installation instructions (e.g. <code>brew install mongo</brew>)
2. Fire up an instance of mongod
3. Open the mongo shell, and ensure a <code>climb</code> db is created
4. Within that <code>climb</code> db, ensure that a <code>workouts</code> collection is created
5. Insert some dummy data into the collection
6. You should see workout data load when you open up the app in your browser