import React from "react";
import { OrderSummaryComp } from "../../components";
import "./OrderSummary.css";

export const OrderSummary: React.FC = () => {
  return (
    <main className="order-summary-main">
      <OrderSummaryComp />
    </main>
  );
};
