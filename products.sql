--create database--
DROP DATABASE IF EXISTS bamazon;
CREATE DATABASE bamazon;

USE bamazon;

--create table to store product info--
CREATE TABLE products(
  id INT NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(30),
  department_name VARCHAR(30),
  price DECIMAL(10,2) NULL,
  stock_quantity INT NULL,
  PRIMARY KEY(id)
);

--add content to table--
INSERT INTO products(product_name,department_name,price,stock_quantity)
VALUES ("I love cats mug","home and kitchen",14.32,17);

INSERT INTO products(product_name,department_name,price,stock_quantity)
VALUES ("The Road","books",13.52,20);

INSERT INTO products(product_name,department_name,price,stock_quantity)
VALUES ("Orthopedic dog bed","pets",54.80,23);

INSERT INTO products(product_name,department_name,price,stock_quantity)
VALUES ("Force FXT graphics card","electronics",315.20,15);

INSERT INTO products(product_name,department_name,price,stock_quantity)
VALUES ("Tims mini projector","electronics",54.80,21);

INSERT INTO products(product_name,department_name,price,stock_quantity)
VALUES ("giant stuff polar bear","toys",66.10,32);

INSERT INTO products(product_name,department_name,price,stock_quantity)
VALUES ("squeak ball","pets",7.90,28);

INSERT INTO products(product_name,department_name,price,stock_quantity)
VALUES ("Delexa","electronics",124.40,26);

INSERT INTO products(product_name,department_name,price,stock_quantity)
VALUES ("science lab starter kit","science",34.47,32);

INSERT INTO products(product_name,department_name,price,stock_quantity)
VALUES ("stars ceiling stickers","decor",21.39,13);

