import "./App.css";
import React, { useCallback, useContext, useState } from "react";
import Alert from "./Component/Alert/Alert";
import Profile from "./Component/User/Profile/Profile";
import ProtectedRoutes from "./Component/ProtectedRoutes";
import { useEffect } from "react";
import { GetMeDetailsAction, LogoutAction } from "./Action/userAction";
import { useDispatch, useSelector } from "react-redux";

import CreatePostMain from "./Component/Post/CreatePost/CreatePostMain";
import AdminOwnerCreateProfileSection from "./Component/Admin/CreateProfile";
import AdminOwnerLoginProfileSection from "./Component/Admin/LoginProfile";
import {
  Routes,
  Route,
  useNavigate,
  useLocation,
  redirect,
} from "react-router-dom";

import HeroSection from "./Component/Home/HeroSection";
import Navbar from "./Component/Home/Navbar";
import {
  GetProjectNameAction,
  Admin_OwnerGetAllPostAction,
} from "./Action/postAction";
import { AlertAction } from "./Action/alertAction";
import PropertyFiltersCard from "./Component/Home/PropertyCard/PropertyFilters";
import SinglePostDetails from "./Component/Post/SinglePostDetails/SinglePostDetails";
import Footer from "./Component/Home/Footer";

import UserForm from "./Component/User/LoginForm/UserForm";
import Dashbord from "./Component/Admin/Dashbord";
import AdminOwnerRoutes from "./Component/AdminOwnerRoutes";
import AdminAside from "./Component/Admin/AdminAside";
import AllAdminData from "./Component/Admin/AllAdminData";
import ProfileHeader from "./Component/User/Profile/ProfileHeader";
import ShowLoginUserPost from "./Component/Post/ShowLoginUserPost";
import AdminAllPost from "./Component/Admin/AllPost";

import ShowUserFavouritePost from "./Component/User/Profile/ShowUserFavouritePost";
import ScheduleYourVisit from "./Component/Admin/ScheduleVisit";
import OfferReceived from "./Component/Admin/OfferRecived";
import { UserContext } from "./Component/CreateContext/CreateContext";
import OurService from "./Component/Home/OurService";
import ReportPage from "./Component/Home/ReportPage";
import TermsAndConditions from "./Component/Home/TermsAndConditions";
import BlogPage from "./Component/Home/BlogContent/BlogPage";
import SingleBlog from "./Component/Home/BlogContent/Components/SingleBlog";
import PrivacyPolicy from "./Component/Home/PrivacyPolicy";
import ProfileEdit from "./Component/User/Profile/ProfileEdit";
import ProfileUpdate from "./Component/User/Profile/ProfileUpdate";
import AdminAgentDashboard from "./Component/Admin/AdminAgentDashboard";
import AdminAgentOwnerPost from "./Component/Admin/AdminAgentOwnerPost";
import PageNotFound from "./PageNotFound";
import MyVisits from "./Component/User/Profile/MyVisits";
// import OwnerPostAllVisits from "./Component/User/Profile/OwnerPostAllVisits";
import OwnerAgentExcelData from "./Component/Admin/OwnerAgentExcelData";
import OwnerAgentExcel from "./Component/Admin/OwnerAgentExcel";
import OwnerPostAllResponse from "./Component/User/Profile/OwnerPostAllResponse";
import AllRegistrationResponse from "./Component/Admin/AllRegistrationResponse";

import NotifyRequirements from "./Component/Admin/NotifyRequirements";
import AllPostRender from "./Component/Post/AllPostRender";
import AllPostSearchFilter from "./Component/Home/PropertyCard/AllPostSearchFilter";
// import MyVisits from "./Component/Post/CreatePost/m";
import DeletePosts from "./Component/Admin/DeletePosts";
import Career from "./Component/Home/Careers";
import AdminAgentExcelData from "./Component/Admin/AdminAgentExcelData";
import AllTransactionResponse from "./Component/Admin/AllTransactionResponse";
import Transaction from "./Component/User/Profile/Transaction";
import Search from "./Component/Home/Search";
import AllUserResponseAction from "./Component/Admin/AllUserResponseAction";
import SingleUserRespponseAction from "./Component/Admin/SingleUserResponseAction";
// import MyVisits from "./Component/Post/CreatePost/m";
import { FormatDate } from "./utils/CommonFunction";
import AgentUserResponse from "./Component/Admin/AgentUserResponse";


function App() {

  //  console.log(FormatDate("2025-02-20T06:48:35.238+00:00"))


  const { setRedirectPath, RedirectPath } = useContext(UserContext);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [alertType, setalertType] = useState("");
  const [alertMessage, setalertMessage] = useState("");
  const [alertshow, setalertShow] = useState(null);

  const { alertData } = useSelector((state) => {
    return state.Alert;
  });
  const { data, LodingType } = useSelector((state) => {
    return state.userData;
  });
  const { data: CreatePost } = useSelector((state) => {
    return state.Post;
  });
  const { data: getSinglePostData } = useSelector((state) => {
    return state.GetSinglePost;
  });
  const { medata } = useSelector((state) => {
    return state.meDetails;
  });
  //  Admin Onwer Use Selector
  const { data: AdminGetAllPostData } = useSelector((state) => {
    return state.AdminGetAllPost;
  });
  const { data: ScheduleVisitsData } = useSelector((state) => {
    return state.ScheduleVisits;
  });

  const { data: VistAndOfferData } = useSelector((state) => {
    return state.VistAndOffer;
  });
  const { data: AdminData } = useSelector((state) => {
    return state.AdminData;
  });
  const { data: BidData } = useSelector((state) => {
    return state.OfferRecived;
  });
  const { data: AllPost } = useSelector((state) => {
    return state.GetAllPost;
  });
  const { data: LoginUserPostData } = useSelector((state) => {
    return state.GetPost;
  });
  const { data: TenentResponseData } = useSelector((state) => {
    return state.TenentResponse;
  });
  const { data: GetSingleProjectName } = useSelector((state) => {
    return state.SingleProjectName;
  });
  // similar
  const { data: SimilarPropertyData } = useSelector((state) => {
    return state.SimilarProperty;
  });
  // serach property 
  const { data: serachResponse } = useSelector((state) => {
    return state.serachResponse;
  });
  // paid property
  const { data: paidPropertyData } = useSelector((state) => {
    return state.paidPropertyData;
  });
  // paid user transaction detail 
  const { data: getTransactionDetail } = useSelector((state) => {
    return state.getTransactionDetail;
  });

  // get all user excepation owner Admin agent
  const { data: AllUserResponseData } = useSelector((state) => {
    return state.AllUserResponse;
  });

  const { data: AssignPostData } = useSelector((state) => {
    return state.AssignPropertys;
  });
  const { data: AdminAssignPropertyData } = useSelector((state) => {
    return state.AdminProperty;
  });
  const { data: MyVisitsData } = useSelector((state) => {
    return state.MyVisits;
  });
  const { data: OwnerPostsVisitsData } = useSelector((state) => {
    return state.OwnerPostsVisits;
  });

  // notify
  const { data: AllNotifiesAndReqData } = useSelector((state) => {
    return state.AllNotifiesAndReq;
  });

  const { data: deletePostsData } = useSelector((state) => {
    return state.deletePosts;
  });

  //  excel file  

  const { data: OwnerAllExcelFilesData } = useSelector((state) => {
    return state.OwnerAllExcelFiles;
  });
  const { data: AgentAllExcelFilesData } = useSelector((state) => {
    return state.AgentAllExcelFiles;
  });
  const { data: AdminAllExcelFilesData } = useSelector((state) => {
    return state.AdminAllExcelFiles;
  });

  // All user response action
  const { data: AllUserResponseAction_Store } = useSelector((state) => {
    return state.AllUserResponseAction_Store;
  });
  // single user response action
  const { data: SingleUserResponseAction_Store } = useSelector((state) => {
    return state.SingleUserResponseAction_Store;
  });

  const location = useLocation();

  useEffect(() => {
    if (RedirectPath) {
      sessionStorage.setItem("RedirectPath", RedirectPath);
    }

    if (sessionStorage.getItem("RedirectPath")) {
      setRedirectPath(sessionStorage.getItem("RedirectPath"));
    }
  }, [RedirectPath]);

  useEffect(() => {
    if (location.pathname == "/") {
      dispatch(GetProjectNameAction());
    } else if (location.pathname.includes("/user/post")) {
      dispatch(GetProjectNameAction());
    } else if (location.pathname.includes("/admin/post/update")) {
      dispatch(GetProjectNameAction());
    }

    // eslint-disable-next-line
  }, [location]);


  //  Simple User Show Alert Function
  useEffect(() => {
    if (data) {

      if (data?.success && LodingType == "ProfileUpdateRequest") {

        dispatch(GetMeDetailsAction());
      }

      if (data.success === true && ["CreatePostRequest"].includes(LodingType)) {
        sessionStorage.removeItem("next");
        sessionStorage.removeItem("BasicDetailsData");
        sessionStorage.removeItem("LocationDetailsData");
        sessionStorage.removeItem("PropertyDetailsData");
        sessionStorage.removeItem("AreaDetailsData");
        sessionStorage.removeItem("FloorDetailsData");
        sessionStorage.removeItem("AmenitiesDetailsData");
        sessionStorage.removeItem("PropertyDetailsData");
        sessionStorage.removeItem("PricingDetailsData");
      }
      if (
        data.success === true &&
        [
          "CreateScheduleVisitRequest",
          "BiddingFormRequest",
          "CreatePostRequest",
          "CreateUserOtpRequest",
          "VerifyUserOtpRequest",
          "CreateUserRequest",
          "ViewOwnerDetailsRequest",
        ].includes(LodingType)
      ) {
        dispatch({ type: "UserClear" });
        setalertShow(false);
      } else {
        setalertMessage(<p>{data.message}</p>);
        setalertType("Success");
        setalertShow(true);

        dispatch({ type: "UserClear" });
      }



      if (data.success === false && ["VerifyUserOtpRequest"].includes(LodingType)) {
        dispatch({ type: "UserClear" });
        setalertShow(false);
      } else {
        if (data.success === false) {
          if (data.fielderrors) {
            setalertMessage(
              data.fielderrors.map((e, index) => {
                return <p key={index}>{e.msg}</p>;
              })
            );
          } else {
            setalertMessage(<p> {data.message}</p>);
          }
          setalertType("error");
          setalertShow(true);
          dispatch({ type: "UserClear" });
        }
      }

      if (data?.isBlockedUser == true ) {
        dispatch(LogoutAction())
        navigate("/")
      }


      // eslint-disable-next-line
    }
  }, [data]);

  //  show Alert on Create Post Delete Post and UpdatePost
  // Admin Onwer Show Alert Function
  useEffect(() => {
    if (CreatePost) {
      if (CreatePost.success === true) {
        setalertMessage(<p>{CreatePost.message}</p>);
        setalertType("success");
        setalertShow(true);
        dispatch({ type: "AdminAlertClear" });
      }
      if (CreatePost.success === false) {
        if (CreatePost.AdminVerify === false) {
          dispatch(LogoutAction());
          navigate("/");
        }
        if (CreatePost.IsAuthenticated === false) {
          navigate("/");
        }

        if (CreatePost?.fielderrors) {
          setalertMessage(
            CreatePost.fielderrors?.map((e, index) => {
              return <p key={index}>{e.msg}</p>;
            })
          );
        } else {
          setalertMessage(<p> {CreatePost.message}</p>);
        }

        // setalertMessage(<p>{CreatePost.message}</p>);
        setalertType("error");
        setalertShow(true);
        dispatch({ type: "AdminAlertClear" });
      }
    }

    // eslint-disable-next-line
  }, [CreatePost]);

  //  Alert show Single Post
  useEffect(() => {
    if (getSinglePostData) {
      if (getSinglePostData.success === false) {
        setalertMessage(<p>{getSinglePostData.message}</p>);
        setalertType("error");
        setalertShow(true);
        dispatch({ type: "GetSinglePostClear" });
      }
    }

    // eslint-disable-next-line
  }, [getSinglePostData]);

  // -------------------------

  //  Admin Owner Get Post

  useEffect(() => {
    if (AdminGetAllPostData) {
      if (AdminGetAllPostData.success === false) {
        // dispatch(AlertAction("error", <p>{data.message}</p>, true));
        if (AdminGetAllPostData.AdminVerify === false) {
          navigate("/");
          dispatch(LogoutAction());
        }
        if (AdminGetAllPostData.IsAuthenticated === false) {
          navigate("/");
        }
        setalertMessage(<p>{AdminGetAllPostData.message}</p>);
        setalertType("error");
        setalertShow(true);
        dispatch({ type: "Admin_OwnerGetAllPostClear" });
      }
    }
    // eslint-disable-next-line
  }, [AdminGetAllPostData]);

  useEffect(() => {
    if (AdminData) {
      if (AdminData.success === false) {
        if (AdminData.AdminVerify === false) {
          dispatch(LogoutAction());
          navigate("/");
        }
        if (AdminData.IsAuthenticated === false) {
          navigate("/");
        }

        setalertMessage(<p>{AdminData.message}</p>);
        setalertType("error");
        setalertShow(true);
        dispatch({ type: "GetAllAdminClear" });
      }

      // alert("single post")
    }
    // eslint-disable-next-line
  }, [AdminData]);

  // Get All Bid Document by Post Id

  useEffect(() => {
    if (BidData) {
      if (BidData.success === false) {
        if (BidData.AdminVerify === false) {
          navigate("/");
          dispatch(LogoutAction());
        }
        if (BidData.IsAuthenticated === false) {
          navigate("/");
        }
        setalertMessage(<p>{BidData.message}</p>);
        setalertType("error");
        setalertShow(true);
        dispatch({ type: "GetPost_BiddingDocumentClear" });
      }
    }

    // eslint-disable-next-line
  }, [BidData]);

  // Get All Post HomeCard Component

  useEffect(() => {
    if (AllPost) {
      if (AllPost.success === false) {
        if (AllPost.message) {
          setalertMessage(<p>{AllPost.message}</p>);
          setalertType("error");
          setalertShow(true);
          // dispatch(AlertAction("error", <p>{AllPost.message}</p>, true));
        }

        dispatch({ type: "GetAllPostClear" });
        // alert("single post")
      }
    }
    // eslint-disable-next-line
  }, [AllPost]);

  useEffect(() => {
    if (GetSingleProjectName) {
      if (GetSingleProjectName.success == false) {
        if (GetSingleProjectName.message) {
          setalertMessage(<p>{GetSingleProjectName.message}</p>);
          setalertType("error");
          setalertShow(true);
          // dispatch(AlertAction("error", <p>{AllPost.message}</p>, true));
        }

        dispatch({ type: "GetSingleProjectNameDataClear" });
      }
    }
  }, [GetSingleProjectName]);
  //  GetAll Project Name

  useEffect(() => {
    if (LoginUserPostData) {
      if (LoginUserPostData.success === false) {
        if (LoginUserPostData.IsAuthenticated === false) {
          navigate("/");
        }

        if (LoginUserPostData?.isBlockedUser == true) {
          dispatch(LogoutAction())
          navigate("/")
        }

        setalertMessage(<p>{LoginUserPostData.message}</p>);
        setalertType("error");
        setalertShow(true);

        dispatch({ type: "LoginUserGetPostClear" });
      }
    }
    // eslint-disable-next-line
  }, [LoginUserPostData]);

  useEffect(() => {
    if (TenentResponseData) {
      if (TenentResponseData.success === false) {
        if (TenentResponseData.IsAuthenticated === false) {
          navigate("/");
        }
        if (TenentResponseData?.isBlockedUser == true) {
          dispatch(LogoutAction())
          navigate("/")
        }
        setalertMessage(<p>{TenentResponseData.message}</p>);
        setalertType("error");
        setalertShow(true);

        dispatch({ type: "GetAllTenentResponseFailClear" });
      }
    }
    // eslint-disable-next-line
  }, [TenentResponseData]);

  useEffect(() => {
    if (ScheduleVisitsData) {
      if (ScheduleVisitsData.success === false) {
        // dispatch(AlertAction("error", <p>{data.message}</p>, true));
        if (ScheduleVisitsData.AdminVerify === false) {
          navigate("/");
          dispatch(LogoutAction());
        }
        if (ScheduleVisitsData.IsAuthenticated === false) {
          navigate("/");
        }
        setalertMessage(<p>{ScheduleVisitsData.message}</p>);
        setalertType("error");
        setalertShow(true);
        dispatch({ type: "Admin_OwnerGetAllScheduleVisitsClear" });
      }
    }
    // eslint-disable-next-line
  }, [ScheduleVisitsData]);

  useEffect(() => {
    if (VistAndOfferData) {
      if (VistAndOfferData.success === false) {
        // dispatch(AlertAction("error", <p>{data.message}</p>, true));
        if (VistAndOfferData.AdminVerify === false) {
          navigate("/");
          dispatch(LogoutAction());
        }
        if (VistAndOfferData.IsAuthenticated === false) {
          navigate("/");
        }
        setalertMessage(<p>{VistAndOfferData.message}</p>);
        setalertType("error");
        setalertShow(true);
        dispatch({ type: "GetAllScheduleVisitsAndMakeOffer_LengthClear" });
      }
    }
    // eslint-disable-next-line
  }, [VistAndOfferData]);

  useEffect(() => {
    if (AssignPostData) {
      if (AssignPostData.success === false) {
        // dispatch(AlertAction("error", <p>{data.message}</p>, true));
        if (AssignPostData.AdminVerify === false) {
          navigate("/");
          dispatch(LogoutAction());
        } 
        if (AssignPostData.IsAuthenticated === false) {
          navigate("/");
        }

        setalertMessage(<p>{AssignPostData.message}</p>);
        setalertType("error");
        setalertShow(true);
        dispatch({ type: "GetAllAssignPropertyClear" });
      }
    }
    // eslint-disable-next-line
  }, [AssignPostData]);

  useEffect(() => {
    if (AdminAssignPropertyData) {
      if (AdminAssignPropertyData.success === false) {
        // dispatch(AlertAction("error", <p>{data.message}</p>, true));
        if (AdminAssignPropertyData.AdminVerify === false) {
          navigate("/");
          dispatch(LogoutAction());
        }
        if (AdminAssignPropertyData.IsAuthenticated === false) {
          navigate("/");
        }

        setalertMessage(<p>{AdminAssignPropertyData.message}</p>);
        setalertType("error");
        setalertShow(true);
        dispatch({ type: "Admin_AgentGetAllPostActionClear" });
      }
    }
    // eslint-disable-next-line
  }, [AdminAssignPropertyData]);

  //  myvisits
  useEffect(() => {
    if (MyVisitsData) {
      if (MyVisitsData.success === false) {
        if (MyVisitsData.IsAuthenticated === false) {
          navigate("/");

          // setTimeout(() => {

          //   navigate("/login")
          // }, 0);
        }

        if (MyVisitsData?.isBlockedUser == true) {
          dispatch(LogoutAction())
          navigate("/")
        }
        setalertMessage(<p>{MyVisitsData.message}</p>);
        setalertType("error");
        setalertShow(true);

        dispatch({ type: "GetMyVisitsClear" });
      }
    }
    // eslint-disable-next-line
  }, [MyVisitsData]);

  useEffect(() => {
    if (OwnerPostsVisitsData) {
      if (OwnerPostsVisitsData.success === false) {
        if (OwnerPostsVisitsData.IsAuthenticated === false) {
          navigate("/");
        }
        if (OwnerPostsVisitsData?.isBlockedUser == true) {
          dispatch(LogoutAction())
          navigate("/")
        }
        setalertMessage(<p>{OwnerPostsVisitsData.message}</p>);
        setalertType("error");
        setalertShow(true);

        dispatch({ type: "OwnerAllPostsVisitClear" });
      }
    }
    // eslint-disable-next-line
  }, [OwnerPostsVisitsData]);

  // similar
  useEffect(() => {
    if (SimilarPropertyData) {
      if (SimilarPropertyData.success === false) {
        if (SimilarPropertyData.IsAuthenticated === false) {
          navigate("/");
        }
        setalertMessage(<p>{SimilarPropertyData.message}</p>);
        setalertType("error");
        setalertShow(true);

        dispatch({ type: "SimilarPropertyClear" });
      }
    }
    // eslint-disable-next-line
  }, [SimilarPropertyData]);
  // All user response action
  useEffect(() => {
    if (AllUserResponseAction_Store) {
      if (AllUserResponseAction_Store.success === false) {
        if (AllUserResponseAction_Store.IsAuthenticated === false) {
          navigate("/");
        }
        setalertMessage(<p>{AllUserResponseAction_Store.message}</p>);
        setalertType("error");
        setalertShow(true);

        dispatch({ type: "SimilarPropertyClear" });
      }
    }
    // eslint-disable-next-line
  }, [AllUserResponseAction_Store]);

  // single user response action
  useEffect(() => {
    if (SingleUserResponseAction_Store) {
      if (SingleUserResponseAction_Store.success === false) {
        if (SingleUserResponseAction_Store.IsAuthenticated === false) {
          navigate("/");
        }
        setalertMessage(<p>{SingleUserResponseAction_Store.message}</p>);
        setalertType("error");
        setalertShow(true);

        dispatch({ type: "SimilarPropertyClear" });
      }
    }
    // eslint-disable-next-line
  }, [SingleUserResponseAction_Store]);

  // search property
  useEffect(() => {
    if (serachResponse) {
      if (serachResponse.success === false) {
        if (serachResponse.IsAuthenticated === false) {
          navigate("/");
        }
        setalertMessage(<p>{serachResponse.message}</p>);
        setalertType("error");
        setalertShow(true);

        dispatch({ type: "SimilarPropertyClear" });
      }
    }
    // eslint-disable-next-line
  }, [serachResponse]);
  //  paid property 
  useEffect(() => {
    if (paidPropertyData) {
      if (paidPropertyData.success === false) {
        if (paidPropertyData.IsAuthenticated === false) {
          navigate("/");
        }
        setalertMessage(<p>{paidPropertyData.message}</p>);
        setalertType("error");
        setalertShow(true);

        dispatch({ type: "getPaidPropertyFailClear" });
      }
    }
    // eslint-disable-next-line
  }, [paidPropertyData]);
  // get transaction paid detail 
  useEffect(() => {
    if (getTransactionDetail) {
      if (getTransactionDetail.success === false) {
        if (getTransactionDetail.IsAuthenticated === false) {
          navigate("/");
        }
        setalertMessage(<p>{getTransactionDetail.message}</p>);
        setalertType("error");
        setalertShow(true);

        dispatch({ type: "getPaidPropertyFailClear" });
      }
    }
    // eslint-disable-next-line
  }, [getTransactionDetail]);

  // get All User
  useEffect(() => {
    if (AllUserResponseData) {
      if (AllUserResponseData.success === false) {
        if (AllUserResponseData.IsAuthenticated === false) {
          // navigate("/");
        }
        setalertMessage(<p>{AllUserResponseData.message}</p>);
        setalertType("error");
        setalertShow(true);

        dispatch({ type: "SimilarPropertyClear" });
      }
    }
    // eslint-disable-next-line
  }, [AllUserResponseData]);

  // notify

  useEffect(() => {
    if (AllNotifiesAndReqData) {
      if (AllNotifiesAndReqData.success === false) {
        if (AllNotifiesAndReqData.IsAuthenticated === false) {
          navigate("/");
          // setTimeout(() => {

          //   navigate("/login")
          // }, 0);
        }
        setalertMessage(<p>{AllNotifiesAndReqData.message}</p>);
        setalertType("error");
        setalertShow(true);

        dispatch({ type: "GetNotifiesAndPropRequestsClear" });
      }
    }
    // eslint-disable-next-line
  }, [AllNotifiesAndReqData]);

  useEffect(() => {
    if (deletePostsData) {
      if (deletePostsData.success === false) {
        if (deletePostsData.IsAuthenticated === false) {
          navigate("/");
        }
        setalertMessage(<p>{deletePostsData.message}</p>);
        setalertType("error");
        setalertShow(true);

        dispatch({ type: "GetNotifiesAndPropRequestsClear" });
      }
    }
    // eslint-disable-next-line
  }, [deletePostsData]);




  //  exel file  (Owner)

  useEffect(() => {
    if (OwnerAllExcelFilesData) {
      if (OwnerAllExcelFilesData.success === false) {
        // dispatch(AlertAction("error", <p>{data.message}</p>, true));
        if (OwnerAllExcelFilesData.AdminVerify === false) {
          navigate("/");
          dispatch(LogoutAction());
        }
        if (OwnerAllExcelFilesData.IsAuthenticated === false) {
          navigate("/");
        }

        setalertMessage(<p>{OwnerAllExcelFilesData.message}</p>);
        setalertType("error");
        setalertShow(true);
        dispatch({ type: "FetchAllOwnerFilesClear" });
      }
    }
    // eslint-disable-next-line
  }, [OwnerAllExcelFilesData]);
  // excel file (admin)
  useEffect(() => {
    if (AdminAllExcelFilesData) {
      if (AdminAllExcelFilesData.success === false) {
        // dispatch(AlertAction("error", <p>{data.message}</p>, true));
        if (AdminAllExcelFilesData.AdminVerify === false) {
          navigate("/");
          dispatch(LogoutAction());
        }
        if (AdminAllExcelFilesData.IsAuthenticated === false) {
          navigate("/");
        }

        setalertMessage(<p>{AdminAllExcelFilesData.message}</p>);
        setalertType("error");
        setalertShow(true);
        dispatch({ type: "FetchAllOwnerFilesClear" });
      }
    }
    // eslint-disable-next-line
  }, [AdminAllExcelFilesData]);

  // excel file (ajent)

  useEffect(() => {
    if (AgentAllExcelFilesData) {
      if (AgentAllExcelFilesData.success === false) {
        // dispatch(AlertAction("error", <p>{data.message}</p>, true));
        if (AgentAllExcelFilesData.AdminVerify === false) {
          navigate("/");
          dispatch(LogoutAction());
        }
        if (AgentAllExcelFilesData.IsAuthenticated === false) {
          navigate("/");
        }

        setalertMessage(<p>{AgentAllExcelFilesData.message}</p>);
        setalertType("error");
        setalertShow(true);
        dispatch({ type: "FetchAllOwnerFilesClear" });
      }
    }
    // eslint-disable-next-line
  }, [AgentAllExcelFilesData]);


  useEffect(() => {
    if (alertshow === true) {
      dispatch(AlertAction(alertType, alertMessage, alertshow));
    }
    // eslint-disable-next-line
  }, [alertType, alertMessage, alertshow]);
  useEffect(() => {
    dispatch(GetMeDetailsAction());
        console.log(medata)
   
  }, []);
 console.log(medata)
   useEffect(()=>{
    if(medata?.isBlockedUser==true){
      dispatch(LogoutAction())
    } 
   } ,[medata])
  return (
    <>
      {/* <PinnacleSms /> */}
      {
       
      }
       
    
      <Navbar />
      {alertData && alertData.AlertShow === true && (
        <Alert
          AlertType={alertData.AlertType}
          AlertMessage={alertData.AlertMessage}
          ShowAlert={alertData.AlertShow}
        />
      )}
      {/* <Scroll  */}
      {/* <ScrollToTop /> */}

      <Routes>
        <Route exact path="/login" element={<UserForm />} />
        <Route exact path="/nri/login" element={<UserForm />} />
        {/* Admin ,Owner ,Agent */}
        <Route
          exact
          path="sqpt/:Role/request"
          element={<AdminOwnerCreateProfileSection />}
        />

        <Route
          exact
          path="sqpt/:Role/login"
          element={<AdminOwnerLoginProfileSection />}
        />

        {/* test */}
        <Route exact path="/test" element={<Search />} />
        {/* test */}
        <Route exact path="/" element={<HeroSection />} />
        <Route exact path="/home/card" element={<PropertyFiltersCard />} />
        {/* <Route exact path="/home/card" element={<AllPostSearchFilter />} /> */}

        <Route
          exact
          path="/post-detail/:PostAddress"
          element={<SinglePostDetails />}
        />
        <Route
          exact
          path="/Our-Service"
          element={<OurService />}
        />
        <Route
          exact
          path="/Career"
          element={<Career />}
        />

        <Route
          exact
          path="/Report"
          element={<ReportPage />}
        />

        <Route
          exact
          path="/terms-and-conditions"
          element={<TermsAndConditions />}
        />
        <Route
          exact
          path="/blog-page"
          element={<BlogPage />}
        />
        <Route
          exact
          path="/blog-page/:title"
          element={<SingleBlog />}
        />
        <Route exact path="/privacy-policy" element={<PrivacyPolicy />} />
        {/* protect route for user */}
        <>
          <Route
            exact
            path="/user/"
            element={<ProtectedRoutes Component={Profile} />}
          >
            <Route index element={<ProfileHeader />} />
            <Route exact path="my-listing" element={<ShowLoginUserPost />} />
            <Route exact path="post" element={<CreatePostMain />} />
            <Route
              exact
              path="post/update/:PostId"
              element={<CreatePostMain />}
            />

            <Route exact path="my-visits" element={<MyVisits />} />

            <Route
              exact
              path="my-post/all-response"
              element={<OwnerPostAllResponse />}
            />
            <Route
              exact
              path="transactions"
              element={<Transaction />}
            />


            <Route

              exact
              path="favourite-post"
              element={<ShowUserFavouritePost />}
            />
            <Route exact path="/user/profileEdit" element={<ProfileEdit />} />
            <Route
              exact
              path="/user/profileUpdate"
              element={<ProfileUpdate />}
            />
          </Route>
        </>
        {/*admin routes*/}
        {/* This Routes available For Admin Owner Agent  */}

        <Route
          exact
          path="/admin"
          element={<AdminOwnerRoutes Component={AdminAside} />}
        >
          <Route exact path="dashboard" element={<Dashbord />} />
          {/* This routes Avaliable for Owner Only  */}
          <Route
            exact
            path="data"
            element={
              <AdminOwnerRoutes Component={AllAdminData} isOwner={true} />
            }
          />

          <Route
            exact
            path="all-excel"
            element={
              <AdminOwnerRoutes Component={OwnerAgentExcelData} isOwner={true} />
            }
          />

          <Route

            path="all-excel-both"
            element={
              <AdminAgentExcelData />
            }
          />
          <Route
            exact
            path="excel/:id"
            element={
              <AdminOwnerRoutes Component={OwnerAgentExcel} />
            }
          />
          <Route
            exact
            path="single-user-Response-action/:id"
            element={
              <AdminOwnerRoutes Component={SingleUserRespponseAction} isOwner={true} />
            }
          />
          <Route
            exact
            path="all-user-Response-action"
         element={
          <AdminOwnerRoutes Component={AllUserResponseAction} isOwner={true}/>
         }
          />
            <Route
            exact
            path="agent-user-Response-action"
         element={
          <AgentUserResponse/>
         }
          />
          {/* <Route
            exact
            path="data/unverify"
            element={
              <AdminOwnerRoutes Component={AllAdminData} isOwner={true} />
            }
          /> */}
          {/* <Route
            exact
            path="data/total"
            element={
              <AdminOwnerRoutes Component={AllAdminData} isOwner={true} />
            }
          /> */}
          {/* Agent Data  */}
          {/* <Route
            exact
            path="agent/data/total"
            element={
              <AdminOwnerRoutes Component={AllAdminData} isOwner={true} />
            }
          /> */}

          {/* <Route
            exact
            path="agent/data/verify"
            element={
              <AdminOwnerRoutes Component={AllAdminData} isOwner={true} />
            }
          /> */}

          <Route
            exact
            path="notify"
            element={
              <AdminOwnerRoutes
                Component={NotifyRequirements}
                isOwner={false}
              />
            }
          />
          <Route
            exact
            path="all-registration-response"
            element={
              <AdminOwnerRoutes
                Component={AllRegistrationResponse}
                isOwner={true}
              />
            }
          />
          <Route
            exact
            path="Transaction"
            element={
              <AdminOwnerRoutes
                Component={AllTransactionResponse}
                isOwner={true}
              />
            }
          />

          <Route
            exact
            path="agent/dashboard"
            element={
              <AdminOwnerRoutes
                Component={AdminAgentDashboard}
                isOwner={true}
              />
            }
          />
          <Route
            exact
            path="deleted-post"
            element={
              <AdminOwnerRoutes Component={DeletePosts} isOwner={true} />
            }
          />
          <Route
            exact
            path="deleted-post/:PostAddress"
            element={
              <AdminOwnerRoutes Component={SinglePostDetails} isOwner={true} />
            }
          />
          {/* Route Avaliable Only Admin Owner Agent  */}
          <Route exact path="allpost" element={<AdminAgentOwnerPost />} />

          <Route
            exact
            path="schedule-visit/:PostId"
            element={<ScheduleYourVisit />}
          />
          <Route
            exact
            path="recive-offer/:PostId"
            element={<OfferReceived />}
          />
          {/* deletepost schedulevisit  and delete post offers */}

          <Route
            exact
            path="schedule-visit/deleted-post/:PostId"
            element={<ScheduleYourVisit />}
          />

          <Route
            exact
            path="recive-offer/deleted-post/:PostId"
            element={<OfferReceived />}
          />
          <Route
            exact
            path="post/update/:PostId"

            element={<AdminOwnerRoutes Component={CreatePostMain} isOwner={true} />}
          />
          <Route
            exact
            path="all-asign-post-Response-action"
            element={
              < AllUserResponseAction />
            }
          />
        </Route>

        {/*All post route*/}
        <Route path={"/all-post/:type"} element={<AllPostRender />} />
        <Route path="*" element={<PageNotFound />} />



      </Routes> 
       
    
      <Footer />
    </>
  );
}

export default App;


