import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GetAllTenentResponseAction } from "../../../Action/userAction";
import Loader from "../../Loader/Loader";
import { Link } from "react-router-dom";

export default function ViewTenantPostResponse() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(GetAllTenentResponseAction());

    // eslint-disable-next-line
  }, []);
  const { data, loading } = useSelector((state) => {
    return state.TenentResponse;
  });

  return (
    <>
      {loading ? (
        <Loader className="windowloader" />
      ) : (
        <>
          <h1> Tanent post respose</h1>

          {data &&
            data.success &&
            data.TenantResponse.map((responsedata, i) => {
              return (
                <div key={i}>
                  <p>{responsedata.Name}</p>
                  <p>{responsedata.Email}</p>
                  <p>{responsedata.ContactNumber}</p>
                  <p>{responsedata.PostFullAddress}</p>
                  <Link to={`/home/card/${responsedata.PostData.PostId}`}>
                    {" "}
                    <button>View More</button>
                  </Link>
                </div>
              );
            })}
        </>
      )}
    </>
  );
}
