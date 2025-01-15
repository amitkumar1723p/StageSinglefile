import React from "react";
import "./ComparisonTable.css";

const ComparisonTable = () => {
  return (
    <div>
      <div>
        <img src="" alt="" />
      </div>
      <div className="comparison-table-container">
        <table className="comparison-table">
          <thead>
            <tr>
              <th className="services-header">Services</th>
              <th className="profuture-header">Propfuture</th>
              <th className="other-header">
                Other Property Management in India
              </th>
            </tr>
          </thead>
          <tbody>
            {[
              "Professional Property Photoshoot",
              "Lifetime Tenant Search",
              "Dedicated Property Manager and FRM",
              "On-time Rent Collection",
              "Rental Agreement",
              "Tenant Background Verification",
              "Periodic Home Inspections",
              "Seamless tenant move-out management",
              "On-demand Home Maintenance Services",
            ].map((service, index) => (
              <tr key={index}>
                <td className="service-name">{service}</td>
                <td className="checkmark-cell">&#10004;</td>
                <td className="crossmark-cell">&#10008;</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ComparisonTable;
