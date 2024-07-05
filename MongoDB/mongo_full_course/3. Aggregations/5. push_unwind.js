// In MongoDB, `$push` and `$unwind` are aggregation pipeline stages used to manipulate and process arrays within documents. 
// Here's an explanation and simple examples of how they are used:

// ************************************************************************
//* $push
// ************************************************************************

// The `$push` operator is used in the `$group` stage to append values to an array in the resulting grouped documents. 
// It's useful for accumulating values into an array during the grouping process.

// **Example:**

// Suppose we have the following collection `students`:
// [
//   { "_id": 1, "name": "Alice", "class": "Math", "score": 85 },
//   { "_id": 2, "name": "Bob", "class": "Math", "score": 90 },
//   { "_id": 3, "name": "Charlie", "class": "Science", "score": 78 },
//   { "_id": 4, "name": "Dave", "class": "Math", "score": 92 },
//   { "_id": 5, "name": "Eve", "class": "Science", "score": 88 }
// ]

// We want to group the students by class and create an array of their names in each class.

//  
db.students.aggregate([
    {
        $group: {
            _id: "$class",
            studentNames: { $push: "$name" }
        }
    }
])

// **Output:**
// [
//   { "_id": "Math", "studentNames": ["Alice", "Bob", "Dave"] },
//   { "_id": "Science", "studentNames": ["Charlie", "Eve"] }
// ]

// **Example 2:**

//? Find documents with a price greater than 1200, then group them by price and create an array of colors for each group.

//* suppose we have these two documents: 
//* price = 1250 and colors: [ '#000000', '#cc6600', '#663300' ],
//* price = 1250 and colors: [ '#fff000', '#ddddd', '#663300' ],

//? After,  I need a new document where
// {
//     price: 1250,
//     allColors: ['#000000', '#cc6600', '#663300', '#fff000', '#ddddd', '#663300']
// }

// code
db.products.aggregate([
    { $match: { price: { $gt: 1200 } } },
    {
        $group: {
            _id: { priceGroup: "$price" },
            colors: { $push: "$colors" },
        },
    },
]);

// ************************************************************************
//* $unwind
// ************************************************************************

// The `$unwind` operator is used to deconstruct an array field from the input documents to output a document for each element in the array. It's useful for flattening arrays so you can process each element individually.

// **Example:**

// Suppose we have the following collection `orders`:
// ```json
// [
//   { "_id": 1, "customer": "Alice", "items": ["apple", "banana", "cherry"] },
//   { "_id": 2, "customer": "Bob", "items": ["pear", "grape"] }
// ]
// ```

// We want to create a separate document for each item in the orders.


db.orders.aggregate([
    { $unwind: "$items" }
])

// **Output:**
// [
//   { "_id": 1, "customer": "Alice", "items": "apple" },
//   { "_id": 1, "customer": "Alice", "items": "banana" },
//   { "_id": 1, "customer": "Alice", "items": "cherry" },
//   { "_id": 2, "customer": "Bob", "items": "pear" },
//   { "_id": 2, "customer": "Bob", "items": "grape" }
// ]

// ************************************************************************
//  Combining `$push` and `$unwind`
// ************************************************************************



// You can combine `$push` and `$unwind` in an aggregation pipeline to achieve more complex data transformations. For example, if we want to group students by class and then list each student separately with their class:

db.students.aggregate([
    {
        $group: {
            _id: "$class",
            students: { $push: "$$ROOT" }
        }
    },
    { $unwind: "$students" },
    {
        $project: {
            class: "$_id",
            name: "$students.name",
            score: "$students.score"
        }
    }
])

// **Output:**
// [
//   { "class": "Math", "name": "Alice", "score": 85 },
//   { "class": "Math", "name": "Bob", "score": 90 },
//   { "class": "Math", "name": "Dave", "score": 92 },
//   { "class": "Science", "name": "Charlie", "score": 78 },
//   { "class": "Science", "name": "Eve", "score": 88 }
// ]

// This shows how `$push` can accumulate data into arrays and `$unwind` can then deconstruct those arrays into individual documents.