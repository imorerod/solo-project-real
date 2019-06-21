# KidSafe

KidSafe is an application for parents to directly manage who their kid can connect with via cell phone.

## Download (Don't Clone) This Repository

* Don't Fork or Clone. Instead, click the `Clone or Download` button and select `Download Zip`.
* Unzip the project and start with the code in that folder.
* Create a new GitHub project and push this code to the new repository.

## Prerequisites

Before you get started, make sure you have the following software installed on your computer:

- [Node.js](https://nodejs.org/en/)
- [PostrgeSQL](https://www.postgresql.org/)
- [Nodemon](https://nodemon.io/)

## Create database and tables

Start postgres if not running already by using `brew services start postgresql`

Create a new database called `kid-safe` and enter the following information into the SQL Query window:

```
CREATE TABLE "parent" (
    "id" SERIAL PRIMARY KEY,
    "username" VARCHAR (80) UNIQUE NOT NULL,
    "password" VARCHAR (1000) NOT NULL
);

CREATE TABLE "parent_child" (
	"id" SERIAL primary key,
	"parent_id" INT REFERENCES "parent",
	"child_id" INT REFERENCES "child"
);

CREATE TABLE "child_approved" (
	"id" SERIAL primary key,
	"child_id" INT REFERENCES "child",
	"approved_id" INT REFERENCES "approved"
);

CREATE TABLE "child_non_approved" (
	"id" SERIAL primary key,
	"child_id" INT REFERENCES "child",
	"non_approved_id" INT REFERENCES "non_approved"
);

CREATE TABLE "child" (
	"id" SERIAL PRIMARY KEY,
	"name" VARCHAR (80) NOT NULL,
	"number" VARCHAR (20) UNIQUE NOT NULL,
	"approved_id" INTEGER NOT NULL
);

CREATE TABLE "contacts" (
	"id" SERIAL PRIMARY KEY,
	"name" VARCHAR (80) UNIQUE NOT NULL,
	"number" VARCHAR (20) UNIQUE NOT NULL
);

CREATE TABLE "approved" (
	"id" SERIAL PRIMARY KEY,
	"name" VARCHAR (80) NOT NULL,
	"number" VARCHAR (20) NOT NULL
);

CREATE TABLE "non_approved" (
	"id" SERIAL PRIMARY KEY,
	"number" VARCHAR (20) UNIQUE NOT NULL,
	"time" TIMESTAMP NOT NULL,
	"child_id" INTEGER NOT NULL,
	"reviewed" BOOLEAN DEFAULT FALSE
);
```
## Installation

* Run `npm install`
* Run `npm run server`
* Run `npm run client`
* Navigate to `localhost:3000`