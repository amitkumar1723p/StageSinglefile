import React, { useEffect, useState, useRef } from "react"
import { Link, useNavigate } from "react-router-dom";
// CSS file is here at bottom of this page 
import "./AllUserResponseAction.css"
import { useDispatch, useSelector } from "react-redux";
import "./AllRegistrationResponse.css";
import { getAllUserResponseAction } from "../../Action/userAction";
import { FormatDate } from "../../utils/CommonFunction";
export default function AllUserResponseAction() {

  const navigate = useNavigate()
  const dispatch = useDispatch()
  // All user response action
  const [searchbtn, setSearchbtn] = useState(false)
  const [searchText, setSearchText] = useState("");
  const [tarckNewLead, setTrackNewLead] = useState()
  const [usersList, setUsersList] = useState()
  const [newUser, setnewUser] = useState(0)
  const [read, SetRead] = useState()
  const [trackIndex, setTrackIndex] = useState()
  const [sort, setSort] = useState([])
  const { data: AllUserResponseAction_Store } = useSelector((state) => {
    return state.AllUserResponseAction_Store;
  });



  // console.log(sort,"lgjk")
  // Pagination logic state
  const [page, setPage] = useState(AllUserResponseAction_Store?.currentPage); // Current page for pagination
  const [runPagination, setrunPagination] = useState(false);
  const [index, setIndex] = useState()
  const totalPages = AllUserResponseAction_Store?.totalPages
  // const itemsPerPage = 10; // Number of items per page

  // console.log(AllUserResponseAction_Store)
  useEffect(() => {

    if (AllUserResponseAction_Store == undefined || runPagination == true || index) {
      dispatch(getAllUserResponseAction(page));

    }
  }, [page, index]);
  useEffect(() => {
    // If 'page' has a value or both 'searchText' and 'searchbtn' are truthy, dispatch the action
    if (searchText && searchbtn === true) {

      dispatch(getAllUserResponseAction(page, searchText));

      setSearchbtn(false)
    }
  }, [page, searchText, searchbtn]);


  const handlePrevPage = () => {
    if (page > 1) {
      setPage(page - 1);
      setrunPagination(true);
    }
  };

  const handleNextPage = () => {
    if (page < totalPages) {
      setPage(page + 1);
      setrunPagination(true);
    }
  };

  const handlePageChange = (newPage) => {
    setPage(newPage); // Go to the selected page
    setrunPagination(true);
  };


  // searching
  // Function to handle input changes
  const handleInputChange = (event) => {
    setSearchText(event.target.value); // Update state with input value
  };

  // Function to handle search button click
  const handleSearch = () => {
    setSearchbtn(true)
    // For example, log the search text
  };
  useEffect(() => {
    if (typeof window !== "undefined" && searchText.length === 0) {
      const users = AllUserResponseAction_Store?.data[0]?.users;
      let newData;

      if (users) {
        newData = users.map(item => ({
          ContactNumber: `630713${item.ContactNumber}`,
          notifyData: item.notifyData.length,
          offerData: item.offerData.length,
          postData: item.postData.length,
          requireData: item.requireData.length,
          scheduleData: item.scheduleData.length,
          latestCreateAt: item.latestCreateAt
        }));

        const storedData = JSON.parse(localStorage.getItem("newLength")) || [];

        const result = storedData.filter(storedItem => {
          const match = newData.find(newItem => newItem.ContactNumber === storedItem.ContactNumber);

          return match && (
            storedItem.notifyData !== match.notifyData ||
            storedItem.postData !== match.postData ||
            storedItem.requireData !== match.requireData ||
            storedItem.scheduleData !== match.scheduleData ||
            storedItem.offerData !== match.offerData ||
            storedItem.latestCreateAt !== match.latestCreateAt // ✅ this was missing proper comparison
          );
        });
        console.log(result, "lll")
        setTrackNewLead(result);

        if (newData.length > storedData.length) {
          setnewUser(newData.length - storedData.length);
        }

        localStorage.setItem("newLength", JSON.stringify(newData));

        setUsersList(
          AllUserResponseAction_Store?.data[0]?.users ??
          AllUserResponseAction_Store?.data
        );
      }
    } else {
      setUsersList(
        AllUserResponseAction_Store?.data[0]?.users ??
        AllUserResponseAction_Store?.data
      );
    }
  }, [AllUserResponseAction_Store?.data[0]?.users, searchText]);




  useEffect(() => {
    if (tarckNewLead && tarckNewLead.length > 0) {
      const stored = JSON.parse(localStorage.getItem("readMode") || "[]");

      // Convert stored data to a map for faster access
      const storedMap = new Map(stored.map(item => [item.ContactNumber, item]));

      // Merge with new leads
      tarckNewLead.forEach(newItem => {
        const existingItem = storedMap.get(newItem.ContactNumber);

        if (!existingItem) {
          // If new contact, add it
          storedMap.set(newItem.ContactNumber, newItem);
        }
        // } else {
        //   // If contact exists, check if any field changed
        //   const hasChanged = Object.keys(newItem).some(
        //     key => newItem[key] !== existingItem[key]
        //   );

        //   if (hasChanged) {
        //     // Update with latest info
        //     storedMap.set(newItem.ContactNumber, newItem);
        //   }
        // }
      });
      const updatedRead = Array.from(storedMap.values());

      updatedRead.sort((a, b) => new Date(b.latestCreateAt) - new Date(a.latestCreateAt));

      SetRead(updatedRead);
      localStorage.setItem("readMode", JSON.stringify(updatedRead));
    } else {
      const check = JSON.parse(localStorage.getItem("readMode") || "[]");
      check.sort((a, b) => new Date(b.latestCreateAt) - new Date(a.latestCreateAt));
      SetRead(check);
    }
  }, [tarckNewLead]);


  useEffect(() => {
    if (index !== undefined && index !== null) {
      const stored = localStorage.getItem('readMode');
      if (stored) {
        const parsed = JSON.parse(stored);
        // Remove first match by ContactNumber
        const updated = parsed.filter(item => item.ContactNumber !== index);
        console.log(updated)
        localStorage.setItem('readMode', JSON.stringify(updated));

      }
    }


  }, [index]);


  return (
    <>
      {usersList &&
        <div className="all-user-response-action-container  ">
          <div className="d-flex justify-content-between align-items-center p-2">
            <div className=" d-flex gap-3">
              <p className="all-user-action-response-container  fw-semibold ">All Response: {AllUserResponseAction_Store?.totalUsers}</p>
              <p className="all-user-response-new-activity-container fw-semibold ">New Activity: <span className="">{read?.length}</span></p>
            </div>
            <div className=" d-flex ">
              <input
                className="allresponse-search-input"
                placeholder="e.g.  9053608395"
                type="text"
                value={searchText} // Bind input value to state
                onChange={handleInputChange} // Handle input change
              />
              <div className=" px-2">
                <button className=" allresponse-search-input-btn px-2" onClick={handleSearch}>Search</button>
              </div>
            </div>
          </div>

          <div className="container-fluid d-flex flex-column  gap-3 rounded">



            {usersList?.map((item, index) => {

              return (

                <div className=" main-box-all-response-section all-response-section-admin  d-flex align-content-start flex-wrap border border-primary border-opacity-25 py-2 rounded w-fit d-flex justify-content-center align-items-center">

                  <div className="userName border-end border-primary px-2  border-opacity-25">
                    <div className="">
                      <p className="All-response-common-section  " style={{ color: index < newUser ? 'red' : 'black' }}>
                        {item?.Name} {item?.LastName} - <small className="all-user-response-user-role fw-light"> {item?.Role}</small></p>
                      {/* <small className="fw-light">{item?.email}</small> */}
                      <small className="">
                        {item?.latestCreateAt ? FormatDate(item?.latestCreateAt) : 'N/A'}
                      </small>
                    </div>
                  </div>

                  <div className="userContactNumber border-end border-primary border-opacity-25 px-2 ">
                    <p className="All-response-common-section d-flex justify-content-center align-items-center">
                      {item?.ContactNumber}
                    </p>
                  </div>
                  <div className="  userContact border-end border-primary border-opacity-25 px-1 ">
                    {/* <p className="  all-response-data-section d-flex justify-content-center align-items-center ">
                    Lisitng : &nbsp; <small className="fw-bold">
                    {read[index]?.ContactNumber==`630713${item.ContactNumber}`&&item?.postData?.length>read[index]?.postData ?
                      <small> {item?.postData?.length}<sup className="text-success">new</sup></small>  :   <small>{item?.postData?.length}</small>}

                    </small>
                  </p> */}
                    <p className="all-response-data-section d-flex justify-content-center align-items-center">
                      Listing:&nbsp;
                      <div className="fw-bold">
                        {
                          (() => {
                            const fullNumber = `630713${item.ContactNumber}`;
                            const matched = read.find(r => r.ContactNumber === fullNumber);

                            if (matched) {
                              return item?.postData?.length > matched?.postData
                                ? <div className="d-flex">{item?.postData?.length}{" "}<span className="all-user-response-new-activitites  ">{item?.postData?.length - matched?.postData}</span></div>

                                : <>{item?.postData?.length}</>;
                            } else {
                              return <>{item?.postData?.length}</>;
                            }
                          })()
                        }
                      </div>
                    </p>

                  </div>
                  <div className="  userContact border-end border-primary border-opacity-25 px-1 ">
                    {/* <p className=" all-response-data-section d-flex justify-content-center align-items-center ">
                      Schedule :  &nbsp; <small className="fw-bold">

                        {read[index]?.ContactNumber == `630713${item.ContactNumber}` && item?.scheduleData?.length > read[index]?.scheduleData ?
                          <small>{item?.scheduleData?.length}<sup className="text-success">new</sup></small> : <small>{item?.scheduleData?.length}</small>}
                      </small> </p> */}
                    <p className="all-response-data-section d-flex justify-content-center align-items-center">
                      Schedule:&nbsp;
                      <div className="all-user-response-new-activitite-container fw-bold">
                        {
                          (() => {
                            const fullNumber = `630713${item.ContactNumber}`;
                            const matched = read.find(r => r.ContactNumber === fullNumber);

                            if (matched) {
                              return item?.scheduleData?.length > matched?.scheduleData
                                ? <div className="d-flex"><span>{item?.scheduleData?.length}</span>{" "}<span className="all-user-response-new-activitites  ">{item?.scheduleData?.length - matched?.scheduleData}</span></div>
                                : <>{item?.scheduleData?.length}</>;
                            } else {
                              return <>{item?.scheduleData?.length}</>;
                            }
                          })()
                        }
                      </div>
                    </p>

                  </div>

                  <div className="  userContact border-end border-primary border-opacity-25 px-1 ">
                    {/* <p className="  all-response-data-section d-flex justify-content-center align-items-center ">
                      Offer Data : &nbsp; <small className="fw-bold">
                        {read[index]?.ContactNumber == `630713${item.ContactNumber}` && item?.offerData?.length > read[index]?.offerData ?
                          <small>{item?.offerData?.length}<sup className="text-success">new</sup></small> : <small>{item?.offerData?.length}</small>}
                      </small></p> */}
                    <p className="all-response-data-section d-flex justify-content-center align-items-center">
                      Offer Data:&nbsp;
                      <div className="fw-bold">
                        {
                          (() => {
                            const fullNumber = `630713${item.ContactNumber}`;
                            const matched = read.find(r => r.ContactNumber === fullNumber);

                            if (matched) {
                              return item?.offerData?.length > matched?.offerData
                                ? <div className="d-flex">{item?.offerData?.length}{" "}<span className="all-user-response-new-activitites  ">{item?.offerData?.length - matched?.offerData}</span></div>
                                : <>{item?.offerData?.length}</>;
                            } else {
                              return <>{item?.offerData?.length}</>;
                            }
                          })()
                        }
                      </div>
                    </p>

                  </div>




                  <div className=" userContactNumber border-end border-primary border-opacity-25 px-1 ">
                    {/* <p className="  all-response-data-section d-flex justify-content-center align-items-center ">
                      Notify:&nbsp; <small className="fw-bold">
                        {read[index]?.ContactNumber == `630713${item.ContactNumber}` && item?.notifyData?.length > read[index]?.notifyData ?
                          <small>{item?.notifyData?.length}<sup className="text-success">new</sup></small> : <small>{item?.notifyData?.length}</small>}



                      </small>

                    </p> */}
                    <p className="all-response-data-section d-flex justify-content-center align-items-center">
                      Notify:&nbsp;
                      <div className="fw-bold">
                        {
                          (() => {
                            const fullNumber = `630713${item.ContactNumber}`;
                            const matched = read.find(r => r.ContactNumber === fullNumber);

                            if (matched) {
                              return item?.notifyData?.length > matched?.notifyData
                                ? <div className="d-flex">{item?.notifyData?.length}{" "}<span className="all-user-response-new-activitites  "> {item?.notifyData?.length - matched?.notifyData}</span></div>
                                : <>{item?.notifyData?.length}</>;
                            } else {
                              return <>{item?.notifyData?.length}</>;
                            }
                          })()
                        }
                      </div>
                    </p>

                  </div>
                  <div className="  userContact border-end border-primary border-opacity-25 px-1 ">
                    {/* <p className="  all-response-data-section d-flex justify-content-center align-items-center ">
                      Requirement : &nbsp; <small className="fw-bold">

                        {read[index]?.ContactNumber == `630713${item.ContactNumber}` && item?.requireData?.length > read[index]?.requireData ?
                          <small>{item?.requireData?.length}<sup className="text-success">new</sup></small> : <small>{item?.requireData?.length}</small>}
                      </small>

                    </p> */}
                    <p className="all-response-data-section d-flex justify-content-center align-items-center">
                      Requirement:&nbsp;
                      <div className="fw-bold">
                        {
                          (() => {
                            const fullNumber = `630713${item.ContactNumber}`;
                            const matched = read.find(r => r.ContactNumber === fullNumber);
                            if (matched) {
                              return item?.requireData?.length > matched?.requireData
                                ? <div className="d-flex">{item?.requireData?.length}{" "}<span className="all-user-response-new-activitites  ">{item?.requireData?.length - matched?.requireData}</span></div>
                                : <>{item?.requireData?.length}</>;
                            } else {
                              return <>{item?.requireData?.length}</>;
                            }
                          })()
                        }
                      </div>
                    </p>

                  </div>




                  {/* <div className="userDetail px-5 d-flex justify-content-between"> */}



                  <div className="btn-allresponse-section-main" >


                    <button
                      className="btn-allresponse-section fw-light px-4"
                      onClick={() => {
                        setIndex(`630713${item.ContactNumber}`);
                        window.open(`/admin/single-user-Response-action/${item?._id}`, 'AgentView');
                      }}
                    >
                      View Details
                    </button>

                  </div>


                  {/* </div> */}
                </div>

              )
            })}

          </div>


          <div className=" text-center">
            {/* Pagination controls start */}
            <nav aria-label="Page navigation example">
              <ul className="pagination justify-content-center">
                <li className={`page-item ${page === 1 ? "disabled" : ""}`}>
                  <button className="page-link" onClick={handlePrevPage}>
                    <span aria-hidden="true">&laquo;</span>
                  </button>
                </li>

                {/* Dynamic page numbers */}

                {Array.from({ length: totalPages }, (_, i) => (
                  <li
                    key={i + 1}
                    className={`page-item ${page === i + 1 ? "active" : ""}`}
                  >
                    <button
                      className="page-link"
                      onClick={() => handlePageChange(i + 1)}
                    >
                      {i + 1}
                    </button>
                  </li>
                ))}

                <li className={`page-item ${page === totalPages ? "disabled" : ""}`}>
                  <button className="page-link" onClick={handleNextPage}>
                    <span aria-hidden="true">&raquo;</span>
                  </button>
                </li>
              </ul>
            </nav>

            {/* Pagination controls end  */}

          </div>

        </div>
      }
    </>
  )
}