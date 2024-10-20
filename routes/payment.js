const express = require("express");
const router = express.Router();
const mySQL = require("../mysql/driver");
const stripe = require("stripe")(process.env.STRIPE_PRIVATE_KEY);
const { getPrices, getUser } = require("../mysql/queries");

router.post("/createCheckoutSession", async (request, response) => {
  const { token } = request.headers;
  const { courseIds } = request.body;
  const user = await mySQL(getUser(), [token]);

  if (user < 1) {
    response.send({ code: 0, message: "No matching account" });
    return;
  }

  const placeholders = courseIds.map(() => "?").join(",");
  const data = await mySQL(getPrices(placeholders), courseIds);
  const prices = data.map((item) => {
    return { price: item.price, quantity: 1 };
  });

  const session = await stripe.checkout.sessions.create({
    ui_mode: "embedded",
    line_items: prices,
    mode: "payment",
    return_url: `http://localhost:5173/return?session_id={CHECKOUT_SESSION_ID}`,
  });
  console.log(session);
  response.send({ clientSecret: session.client_secret });
});

router.get("/sessionStatus", async (request, response) => {
  const session = await stripe.checkout.sessions.retrieve(
    request.query.session_id
  );
  console.log(session);
  response.send({
    status: session.status,
    customer_email: session.customer_details.email,
  });
});

module.exports = router;
