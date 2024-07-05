//* Updates

//? 1: Updating a Single Field:
// This will update the record that matches the object attributes (given as 1st param) with the object passed as 2nd parameter
db.collectionName.updateOne(
    { _id: ObjectId("12345") },
    { $set: { fieldName: "new value" } }
);

//? Update the price value = 45 in a products collections, where the _id = ObjectId("64c2363be32f4a51b19b9271")
db.products.find({ _id: ObjectId("64c2363be32f4a51b19b9271") })
db.products.updateOne(
    { _id: ObjectId("64c2363be32f4a51b19b9271") },
    { $set: { price: 45 } }
)

//? Update the isFeatures value = true in a products collections, where the name = Designer Handbag
db.products.find({ name: 'Designer Handbag' })
db.products.updateOne({ name: 'Designer Handbag' }, { $set: { isFeatured: true } })

//* Updating multiple fields in a document
// db.collectionName.updateOne(
//     { _id: ObjectId("12345") },
//     {
//         $set: {
//             field1: "new value 1",
//             field2: "new value 2",
//         },
//     }
// );

// **************************************************************************

//* UpdateMany
//? Update all the isFeatures value = true in a products collections, where the  price = 120
db.products.find({ price: 120 })
db.products.updateMany({ price: 120 }, { $set: { isFeatured: true } })

//? Update the price = 154 and isFeatures = false fields from the products collections where the name =  Unbranded Frozen Chicken.
db.products.find({ name: 'Unbranded Frozen Chicken' }).count()
db.products.updateMany({ name: 'Unbranded Frozen Chicken' }, { $set: { price: 154, isFeature: false } })

// **************************************************************************

//* Renaming a field in a document.
// syntax:  db.collectionName.updateOne(
//     { _id: ObjectId("12345") },
//     { $rename: { oldFieldName: "newFieldName" } }
//   );
//? Rename the products collection isFeatured field to isFeature, where the price = 123

// **************************************************************************

//* Adding a new field in a document
// db.collectionName.updateOne(
//     { _id: ObjectId("12345") },
//     { $set: { newField: "new value" } }
//   );

// **************************************************************************

//* Removing or Deleting the Field in a document
// To remove a field from documents in MongoDB, you can use the $unset update operator.
// db.collectionName.updateOne(
//     { _id: ObjectId("12345") },
//     { $unset: { fieldName: 1 } }
//   );

// **************************************************************************

//* Update Embedded Documents

//? How do you add a new element to an array using the $push operator?
// db.collectionName.updateOne(
//     { _id: ObjectId("12345") },
//     { $push: { arrayField: "new element" } }
//   );

db.comments.find({ _id: 5 })
db.comments.updateOne({ _id: 5 }, { $push: { comments: { user: 'Nouman', text: 'This article is awesome' } } })

// ***************

//? Popping from an Array: Removing the last element from an array in a document.
// Syntax:  db.collectionName.updateOne(
//   { _id: ObjectId("12345") },
//   { $pop: { arrayField: 1 } }
// );

db.comments.find({ _id: 5 })
db.comments.updateOne({ _id: 5 }, { $pop: { comments: 1 } })

// ***************

//? Updating a field within an embedded document.

//? Update the text value within an comments array = "Awesome article!", where the id=7 & username=alice.

db.comments.find({ _id: 7, 'comments.user': 'Alice' })
db.comments.updateOne({ _id: 7, 'comments.user': 'Alice' }, { $set: { 'comments.$.text': 'Awesome nomi!' } })

// Consider this part of the query: 'comments.$.text': 'Awesome Thapa!'

// comments is the name of the array field.
// $ is the positional operator, and it refers to the index of the array element that matches the query condition.
// text is the field within the specific comment element that you want to update.
