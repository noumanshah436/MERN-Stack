//* Projection

//  specify which fields to include or exclude in the returned documents. 
// This is done using the find method, where you provide a second argument that defines the projection. 

// Including Specific Fields: To include only specific fields in the query result, you can use the projection with a value of 1 for the fields you want to include.
db.products.find({}, { name: 1, price: 1 }).limit(2)
db.products.find({}, { name: 1 }).limit(2)
db.products.find({}, { name: 1, _id: 0 }).limit(2);

// Excluding Specific Fields:To exclude specific fields from the query result, you can use the projection with a value of 0 for the fields you want to exclude.
db.products.find({}, { _id: 0, name: 1, price: 1 }).limit(2)

// **************************************************************************

//! We cannot include and exclude fields in the same query projection in MongoDB. It's either inclusion or exclusion, not both simultaneously.
db.products.find({}, { _id: 0, title: 1, author: 0 }).limit(2);

db.products.find({}, { _id: 0, name: 1, price: 1, price: 0 }).limit(2);

// pass 1 1 1 or 0 0 0 but not both in one query. (except _id field) 
