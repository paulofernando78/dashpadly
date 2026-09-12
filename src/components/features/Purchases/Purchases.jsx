import { useEffect, useState } from "react";

const csvUrl = "/assets/data/purchases.csv";

import {
  WidgetBody,
  widgetInnerBorder,
  // WidgetControls,
} from "@/components/ui/Widget";

import { Icon } from "@/components/ui/Icon";

// const purchase = [
//   {
//     id: "1",
//     date: "2026-09-12",
//     merchant: "iFood",
//     paymentMethod: "Google Pay",
//     currency: "BRL",
//     amount: 129.9,
//   },
//   {
//     id: 2,
//     date: "2026-09-11",
//     merchant: "Amazon",
//     paymentMethod: "Itaú",
//     currency: "BRL",
//     amount: 89.9,
//   },
//   {
//     id: 3,
//     date: "2026-09-10",
//     merchant: "Mercado Livre",
//     paymentMethod: "Bradesco",
//     currency: "BRL",
//     amount: 25.9,
//   },
// ];

export function Purchases() {
  // const [isEditing, setIsEditing] = useState(false);
  const [purchases, setPurchases] = useState([]);

  useEffect(() => {
    async function loadPurchases() {
      const response = await fetch(csvUrl);
      const csvText = await response.text();

      const lines = csvText.trim().split("\n");
      const [, ...rows] = lines;

      const parsedPurchases = rows.map((row) => {
        const [id, date, merchant, paymentMethod, currency, amount] =
          row.split(",");

        return {
          id: Number(id),
          date,
          merchant,
          paymentMethod,
          currency,
          amount: Number(amount),
        };
      });

      setPurchases(parsedPurchases);
    }
    loadPurchases();
  }, []);

  // function handleReset() {
  //   // setIsEditing(false);
  // }

  return (
    <WidgetBody
      middlePosition="top"
      middle={
        <div className="grid gap-2 overflow-scroll">
          {purchases.map((purchase) => {
            const formattedAmount = new Intl.NumberFormat("pt-BR", {
              style: "currency",
              currency: purchase.currency,
            }).format(purchase.amount);

            return (
              <div
                key={purchase.id}
                className={`${widgetInnerBorder} grid gap-2`}>
                <div className="flex gap-2 items-center">
                  <Icon name="calendar" />
                  <span>{purchase.date}</span>
                </div>
                <div className="flex gap-2 items-center">
                  <Icon name="store" />
                  <span>{purchase.merchant}</span>
                </div>
                <div className="flex gap-2 items-center">
                  <Icon name="walletCards" />
                  <span>{purchase.paymentMethod}</span>
                </div>
                <div className="flex gap-2 items-center">
                  <Icon name="receipt" />
                  <span>{formattedAmount}</span>
                </div>
              </div>
            );
          })}
        </div>
      }
      // bottom={
      //   <WidgetControls>
      //     <WidgetControls.Reset onClick={handleReset} />
      //   </WidgetControls>
      // }
    />
  );
}
