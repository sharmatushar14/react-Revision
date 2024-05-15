import express from "express";
import cors from "cors";


const app = express();
app.use(cors());
//cors is the middleware, allowing requests from any origins
//However, for production, it is advisable to specify the allowed origins to avoid security risks.

app.get("/api/products", (req, res)=>{
    const products = [
        {
          "id": 1,
          "name": "Wireless Mouse",
          "description": "A sleek and comfortable wireless mouse with ergonomic design.",
          "price": 29.99,
          "category": "Electronics",
          "stock": 120,
          "imageURL": "https://example.com/images/wireless-mouse.jpg"
        },
        {
          "id": 2,
          "name": "Bluetooth Headphones",
          "description": "Noise-cancelling over-ear headphones with high-fidelity sound.",
          "price": 89.99,
          "category": "Electronics",
          "stock": 75,
          "imageURL": "https://example.com/images/bluetooth-headphones.jpg"
        },
        {
          "id": 3,
          "name": "Gaming Keyboard",
          "description": "Mechanical keyboard with customizable RGB lighting and macro keys.",
          "price": 119.99,
          "category": "Electronics",
          "stock": 50,
          "imageURL": "https://example.com/images/gaming-keyboard.jpg"
        },
        {
          "id": 4,
          "name": "Smartphone Stand",
          "description": "Adjustable and portable smartphone stand for desks.",
          "price": 14.99,
          "category": "Accessories",
          "stock": 200,
          "imageURL": "https://example.com/images/smartphone-stand.jpg"
        },
        {
          "id": 5,
          "name": "USB-C Hub",
          "description": "Multi-port USB-C hub with HDMI, USB 3.0, and Ethernet ports.",
          "price": 39.99,
          "category": "Electronics",
          "stock": 100,
          "imageURL": "https://example.com/images/usb-c-hub.jpg"
        }
      ]
    
    // http://localhost:3000/api/products?search=metal

    if(req.query.search){
        const filterProducts = products.filter(product =>
            product.name.includes(req.query.search))
        res.send(filterProducts)
        return;
    }

    setTimeout(()=>{
        res.send(products);
    }, 3000)
})

const port = process.env.PORT || 3000

app.listen(port, ()=>{
    console.log(`Server is enjoying at ${port}`);
});

