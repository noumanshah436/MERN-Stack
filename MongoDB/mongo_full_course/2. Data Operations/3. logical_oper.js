//* Logical Operators
// We have 4 logical operators ( $and , $or, $nor, $not )
// syntax: { operator:  [{condition1},{condition2},…] }

// **************************************************************************

//? 1: $and: Performs a logical AND operation on an array of expressions, where all expressions must be true for the document to match.

//! Find products with price greater than 10 and name equal to "Notebook Collection"

db.products.find({ $and: [{ 'price': { $gt: 10 } }, { 'name': 'Notebook Collection' }] })

//* In MongoDB, when you provide multiple fields within a single query document, MongoDB treats them as an implicit AND operation.

db.products.find({ 'price': { $gt: 10 }, 'name': { $eq: 'Notebook Collection' } })

// this will give same result as above query

// **************************************************************************

//? 2: $or: Performs a logical OR operation on an array of expressions, where at least one expression must be true for the document to match.

// We can use logical operator only when we have the duplicate fields
db.products.find({ 'price': 129, 'price': 39 })
// but we can write the same in $or operator
db.products.find({ $or: [{ price: 129 }, { price: 39 }] });

// **************************************************************************

//? 3: $not: Performs a logical NOT operation on the specified expression, inverting the result.
//? Find products with price not equal to 100
db.products.find({ 'price': { $not: { $eq: 100 } } })

// **************************************************************************


//?4: $nor: Performs a logical NOR operation on an array of expressions, where none of the expressions must be true for the document to match
// nor is the opposite of or operator

//* Find products with price not equal to 100 or name not equal to "Notebook Collection"
db.products.find({ $nor: [{ 'price': { $eq: 100 } }, { 'name': 'Notebook Collection' }] })
