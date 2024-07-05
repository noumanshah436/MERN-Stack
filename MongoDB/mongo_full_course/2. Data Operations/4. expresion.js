//* Introduction to $expr
// The $expr operator in MongoDB allows you to use aggregation expressions within a query to compare fields from the same document. It's particularly useful when you need to perform more complex comparisons or calculations involving document fields (or within same document).

//? The syntax is {$expr: {operator: [ $field, value ] } }
// One important thing to remember is the field should be prefix with $ sign.

// **************************************************************************

//! Find product where price is greater than 1340
db.products.find({ $expr: { $gt: ['$price', 1340] } })

db.products.find({ price: { $gt: 1340 } })

// we can use simple query for above,
// ss we can see both the above queries give same result

// **************************************************************************

// usecase where $expr is useful

//! Find sales where (quantity * price) is greater than targetPrice

db.sales.find({
  $expr: {
    $gt: [{ $multiply: ["$quantity", "$price"] }, "$targetPrice"],
  },
});

// here both the values are fields only for comparison thats why $ sign is used

// **************************************************************************

//! Find sales where (quantity + price) is less than targetPrice

db.sales.find({
  $expr: {
    $lt: [{ $add: ["$quantity", "$price"] }, "$targetPrice"],
  },
});