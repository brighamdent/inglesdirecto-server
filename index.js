const express = require("express");
const app = express();
require("dotenv").config();
const stripe = require("stripe")(process.env.STRIPE_SECRET_TEST);
const bodyParser = require("body-parser");
const cors = require("cors");
const plans = new Map([
  [1, { price: "price_1OZh8vA1KBKXgU2EsdX4iuZk", name: "Base" }],
  [2, { price: "price_1OZiTfA1KBKXgU2EddG7PfSy", name: "Estudiante+" }],
  [3, { price: "price_1OZiUdA1KBKXgU2EJ4BEzG9U", name: "Estudiante Privado" }],
]);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(cors());

app.post("/payment", cors(), async (req, res) => {
  let { plan, id, name, email } = req.body;

  const customer = await stripe.customers.create({
    name: name,
    email: email,
    payment_method: id,
    invoice_settings: { default_payment_method: id },
  });

  const customerid = await stripe.customers.list({ email: email, limit: 1 });

  try {
    const subscription = await stripe.subscriptions.create({
      customer: customerid.data[0].id,
      collection_method: "charge_automatically",
      items: [
        {
          price: plans.get(plan).price,
        },
      ],
      currency: "MXN",
      description: `English Classes ${plans.get(plan).name}`,
    });
    console.log("Payment", subscription);
    console.log(subscription.items.data[0]);
    res.json({
      message: "Payment successful",
      success: true,
      customerId: subscription.customer,
      subscriptionId: subscription.id,
      subscriptionItemId: subscription.items.data[0].id,
      subscriptionType: plans.get(plan).name,
    });
  } catch (error) {
    console.log("Error in payment", error);
    res.json({
      message: "Payment failed",
      success: false,
    });
  }
});

app.post("/update-subscription", async (req, res) => {
  const { subscriptionId, subscriptionItemId, plan } = req.body;

  try {
    const updatedSubscription = await stripe.subscriptions.update(
      subscriptionId,
      {
        items: [
          {
            id: subscriptionItemId,
            price: plans.get(plan).price,
          },
        ],
      },
    );
    console.log("Update Successful", updatedSubscription);
    res.json({
      message: "Update Successful",
      subscriptionType: plans.get(plan).name,
    });
  } catch (error) {
    console.log("Error in Update", error);
    res.status(400).json({ error: error.message });
  }
});

app.post("/cancel-subscription", async (req, res) => {
  const { subscriptionId } = req.body;
  try {
    const subscription = await stripe.subscriptions.update(subscriptionId, {
      cancel_at_period_end: true,
    });
    res.json({
      message: "Subscription cancelled successfully",
      subscription,
      cancelAt: subscription.cancel_at,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }   
});

app.post('/resume-subscription', async (req, res) => {
    const { subscriptionId } = req.body;

    try {
        const subscription = await stripe.subscriptions.update(subscriptionId, {
      cancel_at_period_end:false
        });

        res.json(subscription);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

app.post("/retrieve-data", async (req, res) => {
  const { subscriptionId } = req.body;
  console.log(subscriptionId);
  try {
    const subscription = await stripe.subscriptions.retrieve(subscriptionId);
    res.json({
      message: "Subscription was retrieved successfully",
      subscription,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.listen(process.env.PORT || 4000, () => {
  console.log("Server is listening on port 4000");
});
