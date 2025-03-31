import React, { useEffect, useState } from "react";
import "./NotifyForm.css"; // Save the provided CSS below in NotifyForm.css
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import { NotifyAction } from "../../../Action/userAction";
import Loader from "../../Loader/Loader";
const NotifyForm = ({ SetShow }) => {
  const navigate = useNavigate();

  const Room = ["Pooja Room", "Servant Room", "Study Room"];
  const [NotifyData, setNotifyData] = useState({
    BHKType: "",
    Room: [],
    FloorPreference: "",
  });
  const { medata } = useSelector((state) => {
    return state.meDetails;
  });

  // eslint-disable-next-line
  const [querry, setquerry] = useSearchParams();
  const dispatch = useDispatch();
  const handleSubmit = (e) => {
    e.preventDefault();

    const NotifyDataObj = {
      ...NotifyData,
      Name: medata.user.Name,
      Email: medata.user.email,
      ProjectName: querry.get("ProjectName"),
    };

    dispatch(NotifyAction(NotifyDataObj));
  };

  const { loading, data, LodingType } = useSelector((state) => {
    return state.userData;
  });

  useEffect(() => {
    if (data) {
      if (data.success === true) {
        SetShow(false);
      }
      if (data.success === false) {
        if (data.IsAuthenticated === false) {
          navigate("/");
        }
      }
    }
    // eslint-disable-next-line
  }, [data]);


  // Alerts
  const [bhkalert, setBhkAlert] = useState(false);
  const [floorPrefAlert, setFloorPrefAlert] = useState(false);

const HandleNotifyFormSubmit = ()=>{
  if(!NotifyData.BHKType){
    setBhkAlert(true);
    setTimeout(() => {
      setBhkAlert(false)
    }, 1400);
    return;
  }
  if(!NotifyData.FloorPreference){
    setFloorPrefAlert(true);
    setTimeout(() => {
      setFloorPrefAlert(false);
    }, 1400);
    return;
  }

}
  
  return (
    <>
      {/* <Loader />= */}
      {LodingType && LodingType === "NotifyActionRequest" && loading ? (
        <Loader className={"componentloader"} />
      ) : (
        <div className="notify-form-container">
          <div
            className="notify-cross-btn"
            onClick={() => {
              SetShow(false);
            }}
          >
            X
          </div>
          <div className="img-notify">
            <div>
              <img
                src="/img/notifyimg.svg"
                alt="Notification Illustration"
                className="notify-form-image"
              />
            </div>
          </div>
          <div className="main-content-in-notify">
            <p className="des-p-nofity">
              Looking for Your Ideal Home? Let Us Notify You First!
            </p>

            <form className="notify-form" onSubmit={handleSubmit}>

              <div className="notify-form-main-content">
                <div className="notify-form-bhk-section">
                <label className="notify-lable">BHK Type</label>
              <select
                required
                value={NotifyData.BHKType}
                className={`form-select  ${bhkalert? "shake inputShake":''}`}
                onChange={(e) => {
                  setNotifyData({ ...NotifyData, BHKType: e.target.value });
                }}
              >
                <option value="">Select</option>
                <option value="1">1 BHK</option>
                <option value="2">2 BHK</option>
                <option value="3">3 BHK</option>
                <option value="4">4 BHK</option>
                <option value="5">5 BHK</option>
              </select>

                </div>
             
              <div className="room-section">
                <p>Rooms</p>
                <div className=" checkbox-notify">
                  {Room.map((room, index) => {
                    return (
                      <div className="data-notify" key={index}>
                       

                        <input
                          type="checkbox"
                          checked={NotifyData.Room.includes(room)}
                          name=""
                          id={index}
                          onChange={(e) => {
                            if (e.target.checked === true) {
                              setNotifyData({
                                ...NotifyData,
                                Room: [...NotifyData.Room, room],
                              });
                            }

                            if (e.target.checked === false) {
                              setNotifyData({
                                ...NotifyData,
                                Room: NotifyData.Room.filter((item) => {
                                  return item !== room;
                                }),
                              });
                            }
                          }}
                        />
                         <label className="notify-lable" htmlFor={index}>
                          {room}
                        </label>
                      </div>
                    );
                  })}
                </div>
              </div>
              </div>

              <div className="notify-form-main-content-bottom">
              <div className="notify-form-floor">
              <label className="notify-lable">Floor Preference</label>
              <select
                value={NotifyData.FloorPreference}
                className={`form-select  ${floorPrefAlert? "shake inputShake":''}`}
                required
                onChange={(e) => {
                  setNotifyData({
                    ...NotifyData,
                    FloorPreference: e.target.value,
                  });
                }}
              >
                <option value="">Floor Preference</option>
                <option value="low">Low Floor</option>
                <option value="mid">Mid Floor</option>
                <option value="high">High Floor</option>
              </select>

              </div>
              
              <div className="notify-button-container">
              <button onClick={HandleNotifyFormSubmit} type="submit" className="notify-submit-button">
                Submit
              </button>
              </div>
              
              </div>
              
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default NotifyForm;
