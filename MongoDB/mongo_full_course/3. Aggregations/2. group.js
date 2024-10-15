
//* $group

// video 3:33:00
// https://www.youtube.com/watch?v=rU9ZODw5yvU

// The $group stage groups documents by specified fields and performs aggregation functions. it is like the reduce methods in JS

// when dealing with $group stage we need to pass $ sign for our existing field not the one we are going to create
// syntax :
//  {
//   $group:
//     {
//       _id: <expression>, // Group key
//       <field1>: { <accumulator1> : <expression1> },
//       ...
//     }
//  }

// https://www.mongodb.com/docs/v6.0/reference/operator/aggregation/group/#considerations


// ***********************************************************************

// Groups products, by company and calculates the total number of products for each company.

db.products.aggregate([
    {
        $group: {
            _id: "$company",                // Group key
            totalProducts: { $sum: 1 },     // if we pass 1, it will count all products group by company
        },
    },
]);

// This is same as we do in raw sql:
//  SELECT company, COUNT(*) AS totalProducts
//  FROM products
//  GROUP BY company;

// we can check the output of above:
db.products.aggregate([
    {
        $match: {
            company: "64c23350e32f4a51b19b9244",
        },
    },
]);

// **************************************************************************

// calculates sum of price of all the products, group by company

db.products.aggregate([
    {
        $group: {
            _id: "$company",
            totalProducts: { $sum: "$price" },
        },
    },
]);

// This is same as we do in raw sql:
//  SELECT company, SUM(price) AS totalProducts
//  FROM products
//  GROUP BY company;

// **************************************************************************

// price > 900
// company $group
// sum price

db.products.aggregate([
    {
        $match: { price: { $gt: 1200 } }
    },
    {
        $group: {
            _id: "$company",
            totalProducts: { $sum: "$price" },
        },
    },
]);

// **************************************************************************

//!   find the quantity = 5, group them with same quantity and find the average price

db.sales.aggregate([
    { $match: { quantity: 5 } },
    {
        $group: {
            _id: '$quantity',
            priceTotal: { $sum: '$price' },
            pricrAvg: { $avg: '$price' }
        }
    }
])
