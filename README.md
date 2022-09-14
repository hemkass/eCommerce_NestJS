
<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>

<h1>E-Commerce Backend </h1>

#### Table of contents

1. [Description](#description)
2. [Built With](#built)
3. [Installation Instructions and Requirement](#require)
   - [Node.js Installation](#node)
   - [SQL database](#sql)
   - [Clone the Code and install dependencies](#clone)
   - [Authentification](#auth)
4. [Before starting](#start)
   - [Compodocs](#compodocs)
   - [Swagger](#swagger)
   - [How does this API work ? ](#channel)
     - [First product](#product)
     - [First cart](#cart)
     - [Add product(s)](#ddProduct)
     - [First product(s)](#remove)
     - [Authentification](#signup)
     - [Delivery](#delivery)
     - [Payment](#payment)
5. [Stay In touch](#contact)

<a name="description"></a>

# Description

<p>
This project creates the back-end code for an e-commerce site via NestJs Framework. This application uses Express.js API and Prisma  to interact with a PostgreSQL database. The API Routes are created using RESTful CRUD methods. Since there is no front-end code, the application was tested using Postman . This Application is documented by SWAGGER and COMPODOCS

</p>

<a name="built"></a>

# Built With

<ul>
<li>NestJs</li>
<li>JavaScript</li>
<li>Typescript</li>
<li>PostgreSQL</li>
<li>Postico</li>
<li>Prisma</li>
<li>Swagger</li>
<li>CompoDocs</li>

</ul>

<a name="require"></a>

# Installation Instructions and Requirement

<ol>
<li>

## Node.js Installation

<a name="node"></a>

<p>Please check that you have Node.js globally installed on your computer. 
 If not, try reinstalling Node.js by following this link: https://nodejs.org/en/
</p></li>
<br />

<li>

## SQL database

<a name="sql"></a>

<p>

To run, this project require to install PostgreSQL. If you don't have installed it yet, please check on their website : <code>https://www.postgresql.org/</code>

Don't forget to add your DataBase in your .env



</p></li>
<br />

<li>

## Clone the Code and install dependencies

<a name="clone"></a>

<p> The first thing to do is to open git bash command line, and then simply you can clone the project under any of your favorite places as the following:

> git clone https://gitlab.com/marine-user-agency/clothes_ecommerce.git</p></li>

</p>

</ol>
<br />

## Authentification

<a name="auth"></a>

Don't forget to add a secret Key fot JWT in your .env. You can choose any string you want.

If you want to use Facebook and Google auth, you need to create one and add id-user and secret-key in your env file.

More information: https://console.cloud.google.com/apis (for google) and https://developers.facebook.com/apps/ (facebook)

# Before Starting

<a name="start"></a>

<p>Please to understand infrastructure, routes possibles, watch before :</p>

<ol><li>

## COMPODOCS

<a name="compodocs"></a>

<p>
<underline>To run it :</underline>

```bash
$ npx @compodoc/compodoc -p tsconfig.json -s
```

Open your browser and navigate to http://localhost:8080

if you have any trouble, please check nestJs documentation :
https://docs.nestjs.com/recipes/documentation</p>

</li>

 <li>

## SWAGGER

<a name="swagger"></a>

Open your browser and navigate to http://localhost:3000/api

</p></li></ol>
# Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# Testing mode
$ npm run test:watch

# You Also can seed or reset your database 
$ npm run prisma:seed
$ npm run reset:dev
```

## How does this API work - API CHANNEL ?

<a name="channel"></a>

<ol><li>STEP 1 : Create your first product </li>

<a name="product"></a>

```bash
http://localhost:3000/products/create
```

<li>STEP 2 : Create your CART with your first product</li>

<a name="cart"></a>

```bash
http://localhost:3000/carts/add/cart/:productId
```

<li>STEP 3 : Add product from your cart</li>
<a name="addProduct"></a>

```bash
http://localhost:3000/add/product/:productId/:cartId
```

<li>STEP 3 bis : Remove product from your cart also </li>
<a name="remove"></a>

```bash
http://localhost:3000/remove/product/:productId/:cartId
```

<li>STEP 4: Auth </li>
<a name="signup"></a>
To go further, you need to be logged in :

signUp:

```bash
http://localhost:3000/users/signup
```

Basic Auth :

```bash
http://localhost:3000/login
```

Google Auth :

```bash
http://localhost:3000/login/google
```

<li>STEP 5: Add delivery</li>

<a name="delivery"></a>

To add delivery, you need first to be logged in and have registered a delivery adress

```bash
http://localhost:3000/delivery/create/:cartId
```

<li>STEP 6: Add paiement</li>

<a name="payment"></a>

```bash
http://localhost:3000/payments/create
```

# Stay in touch

<a name="contact"></a>

- Author - [Marine Corbel](https://fr.linkedin.com/in/marinecorbel)

