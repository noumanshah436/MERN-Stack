//* Cursor Methods (count(), limit(), skip(), sort())

// syntax:  provide condition in object{}
//  db.products.find({ price: { condition } })

//todo  We need to use () parenthesis in all the cursor methods
//? 1: count(): The count() method returns the count of documents that match the query.
db.products.find({ price: 250 }).count()
db.products.find({ price: { $gt: 250 } }).count()

//? 2: limit(): The limit() method restricts the number of documents returned by the query.
db.products.find({ price: { $gt: 250 } }).limit(2)

//? 3: skip(): The skip() method skips a specified number of documents and returns the rest.
db.products.find({ price: { $gt: 250 } }).limit(5).skip(1)

//? 4: sort(): The sort() method sorts the documents based on the specified field(s).
db.products.find({ price: { $gt: 1250 } }).limit(3).sort({ 'price': 1 }) // sort in ascending order (increasing order ) on the basis of price
db.products.find({ price: { $gt: 1250 } }).limit(3).sort({ 'price': -1 }) // sort in descending order (decreasing order) on the basis of price
