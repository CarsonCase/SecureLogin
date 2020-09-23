# SecureLogin
UPDATE:
Made Sept 22 2020,
I was taking a web development and after learning how to use mongoDB and thought "hey I bet I can make a password storage thing". What I didn't know is that 5 chapters later I would learn how to actually do user authentication. So this was kinda my homemade authentication (minus sessions...). I guess I will upload the other version as a fork

Sept 15 2020,
A simple NodeJS/MonboDB web server that can sign up and log-in users. User passwords are salted and hashed with bcrypt for security and server is hosted on HTTPS. Error handling is terrible and probably introduces a slew of vulnerabilities on it's own but for this version I really just was excited to be able to get a whole practically (for a small user base) secure database up and running in one night. 

TO RUN:
-First run the bash script httpskeys.sh to generate your servers https keys

-Next uncomment line 21 in Index.js and add your MongoDb connection string

-Finally run Index.js with "node index.js" and visit your server on it's running port (8080 by default)
