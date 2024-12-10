
 

// **************************************************************************

 



db.col.aggregate([{
  $project: {
    name: 1,
    thapaValue: {
      $filter: {
        input: '$values',
        as: 'val',
        cond: { $gt: ['$$val', 30] }
      }
    }
  }
}])




db.products.aggregate([
  { $match: { price: { $gt: 1200 } } },
  {
    $group: {
      _id: { priceGroup: "$price" },
      colors2: { $push: "$colors" },
    },
  },
]);