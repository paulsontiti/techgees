// app/payment/success/page.tsx

"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import axios from "axios";

export default function SuccessPage() {
  const params = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    const reference = params.get("reference");

    if (!reference) return;

    (async () => {
      await axios.get(`/api/paystack/payment/verify/${reference}`);
      const redirectUrl = localStorage.getItem("redirectUrl");
      if (redirectUrl && redirectUrl !== "") router.push(redirectUrl);
    })();
  }, [params]);

  return <div>Payment Successful. You will be redirected in few seconds</div>;
}
