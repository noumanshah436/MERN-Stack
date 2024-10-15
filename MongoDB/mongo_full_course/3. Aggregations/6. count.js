// $count
// Passes a document to the next stage that contains a count of the number of documents input to the stage.

// Syntax

// { $count: <string> }

// <string> is the name of the output field which has the count as its value.
// <string> must be a non-empty string, must not start with $ and must not contain the `.` character.

// *********************************

db.products.aggregate([{ $count: "count" }]);

// output:
// [{ count: 10355 }];
