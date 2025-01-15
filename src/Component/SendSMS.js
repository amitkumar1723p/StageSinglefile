import axios from "axios";

const sendSms = async (apikey, obj) => {
  const data = JSON.stringify(obj);
let  url= "https://lsq.pinnacle.in/api/v1/smsjsonmessage"
  const config = {
  
   
    headers: {
      'apikey': apikey,
      "Content-Type": "application/json",
    },
    
  };

  try {
    const    response   = await axios.post(url, obj, config);
    // return response.data;
     
  } catch (error) {
    console.log(error)
  
  }
};

const PinnacleSms = () => {
  const handleSendSms = async () => {
    const apikey = "8089ab-856719-0fe278-06603b-fb13ea";
    const obj = {
      sender: "PPDEKO",
      message: [
        {
          number: "9718451723",
          text: "Test Sms Services PropertyDekho",
        },
      ],
      messagetype: "TXT",
      dltentityid: "1101652880000084313",
      dlttempid: "1107173572437971571",
      dltheaderid: "1105173562791744782",
      
      tmid: "1502642990000010001",
    };

    const result = await sendSms(apikey, obj);
     
  };

  return (
    <div>
      <button onClick={handleSendSms}>Send SMS</button>
    </div>
  );
};

export default PinnacleSms;
