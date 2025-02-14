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

  return (
    <>
      {/* <Loader />= */}
      {LodingType && LodingType === "NotifyActionRequest" && loading ? (
        <Loader className={"componentloader"} />
      ) : (
        <div className="notify-form-container">
          <div
            className="cross-btn"
            onClick={() => {
              SetShow(false);
            }}
          >
            X
          </div>
          <div className="img-notify">
            <div>
              <img
                src="/img/notifyform.png"
                alt="Notification Illustration"
                className="notify-form-image"
              />
            </div>
          </div>
          <div>
            <p className="des-p">
              Please provide your exact requirements so we can notify you when
              it's available
            </p>

            <form onSubmit={handleSubmit}>
              <label className="notify-lable">BHK Type</label>
              <select
                required
                value={NotifyData.BHKType}
                className="form-select"
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

              <div className="room-section">
                <p>Room</p>
                <div className=" checkbox-notify">
                  {Room.map((room, index) => {
                    return (
                      <div className="data-notify" key={index}>
                        <label className="notify-lable" htmlFor={index}>
                          {room}
                        </label>

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
                      </div>
                    );
                  })}
                </div>
              </div>

              <label className="notify-lable">Floor Preference</label>
              <select
                value={NotifyData.FloorPreference}
                className="form-select"
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

              <button type="submit" className="submit-button">
                Submit
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default NotifyForm;
