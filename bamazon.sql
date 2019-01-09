DROP DATABASE IF EXISTS bamazon;
CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products (
item_id INT NOT NULL AUTO_INCREMENT,
product_name VARCHAR(225) NOT NULL,
department_id INT NOT NULL,
price DECIMAL(6,2) NOT NULL,
stock_quantity INT NOT NULL,
product_sales DECIMAL(6,2)  NULL,
PRIMARY KEY(item_id)
);

USE bamazon;


CREATE TABLE departments (
department_id INT NOT NULL AUTO_INCREMENT,
department_name VARCHAR(225) NOT NULL,
over_head_costs INT NOT NULL,
PRIMARY KEY(department_id)
);

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
("grocery", 2000);


INSERT INTO products (product_name, department_id, price, stock_quantity)
VALUE("UGG Kids K Neumall II Pull-on Boot, Black, 6 M US Big Kid", 1, 12.70, 25),
("Jarrow Formulas Curcumin 95, 500 mg, 60 Count", 2, 12.70, 100),
("Cracking the Coding Interview: 189 Programming Questions and Solutions", 3, 38.00, 50),
("100% Cotton Super Soft Crib Sheet", 4, 19.99, 75),
("Little Martin's Drawer Baby Nasal Aspirator", 5, 35.98, 80),
("BONECO Acqua Pro 2-in-1 Humidifer Filter A250", 6, 19.99, 20),
("Halo Grain Free Natural Dry Dog Food", 7, 38.17, 30),
("FurHaven Pet Dog Bed",7, 22.42, 15),
("AmazonBasics USB 3.1 Type-C to HDMI Adapter", 8, 16.99, 4),
("CeraVe Foaming Facial Cleanser 12oz", 9, 10.49, 40),
("cookies", 10, 2.45, 50),
("soap", 9, 4.00, 25),
("Some Harry Potter Book", 3, 20.99, 20),
("baby bottles", 5, 2.00, 100);


select  *
from departments d
left join products p
on d.department_name = p.department_name
group by d.department_name


select * from departments;
select * from products;

-- supervisor query 
select 
	d.department_id,  
    d.department_name, 
    d.over_head_costs, 
	IFNULL(sum(p.product_sales), 0) as product_sales,
	IFNULL(sum(p.product_sales), 0) - IFNULL(d.over_head_costs, 0) as total_profit
from departments d
left join products p
on d.department_id = p.department_id
group by d.department_id

