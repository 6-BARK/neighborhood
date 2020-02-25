DROP DATABASE IF EXISTS listings;
CREATE DATABASE listings;

USE listings;

CREATE TABLE neighborhoods (
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    value_shift INT NOT NULL,
    predicted_shift INT NOT NULL,
    zestimate INT NOT NULL,
    walk_score INT NOT NULL,
    transit_score INT NOT NULL,
    
    PRIMARY KEY(id)
);

CREATE TABLE houses (
    id INT NOT NULL AUTO_INCREMENT,
    user INT NOT NULL REFERENCES users(id),
    neighborhood INT NOT NULL REFERENCES neighborhoods(id),
    map VARCHAR(255) NOT NULL,
    price INT NOT NULL,
    sqft INT NOT NULL,
    beds INT NOT NULL,
    baths INT NOT NULL,
    street_address INT NOT NULL,
    street_name VARCHAR(255) NOT NULL,
    city VARCHAR(255) NOT NULL,
    state VARCHAR(255) NOT NULL,
    zip_code VARCHAR(255) NOT NULL,
    
    PRIMARY KEY(id)
);

CREATE TABLE users (
    id INT NOT NULL AUTO_INCREMENT,
    username VARCHAR(255) NOT NULL,
    hash VARCHAR(255) NOT NULL,
    salt VARCHAR(255) NOT NULL,
    
    PRIMARY KEY(id)
);

LOAD DATA LOCAL INFILE '/home/ubuntu/sdc/neighborhood/houses.csv'
INTO TABLE houses
FIELDS TERMINATED BY ','
LINES TERMINATED BY '\n'
IGNORE 1 ROWS
(id, user, neighborhood, map, price, sqft, beds, baths, street_address, street_name, city, state, zip_code);

LOAD DATA LOCAL INFILE '/home/ubuntu/sdc/neighborhood/neighborhoods.csv'
INTO TABLE neighborhoods
FIELDS TERMINATED BY ','
LINES TERMINATED BY '\n'
IGNORE 1 ROWS
(id, name, value_shift, predicted_shift, zestimate, walk_score, transit_score);

LOAD DATA LOCAL INFILE '/home/ubuntu/sdc/neighborhood/users.csv'
INTO TABLE users
FIELDS TERMINATED BY ','
LINES TERMINATED BY '\n'
IGNORE 1 ROWS
(id, username, hash, salt);

