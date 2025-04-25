import React from "react";
// import { CgLayoutGrid } from "react-icons/cg";



const ChannelPartnerForm = () => {
    return(
        // remove parent container when adding this to somewere else!, this parent container is only used for align the form in center
        <div className="Parent-container w-full flex justify-center relative  mt-3 mb-3">  
    <div className="Form-container w-[590px] bg-white rounded-[17px] shadow-[0px_0px_16px_0px_rgba(207,218,226,1.00)] border flex-col justify-start items-start inline-flex">
        <div className=" Form-container-upper self-stretch px-[30px] py-[20px] bg-[#1877f2] rounded-tl-xl rounded-tr-xl justify-between items-center gap-2.5 inline-flex">
            <div className="text-white text-lg font-medium font-['Inter'] leading-tight">Channel Partner Form</div>
            <button className="w-6 h-6  bg-white rounded-[62px] ">
                <img
                loading="lazy"
                className="transition duration-300 ease-in-out group-hover:brightness-75" 
                src="/img/goBack.png" alt="exit"></img>
            </button>
        </div>
        <div className="Form-container-bottom self-stretch p-[30px] flex-col justify-start items-start flex">
            <div className="Personal-details-section mb-[20px] self-stretch flex-col justify-start items-start flex border-b-2 border-dashed">
                <div className="self-stretch px-2.5 mb-[16px] bg-[#ecf6fe] rounded-sm border border-[#b1d7f3] justify-center items-center gap-2.5 inline-flex">
                    <div className="grow shrink basis-0 h-8 justify-center items-center gap-2.5 flex">
                        <div className="grow shrink basis-0 text-[#3e3e3e] text-sm font-medium font-['Inter'] leading-tight">Personal Details</div>
                    </div>
                </div>
                <div className="self-stretch mb-[20px] bg-white justify-start items-center gap-6 inline-flex">
                    <div className="Name-section grow shrink basis-0 flex-col justify-start items-start gap-2.5 inline-flex">
                        <div className="justify-center items-center gap-2.5 inline-flex">
                            <div className="text-black text-base font-normal font-['Inter']">Full Name*</div>
                        </div>
                        <input type="text" placeholder="Full Name" className="self-stretch px-2.5 py-[7.50px] bg-white rounded-[5px] border border-[#daeaf9] justify-start items-center gap-2.5 inline-flex text-sm">
                            
                        </input>
                    </div>
                    <div className="Email-section grow shrink basis-0 flex-col justify-start items-start gap-2.5 inline-flex">
                        <div className="justify-center items-center gap-2.5 inline-flex">
                            <div className="text-black text-base font-normal font-['Inter']">Email</div>
                        </div>
                        <input type="email" placeholder="Email" className="self-stretch px-2.5 py-[7.50px] bg-white rounded-[5px] border border-[#daeaf9] justify-start items-center gap-2.5 inline-flex text-sm">
                            
                        </input>
                    </div>
                </div>
            </div>

            <div className="Company-details-section mb-[20px] self-stretch flex-col justify-start items-start flex border-b-2 border-dashed">
                <div className="self-stretch px-2.5 mb-[10px] bg-[#ecf6fe] rounded-sm border border-[#b1d7f3] justify-center items-center gap-2.5 inline-flex">
                    <div className="grow shrink basis-0 h-8 justify-center items-center gap-2.5 flex">
                        <div className="grow shrink basis-0 text-[#3e3e3e] text-sm font-medium font-['Inter'] leading-tight">Company Details</div>
                    </div>
                </div>
                <div className="self-stretch mb-[20px] bg-white border-[#c5c5c5] justify-start items-center gap-6 inline-flex">
                    <div className="Company-section-section grow shrink basis-0 flex-col justify-start items-start gap-2.5 inline-flex">
                        <div className="justify-center items-center gap-2.5 inline-flex">
                            <div className="text-black text-base font-normal font-['Inter']">Company Name*</div>
                        </div>
                        <input type="text" placeholder="Company Name" className="self-stretch px-2.5 py-[7.50px] bg-white rounded-[5px] border border-[#333333000] justify-start items-center gap-2.5 inline-flex text-sm">
                            
                        </input>
                    </div>
                    <div className="Profile-section grow shrink basis-0 flex-col justify-start items-start gap-2.5 inline-flex">
                        <div className="justify-center items-center gap-2.5 inline-flex">
                            <div className="text-black text-base font-normal font-['Inter']">Profile Type*</div>
                        </div>
                        {/* <label type="text" placeholder="Profile Type" className="self-stretch px-2.5 py-[7.50px] bg-white rounded-[5px] border border-[#daeaf9] justify-start items-center gap-2.5 inline-flex text-sm">Profile Type
                            <select >

                            </select>
                        </label> */}
                        <div class=" self-stretch h-full">
  <select id="dropdown" name="dropdown" class="w-full px-2  py-2  border border-[#daeaf9] rounded-md  text-[#AAB5C1] text-base font-normal font-['Inter'] ">
    <option className="" value="val1">Option 1</option>
    <option className="" value="val2">Option 2</option>
    <option className="" value="val3">Option 3</option>
  </select>
</div>

                    </div>
                    
                </div>
                <div className="self-stretch mb-[20px] bg-white justify-start items-center gap-6 inline-flex">
                    <div className="Company-section grow shrink basis-0 flex-col justify-start items-start gap-2.5 inline-flex">
                        <div className="justify-center items-center gap-2.5 inline-flex">
                            <div className="text-black text-base font-normal font-['Inter']">RERA No</div>
                        </div>
                        <input type="text" placeholder="RERA No" className="w-[47.74%]  px-2.5 py-[7.50px] bg-white rounded-[5px] border border-[#daeaf9] justify-start items-center gap-2.5 inline-flex text-sm">  
                            
                        </input>
                    </div>
                   
                    
                </div>
            </div>
         
            <div className="Address-details-section self-stretch flex-col justify-start items-start flex ">
                <div className="self-stretch px-2.5 mb-[10px] bg-[#ecf6fe] rounded-sm border border-[#b1d7f3] justify-center items-center gap-2.5 inline-flex">
                    <div className="grow shrink basis-0 h-8 py-1.5 justify-center items-center gap-2.5 flex">
                        <div className="grow shrink basis-0 text-[#3e3e3e] text-sm font-medium font-['Inter'] leading-tight">Address Details</div>
                    </div>
                </div>
                <div className="self-stretch justify-start items-start gap-6 inline-flex">
                    {/* <div className="grow shrink basis-0 flex-col justify-start items-start gap-4 inline-flex">
                        <div className="justify-center items-center gap-2.5 inline-flex">
                            <div className="text-black text-base font-normal font-['Inter']">Address*</div>
                        </div>
                        <div className="self-stretch px-2.5 py-[7.50px] bg-white rounded-[5px] border border-[#daeaf9] justify-start items-center gap-2.5 inline-flex">
                            <div className="grow shrink basis-0 text-[#aab5c1] text-sm font-normal font-['Inter']">Address</div>
                        </div>
                    </div> */}
                    <div className="Company-section-section grow shrink basis-0 flex-col justify-start items-start gap-2.5 inline-flex">
                        <div className="justify-center items-center gap-2.5 inline-flex">
                            <div className="text-black text-base font-normal font-['Inter']">Address*</div>
                        </div>
                        <input type="text" placeholder="Address" className="self-stretch px-2.5 py-[7.50px] bg-white rounded-[5px] border border-[#daeaf9] justify-start items-center gap-2.5 inline-flex text-sm">
                            
                        </input>
                    </div>
                </div>
            </div>
        </div>
    </div>
    
</div>

    );
}

export default ChannelPartnerForm;