import React from "react";
import "./ComparisonTableSeller.css";

const ComparisonTableSeller = () => {
  return (
    <div>
      <div className="Comparison-text">
        <h2 className="Comparison-h2">
          Why We’re <span>Unique </span>
        </h2>
        {/* <p className="Comparison-p">
          A Seamless and Reliable Path to Your New Home, with Services Designed
          for Your Confidence and Convenience.
        </p> */}
      </div>

      <div className="comparison-table-container">
        <table className="comparison-table">
          <thead>
            <tr>
              <th className="services-header">Services</th>
              <th className="profuture-header">PropertyDekho247.com</th>
              <th className="other-header">Other Online Portals</th>
            </tr>
          </thead>
          <tbody>
            {[
              {
                service: "Transparency of Price",
                propfuture: "✔",
                other: "✘",
              },
              {
                service: "Price Offer alerts",
                propfuture: "✔ ",
                other: "✘",
              },
              {
                service: "Privacy of your phone number",
                propfuture: "✔ ",
                other: "✘",
              },
              {
                service: "Manage Response",
                propfuture: "Dedicated RM",
                other: "Multiple stakeholders",
              },
              {
                service: "Visit Assistance",
                propfuture: "Dedicated RM",
                other: "Multiple stakeholders",
              },

              {
                service: "Touch point",
                propfuture: "Single Point of Contact",
                other: "Multiple stakeholders",
              },
              {
                service: "Legal Documentations",
                propfuture: "✔",
                other: "✘",
              },
              {
                service: "Registration process",
                propfuture: "✔",
                other: "✘",
              },
            ].map((row, index) => (
              <tr key={index}>
                <td className="service-name">{row.service}</td>
                <td className="checkmark-cell">{row.propfuture}</td>
                <td
                  className="crossmark-cell"
                  dangerouslySetInnerHTML={{ __html: row.other }}
                ></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ComparisonTableSeller;
