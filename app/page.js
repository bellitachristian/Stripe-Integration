"use client";

import "./page.module.css";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";
import * as api from "../app/utils/api";
import paymongo_mock_checkout from "../app/utils/mock/dummy-checkout-paymongo.json";

export default function Home() {
  const [loading, setLoading] = useState(false);
  const handlebtnClick = useCallback(async (type) => {
    switch (type) {
      case "STRIPE":
        console.log("STRIPE INTEGRATION HERE");
        break;

      default:
        setLoading(true);
        const response = await api.checkout.post(paymongo_mock_checkout);
        const { checkout_url } = response.data.attributes;
        setLoading(false);
        window.location.href = checkout_url;
    }
  }, []);

  return (
    <div>
      <section className="main">
        <h2>Stripe Integration</h2>
        <button
          type="button"
          onClick={() => handlebtnClick("STRIPE")}
          className="checkout_btn"
        >
          {loading ? "Checking out..." : "Checkout"}
        </button>
        <ToastContainer />
      </section>
      <section className="main">
        <h2>Paymongo Integration</h2>
        <button
          type="button"
          onClick={() => handlebtnClick("PAYMONGO")}
          className="checkout_btn"
        >
          {loading ? "Checking out..." : "Checkout"}
        </button>
        <ToastContainer />
      </section>
    </div>
  );
}
