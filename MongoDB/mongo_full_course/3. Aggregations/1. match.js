// ********************************************
//* Aggregation Framework
// ********************************************

// The Aggregation Framework is a powerful feature in MongoDB that allows you to process and analyze data in a highly flexible and efficient manner. 
// It provides a set of pipeline stages that enable you to perform data transformations, group data, and perform various calculations on collections.

// In MongoDB's aggregation framework, $match, $group, and $unwind are referred to as aggregation operators. They are used as stages in the aggregation pipeline to perform specific operations on the data.

// **************************************************************************

//* Aggregation Operations
//? $match
//? The $match stage filters documents based on specified conditions.

//? Retrieve all products with a name = Sleek Wooden Tuna.

db.products.aggregate([
    {
        $match: {
            'name': 'Sleek Wooden Tuna'
        }
    }
])

// yes we can do that with simple find method, but using aggregation we can do further operations by chaining.

//? Retrieve all products with a price greater than 50.
db.products.aggregate([
    { $match: { price: { $gt: 50 } } }
]);

// **************************************************************************

