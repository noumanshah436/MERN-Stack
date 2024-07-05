
//* $project

// project is like projection.
// project used to select the specific parts of your data 

// Context of Use:
// Projection: Used with find queries.
// Project: Used within an aggregation pipeline.

// Capabilities:
// Projection: Limited to including or excluding fields.
// Project: More powerful and flexible; can include complex expressions, computed fields, renaming, and more.

// **************************************************************************

db.products.aggregate([
    {
        $project: {
            price: 1,
        },
    }
]);

//  selects only the price field of all products.

// **************************************************************************

db.products.aggregate([
    {
        $project: {
            _id: 0,
            price: 1,
            name: 1,
        },
    },
]);

//  selects only the price and name field of all products.

// **************************************************************************

// We can use the $project stage to create new fields by applying expressions or transformations to existing fields. 
// For example, you could calculate the discounted price as a new field:

db.products.find({ price: { $gt: 1000 } }).count()

db.products.aggregate([
    { $match: { price: { $gt: 1000 } } },
    {
        $project: {
            _id: 0,
            name: 1,
            originalPrice: "$price",
            disPrice: { $multiply: ["$price", 0.8] },
        },
    },
]);

// we can use all operators like $sum, $subtract, $multiply, $avg, etc. in our expression.

// **************************************************************************

// again we can add the sort here too

db.products.aggregate([
    { $match: { price: { $gt: 1000 } } },
    {
        $project: {
            _id: 0,
            name: 1,
            originalPrice: "$price",
            disPrice: { $multiply: ["$price", 0.8] },
        },
    },
    { $sort: { disPrice: -1 } },
]);