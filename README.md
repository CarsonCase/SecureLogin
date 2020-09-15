# SecureLogin
A simple NodeJS/MonboDB web server that can sign up and log-in users. User passwords are salted and hashed with bcrypt for security and server is hosted on HTTPS. Error handling terrible and probably introduces a slew of vulnerabilities on it's own but for this version I really just was excited to be able to get a whole practically (for a small user base) secure database up and running in one night. 

TO RUN:
-First run the bash script httpskeys.sh to generate your servers https keys

-Next uncomment line 21 in Index.js and add your MongoDb connection string

-Finally run Index.js with "node index.js" and visit your server on it's running port (8080 by default)
