const stripeKey = 'sk_test_51MasFXFyH2nx9ZXq2rc4Vf9IL1nURzvqbCBakYMHo8fMHiI9WKXag0UaLKVqGZVRjwTNFrpGA3GXi6Dj6wZxz0bU00qxAbwaok'
// coffe: price_1NbkmNFyH2nx9ZXqArk6VvSE
// headset: price_1NbknkFyH2nx9ZXqcuc7ek9r
// Keystroker: price_1NbkpWFyH2nx9ZXq6gy1SpQP
// WatterBottle: price_1NbkqaFyH2nx9ZXqBGBAQpel
// Hoodie: price_1Nbkr0FyH2nx9ZXqp6ZI8WUx
// WinePipe: price_1NbkruFyH2nx9ZXq2lRvWMFW

const express = require('express');
const cors = require('cors');
const stripe = require('stripe')(stripeKey);

const app = express();

app.use(cors());
app.use(express.json('public'));
app.use(express.json());

app.get('/', (req, res) => {
    res.json("I'm up working...")
});

app.post('/checkout', async (req, res) => {

    // console.log(req.body);
    let items = req.body.items;
    let lineItems = [];
    items.forEach((item) => {
        lineItems.push(
            {
                price: item.id,
                quantity: item.quantity,
            }
        )
    });

    const session = await stripe.checkout.sessions.create({
        line_items: lineItems,
        mode: 'subscription',
        success_url: "http://localhost:3000/success",
        cancel_url: "http://localhost:3000/cancel"
    });

    res.send(JSON.stringify({
        url: session.url
    }));

});

app.listen(4000, () => console.log("Server is up on port 4000"));