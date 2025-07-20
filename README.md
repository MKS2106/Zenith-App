# Digital BookShelf API
A simple API - ***Zenith API*** , the backend system for a growing e-commerce platform. This RESTful API manages the product inventory. Built with **Node.js**, **Express**, and **Mongoose / MangoDB** , it supports full CRUD operations, filtering, sorting, and pagination.

## Features
- Create, Read, Update, Delete products
- Filter by category and price range
- Sort by price (asc/desc)
- Pagination with `page` and `limit`
- Built-in validation and error handling 

## Technologies Used
- Node.js  
- Express.js  
- JSON for data exchange  
- DataBase: MongoDB Atlas
- ODM: Mongoose
- Environment Management: dotenv

### Prerequisites
- Node.js installed on your machine  
- nodemon Installed(npm i -D nodemon)
- dotenv Installed(npm i dotenv)
- mongoose Installed(npm i mongoose)
- express installed (npm i express)
- Postman installed

### Steps to run 
- Clone the repository (git clone https://github.com/yourusername/zenith-api.git)
- Navigate to project directory(cd to directory)
- Install dependencies npm init y 
- Update pakage.json file as per requirement
- Add and update .env file and add the DB connection key
- Run the server (npm run dev)

### API End point 
- GET : 
1. `/api/products`
Example Mongoose complex Query for testing(query paramater): 
-  localhost:3000/api/products/?category=Electronics&sortBy=price_asc
-  localhost:3000/api/products/?category=Electronics
-  localhost:3000/api/products/?category=Electronics&page=1&limit=3
-  localhost:3000/api/products/?page=1&limit=3
2. `/api/book/book_id`

- POST
1. `api/product/`
request body:
{
    "name": "Notebook",
    "description":"Composition Note book",
    "price":2,
    "category": "stationary",
    "inStock": "false",
    "tags": ["Compositon", "book"]
}

- PUT
1. `api/books/book_id`
request body
{
    "name": "updated-String",
    "description":"Composition Note book",
    "price":2,
    "category": "stationary",
    
}

- Delete
1. `api/books/book_id`