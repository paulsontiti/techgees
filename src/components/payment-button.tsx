"use client";

import { formatPrice } from "@/lib/format";

export default function PaymentButton({email,amount}:{email:string,amount:number}) {
  async function pay() {
    const response = await fetch(
      "/api/payments/initialize",
      {
        method: "POST",
        headers: {
          "Content-Type":
            "application/json",
        },
        body: JSON.stringify({
          email,
          amount
        }),
      }
    );

    const data =
      await response.json();

    window.location.href =
      data.authorization_url;
  }

  return (
    <button
      onClick={pay}
      className="bg-green-600 text-white px-4 py-2"
    >
      {`Pay ${formatPrice(amount)}`} 
    </button>
  );
}