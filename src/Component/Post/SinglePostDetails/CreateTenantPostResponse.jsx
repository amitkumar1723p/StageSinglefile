import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../Loader/Loader";
import { CreateTenant_PostResponseAction } from "../../../Action/userAction";
import { useNavigate } from "react-router-dom";

export default function CreateTenant_PostResponse({
  SetShow,
  SinglePostData,
  PropertyAddress
 
}) {
  const [Tenant_PostResponseData, setTenant_PostResponseData] = useState({
    Name: "",
    Email: "",
    ContactNumber: "",
    PostFullAddress: "",
  });
  const dispatch = useDispatch();
  const { loading, data, LodingType } = useSelector((state) => {
    return state.userData;
  });
  const { medata } = useSelector((state) => {
    return state.meDetails;
  });
  const navigate = useNavigate();
  useEffect(() => {
    setTenant_PostResponseData({
      ...Tenant_PostResponseData,
      Name: medata.user.Name,
      Email: medata.user.email,
    });
  }, [medata]);

  useEffect(() => {
    if (data) {
      if (data.success == true) {
        setTenant_PostResponseData({
          Name: (medata && medata.IsAuthenticated && medata.user.Name) || "",
          Email: (medata && medata.IsAuthenticated && medata.user.email) || "",
          ContactNumber: "",
          PostFullAddress: "",
        });
      
      

        SetShow(false);
      }
      if (data.success == false) {
          
        if (data.IsAuthenticated == false) {
          navigate('/');
        }
      }
    }
  }, [data]);

  const handleSubmit = (e) => {
    e.preventDefault();
    let Tenant_PostResponseobj = {
      ...Tenant_PostResponseData,
      PostData: { PostId :SinglePostData.SinglePost._id },
      PostFullAddress:  PropertyAddress
    
    };

    dispatch(CreateTenant_PostResponseAction(Tenant_PostResponseobj));
  };

  return (
    <>
      {LodingType &&
      LodingType == "CreateTenant_PostResponseRequest" &&
      loading ? (
        <Loader className={"componentloader"} />
      ) : (
        <div>
          <span
            onClick={() => {
              SetShow(false);
            }}
          >
            X
          </span>
          <h1>View Response Form</h1>

          <form onSubmit={handleSubmit}>
            {/* Name  */}
            <div>
              <label htmlFor="">Name</label>
              <input
                type="text"
                name=""
                id=""
                required
                value={Tenant_PostResponseData.Name.trimStart()}
                onChange={(e) => {
                  setTenant_PostResponseData({
                    ...Tenant_PostResponseData,
                    Name: e.target.value,
                  });
                }}
              />
            </div>
            {/* Email  */}
            <div>
              <label htmlFor="">Email</label>
              <input
                type="text"
                name=""
                id=""
                required
                value={Tenant_PostResponseData.Email}
                onChange={(e) => {
                  setTenant_PostResponseData({
                    ...Tenant_PostResponseData,
                    Email: e.target.value,
                  });
                }}
              />
            </div>

            {/* Contact Number  */}
            <div>
              <label htmlFor="">Contact Number</label>
              <input
                type="text"
                name=""
                id=""
                required
                value={Tenant_PostResponseData.ContactNumber.trimStart()}
                onChange={(e) => {
                  if (e.target.value.length <= 10) {
                    setTenant_PostResponseData({
                      ...Tenant_PostResponseData,
                      ContactNumber: e.target.value,
                    });
                  }
                }}
              />
            </div>

            {/* <div>
          <label htmlFor="">Post Address</label>
          <input
            type="text"
            name=""
            id=""
            required
            value={Tenant_PostResponseData.PostFullAddress.trimStart()}
            onChange={(e) => {
              setTenant_PostResponseData({
                ...Tenant_PostResponseData,
                PostFullAddress: e.target.value,
              });
            }}
          />
        </div> */}
            <button>Submit</button>
          </form>
        </div>
      )}
    </>
  );
}
