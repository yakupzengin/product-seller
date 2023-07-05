const express = require("express");
const router = express.Router();
const db = require("../data/db");


// routes
router.use("/products/:id", async(req, res) => {
    try{
        const [product,] = await db.execute("select * from products where id=?" , [req.params.id]);
        res.render("product-details", {
            productList : product[0]
        })
    }catch(error){
        console.log(error)
    }
})


router.use("/products", async (req, res) => {
    try{
        const [products,] = await db.execute("select * from products where isActve=1");
        res.render("products", {
            productsList : products
        })
    }catch(error){
        console.log(error)
    }
})

router.use("/", async function(req, res) {
    // async - await 
    try{
        const [products,] = await db.execute("select * from products where isHome=1");
        res.render("index", {
        productsList: products
    }) 
    }catch(err){
        console.log(err)
    }
    
})
module.exports =router;