# Movie-Rental-Database
This is a full stack movie rental web application built using React + Vite for the frontend, Spring Boot for the backend, and MySQL for the database. This program allows users to create an account and log in, browse movies, rent movies, leave reviews, and more.

In terms of dependencies we used: 
axios, react, react-dom, react-router-dom, react-redux, tailwindcss, and vite for the front end(package.json). 

For backend(pom.xml) dependencies we used:
spring-boot-starter-webmvc
mysql-connector-j
lombok

# Instructions 

## Database 

* Install mysql and mysql workbench (make sure username is root)
* Create a database instance named exactly 'movierental'
* Make sure that the port number for MySQL is 3306 (which should be the default)

## Backend

* Launch the backend using intellij
* You must setup a custom configuration for running MovierentalApplication.java
  * CLI Arguments: --spring.profiles.active=dev
  * Environment variables: DB_PASSWORD=same_password_as_mysqlpassword

## Frontend

* cd into frontend on the terminal, then type in the command 'npm install'
* then run 'npm run dev'
* In your browser go to localhost:5173

# Important files

Schema sql script: Tables are created using a file named "schema.sql". This file is located in movierental/src/main/resources/schema.sql

Sql and JDBC queries: Java files under the package repository is where all the sql queries are located for each table. These files is located in movierental/src/main/java/com.backend.movierental/repositories/

Database Initialization Script: movierental/src/main/java/come.backend.movierental/configuration/DatabaseSeeder.java

# Admin Testing 

When the backend compiles, it automatically creates an admin user. These are the credentials
email: admin@example.com 
password: admin123



