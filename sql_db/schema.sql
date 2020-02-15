DROP DATABASE IF EXISTS listings;
CREATE DATABASE listings;

USE listings;

CREATE TABLE neighborhoods (
    id INT NOT NULL AUTO_INCREMENT,
    name CHAR NOT NULL,
    value INT NOT NULL,
    predict INT NOT NULL,
    zestimate INT NOT NULL,
    walk INT NOT NULL,
    transit INT NOT NULL,
    
    PRIMARY KEY(id)
);

CREATE TABLE houses (
    id INT NOT NULL AUTO_INCREMENT,
    neighborhood INT NOT NULL REFERENCES neighborhoods(id),
    map CHAR NOT NULL,
    price INT NOT NULL,
    sqft INT NOT NULL,
    beds INT NOT NULL,
    baths INT NOT NULL,
    user INT NOT NULL REFERENCES users(id),
    address CHAR NOT NULL
);

CREATE TABLE users (
    id INT NOT NULL AUTO_INCREMENT,
    username CHAR NOT NULL,
    hash CHAR NOT NULL,
    salt CHAR NOT NULL
);