How to use: 

1.	Clone repository from github 

2.	Ensure Node.js is installed:  https://nodejs.org/en/download/

3.	Open route.js 
Add your 64 base encoded authentication at line 36 and line 64 in either of the following forms: 
email:password
OR
email/token: apitoken
e.g maddison.ippolito@gmail.com/token:r6v82634jgakjfahkbcfsaud



4.	Open the teminal and Install xml requests
 $ npm install xmlhttprequest


5.	Open the route directory and run the server 
$ node server.js


6.	Open browser of your choice and navigate to local host:8000

7.	Use next and prev buttons to look through tickets in pages of 25 


Other notes:

-	I chose to used mainly vanilla node.js .
-	Lodash is used for the pick function to help extract necessary data from tickets .
-	Test are not in working order due to running out of time , the file test.js is there to give you some idea of where my logic was headed. This challenge has taught me the importance of writing tests first 
-	You can use any accounts basic login 
