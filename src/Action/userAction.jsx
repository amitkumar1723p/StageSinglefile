import axios from "axios";
const api_Base_Url = process.env.REACT_APP_API_URL;
//  Create User Action    Change Genrate Otp  By User Create

export const CreateUserOtpAction = (userData) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: "CreateUserOtpRequest",
        payload: "CreateUserOtpRequest",
      });
      // const url = "/user/create";
      const url = `${api_Base_Url}/user/${userData.email ? "nri-genrate-otp" : "genrate-otp"
        }`;
      //  const url =  ""
      const config = {
        headers: { "Content-Type": "application/json" },

        withCredentials: true,
      };

      const { data } = await axios.post(url, userData, config);

      dispatch({ type: "CreateUserOtpSuccess", payload: data });
    } catch (error) {
      if (error.response) {
        dispatch({ type: "CreateUserOtpFail", payload: error.response.data });
      } else {
        dispatch({
          type: "CreateUserOtpFail",
          payload: { message: error.message, success: false },
        });
      }
    }
  };
};

//  Verify Otp  Login User and Create Profile

export const VerifyUserOtpAction = (userData) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: "VerifyUserOtpRequest",
        payload: "VerifyUserOtpRequest",
      });

      // let url = "";
      // const url = `${api_Base_Url}/user/${
      //   userData.email ? "nri-genrate-otp" : "genrate-otp"
      // }`;

      const url = `${api_Base_Url}/user/${userData.email ? "nri-verify-otp" : "verify-otp"
        }`;

      const config = {
        headers: { "Content-Type": "application/json" },

        withCredentials: true,
      };

      const { data } = await axios.post(url, userData, config);

      dispatch({ type: "VerifyUserOtpSuccess", payload: data });
    } catch (error) {
      if (error.response) {
        dispatch({ type: "VerifyUserOtpFail", payload: error.response.data });
      } else {
        dispatch({
          type: "VerifyUserOtpFail",
          payload: { message: error.message, success: false },
        });
      }
    }
  };
};

export const CreateUserAction = (userData, ISNRI) => {
  return async (dispatch) => {
    // ISNRI

    try {
      dispatch({
        type: "CreateUserRequest",
        payload: "CreateUserRequest",
      });

      // const url = "/user/create";
      // const url = `${api_Base_Url}/user/create`;
      const url = `${api_Base_Url}/user/${ISNRI ? "nri-create" : "create"}`;
      const config = {
        headers: { "Content-Type": "application/json" },

        withCredentials: true,
      };

      const { data } = await axios.post(url, userData, config);

      dispatch({ type: "CreateUserSuccess", payload: data });
    } catch (error) {
      if (error.response) {
        dispatch({ type: "CreateUserFail", payload: error.response.data });
      } else {
        dispatch({
          type: "CreateUserFail",
          payload: { message: error.message, success: false },
        });
      }
    }
  };
};

// get Login User details

export const GetMeDetailsAction = () => {
  return async (dispatch) => {
    try {
      dispatch({ type: "MeDetailsRequest" });

      const url = `${api_Base_Url}/user/data`;

      const config = {
        headers: { "Content-Type": "application/json" },

        withCredentials: true,
      };

      const { data } = await axios.get(url, config);

      dispatch({ type: "MeDetailsSuccess", payload: data });
    } catch (error) {
      if (error.response) {
        dispatch({ type: "MeDetailsFail", payload: error.response.data });
      } else {
        dispatch({
          type: "MeDetailsFail",
          payload: { message: error.message, success: false },
        });
      }
    }
  };
};

// Logout User

export const LogoutAction = (userData) => {
  return async (dispatch) => {
    try {
      dispatch({ type: "LogoutRequest" });

      const url = `${api_Base_Url}/user/logout`;

      const config = {
        headers: { "Content-Type": "application/json" },

        withCredentials: true,
      };

      const { data } = await axios.get(url, config);

      dispatch({ type: "LogoutSuccess", payload: data });
    } catch (error) {
      if (error.response) {
        dispatch({ type: "LogoutFail", payload: error.response.data });
      } else {
        dispatch({
          type: "LogoutFail",
          payload: { message: error.message, success: false },
        });
      }
    }
  };
};

//ExpressionOfInterest Action

export const CreateExpressionOfInterestAction = (queryData) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: "CreateExpressionOfInterestRequest",
        payload: "CreateExpressionOfInterestRequest",
      });

      // const url = "/expression-of-interest/create";
      const url = `${api_Base_Url}/expression-of-interest/create`;

      const config = {
        headers: { "Content-Type": "application/json" },

        withCredentials: true,
      };

      const { data } = await axios.post(url, queryData, config);
      dispatch({ type: "CreateExpressionOfInterestSuccess", payload: data });
    } catch (error) {
      if (error.response) {
        dispatch({
          type: "CreateExpressionOfInterestFail",
          payload: error.response.data,
        });
      } else {
        dispatch({
          type: "CreateExpressionOfInterestFail",
          payload: { message: error.message, success: false },
        });
      }
    }
  };
};

// Bidding Form Action

export const BiddingFormAction = (queryData) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: "BiddingFormRequest",
        payload: "BiddingFormRequest",
      });
      // const url = "/Biddingform/create";
      const url = `${api_Base_Url}/Biddingform/create`;
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
          "Content-Type": "application/json"
        },

        withCredentials: true,
      };

      const { data } = await axios.post(url, queryData, config);
      dispatch({ type: "BiddingFormSuccess", payload: data });
    } catch (error) {
      if (error.response) {
        dispatch({ type: "BiddingFormFail", payload: error.response.data });
      } else {
        dispatch({
          type: "BiddingFormFail",
          payload: { message: error.message, success: false },
        });
      }
    }
  };
};

// Admin Owner Action  Crete Profile

export const CreateOtp_Admin_Owner_Action = ({ userData }) => {
  return async (dispatch) => {
    try {
      dispatch({ type: "CreateOtp_Admin_OwnerRequest" });
      let url;

      if (userData.Otp) {
        url = `${api_Base_Url}/admin-owner/create/verify-otp`;
      } else {
        url = `${api_Base_Url}/admin-owner/create/generate-otp`;
      }

      const config = {
        headers: { "Content-Type": "application/json" },

        withCredentials: true,
      };

      const { data } = await axios.post(url, userData, config);

      dispatch({ type: "CreateOtp_Admin_OwnerSuccess", payload: data });
    } catch (error) {
      if (error.response) {
        dispatch({
          type: "CreateOtp_Admin_OwnerFail",
          payload: error.response.data,
        });
      } else {
        dispatch({
          type: "CreateOtp_Admin_OwnerFail",
          payload: { message: error.message, success: false },
        });
      }
    }
  };
};

// Admin Owner  Login Profile

export const Login_Admin_Owner_Action = ({ userData }) => {
  return async (dispatch) => {
    try {
      dispatch({ type: "Login_Admin_OwnerRequest" });

      let url;

      if (userData.Otp) {
        url = `${api_Base_Url}/admin-owner/login/verify-otp`;
      } else {
        url = `${api_Base_Url}/admin-owner/login`;
      }

      const config = {
        headers: { "Content-Type": "application/json" },

        withCredentials: true,
      };

      const { data } = await axios.post(url, userData, config);

      dispatch({ type: "Login_Admin_OwnerSuccess", payload: data });
    } catch (error) {
      if (error.response) {
        dispatch({
          type: "Login_Admin_OwnerFail",
          payload: error.response.data,
        });
      } else {
        dispatch({
          type: "Login_Admin_OwnerFail",
          payload: { message: error.message, success: false },
        });
      }
    }
  };
};

// Get All Admin

export const GetAllAdminAction = (Keyword) => {
  return async (dispatch) => {
    try {
      dispatch({ type: "GetAllAdminRequest" });

      let url;
      if (Keyword) {
        url = `${api_Base_Url}/admin-owner/admin-data?${Object.keys(Keyword)[0]
          }=${Keyword[Object.keys(Keyword)[0]]}`;
      } else {
        url = `/admin-owner/admin-data`;
      }
      // if(ke)

      const config = {
        headers: { "Content-Type": "application/json" },

        withCredentials: true,
      };

      const { data } = await axios.get(url, config);

      dispatch({ type: "GetAllAdminSuccess", payload: data });
    } catch (error) {
      if (error.response) {
        dispatch({
          type: "GetAllAdminFail",
          payload: error.response.data,
        });
      } else {
        dispatch({
          type: "GetAllAdminFail",
          payload: { message: error.message, success: false },
        });
      }
    }
  };
};

// Update role Action
export const VerifyAdminAction = ({ userdata }, UserId) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: "VerifyAdminRequest",
        payload: "VerifyAdminRequest",
      });

      const url = `${api_Base_Url}/admin-owner/admin-verify/${UserId}`;

      const config = {
        headers: { "Content-Type": "application/json" },

        withCredentials: true,
      };

      const { data } = await axios.post(url, userdata, config);
      dispatch({ type: "VerifyAdminSuccess", payload: data });
    } catch (error) {
      if (error.response) {
        dispatch({ type: "VerifyAdminFail", payload: error.response.data });
      } else {
        dispatch({
          type: "VerifyAdminFail",
          payload: { message: error.message, success: false },
        });
      }
    }
  };
};

// Get All Bidding Data  sort by Post id
export const GetPost_BiddingDocumentAction = (PostId , DeletePost) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: "GetPost_BiddingDocumentRequest",
        payload: "GetPost_BiddingDocumentRequest",
      });

    

       let url ;

      if (DeletePost == true) {
        url = `${api_Base_Url}/Biddingform/get-bidding-data/deleted-post/${PostId}`;
      } else {
        url = `${api_Base_Url}/Biddingform/get-bidding-data/${PostId}`;
      }

      const config = {
        headers: { "Content-Type": "application/json" },

        withCredentials: true,
      };

      const { data } = await axios.get(url, config);

      dispatch({ type: "GetPost_BiddingDocumentSuccess", payload: data });
    } catch (error) {
      if (error.response) {
        dispatch({
          type: "GetPost_BiddingDocumentFail",
          payload: error.response.data,
        });
      } else {
        dispatch({
          type: "GetPost_BiddingDocumentFail",
          payload: { message: error.message, success: false },
        });
      }
    }
  };
};

// Verify Bid Action

export const VerifyBidAction = ({ biddata }, BidId) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: "VerifyBidRequest",
        payload: "VerifyBidRequest",
      });

      let url = `${api_Base_Url}/Biddingform/bid/verify/${BidId}`;

      const config = {
        headers: { "Content-Type": "application/json" },

        withCredentials: true,
      };

      const { data } = await axios.post(url, biddata, config);
      dispatch({ type: "VerifyBidSuccess", payload: data });
    } catch (error) {
      if (error.response) {
        dispatch({ type: "VerifyBidFail", payload: error.response.data });
      } else {
        dispatch({
          type: "VerifyBidFail",
          payload: { message: error.message, success: false },
        });
      }
    }
  };
};

// Create Schedule Visit
export const CreateScheduleVisitAction = (VistData) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: "CreateScheduleVisitRequest",
        payload: "CreateScheduleVisitRequest",
      });

      const url = `${api_Base_Url}/schedule-visit/create`;

      const config = {
        headers: { "Content-Type": "application/json" },

        withCredentials: true,
      };

      const { data } = await axios.post(url, VistData, config);
      dispatch({ type: "CreateScheduleVisitSuccess", payload: data });
    } catch (error) {
      if (error.response) {
        dispatch({
          type: "CreateScheduleVisitFail",
          payload: error.response.data,
        });
      } else {
        dispatch({
          type: "CreateScheduleVisitFail",
          payload: { message: error.message, success: false },
        });
      }
    }
  };
};

// Create Post Property Requirement
export const PostPropertyRequirementAction = (PostRequirementData) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: "PostPropertyRequirementRequest",
        payload: "PostPropertyRequirementRequest",
      });

      const url = `${api_Base_Url}/property-requirement/create`;

      const config = {
        headers: { "Content-Type": "application/json" },

        withCredentials: true,
      };

      const { data } = await axios.post(url, PostRequirementData, config);
      dispatch({
        type: "PostPropertyRequirementSuccess",
        payload: { ...data, SuccessType: "PostPropertyRequirementSuccess" },
      });
    } catch (error) {
      if (error.response) {
        dispatch({
          type: "PostPropertyRequirementFail",
          payload: error.response.data,
        });
      } else {
        dispatch({
          type: "PostPropertyRequirementFail",
          payload: { message: error.message, success: false },
        });
      }
    }
  };
};

// Create Channel  Partner

export const CreateChannelPartnerAction = (ChannelPartnerData) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: "CreateChannelPartnerRequest",
        payload: "CreateChannelPartnerRequest",
      });

      const url = `${api_Base_Url}/channel-partner/create`;

      const config = {
        headers: { "Content-Type": "application/json" },

        withCredentials: true,
      };

      const { data } = await axios.post(url, ChannelPartnerData, config);
      dispatch({ type: "CreateChannelPartnerSuccess", payload: data });
    } catch (error) {
      if (error.response) {
        dispatch({
          type: "CreateChannelPartnerFail",
          payload: error.response.data,
        });
      } else {
        dispatch({
          type: "CreateChannelPartnerFail",
          payload: { message: error.message, success: false },
        });
      }
    }
  };
};

// Create Tenant Post Response

export const ViewOwnerDetailsAction = (Document) => {
 
  return async (dispatch) => {
    try {
      dispatch({
        type: "ViewOwnerDetailsRequest",
        payload: "ViewOwnerDetailsRequest",
      });

      const url = `${api_Base_Url}/tenant-post-response/create/${Document.PostId}`;

      const config = {
        headers: { "Content-Type": "application/json" },

        withCredentials: true,
      };

      let data;
      if (Document.TenantsDetails) {
       
        const response = await axios.post(url, Document.TenantsDetails, config);
        data = response.data;
    } else {
     
        const response = await axios.get(url, config);
        data = response.data;
      }

      dispatch({ type: "ViewOwnerDetailsSuccess", payload: data });
    } catch (error) {
      if (error.response) {
        dispatch({
          type: "ViewOwnerDetailsFail",
          payload: error.response.data,
        });
      } else {
        dispatch({
          type: "ViewOwnerDetailsFail",
          payload: { message: error.message, success: false },
        });
      }
    }
  };
};

export const GetAllTenentResponseAction = () => {
  return async (dispatch) => {
    try {
      dispatch({ type: "GetAllTenentResponseRequest" });

      let url = `${api_Base_Url}/tenant-post-response/get`;

      const config = {
        headers: { "Content-Type": "application/json" },

        withCredentials: true,
      };

      const { data } = await axios.get(url, config);

      dispatch({ type: "GetAllTenentResponseSuccess", payload: data });
    } catch (error) {
      if (error.response) {
        dispatch({
          type: "GetAllTenentResponseFail",
          payload: error.response.data,
        });
      } else {
        dispatch({
          type: "GetAllTenentResponseFail",
          payload: { message: error.message, success: false },
        });
      }
    }
  };
};
//  Check Tenent is Exit
export const TenentResponseIsExitAction = (PostId) => {
  return async (dispatch) => {
    try {
      dispatch({ type: "TenentResponseIsExitRequest" });

      let url = `${api_Base_Url}/tenant-post-response/check-tenant-details/${PostId}`;

      const config = {
        headers: { "Content-Type": "application/json" },

        withCredentials: true,
      };

      const { data } = await axios.get(url, config);

      dispatch({ type: "TenentResponseIsExitSuccess", payload: data });
    } catch (error) {
      console.log(error)
      if (error.response) {
        dispatch({
          type: "TenentResponseIsExitFail",
          payload: error.response.data,
        });
      } else {
        dispatch({
          type: "TenentResponseIsExitFail",
          payload: { message: error.message, success: false },
        });
      }
    }
  };
};

export const AddFavouriteAndUnFavouriteAction = (postdata) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: "AddFavouriteAndUnFavouriteRequest",
        payload: "AddFavouriteAndUnFavouriteRequest",
      });

      const url = `${api_Base_Url}/user/add-favourite-post`;

      const config = {
        headers: { "Content-Type": "application/json" },

        withCredentials: true,
      };

      const { data } = await axios.post(url, postdata, config);
      dispatch({ type: "AddFavouriteAndUnFavouriteSuccess", payload: data });
    } catch (error) {
      if (error.response) {
        dispatch({
          type: "AddFavouriteAndUnFavouriteFail",
          payload: error.response.data,
        });
      } else {
        dispatch({
          type: "AddFavouriteAndUnFavouriteFail",
          payload: { message: error.message, success: false },
        });
      }
    }
  };
};

export const NotifyAction = (NotifyDataObj) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: "NotifyActionRequest",
        payload: "NotifyActionRequest",
      });

      const url = `${api_Base_Url}/notify/create`;

      const config = {
        headers: { "Content-Type": "application/json" },

        withCredentials: true,
      };

      const { data } = await axios.post(url, NotifyDataObj, config);
      dispatch({ type: "NotifyActionSuccess", payload: data });
    } catch (error) {
      if (error.response) {
        dispatch({
          type: "NotifyActionFail",
          payload: error.response.data,
        });
      } else {
        dispatch({
          type: "NotifyActionFail",
          payload: { message: error.message, success: false },
        });
      }
    }
  };
};

export const ProfileEditAction = (editData) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: "ProfileEdit",
        payload: "ProfileEdit",
      });

      const url = `${api_Base_Url}/user/editProfile`;
      const config = {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      };
      const { data } = await axios.post(url, editData, config);
      dispatch({ type: "ProfileEditSuccess", payload: data });
    } catch (error) {
      if (error.response) {
        dispatch({
          type: "ProfileEditFail",
          payload: error.response.data,
        });
      } else {
        dispatch({
          type: "ProfileEditFail",
          payload: { message: error.message, success: false },
        });
      }
    }
  };
};

export const ProfileUpdateAction = (updateData) => {

  return async (dispatch) => {
    try {
      dispatch({
        type: "ProfileUpdateRequest",
        payload: "ProfileUpdateRequest",
      });
      const url = `${api_Base_Url}/user/updateProfile`;

      const config = {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      };
      const { data } = await axios.put(url, updateData, config);
      dispatch({ type: "ProfileUpdateSuccess", payload: data });
    } catch (error) {
      if (error.response) {
        dispatch({
          type: "ProfileUpdateFail",
          payload: error.response.data,
        });
      } else {
        dispatch({
          type: "ProfileUpdateFail",
          payload: { message: error.message, success: false },
        });
      }
    }
  };
};

// Action for the report suspicious property
export const ReportSuspiciousProperty = (updateData) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: "ReportSuspiciousPropertyRequest",
        payload: "ReportSuspiciousPropertyRequest",
      });
      const url = `${api_Base_Url}/user/report`;

      const config = {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      };
      const { data } = await axios.post(url, updateData, config);
      dispatch({ type: "ReportSuspiciousPropertySuccess", payload: data });
    } catch (error) {
      if (error.response) {
        dispatch({
          type: "ReportSuspiciousPropertyFail",
          payload: error.response.data,
        });
      } else {
        dispatch({
          type: "ReportSuspiciousPropertyFail",
          payload: { message: error.message, success: false },
        });
      }
    }
  };
};

export const GetMyVisitsAction = () => {
  return async (dispatch) => {
    try {
      dispatch({ type: "GetMyVisitsRequest" })

      let url = `${api_Base_Url}/schedule-visit/my-visits`;

      const config = {
        headers: { "Content-Type": "application/json" },

        withCredentials: true,
      };

      const { data } = await axios.get(url, config);
      dispatch({ type: "GetMyVisitsSuccess", payload: data });
    } catch (error) {
      if (error.response) {
        dispatch({
          type: "GetMyVisitsFail",
          payload: error.response.data,
        });
      } else {
        dispatch({
          type: "GetMyVisitsFail",
          payload: { message: error.message, success: false },
        });
      }
    }
  };
};

// Onner All Post Visits

export const OwnerAllPostsVisitAction = () => {
  return async (dispatch) => {
    try {
      dispatch({ type: "OwnerAllPostsVisitRequest" });

      let url = `${api_Base_Url}/schedule-visit/owner-posts-all-response`;

      const config = {
        headers: { "Content-Type": "application/json" },

        withCredentials: true,
      };

      const { data } = await axios.get(url, config);

      dispatch({ type: "OwnerAllPostsVisitSuccess", payload: data });
    } catch (error) {
      if (error.response) {
        dispatch({
          type: "OwnerAllPostsVisitFail",
          payload: error.response.data,
        });
      } else {
        dispatch({
          type: "OwnerAllPostsVisitFail",
          payload: { message: error.message, success: false },
        });
      }
    }
  };
};

// here we get All User except Owner/Admin/agent

export const getAllUserAction = () => {
  return async (dispatch) => {
    try {
      dispatch({ type: "GetAllUserRequest" });
      let url = `${api_Base_Url}/user/getallUser/`;

      const config = {
        headers: { "Content-Type": "application/json" },

        withCredentials: true,
      };
      const { data } = await axios.get(url, config);
      dispatch({ type: "GetAllUserSuccess", payload: data });
    } catch (error) {
      if (error.response) {
        dispatch({
          type: "GetAllUserFail",
          payload: error.response.data,
        });
      } else {
        dispatch({
          type: "GetAllUserFail",
          payload: { message: error.message, success: false },
        });
      }
    }
  }
}


// Pyement Action

export const paymentAction =  () => {
  // console.log("hgq")
  return async (dispatch) => {
    try {
      // console.log("dis")
      dispatch({ type: "PaymentActionRequest",payload: "PaymentActionRequest" });

      let url = `${api_Base_Url}/payment/userOrder`;
      // console.log(url)
      // const config = {
      

      //   withCredentials: true,
      // };

      const { data } = await axios.post(url, {}, { withCredentials: true });
      // console.log("data", data)
      dispatch({ type: "PaymentActionSuccess", payload: data });
    } catch (error) {
      console.log(error)
      if (error.response) {
        dispatch({
          type: "PaymentActionFail",
          payload: error.response.data,
        });
      } else {
        dispatch({
          type: "PaymentActionFail",
          payload: { message: error.message, success: false },
        });
      }
    }
  }
}

// store payment info
export const verifiedPayment =  (userData) => {
  return async (dispatch) => {
    try {
      dispatch({ type: "verifiedPaymentRequest" });

      let url = `${api_Base_Url}/payment/userSuccess`;

      const config = {
        headers: { "Content-Type": "application/json" },

        withCredentials: true,
      };
// console.log(userData,"j")
      const { data } = await axios.post(url, userData, config);
      dispatch({ type: "verifiedPaymentSuccess", payload: data });
    } catch (error) {
      if (error.response) {
        dispatch({
          type: "verifiedPaymentFail",
          payload: error.response.data,
        });
      } else {
        dispatch({
          type: "verifiedPaymentFail",
          payload: { message: error.message, success: false },
        });
      }
    }
  }
}

// get paid property 

export const getPaidPropertyAction=(PostId)=>{
  return async (dispatch) => {
    try {
      dispatch({ type: "getPaidPropertyRequest" });

      let url = `${api_Base_Url}/payment/getPaidProperty/${PostId}`;

      const config = {
        headers: { "Content-Type": "application/json" },

        withCredentials: true,
      };

      const { data } = await axios.get(url, config);

      dispatch({ type: "getPaidPropertySuccess", payload: data });
    } catch (error) {
      if (error.response) {
        dispatch({
          type: "getPaidPropertyFail",
          payload: error.response.data,
        });
      } else {
        dispatch({
          type: "getPaidPropertyFail",
          payload: { message: error.message, success: false },
        });
      }
    }
  };
}


//user role updation
 
export const UserRoleUpdation = (updateData) => {
  // console.log(updateData)
  return async (dispatch) => {
    try {
      dispatch({
        type: "UserRoleUpdationRequest",
        payload: "UserRoleUpdationRequest",
      });
      const url = `${api_Base_Url}/user/update-role`;

      const config = {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      };
      const { data } = await axios.put(url, updateData, config);
      dispatch({ type: "UserRoleUpdationSuccess", payload: data });
    } catch (error) {
      if (error.response) {
        dispatch({
          type: "UserRoleUpdationFail",
          payload: error.response.data,
        });
      } else {
        dispatch({
          type: "UserRoleUpdationFail",
          payload: { message: error.message, success: false },
        });
      }
    }
  };
};

export const getTransactionDetailAction=()=>{
  console.log("jg")
  return async (dispatch) => {
    try {
      dispatch({ type: "getTransactionDetailRequest" });

      let url = `${api_Base_Url}/payment/allPaidUser`;

      const config = {
        headers: { "Content-Type": "application/json" },

        withCredentials: true,
      };

      const { data } = await axios.get(url, config);
   

      dispatch({ type: "getTransactionDetailSuccess", payload:data });
    } catch (error) {
      if (error.response) {
        dispatch({
          type: "getTransactionDetailFail",
          payload: error.response.data,
        });
      } else {
        dispatch({
          type: "getTransactionDetailFail",
          payload: { message: error.message, success: false },
        });
      }
    }
  };
}
//delete excel file

export const deleteExcelFile = (excelId) => {
  return async (dispatch) => {
    try {
      dispatch({ type: "Delete_ExcelFileRequest",
        payload:"Delete_ExcelFileRequest"
       });

      const url = `${process.env.REACT_APP_API_URL}/excel/delete/${excelId}`;
      const config = { headers: { "Content-Type": "application/json" }, withCredentials: true };

      const { data } = await axios.delete(url, config);

      dispatch({ type: "Delete_ExcelFileSuccess", payload: data });

    } catch (error) {
      dispatch({
        type: "Delete_ExcelFileFail",
        payload:{ message: error.message, success: false }
      });
    }
  };
};

// if (medata.user.Role === "Owner") {
//   dispatch(fetchAllOwnerFiles());
// }