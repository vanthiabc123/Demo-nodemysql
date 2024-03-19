const connection = require('../configs/db');
const bcrypt = require('bcrypt');
function createUsersTable() {
    const query = `
    CREATE TABLE  IF NOT EXISTS users (
            id INT AUTO_INCREMENT PRIMARY KEY,
            username VARCHAR(255) NOT NULL,
            email VARCHAR(255) NOT NULL,
            firstName VARCHAR(255) NOT NULL,
            password VARCHAR(255) NOT NULL,
            address VARCHAR(255) NOT NULL,
            image VARCHAR(255) NOT NULL,
            role VARCHAR(255) NOT NULL
        )
    `;
    connection.query(query, (error, results, fields) => {
        if (error) throw error;
        console.log('Users table created or already exists');
    });
}


function addUser(username, email,firstName,password,address,image,role) {
    bcrypt.hash(password, 10, (err, hashedPassword) => {
        if (err) {
            throw err;
        }

        const query = 'INSERT INTO users (username, email, firstName, password, address, image, role) VALUES (?, ?, ?, ?, ?, ?, ?)';
        connection.query(query, [username, email, firstName, hashedPassword, address, image, role], (error, results, fields) => {
            if (error) {
                throw error;
            }
            console.log('Inserted ID:', results.insertId);
        });
    });
}

function getUsers() {
    return new Promise((resolve, reject) => {
        const query = 'SELECT * FROM users';
        connection.query(query, (error, results, fields) => {
            if (error) reject(error);
            resolve(results);
        });
    });
}
function deleteUser(userId) {
    return new Promise((resolve, reject) => {
        const query = 'DELETE FROM users WHERE id = ?';
        connection.query(query, [userId], (error, results, fields) => {
            if (error) reject(error);
            resolve(results);
        });
    });
}
function getUserById(userId) {
    return new Promise((resolve, reject) => {
        const query = 'SELECT * FROM users WHERE id = ?';
        connection.query(query, [userId], (error, results, fields) => {
            if (error) {
                reject(error);
            } else {
                resolve(results[0]); // Trả về người dùng đầu tiên trong kết quả (nếu có)
            }
        });
    });
}
function updateUser(userId, username, email, firstName, password, address, role){
    return new Promise((resolve, reject) => {
        const query = 'UPDATE users SET username = ?, email = ?, firstName = ?, password = ?, address = ?, role = ? WHERE id = ?';
        connection.query(query, [username, email, firstName, password, address, role, userId], (error, results, fields) => {
            if (error) {
                console.error('Error updating user:', error);
                reject(error); 
            } else {
                resolve(results);
            }
        });
    });
}
function getUserByEmail(email) {
    return new Promise((resolve, reject) => {
        const query = 'SELECT * FROM users WHERE email = ?';
        connection.query(query, [email], (error, results, fields) => {
            if (error) {
                reject(error);
            } else {
                resolve(results[0]);
            }
        });
    });
}

module.exports = {
    createUsersTable,
    addUser,
    getUsers,
    deleteUser,
    getUserById,
    updateUser,
    getUserByEmail
};
