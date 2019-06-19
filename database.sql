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
	"number" VARCHAR (12) NOT NULL
);

CREATE TABLE "non_approved" (
	"id" SERIAL PRIMARY KEY,
	"number" VARCHAR (20) UNIQUE NOT NULL,
	"time" TIMESTAMP NOT NULL,
	"child_id" INTEGER NOT NULL,
	"reviewed" BOOLEAN DEFAULT FALSE
);