CREATE DATABASE tinystoredatabase02;

CREATE TABLE users(
    id SERIAL PRIMARY KEY,
    name VARCHAR(50),
    email TEXT,
    password TEXT
);

INSERT INTO users (name, email, password)
    VALUES ('joe', 'joe@ibm.com', 'joex'),
            ('ryan','ryan@bip.com', 'ryanx');


SELECT * FROM users;            