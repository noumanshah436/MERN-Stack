//* MONGOIMPORT (comes with MongoDB Command Line Database Tools )

// Now I will show How to import data from json file, 
// Run this command in new terminal, outside of mongodb shell

// mongoimport E:\\mongo\products.json -d shop -c products

// mongoimport comments.json -d shop -c comments

// mongoimport E:\\mongo\products.json -d shop -c products --jsonArray

//! Failed: error reading separator after document #1: bad JSON array format - found no opening bracket '[' in input source

// mongoimport E:\mongo\mongo_json\sales.json -d shop -c sales --jsonArray

// mongoexport -c sales -d shop -o E:\mongo\sales1.json

// mongoexport --collection=sales --db=shop -out=E:\mongo\sales.json
