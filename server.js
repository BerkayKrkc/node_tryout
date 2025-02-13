const express = require("express");
const cors = require("cors");
const { log } = require("console");

const app = express();
app.use(cors());
app.use(express.json());

let products = [];
let idCounter = 1;


//All products
app.get("/products", (req,res) => {
    res.json(products);
});


//Some Products

app.get("products/id", (req,res)=>{
    const product = products.find(p=> p.id === parseInt(req.params.id));

    if (!product) return res.status(404).json({message:"Ürün yok"});
    res.json(product);

});

// New Product

app.post("/products", (req,res)=>{
    const {name, price} = req.body;
    if(!name||!price) return res.status(400).json({message:"iki bilgi de zorunlu"});
    
    const newProduct={id:idCounter++,name,price}
    products.push(newProduct);
    res.status(201).json(newProduct);

});

//update
app.put("/products/:id",(req,res)=>{
    const product=products.find(p=>p.id===parseInt(req.params.id));

    if(!product) return res.status(404).json({message:"Ürün bulunamadı"});

    const {name,price}=req.body;

    if (name) product.name=name;
    if (price) product.price=price;

    res.json(product);

});

app.delete("/products/:id", (req,res)=>{

    const index= products.findIndex(p=>p.id=== parseInt(req.params.id));
    if(index===-1) return res.status(404).json({message:"Ürün bulunamadı"});

    products.splice(index,1);

    res.json({message:"Veri Silindi"});

});

//Start server

const PORT=5000;
app.listen(PORT,()=>{
    console.log('Server running on http://localhost:${PORT}');
});