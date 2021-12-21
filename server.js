const express = require("express");
const app = express();
const mongoose = require("mongoose");
require("dotenv").config();
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY)
const bodyParser = require("body-parser");
const cors = require("cors");

const connectDB = require("./database/database");



//import routes
const addressRoutes = require('./database/routes/address');



//app middleware
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cors());






app.post("/payment", cors(), async (req, res) => {
  let {amount, id} = req.body
  try {
    const payment = await stripe.paymentIntents.create({
      amount,
      currency: "USD",
      description:"OCADO COMPANY",
      payment_method: id,
      confirm: true
    })

    console.log("Payment", payment)
    res.json({
      message: "Payment Successful",
      success: true
    })

  } catch (error) {
    console.log("Error", error)
    res.json({
      message: "Payment Failed",
      success: false
    })
  }
})



connectDB();

app.use(addressRoutes);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Listening on port ${port}`));


//const PORT = 5000;
//const DB_URL = 'mongodb+srv://dbAdmin:admin123@ocado.ds9sc.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';

//STRIPE_SECRET_KEY = 'sk_test_51JZF1USEEBDxngoG3Fs0LGqj3gVnFlFLXghvs2XlGE3EFAtZ9s4YVG1zikfmOXpBX3RCEE59dq4Q3HWrz7TXaEHq00B5CWNP6k';
//STRIPE_API_KEY = 'pk_test_51JZF1USEEBDxngoGxbv1juFyEkKD6IoMozL1eJwfkpkv6fPOUhzgIttC1mfVEfsoaNuVwiAZmLFDNoJZbXiGRykT00sqANe4uL';


/*mongoose.connect(DB_URL,{
  useNewUrlParser:true,
  useUnifiedTopology:true
}).then(()=>{
  console.log('DB connected successfully');
}).catch((err)=> console.log('DB connection error',err));

app.listen(PORT,()=>{
  console.log(`App is running on port ${PORT}`);
});*/


/*var listener = express.listen(5000, function () {
  console.log("Listening on port " + listener.address().port); //Listening on ${port}
});*/
