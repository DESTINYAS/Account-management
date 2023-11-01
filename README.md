Account MANAGEMENT APPLICATION.

Welcome to my  account management application! This system is designed basically to do the following :
(1) Open a unique ten digit account number for a user. The user is only required to provide his details and account type. The system authomatically generates a unique 10 digit account number and save all the information in a mongodb then synchronizes it to postgresdb ie also saves it in a postgresdb. There is also endpoint to get all accounts and get accounts by id.

Installation and Usage
(1) Clone the repository: git clone https://github.com/DESTINYAS/Account-management.git
(2) Navigate to the project directory
(3) Install dependencies: npm install
(4) Create a .env file and add informations as indicated in the .env.copy file.
(5) You can then run the application using: npm start
(8) Once the application is running you can access the API swagger documentation on your browser via http://localhost:3000/api/  

Note
(1) The hosted application swagger url(on AWS) can be reached on http://16.171.113.129/api/#/
(2) The site was designed with Nodejs and Express so you must have nodejs installed to run it.
(4) To run the docker file cd into the docker folder, then into docker-compose folder. Use the command docker-compose up and this will connect to the databases ie mongodb and postgresdb.
(5) You must have docker install on your system or you can use online version to be able to run the docker
