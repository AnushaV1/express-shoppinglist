const express = require("express");
const router = new express.Router();
const ExpressError = require("./expressError")
const items = require("./fakeDb")

const ITEMS = [
    {"name": "popsicles", "price": 1.45},
    {"name": "cheerios", "price": 3.40}
]

router.get("/", function(req,res){
  res.json({items: items})
})

router.post("/", function (req, res,next) {
try {
    if (!req.body.name) throw new ExpressError("Name and price are required", 400);
    const newItem = { name: req.body.name, price : req.body.price}
    items.push(newItem)
    return res.status(201).json({ added: newItem })
} catch(e){
    return next(e)
    }
})

router.get("/:name", function(req,res){
    const foundItem = items.find(item =>item.name === req.params.name)

    if(foundItem === undefined){
        throw new ExpressError("Item not found", 404)
    }
    res.json({item: foundItem})
})
router.patch("/:name", function(req, res){
    const foundOneItem = items.find(item => item.name === req.params.name)
    if(foundOneItem === undefined){
        throw new ExpressError("Item not found", 404)
    }
foundOneItem.name = req.body.name
foundOneItem.price = req.body.price
res.json({item: foundOneItem})

})
router.delete("/:name", function(req,res) {
const foundItm = items.findIndex(item =>item.name === req.params.name)
if (foundItm === -1){
    throw new ExpressError("Item not found", 404)
}
items.splice(foundItm,1)
res.json({message: "Deleted"})
})

module.exports = router;