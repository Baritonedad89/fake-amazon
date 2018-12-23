DROP DATABASE IF EXISTS manager_profiles;
CREATE DATABASE manager_profiles;

USE manager_profiles;

CREATE TABLE logins (
    id INT NOT NULL AUTO_INCREMENT,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    user_name VARCHAR(30) NOT NULL,
    password VARCHAR(50) NOT NULL,
    PRIMARY KEY(ID)
);