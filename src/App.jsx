import "./App.css";
import React, { useContext, useState } from "react";
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
import ViewTenantPostResponse from "./Component/User/Profile/ViewTenantPostResponse";
import ShowUserFavouritePost from "./Component/User/Profile/ShowUserFavouritePost";
import ScheduleYourVisit from "./Component/Admin/ScheduleVisit";
import OfferReceived from "./Component/Admin/OfferRecived";
import { UserContext } from "./Component/CreateContext/CreateContext";
import TermsAndConditions from "./Component/Home/TermsAndConditions";
import PrivacyPolicy from "./Component/Home/PrivacyPolicy";
import ProfileEdit from "./Component/User/Profile/ProfileEdit";
import ProfileUpdate from "./Component/User/Profile/ProfileUpdate";
import AdminAgentDashboard from "./Component/Admin/AdminAgentDashboard";

import AdminAgentAssignPost from "./Component/Admin/AdminAgentAssignPost";
import AdminAgentOwnerPost from "./Component/Admin/AdminAgentOwnerPost";
import PageNotFound from "./PageNotFound";
import MyVisits from "./Component/User/Profile/MyVisits";
import OwnerPostAllVisits from "./Component/User/Profile/OwnerPostAllVisits";
import NotifyRequirements from "./Component/Admin/NotifyRequirements";
// import MyVisits from "./Component/Post/CreatePost/m";

function App() {
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
      if (
        data.success === true &&["CreatePostRequest"].includes(LodingType)
      ) {
         
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
          "CreateUserOtpRequest" ,
          "VerifyUserOtpRequest" ,
          "CreateUserRequest"
        ].includes(LodingType) == false
      ) {
        setalertMessage(<p>{data.message}</p>);
        setalertType("Success");
        setalertShow(true);

        dispatch({ type: "UserClear" });
      }
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
    // eslint-disable-next-line
  }, [data]);

  //  show Alert on Create Post Delete Post and UpdatePost
  // Admin Onwer Show Alert Function
  useEffect(() => {
    if (CreatePost) {
      if (CreatePost.success === true) {
        // if (medata && medata.IsAuthenticated === true) {
        //   if (["Admin", "Owner"].includes(medata.user.Role)) {
        //     // dispatch(Admin_OwnerGetAllPostAction());
        //   }
        // }

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
        setalertMessage(<p>{CreatePost.message}</p>);
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
          // setTimeout(() => {

          //   navigate("/login")
          // }, 0);
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
          // setTimeout(() => {

          //   navigate("/login")
          // }, 0);
        }
        setalertMessage(<p>{SimilarPropertyData.message}</p>);
        setalertType("error");
        setalertShow(true);

        dispatch({ type: "SimilarPropertyClear" });
      }
    }
    // eslint-disable-next-line
  }, [SimilarPropertyData]);


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
    if (alertshow === true) {
      dispatch(AlertAction(alertType, alertMessage, alertshow));
    }
    // eslint-disable-next-line
  }, [alertType, alertMessage, alertshow]);
  useEffect(() => {
    dispatch(GetMeDetailsAction());
  }, []);

  return (
    <>
      {/* <PinnacleSms /> */}
      <Navbar />

      {alertData && alertData.AlertShow === true && (
        <Alert
          AlertType={alertData.AlertType}
          AlertMessage={alertData.AlertMessage}
          ShowAlert={alertData.AlertShow}
        />
      )}
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
        <Route exact path="/" element={<HeroSection />} />
        <Route exact path="/home/card" element={<PropertyFiltersCard />} />
        <Route
          exact
          path="/post-detail/:PostAddress"
          element={<SinglePostDetails />}
        />

        <Route
          exact
          path="/terms-and-conditions"
          element={<TermsAndConditions />}
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
            <Route
              exact
              path="post/response"
              element={<ViewTenantPostResponse />}
            />

            <Route exact path="my-visits" element={<MyVisits />} />

            <Route
              exact
              path="my-post/all-visits"
              element={<OwnerPostAllVisits />}
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

        <Route
          exact
          path="/admin"
          element={<AdminOwnerRoutes Component={AdminAside} />}
        >
          <Route exact path="dashboard" element={<Dashbord />} />

          <Route
            exact
            path="data"
            element={
              <AdminOwnerRoutes Component={AllAdminData} isOwner={true} />
            }
          />
              <Route
            exact
            path="notify"
            element={
              <AdminOwnerRoutes Component={NotifyRequirements} isOwner={false} />
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
          {/* 
          <Route
            exact
            path="agent/data/unverify"
            element={
              <AdminOwnerRoutes Component={AllAdminData} isOwner={true} />
            }
          /> */}

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

          <Route exact path="allpost" element={<AdminAgentOwnerPost />} />

          {/* <Route
            exact
            path="allpost/verify"
            element={<AdminAgentOwnerPost />}
          /> */}
          {/* <Route
            exact
            path="allpost/unverify"
            element={<AdminAgentOwnerPost />}
          /> */}
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

          <Route
            exact
            path="post/update/:PostId"
            element={<CreatePostMain />}
          />
        </Route>
        <Route path="*" element={<PageNotFound />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
