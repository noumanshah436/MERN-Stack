//* Elements Operator ($exists, $type, $size)  
// video: 1:53:05, slide: 41

// In MongoDB, element operators are used to query documents based on the existence, type, and values of fields within the documents. 
// These operators help you work with fields that are arrays, null, missing, or have specific data types.

// **************************************************************************

//? 1: $exists: Matches documents that have a specific field, regardless of its value.

// Find documents where the "price" field is present
db.products.find({ price: { $exists: true } }).count();

// Find documents where the "price" field is not present
db.products.find({ price: { $exists: false } }).count();

// Find documents with the "price" field present, and if it's present then check the value greater then 1200
db.products.find({ price: { $exists: true }, price: { $gt: 1250 } });

// **************************************************************************

//? 2: $type: The $type operator filters documents based on the BSON data type of a field.
// Basically we need to search or find the fields based on types (BSON Type) for example

db.products.find({ price: { $type: "string" } });
// result will be 0, bcz the price type is number
db.products.find({ price: { $type: "number" } }).count()

// Here is a list of the BSON types and their corresponding numerical and string representations that you can use in MongoDB queries:

// 1. Double: `1` or `"double"`
// 2. String: `2` or `"string"`
// 3. Object: `3` or `"object"`
// 4. Array: `4` or `"array"`
// 5. Binary data: `5` or `"binData"`
// 6. Undefined: `6` or `"undefined"` (Note: Deprecated in MongoDB 3.6+)
// 7. Object id: `7` or `"objectId"`
// 8. Boolean: `8` or `"bool"`
// 9. Date: `9` or `"date"`
// 10. Null: `10` or `"null"`
// 11. Regular expression: `11` or `"regex"`
// 12. JavaScript code: `13` or `"javascript"`
// 13. Symbol: `14` or `"symbol"` (Note: Deprecated in MongoDB 3.6+)
// 14. JavaScript code with scope: `15` or `"javascriptWithScope"`
// 15. 32-bit integer: `16` or `"int"`
// 16. Timestamp: `17` or `"timestamp"`
// 17. 64-bit integer: `18` or `"long"`
// 18. Decimal128: `19` or `"decimal"`
// 19. Min key: `-1` or `"minKey"`
// 20. Max key: `127` or `"maxKey"`

// For example, if you want to find documents where the `isFeatured` field is of type boolean, you can use:

db.products.find({isFeatured: { $type: 'bool'}}).count()

// Alternatively, you can use the numerical representation:

db.products.find({isFeatured: { $type: 8 }}).count()
 

// **************************************************************************

//? 3: $size: The $size operator matches documents where the size of an array field matches a specified value.
db.comments.find({ comments: { $size: 2 } })
