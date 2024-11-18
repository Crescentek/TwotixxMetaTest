const stripe = require("stripe")(process.env.REACT_APP_STRIPE_SECRET_KEY);
const noRefundsPolicy = true;
  const CreateStripeSession = async (formData) => {
    const baseUrl = process.env.REACT_APP_BASE_URL;
    const redirectURL =
      process.env.NODE_ENV === "development"
        ? "http://localhost:3000"
        : baseUrl;

    let description = `The largest XRP Ledger conference in the world. Bringing together top industry leaders to discuss web3, blockchain technology, regulation, and policy. XRP Las Vegas 2024 takes place at the MGM Grand Conference Center, a premier venue, hosting a myriad of events and conferences in a luxurious and state-of-the-art setting.`;
    console.log("noRefundsPolicy", noRefundsPolicy);
    if (noRefundsPolicy) {
      description += " This event has a no refund policy.";
    }
    console.log("No refunds policy:", noRefundsPolicy);

    try {
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        line_items: [
          {
            price_data: {
              currency: formData.currency || "USD",
              unit_amount: Math.round(parseFloat(formData.amount) * 100),
              product_data: {
                name: "XRP Las Vegas 2024",
                description: description,
              },
            },
            quantity: 1,
          },
        ],
        mode: "payment",
        billing_address_collection: "required",
        customer_email: formData?.email,
        success_url: redirectURL + "/success",
        cancel_url: redirectURL + "/cancel",
        metadata: {
          orderId: formData?.orderId,
          email: formData?.email,
        },
      });
      return { id: session.id, orderId: formData.orderId };
    } catch (error) {
      console.error("Error creating Stripe session:", error);
      throw error;
    }
  };

export default CreateStripeSession;
