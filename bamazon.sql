DROP DATABASE IF EXISTS bamazon;
CREATE DATABASE bamazon;

USE bamazon;

-- CREATE TABLE PRODUCTS


CREATE TABLE products (
item_id INT NOT NULL AUTO_INCREMENT,
product_name VARCHAR(225) NOT NULL,
department_name VARCHAR(225) NOT NULL,
price DECIMAL(10,2) NOT NULL,
stock_quantity INT NOT NULL,
product_sales DECIMAL(10,2) NULL,
PRIMARY KEY(item_id)
);

-- CREATE TABLE DEPARTMENTS

CREATE TABLE departments (
department_id INT NOT NULL AUTO_INCREMENT,
department_name VARCHAR(225) NOT NULL,
over_head_costs INT NOT NULL,
PRIMARY KEY(department_id)
);

-- INSERT INTO PRODUCTS QUERY

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
("CeraVe Foaming Facial Cleanser 12oz", "skin care", 10.49, 40),
("cookies", "food", 2.45, 50),
("soap", "skin care", 4.00, 25),
("Some Harry Potter Book", "books", 20.99, 20),
("baby bottles", "baby", 2.00, 100);

-- INSERT INTO DEPARTMENT QUERY

INSERT INTO departments (department_name, over_head_costs)
VALUE("kid shoes", 2000),
("nutrition", 2000),
("books", 2000),
("baby furniture", 2000),
("baby health", 2000),
("home", 2000),
("pet care", 2000),
("electronics", 2000),
("skin care", 2000),
("grocery", 2000),
("food", 2000),
("baby", 2000);

-- QUERY FOR 3RD CHALLENGE
select 
	d.department_id,  
    d.department_name, 
    d.over_head_costs, 
	IFNULL(sum(p.product_sales), 0) as product_sales,
	IFNULL(sum(p.product_sales), 0) - IFNULL(d.over_head_costs, 0) as total_profit
from departments d
left join products p
on d.department_name = p.department_name
group by d.department_id;


-- SELECT TABLE QUERIES
select * from departments;
select * from products;