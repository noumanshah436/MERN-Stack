// Find products where the name starts with "Smart"
db.products.find({
  name: { $regex: "^Smart" },
});

// Find products with company ID ending in "9231"
db.products.find({
  company: { $regex: "9231$" },
});

// Find products whose image filename ends with ".png"
db.products.find({
  image: { $regex: ".png$" },
});

// Find products where the name contains "Pro" or "pro" (case-insensitive)
db.products.find({
  name: { $regex: "Pro", $options: "i" },
});

//  Find products with the word "Watch" somewhere in the name
db.products.find({
  name: { $regex: "Watch" },
});
