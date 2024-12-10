

//* $push

// video 3:54:16

// same command we used as an example in `push`
db.products.aggregate([
  { $match: { price: { $gt: 1200 } } },
  {
    $group: {
      _id: '$price',
      allColors: { $push: '$colors' }
    }
  }
])

//* docs I have in db:

// price: 1999,
// colors: ['#000000', '#cc6600', '#663300']

// price: 1999,
// colors: ['#000000', '#cc6600', '#663300']


//* output of above command:

// price: 1999,
// colors: [
//   ['#000000', '#cc6600', '#663300'],
//   ['#000000', '#cc6600', '#663300']
// ]

// **************************************************************************

// The problem with above query is that is giving nested arrays

//* $unwind

db.products.aggregate([
  { $unwind: '$colors' },
  { $match: { price: { $gt: 1200 } } },
  {
    $group: {
      _id: '$price',
      allColors: { $push: '$colors' }
    }
  }
]) 

// **************************************************************************

// still there is a problem with the above query and that is we are also getting the duplicates values 
// So to remove it we will use the $addToSet

//* $addToSet

db.products.aggregate([
  { $match: { price: { $gt: 1200 } } },
  { $unwind: "$colors" },
  {
    $group: {
      _id: { priceGroup: "$price" },
      colors: { $addToSet: "$colors" },
    },
  },
]);

// **************************************************************************

//* $size

// What If we want to count the number of unique colors for each price group

db.products.aggregate([
  { $match: { price: { $gt: 1200 } } },
  { $unwind: "$colors" },
  {
    $group: {
      _id: { priceGroup: "$price" },
      colors: { $addToSet: "$colors" },
      colorLength: { $size: "$colors" },
    },
  },
]);

// we can't do this, bcz the $size operator is not allowed directly within the $group stage. 
// Instead, you can use it in combination with other aggregation operators or in separate pipeline stages.

db.products.aggregate([
  { $match: { price: { $gt: 1200 } } },
  { $unwind: "$colors" },
  {
    $group: {
      _id: { priceGroup: "$price" },
      allColors: { $addToSet: "$colors" },
    },
  },
  {
    $project: {
      _id: 1,
      allColors: 1,
      colorLength: { $size: "$allColors" },
    },
  },
]);

//! very Important in project stage we are only getting two fields after group stage and the name of the fields has to match with the fields names in group stage. ex. allColors fields

// **************************************************************************

//* limit

db.products.aggregate([
  { $match: { price: { $gt: 1200 } } },
  { $unwind: "$colors" },
  {
    $group: {
      _id: { priceGroup: "$price" },
      allColors: { $addToSet: "$colors" },
    },
  },
  {
    $project: {
      _id: 1,
      allColors: 1,
      colorLength: { $size: "$allColors" },
    },
  },
  { $limit: 1 },
]);

// **************************************************************************

//* skip

db.products.aggregate([
  { $match: { price: { $gt: 1200 } } },
  { $unwind: "$colors" },
  {
    $group: {
      _id: { priceGroup: "$price" },
      allColors: { $addToSet: "$colors" },
    },
  },
  {
    $project: {
      _id: 1,
      allColors: 1,
      colorLength: { $size: "$allColors" },
    },
  },
  { $skip: 1 },
]);

// **************************************************************************

//* $filter

// $filter stage filters the elements of an array based on specified conditions.

// add dummy data to filter
db.col.insertMany([
  {
    _id: "64c23350e32f4a51b19b9201",
    name: "Document 1",
    values: [10, 20, 30, 40, 50],
  },
  {
    _id: "64c23350e32f4a51b19b9202",
    name: "Document 2",
    values: [15, 25, 35, 45, 55],
  },
  {
    _id: "64c23350e32f4a51b19b9203",
    name: "Document 3",
    values: [5, 15, 25, 35, 45],
  },
  {
    _id: "64c23350e32f4a51b19b9204",
    name: "Document 4",
    values: [30, 40, 50, 60, 70],
  },
  {
    _id: "64c23350e32f4a51b19b9205",
    name: "Document 5",
    values: [25, 35, 45, 55, 65],
  },
]
)

// filter array of values to have only elements that are greater than 30

db.col.aggregate([
  {
    $project: {
      name: 1,
      myValues: {
        $filter: {
          input: "$values",
          as: "value",
          cond: { $gt: ["$$value", 30] },
        },
      },
    },
  },
]);

// **************************************************************************

