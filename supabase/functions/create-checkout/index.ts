import "jsr:@supabase/functions-js/edge-runtime.d.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

interface CheckoutRequest {
  priceId: string;
  successUrl?: string;
  metadata?: Record<string, string>;
}

const VALID_PRICE_IDS = [
  "price_1SwerICu1M0mOVHk4sJk5mNv",
  "price_1SwerYCu1M0mOVHkekUfREEd",
  "price_1SwesHCu1M0mOVHkOuOkAgio",
  "price_paperback_journal",
  "price_hardcover_journal",
];

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, {
      status: 200,
      headers: corsHeaders,
    });
  }

  try {
    const { priceId, successUrl, metadata }: CheckoutRequest = await req.json();

    if (!priceId) {
      return new Response(
        JSON.stringify({ error: "Price ID is required" }),
        {
          status: 400,
          headers: {
            ...corsHeaders,
            "Content-Type": "application/json",
          },
        }
      );
    }

    if (!VALID_PRICE_IDS.includes(priceId)) {
      return new Response(
        JSON.stringify({ error: "Invalid price ID" }),
        {
          status: 400,
          headers: {
            ...corsHeaders,
            "Content-Type": "application/json",
          },
        }
      );
    }

    const stripeSecretKey = Deno.env.get("STRIPE_SECRET_KEY");
    if (!stripeSecretKey) {
      return new Response(
        JSON.stringify({ error: "Stripe not configured" }),
        {
          status: 500,
          headers: {
            ...corsHeaders,
            "Content-Type": "application/json",
          },
        }
      );
    }

    const params = new URLSearchParams({
      "mode": "payment",
      "line_items[0][price]": priceId,
      "line_items[0][quantity]": "1",
      "success_url": successUrl || "https://beforeigo.app/success?session_id={CHECKOUT_SESSION_ID}",
      "cancel_url": "https://beforeigo.app/pricing",
    });

    if (metadata) {
      Object.entries(metadata).forEach(([key, value]) => {
        params.append(`metadata[${key}]`, value);
      });
    }

    const response = await fetch("https://api.stripe.com/v1/checkout/sessions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${stripeSecretKey}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: params,
    });

    if (!response.ok) {
      const error = await response.text();
      console.error("Stripe API error:", error);
      return new Response(
        JSON.stringify({ error: "Failed to create checkout session" }),
        {
          status: 500,
          headers: {
            ...corsHeaders,
            "Content-Type": "application/json",
          },
        }
      );
    }

    const session = await response.json();

    return new Response(
      JSON.stringify({ url: session.url }),
      {
        headers: {
          ...corsHeaders,
          "Content-Type": "application/json",
        },
      }
    );
  } catch (error) {
    console.error("Error creating checkout session:", error);
    return new Response(
      JSON.stringify({ error: "Internal server error" }),
      {
        status: 500,
        headers: {
          ...corsHeaders,
          "Content-Type": "application/json",
        },
      }
    );
  }
});
