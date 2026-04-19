"use client";

import React from "react";
import { useDictionary } from "@/app/context/DictionaryContext";

export default function Pricing() {
  const { dict, lang } = useDictionary();

  const dictData = dict.pricingPage;
  const contactData = dict.contactPage;

  if (!dictData || !dictData.plans) {
    return <div>Error: Pricing data not found</div>;
  }

  if (!contactData) {
    return <div>Error: Contact data not found</div>;
  }

  const plans = Object.values(dictData.plans) as Array<{
    name: string;
    price: number;
    startTime?: string;
    endTime?: string;
    duration: string;
    isPopular?: boolean;
    badge?: string;
  }>;

  const currency = lang === "ge" ? "ლარი" : "GEL";
  const workingHours = contactData.quickContact.hoursValue;
  const workingHoursLabel = lang === "ge" ? "სამუშაო საათები" : "working hours";

  const infoRows =
    lang === "ge"
      ? [
          {
            label: "მისამართი",
            value: "გლდანი : მარკ ბრონშტეინის 1 ჩიხი\nსაბურთალო : ჭაბუკიანის 2",
          },

          { label: "ტელეფონი", value: contactData.contactInfo.phone },
          { label: "instagram", value: "valhallaecho_fitness_club" },
          { label: "facebook", value: "VALHALLAECHO-fitness.club" },
        ]
      : [
          {
            label: "address",
            value:
              "Gldani: 1 Mark Bronshteini Dead End\nSaburtalo: Chabukiani 2",
          },
          { label: "phone", value: contactData.contactInfo.phone },
          { label: "instagram", value: "valhallaecho_fitness_club" },
          { label: "facebook", value: "VALHALLAECHO-fitness.club" },
        ];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Oswald:wght@400;600;700&family=Noto+Sans+Georgian:wght@400;600&display=swap');

        .pricing-wrap * { box-sizing: border-box; }

        .pricing-wrap {
          min-height: 100vh;
          padding: 7rem 1.5rem 4rem;
          font-family: 'Oswald', 'Noto Sans Georgian', sans-serif;
          color: #fff;
          position: relative;
          z-index: 1;
        }

        .pricing-inner {
          max-width: 720px;
          margin: 0 auto;
        }

        .pricing-title {
          text-align: center;
          font-size: clamp(1.6rem, 5vw, 2.8rem);
          font-weight: 700;
          letter-spacing: 0.08em;
          margin: 0 0 2.5rem;
          text-transform: uppercase;
          line-height: 1.1;
        }
        .pricing-title-red {
          background: linear-gradient(90deg, #cc0000, #e11d1d, #42c2ca, #2dd4bf);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .pricing-title-white { color: #fff; }

        .pricing-contact-box {
          border: 1.5px solid rgba(204,0,0,0.5);
          padding: 1.2rem 1.5rem;
          margin-bottom: 2rem;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 0.5rem 1.5rem;
        }
        .pricing-contact-label {
          font-size: clamp(0.75rem, 2vw, 0.9rem);
          color: #aaa;
          font-weight: 400;
          padding: 0.2rem 0;
          text-transform: lowercase;
        }
        .pricing-contact-value {
          font-size: clamp(0.75rem, 2vw, 0.9rem);
          color: #fff;
          font-weight: 400;
          padding: 0.2rem 0;
          white-space: pre-line;
        }

        .pricing-banner {
          background: linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 50%, #0d1a1a 100%);
          border: 1px solid rgba(66,194,202,0.15);
          padding: 0.9rem 1.5rem;
          margin-bottom: 0;
          display: flex;
          align-items: center;
          gap: 1rem;
        }
        .pricing-banner-name {
          font-size: clamp(1.8rem, 6vw, 3rem);
          font-weight: 700;
          letter-spacing: 0.05em;
          line-height: 1;
          background: linear-gradient(90deg, #cc0000 0%, #e11d1d 40%, #42c2ca 70%, #2dd4bf 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .pricing-banner-sub {
          font-size: clamp(0.65rem, 2vw, 0.8rem);
          color: #888;
          font-weight: 400;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          white-space: nowrap;
        }

        .pricing-table {
          width: 100%;
          border-collapse: collapse;
        }
        .pricing-table-row {
          border-bottom: 1px solid rgba(255,255,255,0.1);
        }
        .pricing-table-row:first-child {
          border-top: 1px solid rgba(255,255,255,0.1);
        }
        .pricing-table-row td {
          padding: 1rem 0.5rem;
          vertical-align: middle;
        }
        .pricing-plan-name {
          font-size: clamp(0.85rem, 2.5vw, 1.05rem);
          font-weight: 400;
          color: #e0e0e0;
          font-style: italic;
          font-family: 'Noto Sans Georgian', 'Oswald', sans-serif;
          padding-left: 0 !important;
        }
        .pricing-time {
          font-size: clamp(0.85rem, 2.5vw, 1rem);
          color: #ccc;
          text-align: center;
          white-space: nowrap;
        }
        .pricing-price {
          font-size: clamp(1rem, 3vw, 1.3rem);
          font-weight: 700;
          color: #e11d1d;
          text-align: right;
          white-space: nowrap;
          padding-right: 0 !important;
        }

        .pricing-hours {
          margin-top: 2.5rem;
          padding-top: 1rem;
          border-top: 1px solid rgba(255,255,255,0.08);
          display: flex;
          flex-direction: column;
          gap: 0.3rem;
        }
        .pricing-hours-row {
          display: flex;
          align-items: center;
          gap: 0.6rem;
          font-size: clamp(0.75rem, 2vw, 0.88rem);
        }
        .pricing-hours-label { color: #aaa; }
        .pricing-hours-dash { color: #555; }
        .pricing-hours-value { color: #fff; }

        @media (max-width: 480px) {
          .pricing-contact-box { grid-template-columns: 1fr; }
          .pricing-contact-label {
            padding-bottom: 0;
            color: #666;
            font-size: 0.7rem;
          }
          .pricing-contact-value {
            padding-top: 0;
            padding-bottom: 0.5rem;
            border-bottom: 1px solid rgba(255,255,255,0.05);
          }
          .pricing-contact-value:last-child { border-bottom: none; }
        }
      `}</style>

      <div className="pricing-wrap">
        <div className="pricing-inner">
          <h1 className="pricing-title">
            <span className="pricing-title-red">VALHALLAECHO</span>{" "}
            <span className="pricing-title-white">FITNESS CLUB</span>
          </h1>

          <div className="pricing-contact-box">
            {infoRows.map((row, i) => (
              <React.Fragment key={i}>
                <span className="pricing-contact-label">{row.label}</span>
                <span className="pricing-contact-value">{row.value}</span>
              </React.Fragment>
            ))}
          </div>

          <div className="pricing-banner">
            <span className="pricing-banner-name">VALHALLA</span>
            <span className="pricing-banner-sub">GYM MEMBERSHIP</span>
          </div>

          <table className="pricing-table">
            <tbody>
              {plans.map((plan, i) => (
                <tr className="pricing-table-row" key={i}>
                  <td className="pricing-plan-name">{plan.name}</td>
                  {plan.startTime ? (
                    <>
                      <td className="pricing-time">{plan.startTime}</td>
                      <td className="pricing-time">{plan.endTime}</td>
                    </>
                  ) : (
                    <td className="pricing-time" colSpan={2} />
                  )}
                  <td className="pricing-price">
                    {plan.price} {currency}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="pricing-hours">
            <div className="pricing-hours-row">
              <span className="pricing-hours-label">{workingHoursLabel}</span>
              <span className="pricing-hours-dash">-</span>
              <span className="pricing-hours-value">{workingHours}</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
