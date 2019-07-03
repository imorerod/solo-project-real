# KidSafe

_Duration: 2 week sprint_

Parents try to keep their kids close in public to know they are safe. In the same way, keeping kids safe as they interact with technology is important. Blocking numbers parents don’t want contacting their kid could be exhausting. What if parents could set a certain list of approved numbers and only those numbers can connect to the kid.

Enter, KidSafe. Kidsafe is an application that allows parents to proactively approve numbers, as well as monitor incoming calls that need to be approved first. In this first sprint, I built out the API to support this functionality. In future sprints, I will be creating the mobile application that benefits from this APIs data. Kidsafe is a tool for parents to help protect their kids, and because of that, it was a joy to work on.

## Prerequisites

Before you get started, make sure you have the following software installed on your computer:

- [Node.js](https://nodejs.org/en/)
- [PostrgeSQL](https://www.postgresql.org/)
- [Nodemon](https://nodemon.io/)

## Create database and tables

Start postgres if not running already by using `brew services start postgresql`

Create a new database in termianl, `create db kid-safe` and enter the following information, (Postico used) into the SQL Query window:

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

## Questions? I would love to connect!
Email - [idm9191@gmail.com](mailto:idm9191@gmail.com)

