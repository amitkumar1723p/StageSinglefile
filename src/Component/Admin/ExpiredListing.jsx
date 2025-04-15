import React, { useContext, useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { Active_InactiveProperty, Admin_AgentGetAllPostAction, Admin_OwnerGetAllPostAction, changePropertyStatus, GetAllAssignProperty, GetAllScheduleVisitsAndMakeOffer_Length } from '../../Action/postAction';
import { UserContext } from '../CreateContext/CreateContext';
import AdminAgentAssignPost from './AdminAgentAssignPost';
import OwnerAllPost from "./AllPost";

const ExpiredListing = () => {
 
      const dispatch = useDispatch();
      const location = useLocation();
    
      const navigate = useNavigate();
    
      const { medata } = useSelector((state) => {
        return state.meDetails;
      });
      const { loading: loadingGet, data: AdminData } = useSelector((state) => {
        return state.AdminData;
      });
      const { loading, data: AllPost } = useSelector((state) => {
        return state.AdminGetAllPost;
      });
      const { data: AgentAdminAllPost } = useSelector((state) => {
        return state.AdminProperty;
      });
      const [AssignProperty, setAssignProperty] = useState([]);
      const [AssignPropertyAdmin, setAssignPropertyAdmin] = useState(null);
      const [querry, setquerry] = useSearchParams();
      const [SearchPostId, setSearchPostId] = useState("");
      const [selectAll, setSelectAll] = useState(false); //used for selectAll key
      const [status, setStatus] = useState("");
      const { setAllPropertyData, NavbarRef } = useContext(UserContext);
      const [currentDataLength, setCurrentDataLength] = useState(null);
      const [active, setActive] = useState(null);
      const [onPageActive, setPageActive] = useState("");
      const [propertyOrder, setPropertyOrder] = useState("decending");
      const [currenSelected, setCurrentSelected] = useState("");
      const [OwnerPostsPageNo, setOwnerPostsPageNo] = useState(1);
      const [itemsPerPage, setItemsPerPage] = useState(25);
      const [PropertyType, setPropertyType] = useState("");
      const [MarkUpdatedPost, setMarkUpdatedPost] = useState("");
      const [page, setPage] = useState(1); //  Current page for pagination   for ownerpost (all post.jsx)
      const [UpdatePostNavigationData, setUpdatePostNavigationData] =useState(undefined);
    
       
      const allPostFilterBoxRef = useRef(null); // store post filter box
      const {
        data: adminAlertData,
        LodingType,
        loading: PostVerifyLoding,
      } = useSelector((state) => {
        return state.Post;
      });
      const { data: VistAndOfferData } = useSelector((state) => {
        return state.VistAndOffer;
      });
    
      const queryParams = new URLSearchParams(location.search);
      const [myQuery, setMyQuery] = useState(queryParams.get("type"));
      // const {  NavbarRef } =
      //   useContext(UserContext);
      console.log("MarkUpdatePost", MarkUpdatedPost);
      useEffect(() => {
        if (location?.state && location?.state?.updatePost == true) {
          // Set all your state variables as before
          setActive(location?.state?.activeFilter);
          setPageActive(location?.state?.onPageActive);
          setCurrentSelected(location?.state?.currenSelected);
          setSearchPostId(location?.state?.SearchPostId || "");
          setItemsPerPage(location?.state?.postPerPage);
          setPropertyType(location?.state?.propertAdType);
          setPropertyOrder(location?.state?.sortOrder)
          setPage(location?.state?.pageNo);
          setMarkUpdatedPost(location?.state.PostId);
          
          setTimeout(() => {
            setMarkUpdatedPost("");
          }, 5000);
      
          // Handle query parameters
          if (
            Array.isArray(location?.state?.querry) &&
            location?.state?.querry?.length > 0
          ) {
            const queryString = location?.state?.querry
              .map((obj) => {
                const key = encodeURIComponent(Object.keys(obj)[0]);
                const value = encodeURIComponent(obj[Object.keys(obj)[0]]);
                return `${key}=${value}`;
              })
              .join("&");
      
            navigate(`${location.pathname}?${queryString}`, { replace: true });
          } else {
            navigate(location.pathname, { replace: true });
          }
      
          // Improved scroll handling with retry mechanism
          let scrollAttempts = 0;
          const maxAttempts = 10;
          
          const scrollToElement = () => {
            const postCardId = document.getElementById(location?.state.PostId);
            let allPostFilterBoxHight = allPostFilterBoxRef?.current?.offsetHeight || 0;
            let NavbarHight = NavbarRef?.current?.offsetHeight || 0;
            
            if (postCardId) {
              console.log("Found element:", postCardId.getBoundingClientRect());
              const elementTop = postCardId.getBoundingClientRect().top + window.scrollY;
              const offset = allPostFilterBoxHight + NavbarHight;
      
              // Add a small delay before scrolling to ensure layout is stable
              setTimeout(() => {
                window.scrollTo({
                  top: elementTop - offset,
                  behavior: "smooth",
                });
              }, 100);
              
              return true;
            }
            
            return false;
          };
          
          // First attempt after a short delay to allow for initial render
          setTimeout(() => {
            // Try scrolling
            if (!scrollToElement() && scrollAttempts < maxAttempts) {
              // If element not found, set up interval for retry
              const scrollInterval = setInterval(() => {
                scrollAttempts++;
                if (scrollToElement() || scrollAttempts >= maxAttempts) {
                  clearInterval(scrollInterval);
                }
              }, 500); // Try every 500ms
              
              // Clean up interval after component unmounts or maxAttempts reached
              return () => clearInterval(scrollInterval);
            }
          }, 300);
        } else {
          // Your existing fallback logic
          if (myQuery === "true") {
            setCurrentSelected("All Active posts");
            setActive(true);
          } else if (myQuery === "false") {
            setCurrentSelected("All In-Active posts");
            setActive(false);
          } else if (myQuery === "success") {
            setActive("success");
            setCurrentSelected("Success Post ");
          } else {
            setCurrentSelected("All posts");
            setActive(null);
          }
        }
      }, []);
    
      useEffect(() => {
        var filterdData = AllPost;
    
        setCurrentDataLength(AllPost?.Post?.length);
        if (currenSelected === "All In-Active posts") {
          filterdData = AllPost?.Post?.filter((item) => !item?.PostVerify);
          setCurrentDataLength(filterdData?.length);
        }
        if (currenSelected === "All Active posts") {
          filterdData = AllPost?.Post?.filter((item) => item?.PostVerify);
          filterdData = AllPost?.Post?.filter((item) => !item.PostVerify);
          setCurrentDataLength(filterdData?.length);
        }
        if (currenSelected === "All Active posts") {
          filterdData = AllPost?.Post?.filter((item) => item.PostVerify);
          setCurrentDataLength(filterdData?.length);
        }
        if (currenSelected === "rent") {
          filterdData = AllPost?.Post?.filter((item) => {
            return item?.BasicDetails?.PropertyAdType === PropertyType;
          });
    
          setCurrentDataLength(filterdData?.length);
        }
        if (currenSelected === "sale") {
          filterdData = AllPost?.Post?.filter((item) => {
            return item?.BasicDetails?.PropertyAdType === PropertyType;
          });
    
          setCurrentDataLength(filterdData?.length);
        }
        if (currenSelected === "sale") {
          filterdData = AllPost?.Post?.filter((item) => {
            return item?.BasicDetails?.PropertyAdType === PropertyType;
          });
    
          setCurrentDataLength(filterdData?.length);
        }
        if (currenSelected === "Success Post") {
          filterdData = AllPost?.Post?.filter((item) => {
            return item?.propertyStatus?.currentPropertyStatus === "sold out";
          });
    
          setCurrentDataLength(filterdData?.length);
        }
      }, [currenSelected, AllPost]);
    
      //  function handleCurrentSlected(a){
      //   setCurrentSelected(a);
      //  }
      // updated the localstorage after dashboard action
    
      useEffect(() => {
        if (AssignProperty.length <= 0) {
          dispatch({ type: "GetAllAdminClear" });
        }
    
        if (!AdminData) {
          setAssignPropertyAdmin(null);
        }
      }, [AssignProperty, AdminData]);
    
      useEffect(() => {
        if (["Admin", "Owner"].includes(medata?.user?.Role)) {
          dispatch(GetAllAssignProperty());
          // setSelectAll(false)
        }
    
        if (!VistAndOfferData) {
          dispatch(GetAllScheduleVisitsAndMakeOffer_Length());
        }
      }, []);
    
      // Active In Active start
    
      useEffect(() => {
        if (status !== "") {
          dispatch(Active_InactiveProperty(AssignProperty, status));
          // setStatus("");
          // setAssignProperty([]);
        }
      }, [AssignProperty, status]);
    
      // Active In Active end
      useEffect(() => {
        if (
          adminAlertData &&
          [
            "VerifyPostActionRequest",
            "ReOpenPostActionRequest",
            "showVeirifyPostIconRequest",
            "Active_InactivePropertyRequest",
            "changePropertyStatusRequest",
            "DeletePostRequest",
          ].includes(LodingType)
        ) {
          // alert("Admin_OwnerGetAllPostAction PostVerify")
          if (adminAlertData.success === true && medata?.user?.Role == "Owner") {
            setStatus("");
            setAssignProperty([]);
            setSelectAll(false);
            dispatch(Admin_OwnerGetAllPostAction());
    
            if (LodingType == "DeletePostRequest") {
              dispatch({ type: "GetDeletedPostsClear" });
            }
          }
          if (adminAlertData.success === true && medata?.user?.Role == "Admin") {
            if (querry.get("PostVerify")) {
              setAssignProperty([]);
              setStatus("");
              setSelectAll(false);
              dispatch(
                Admin_AgentGetAllPostAction({
                  PostVerify: querry.get("PostVerify"),
                })
              );
            } else {
              setAssignProperty([]);
              setSelectAll(false);
              dispatch(Admin_AgentGetAllPostAction());
            }
          }
        }
    
        if (
          adminAlertData &&
          (LodingType === "RemoveAssignPropertyRequest" ||
            LodingType === "Admin_AssignedRequest")
        ) {
          if (adminAlertData.success === true) {
            setAssignProperty([]);
            setSelectAll(false);
    
            dispatch(GetAllAssignProperty());
          }
        }
    
        // eslint-disable-next-line
      }, [adminAlertData]);
    
      useEffect(() => {
        if (medata?.user?.Role === "Owner") {
          dispatch(Admin_OwnerGetAllPostAction());
        }
    
        if (["Admin", "Agent"].includes(medata?.user?.Role)) {
          dispatch(Admin_AgentGetAllPostAction());
        }
      }, []);
    
      //  by using this we show number of filtered or un-filtred property number on dashboard for Admin or Agent  setData
      useEffect(() => {
        if (AllPost && AllPost.success) {
          setAllPropertyData(AllPost);
        }
      }, [AllPost]);
    
      useEffect(() => {
        if (AgentAdminAllPost && AgentAdminAllPost.success) {
          setAllPropertyData(AgentAdminAllPost);
        }
      }, [AgentAdminAllPost]);
    
      // sorting property start  at created filter
    
      const handlePropertyOrder = () => {
        if (propertyOrder === "ascending") {
          setPropertyOrder("descending");
        } else {
          setPropertyOrder("ascending");
        }
      };
      // handle active and inactive filter sectionfilter
    
      const handleActive = (status, buttonType) => {
        setMyQuery("");
        setPageActive(buttonType);
        setActive(status);
        if (status === true) {
          setCurrentSelected("All Active posts");
    
          setActive(true);
        } else if (status === false) {
          setCurrentSelected("All In-Active posts");
          setActive(false);
        } else if (status === "success") {
          setActive("success");
        } else {
          setCurrentSelected("All posts");
          setActive(null);
        }
      };
    
      //handle items per page
      const handleItemsPerPageChange = (value) => {
        setItemsPerPage(parseInt(value, 10)); // Update the state with the selected value
    
        // setCurrentPage(1); // Reset to first page when changing items per page
      };
    
      // Handle button click to update state active amd inactoive
      const handleStatusChange = (value) => {
        if (AssignProperty.length > 0) {
          const isConfirmed = window.confirm("Are you sure about it?");
          if (isConfirmed) {
            setStatus(value);
          } else {
            // Handle the cancel action if needed
            console.log("Status change canceled.");
          }
        } else {
          alert("Please Select for Change Property Status!");
        }
      };
    
      // this is used for empty checked box
      useEffect(() => {
        if (!selectAll) {
          setAssignProperty([]);
        }
      }, [selectAll]);
    
      // this fn is used for the updated available or sold out
      const handlePropertyStatus = (value) => {
        const changePropertyStatusData = {
          propertyStatus: value,
          AssignedPropertys: AssignProperty,
        };
        if (
          changePropertyStatusData?.AssignedPropertys?.length > 1 ||
          changePropertyStatusData?.AssignedPropertys?.length < 1
        ) {
          return 0;
        }
        let result = window.confirm("Are you sure you want to proceed?");
        if (result && changePropertyStatusData?.AssignedPropertys?.length === 1) {
          dispatch(changePropertyStatus(changePropertyStatusData));
        } else {
          console.log("Cancel");
        }
      };
    
    //   useEffect(()=>{

    //   },[])
  return (
  
      
         <div className="showpost">
                {medata?.user?.Role == "Owner" ? (
                  <OwnerAllPost
                    setAssignProperty={setAssignProperty}
                    AssignProperty={AssignProperty}
                    AssignPropertyAdmin={AssignPropertyAdmin}
                    setAssignPropertyAdmin={setAssignPropertyAdmin}
                    SearchPostId={SearchPostId}
                    sortOrder={propertyOrder}
                    activeFilter={active}
                    selectAll={selectAll}
                    postPerPage={itemsPerPage}
                    propertAdType={PropertyType}
                    allPostFilterBoxRef={allPostFilterBoxRef}
                    onPageActive={onPageActive}
                    currenSelected={currenSelected}
                    OwnerPostsPageNo={OwnerPostsPageNo}
                    setOwnerPostsPageNo={setOwnerPostsPageNo}
                    // MarkUpdatedPost(location?.state.PostId)
                    page={page}
                    setPage={setPage}
                    MarkUpdatedPost={MarkUpdatedPost}
                  />
                ) : (
                  <AdminAgentAssignPost
                    setAssignProperty={setAssignProperty}
                    AssignProperty={AssignProperty}
                    AssignPropertyAdmin={AssignPropertyAdmin}
                    setAssignPropertyAdmin={setAssignPropertyAdmin}
                    SearchPostId={SearchPostId}
                    sortOrder={propertyOrder}
                    activeFilter={active}
                  />
                )}
              </div>
      
  
  )
}

export default ExpiredListing
