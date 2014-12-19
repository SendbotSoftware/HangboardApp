HangboardApp
============

Hangboarding webapp to help you send all those super hard projects.

How to run project:
1) Pull down latest code
2) Navigate into HangboardApp project
3) Get latest node_modules (npm install OR sudo npm install)
4) DEBUG=HangboardApp ./bin/www [this will fire up the server on port 3000]

The server will need to get terminated and restarted every time changes are made to the code. For this reason, it's
recommended that 'nodemon' is installed (sudo npm install -g nodemon), and used to fire up the server.

5) nodemon ./bin/www