

//* $unwind

db.products.aggregate([
  { $match: { price: { $gt: 1200 } } },
  { $unwind: "$colors" },
  {
    $group: {
      _id: { priceGroup: "$price" },
      colors: { $push: "$colors" },
    },
  },
]);

//?  Before
{
  _id: ObjectId("64c23601e32f4a51b19b9263"),
    name: 'Laptop Pro',
      company: '64c23350e32f4a51b19b9231',
        price: 1299,
          colors: ['#333333', '#cccccc', '#00ff00'],
            image: '/images/product-laptop.png',
              category: '64c2342de32f4a51b19b924e',
                isFeatured: true
},

//! $unwind: '$colors';
//? the $unwind stage deconstructs the "colors" array, creating multiple documents for each color within a product.

//?  After
{
  _id: ObjectId("64c23601e32f4a51b19b9263"),
    name: 'Laptop Pro',
      company: '64c23350e32f4a51b19b9231',
        price: 1299,
          colors: '#333333',
            image: '/images/product-laptop.png',
              category: '64c2342de32f4a51b19b924e',
                isFeatured: true
},

// {
//   _id: ObjectId("64c23601e32f4a51b19b9263"),
//   name: 'Laptop Pro',
//   company: '64c23350e32f4a51b19b9231',
//   price: 1299,
//   colors: '#cccccc',
//   image: '/images/product-laptop.png',
//   category: '64c2342de32f4a51b19b924e',
//   isFeatured: true
// },

// so now all the colors are in a string format, so $push will add them as an element in an array of colors

db.products.aggregate([
  { $match: { price: { $gt: 1200 } } },
  { $unwind: "$colors" },
  {
    $group: {
      _id: null,
      totalCount: { $sum: 1 },
    },
  },
]);

db.products.aggregate([
  { $match: { price: { $gt: 1200 } } },
  { $unwind: "$colors" },
  {
    $group: {
      _id: { priceGroup: "$price" },
      colors: { $push: "$colors" },
    },
  },
]);


// **************************************************************************


//* $addToSet
// still there is a problem and that is we are also getting the duplicates values so to remove it we will use the $addToSet

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

// we can't do this, bcz the $size operator is not allowed directly within the $group stage. Instead, you can use it in combination with other aggregation operators or in separate pipeline stages.

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

//! very Important in project stage we are only getting two fields and the name of the fields has to match with the fields names in group stage. ex. allColors fields

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

//* $filter
db.col.aggregate([
  {
    $project: {
      name: 1,
      values: {
        $filter: {
          input: "$values",
          as: "value",
          cond: { $gt: ["$$value", 30] },
        },
      },
    },
  },
]);
