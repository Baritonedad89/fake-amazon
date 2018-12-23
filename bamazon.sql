DROP DATABASE IF EXISTS bamazon;
CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products (
item_id INT NOT NULL AUTO_INCREMENT,
product_name VARCHAR(225) NOT NULL,
department_name VARCHAR(225) NOT NULL,
price DECIMAL(5,2) NOT NULL,
stock_quantity INT NOT NULL,
PRIMARY KEY(item_id)
);

INSERT INTO products (product_name, department_name, price,
stock_quantity)
VALUE("UGG Kids K Neumall II Pull-on Boot, Black, 6 M US Big Kid", "kid shoes", 109.95, 25),
("Jarrow Formulas Curcumin 95, 500 mg, 60 Count", "nutrition", 12.70, 100),
("Cracking the Coding Interview: 189 Programming Questions and Solutions", "books", 38.00, 50),
("100% Cotton Super Soft Crib Sheet", "baby furniture", 19.99, 75),
("Little Martin's Drawer Baby Nasal Aspirator", "baby health", 35.98, 80),
("BONECO Acqua Pro 2-in-1 Humidifer Filter A250", "home", 19.99, 20),
("Halo Grain Free Natural Dry Dog Food", "pet care", 38.17, 30),
("FurHaven Pet Dog Bed","pet care", 22.42, 15),
("AmazonBasics USB 3.1 Type-C to HDMI Adapter", "electronics", 16.99, 10),
("CeraVe Foaming Facial Cleanser 12oz", "skin care", 10.49, 40)
