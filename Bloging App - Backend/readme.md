migrate the db from mongo to postgres.


**Database**    
**UsersCollection** :
firstname,
lastName,
username,
password,
isAdmin : true or false

**BlogsCollection** :
title,
description,
date,
createBy : ref"usersCollection" - username

**Routes**
**USER ROUTES** :
POST    -  api/v1/users/signup  -  can create an account
POST    -  api/v1/users/login   -  login to their account
PUT     -  api/v1/users/update  -  users can update the account details
DELETE  -  api/v1/users/remove  -  users can delete their account

**SERVICE ROUTES** :
POST   -  api/v1/service/create    -  users can create a blog
PUT    -  api/v1/service/update    -  users can update blogs created by them
GET    -  api/v1/service/myBlogs   -  users can view all the blogs added by them
DELETE -  api/v1/service/remove    -  users can delete blog added by them
GET    -  api/v1/service/allBlogs  -  users can view all the blogs on the app
GET    -  api/v1/service/search    -  users can search for a specific user and their blogs

**ADMIN ROUTES** :
DELETE  -  api/v1/admin/removeBlog  -  admins can remove blogs added by them and the blogs added byt he normal users
DELETE  -  api/v1/admin/removeUser  -  admins can remove/delete a users acc from this app
GET     -  api/v1/admin/allUsers    -  admins can view all the users on this app