![Open Classroooms](https://github.com/thierry-laval/archives/raw/master/images/Logo_OpenClassrooms.png?raw=true)
# Groupomania - version 2 [ 🚧 Under construction ]

Second version about my old school project **Groupomania**. 
The goal here is to compare what i did 1 year ago with what i do today.

You can find initial project [here](https://github.com/bengar-dev/Groupomania).

### 💻 Features

- Register & auth page.
- User profil, possibility to edit and disable his own profil.
- Publication page will display all publications. You will be able to post, edit and delete you owns publications.
- Commentaries linked to publications, user will be able to comment, edit and delete his owns commentaries.
- Likes/Dislikes system.
- Administrator Role to moderate all publications and comments from user's app.

### 📀 Stack

- Node.js
- TypeScript
- Express
- Prisma
- Vite
- React
- Tailwind

### 🪛 Install

Stack is installed on 🐋 Docker, it's recommanded to use it.

**1. Using docker**

On root folder launch : ```npm run reset```
*This will build and launch application.*

If you have already build app you can launch : ```npm run restart```
*This will only launch application.*

**2. Without docker**

This way is not recommended because it might have some difference between dependencies and compatibilities.

- **Backend API**
    Go on your terminal, and position on back folder. Then execute ```npm install```.
    If you don't have nodemon install globaly then do it by ```npm i -g nodemon```
    When everything is installed you can launch : ```npm run dev``` 

- **Frontend**
    On your terminal, go on front folder. Then execute ```npm install```
    When install is finished you can launch the app by : ```npm run dev```