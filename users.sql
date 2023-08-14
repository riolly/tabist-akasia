CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) NOT NULL,
    first_name VARCHAR(255),
    last_name VARCHAR(255),
    avatar VARCHAR(255),
    created_at DATE,
    updated_at DATE,
    deleted_at DATE
);