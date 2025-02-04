import React from "react";
//tailwind converted

const ComparisonTableSeller = () => {
  return (
    <div>
        <div className="text-center">
        <h2 className="text-[32px] font- text-[#333] mt-3 relative text-center max-480:text-2xl">
          Why We're
          <span className="font-semibold text-[var(--main-light-clr)]">Unique</span>
          <span className="absolute bottom-[-10px] left-1/2 transform -translate-x-1/2 w-[10%] h-[3px] bg-[var(--main-light-clr)]"></span>
        </h2>
      </div>
      
      <div className="mx-auto my-3 overflow-x-auto max-480:my-0.">
        <table className="w-[80%]  bg-ed-500 mx-auto my-8 border-collapse font-sans text-center 
           max-480:my-0
           ">
          <thead>
            <tr>
              <th className="bg-[var(--main-light-clr)] font-[500] text-white max-480:font-[500] max-480:text-[12px] max-480:p-[6px] p-[15px] border border-[#c4e6ff]">
                Services
              </th>
              <th className="bg-[var(--main-light-clr)] font-[500] text-white max-480:font-[500] max-480:text-[12px] max-480:p-[6px] p-[15px] border border-[#c4e6ff]">
                PropertyDekho247.com
              </th>
              <th className="bg-[var(--main-light-clr)] font-[500] text-white max-480:font-[500] max-480:text-[12px] max-480:p-[6px] p-[15px] border border-[#c4e6ff]">
                Other Online Portals
              </th>
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
                <td className="text-center  border  border-[#c4e6ff] p-2.5 
                 max-480:p-[8px] max-480:text-[12px]
                  ">
                  {row.service}
                </td>
                <td className={`text-[var(--main-light-clr)]  border border-[#c4e6ff] p-2.5 
                 max-480:p-[8px] max-480:text-[12px]`}>
                  {row.propfuture}
                </td>
                <td className={`text-[#da1c1c]  font-[500] border border-[#c4e6ff] p-2.5 
                 max-480:p-[8px] max-480:text-[12px]
                  `}
                  dangerouslySetInnerHTML={{ __html: row.other }}>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    
    </div>

  );
};

export default ComparisonTableSeller;
