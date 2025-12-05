# Movie-Rental-Database
This is a full stack movie rental web application built using React + Vite for the frontend, Spring Boot for the backend, and MySQL for the database. This program allows users to create an account and log in, browse movies, rent movies, leave reviews, and more.

In terms of dependencies we used: 
axios, react, react-dom, react-router-dom, react-redux, tailwindcss, and vite for the front end(package.json). 

For backend(pom.xml) dependencies we used:
spring-boot-starter-webmvc
mysql-connector-j
lombok

# Instructions 

Make sure you 'git clone' this project in your desired directory

## Database 

* Install mysql and mysql workbench for macOS
    * Go to dev.mysql.com/downloads/mysql
    * Select operating system as macOS
    * Select OS Version depending on whether you are on ARM Chip or Intel Chip
    * Download DMG archive and go through installation steps and enter in root password that you can easily remember
    * Now you need to install mysql workbench. Go to dev.mysql.com/downloads/workbench
    * Go to system settings on mac. Scroll all the way down on the left panel and you should see mySQL. CLick on it and you will see that the instance is running.
    * Open mysql workbench and log in into local instance 3306 
* Create a database instance named exactly 'movierental'
* Make sure that the port number for MySQL is 3306 (which should be the default)
* Windows installation should be very similar to mac

## Backend

* Launch the backend using intellij
* You must setup a custom configuration for running MovierentalApplication.java
  * Go to MovierentalApplication.java
  * <img width="657" height="218" alt="image" src="https://github.com/user-attachments/assets/b9b77c7c-8732-4d4c-b0cc-4539b3e499d5" />
  * Click on the three dots and click edit to make a custom configuration
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



