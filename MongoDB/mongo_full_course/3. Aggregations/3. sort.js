//* $sort

// $sort is like .sort() but you can even sort the values that you added in group. 
// Of course you can also sort before grouping or with any other values. 
// But here you can even sort in ascending or descending based on number of products it has.

db.products.aggregate([
    { $match: { price: { $gt: 1200 } } },
    {
        $group: {
            _id: "$category",
            totalPrice: { $sum: "$price" },
        },
    },
    { $sort: { totalPrice: 1 } },  // sort in ascending order
]);


db.products.aggregate([
    { $match: { price: { $gt: 1200 } } },
    {
        $group: {
            _id: "$category",
            totalPrice: { $sum: "$price" },
        },
    },
    { $sort: { totalPrice: -1 } }, // sort in descending order
]);

 