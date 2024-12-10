// $lookup in MongoDB: How to Join Collections in MongoDB
// https://www.youtube.com/watch?v=zzVa5cvQK6w

//* $lookup:
// the lookup is an aggregation pipeline stage allows you to perform a join between two collections

// Insert data into the cust collection
db.cust.insertMany([
  { _id: 101, name: "John Doe", email: "john@example.com" },
  { _id: 102, name: "Emily Smith", email: "emily@example.com" },
  { _id: 104, name: "Jane Anderson", email: "jane@example.com" },
  { _id: 105, name: "Nouman", email: "nouman@gmail.com" },
  { _id: 106, name: "Farhan", email: "farhan@amolino.ai" },
]);

// Insert data into the orders collection
db.orders.insertMany([
  { _id: 1, order_number: "ORD001", customer_id: 101 },
  { _id: 2, order_number: "ORD002", customer_id: 102 },
  { _id: 3, order_number: "ORD003", customer_id: 103 },
  { _id: 4, order_number: "ORD004", customer_id: 105 },
  { _id: 5, order_number: "ORD004", customer_id: 106 },
]);

db.payments.insertMany([
  { _id: 1, order_id: 1, amount: 100.5, status: "Paid" },
  { _id: 2, order_id: 2, amount: 250.0, status: "Pending" },
  { _id: 3, order_id: 3, amount: 75.25, status: "Failed" },
]);

// ****************************************

// To produce an array with customers and their corresponding order details.  (left outer join)
db.cust.aggregate([
  {
    $lookup: {
      from: "orders", // The target collection
      localField: "_id", // The field in the cust collection
      foreignField: "customer_id", // The field in the orders collection
      as: "order_details", // The name of the output array
    },
  },
]);

// output:

// [
//     {
//       _id: 101,
//       name: 'John Doe',
//       email: 'john@example.com',
//       order_details: [ { _id: 1, order_number: 'ORD001', customer_id: 101 } ]
//     },
//     {
//       _id: 102,
//       name: 'Emily Smith',
//       email: 'emily@example.com',
//       order_details: [ { _id: 2, order_number: 'ORD002', customer_id: 102 } ]
//     },
//     {
//       _id: 104,
//       name: 'Jane Anderson',
//       email: 'jane@example.com',
//       order_details: []
//     }
// ]

// ****************************************

// To produce an array with the orders and their corresponding customer details. (right outer join)
db.orders.aggregate([
  {
    $lookup: {
      from: "cust", // The target collection
      localField: "customer_id", // The field in the orders collection
      foreignField: "_id", // The field in the cust collection
      as: "customer_details", // The name of the output array
    },
  },
]);

// output:

// [
//     {
//       _id: 1,
//       order_number: 'ORD001',
//       customer_id: 101,
//       customer_details: [ { _id: 101, name: 'John Doe', email: 'john@example.com' } ]
//     },
//     {
//       _id: 2,
//       order_number: 'ORD002',
//       customer_id: 102,
//       customer_details: [ { _id: 102, name: 'Emily Smith', email: 'emily@example.com' } ]
//     },
//     {
//       _id: 3,
//       order_number: 'ORD003',
//       customer_id: 103,
//       customer_details: []
//     }
//  ]

// ****************************************
// Write query to fetch the order with order_number: "ORD001" along with its corresponding customer details:
// ****************************************

db.orders.aggregate([
  {
    $match: {
      order_number: "ORD001", // Filter for the specific order
    },
  },
  {
    $lookup: {
      from: "cust", // The collection to join with
      localField: "customer_id", // Field in the orders collection
      foreignField: "_id", // Field in the customers collection
      as: "customer_details", // Output field for joined data
    },
  },
]);

// ****************************************
// Write a query to fetch all orders along with only the customer details whose email contains "gmail.com".
// ****************************************

db.orders.aggregate([
  {
    $lookup: {
      from: "cust",
      let: { customer_id: "$customer_id" },
      pipeline: [
        // pipeline to run on the joined collection
        { $match: { $expr: { $eq: ["$_id", "$$customer_id"] } } }, // join condition
        { $match: { email: /gmail\.com/ } }, // Filter customers by email
      ],
      as: "customer_details",
    },
  },
]);

//   Explanation:
//   $let allows referencing fields from the orders collection.
//   $expr matches _id from the cust collection with customer_id in the orders.
//   Filters customers whose email contains "gmail.com".

// ****************************************
// Write a query to fetch customers with only their order_number and exclude _id in the order_details.
// ****************************************

db.cust.aggregate([
  {
    $lookup: {
      from: "orders",
      localField: "_id",
      foreignField: "customer_id",
      as: "order_details",
    },
  },
  {
    $project: {
      name: 1,
      email: 1,
      "order_details.order_number": 1, // Only include `order_number`
    },
  },
]);

// ****************************************
// How to perform a lookup with multiple stages in the pipeline?
// ****************************************

// Write a query to fetch customers along with their orders,
// but include only orders placed by customers with a specific domain in their email (e.g., example.com)
// and sort the orders by order_number.

db.cust.aggregate([
  {
    $lookup: {
      from: "orders",
      let: { customer_id: "$_id" },
      pipeline: [
        { $match: { $expr: { $eq: ["$customer_id", "$$customer_id"] } } },
        { $sort: { order_number: 1 } }, // Sort by order number
      ],
      as: "order_details",
    },
  },
  {
    $match: { email: /example\.com/ }, // Filter customers by email domain
  },
]);

// Explanation:
// This example combines $match and $sort within the $lookup pipeline.
// Filters customers by their email domain after the join.

// ****************************************
//  How to perform a multi-level $lookup?
// ****************************************

// Write a query to fetch orders, include their corresponding customers,
// and also fetch additional details from another collection, such as payments.

db.orders.aggregate([
  {
    $lookup: {
      from: "cust",
      localField: "customer_id",
      foreignField: "_id",
      as: "customer_details",
    },
  },
  {
    $lookup: {
      from: "payments",
      localField: "_id",
      foreignField: "order_id",
      as: "payment_details",
    },
  },
]);

// Explanation:
// First, join orders with cust.
// Perform a second $lookup to fetch payment details for each order.

// ****************************************
// Filter orders where the customer_details are present and the customer's email contains gmail.com,
// you can use $match after $lookup and $unwind.
// ****************************************

db.orders.aggregate([
  {
    $lookup: {
      from: "cust",
      localField: "customer_id",
      foreignField: "_id",
      as: "customer_details",
    },
  },
  {
    $unwind: {
      path: "$customer_details",
      preserveNullAndEmptyArrays: true, // Keep orders without matching customers
    },
  },
  {
    $match: {
      "customer_details.email": { $regex: /gmail\.com$/ }, // Match customers with Gmail accounts
    },
  },
]);

// ****************************************
// Find orders where there are no corresponding customers in the cust collection.
// ****************************************

db.orders.aggregate([
  {
    $lookup: {
      from: "cust",
      localField: "customer_id",
      foreignField: "_id",
      as: "customer_details",
    },
  },
  {
    $unwind: {
      path: "$customer_details",
      preserveNullAndEmptyArrays: true,
    },
  },
  {
    $match: {
      customer_details: null, // Only include orders without matching customers
    },
  },
]);

// ****************************************
