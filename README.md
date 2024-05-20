

<img width="100%" alt="Screenshot 2024-05-20 at 11 43 04 PM" src="https://github.com/Vijaykv5/Unigram/assets/94985341/69e935f2-fec7-45ab-9a46-a027b363d790">




# UNIGRAM
A closed platform for college students to share their thoughts, ideas, and projects. It includes features such as User Authentication, Real-time chats, posts and a Admin Dashboard for managing posts and channels. 

## Users 


https://github.com/Vijaykv5/Unigram/assets/94985341/158917b7-385f-4d2c-acb2-690f46a1d08c



## Admin

https://github.com/Vijaykv5/Unigram/assets/94985341/e3b69a31-6545-45ae-87c4-b18c586d235a


## Installation Guide

### Requirements
- [Nodejs](https://nodejs.org/en/download)
- [Mongodb](https://www.mongodb.com/docs/manual/administration/install-community/)

Both should be installed and make sure mongodb is running.
### Installation
Fork this repo : https://github.com/Vijaykv5/Unigram
#### First Method
```shell
git clone https://github.com/your-user-name/Unigram
cd Unigram
```
Now Create an env file .env for your Mongodb String
```shell
cd server
export MONGODB_URL="<Your-MongoDb-String>"
cd ..
```

Now install the dependencies
```shell
cd client
npm install
cd ..
cd server
npm install
```
We are almost done, Now just start the development server.

For Frontend.
```shell
cd client
npm start
```
For Backend.

Open another terminal in folder, Also make sure mongodb is running in background.
```shell
cd server
npm start
```
Done! Now open localhost:5173 in your browser.
<br/>
You can see your frontend running sucessfully!

#### Second Method
- This method requires docker and docker-compose to be installed in your system.
- Make sure you are in the root of your project and run the following command.

```shell
docker compose build --no-cache
```
after the build is complete run the containers using the following command
```shell
docker compose up
```
now open localhost:5173 in your browser.


# Contributions are welcome! 

Please create and work over the issues if you would love to contribute to this project.

Happy coding ⭐
