//  this user avaliable for Simple User

export const CreateUserReducer = (state = {}, action) => {
  switch (action.type) {
    case "CreateUserOtpRequest":
    case "VerifyUserOtpRequest":
    case "CreateUserRequest":
    case "CreateExpressionOfInterestRequest":
    case "BiddingFormRequest":
    case "CreateOtp_Admin_OwnerRequest":
    case "Login_Admin_OwnerRequest":
    case "CreateScheduleVisitRequest":
    case "PostPropertyRequirementRequest":
    case "CreateChannelPartnerRequest":
    case "ViewOwnerDetailsRequest":
    case "AddFavouriteAndUnFavouriteRequest":
    case "NotifyActionRequest":
    case "CreatePostRequest":
    case "UpdatePostRequest":
    case "ProfileEdit":
    case "ProfileUpdateRequest":
    case "ReportSuspiciousPropertyRequest":
    case "verifiedPaymentRequest":
    case "ApplyJobActionRequest":
    // from here adding status update reducer
    case "updateBidStatusActionRequest":
    case "updateNotifyStatusActionRequest":
    case "updateRequirementStatusAcionRequest":

    case "MarkRentOutPropertyRequest":
    case "ReOpenPostActionRequest-UserRoutes":
      
      //  Fresh Property get Api ----- start
      case "viewOneProjectRequest":
      case "getAllFreshProjectRequest-UserRoutes":
        
      //  Fresh Property get Api ----- End
       
     case"updateConatctRemarkActionRequest":

    //  Fresh Property get Api ----- start
    case "viewOneProjectRequest":
    case "getAllFreshProjectRequest-UserRoutes":
      //  Fresh Property get Api ----- End

 case "SentTokenForEmailVerificationRequest":
 case "VerifyTokenForEmailVerificationActionRequest":
      return {
        ...state,
        loading: true,
        LodingType: action.payload,
      };
    case "CreateUserOtpSuccess":
    case "VerifyUserOtpSuccess":
    case "CreateUserSuccess":
    case "CreateExpressionOfInterestSuccess":
    case "BiddingFormSuccess":
    case "CreateOtp_Admin_OwnerSuccess":
    case "Login_Admin_OwnerSuccess":

    case "CreateScheduleVisitSuccess":
    case "PostPropertyRequirementSuccess":
    case "CreateChannelPartnerSuccess":
    case "ViewOwnerDetailsSuccess":
    case "AddFavouriteAndUnFavouriteSuccess":
    case "NotifyActionSuccess":
    case "CreatePostSuccess":
    case "UpdatePostSuccess":

    case "ProfileEditSuccess":
    case "ProfileUpdateSuccess":

    case "ReportSuspiciousPropertySuccess":
    case "verifiedPaymentSuccess":
    case "ApplyJobActionSuccess":
    case "MarkRentOutPropertySuccess":
    case "ReOpenPostActionSuccess-UserRoutes":
     //  Fresh Property get Api ----- start
     case "viewOneProjectSuccess":
     case "getAllFreshProjectSuccess-UserRoutes":
      //  Fresh Property get Api ----- End
         // from here adding status update reducer 
  case"updateBidStatusActionSuccess":
  case"updateNotifyStatusActionSuccess":
  case"updateRequirementStatusAcionSuccess":
  case "SentTokenForEmailVerificationSuccess":
    case "VerifyTokenForEmailVerificationActionSuccess":

  case"updateConatctRemarkActionSuccess":
      return {
        ...state,
        loading: false,
        data: action.payload,
      };

    case "CreateUserOtpFail":
    case "VerifyUserOtpFail":
    case "CreateUserFail":
    case "CreateExpressionOfInterestFail":
    case "BiddingFormFail":
    case "CreateOtp_Admin_OwnerFail":
    case "Login_Admin_OwnerFail":

    case "CreateScheduleVisitFail":
    case "PostPropertyRequirementFail":
    case "CreateChannelPartnerFail":
    case "ViewOwnerDetailsFail":
    case "AddFavouriteAndUnFavouriteFail":
    case "NotifyActionFail":
    case "CreatePostFail":
    case "UpdatePostFail":

    case "ProfileEditFail":
    case "ProfileUpdateFail":
    case "ReportSuspiciousPropertyFail":
    case "verifiedPaymentFail":
    case "MarkRentOutPropertyFail":
    case "ReOpenPostActionFail-UserRoutes":
    case "getAllFreshProjectFail-UserRoutes":
    case "viewOneProjectFail":
            // from here adding status update reducer 
  case"updateBidStatusActionFail":
  case"updateNotifyStatusActionFail":
  case"updateRequirementStatusAcionFail":

  case "SentTokenForEmailVerificationFail":
    case "VerifyTokenForEmailVerificationActionFail":
  
  case"updateConatctRemarkActionFail":
      
      return {
        ...state,
        loading: false,
        data: action.payload,
      };

    case "UserClear":
      return {};
    default:
      return {
        ...state,
      };
  }
};
// me Details Reducer
export const MeDetailsReducer = (state = {}, action) => {
  switch (action.type) {
    case "MeDetailsRequest":
      return {
        ...state,
        loading: true,
      };
    case "MeDetailsSuccess":
      return {
        ...state,
        medata: action.payload,
        loading: false,
      };
    case "MeDetailsFail":
      return {
        ...state,
        medata: action.payload,
        loading: false,
      };
    case "MeDetailsClear":
      return {
        medata: { IsAuthenticated: false },
      };
    default:
      return {
        ...state,
      };
  }
};

// Logout Reducer

export const LogoutReducer = (state = {}, action) => {
  switch (action.type) {
    case "LogoutRequest":
      return {
        ...state,
        loading: true,
      };

    case "LogoutSuccess":
      return {
        ...state,
        logoutdata: action.payload,
        loading: false,
      };

    case "LogoutFail":
      return {
        ...state,
        logoutdata: action.payload,
        loading: false,
      };
    case "LogoutClear":
      return {};

    default:
      return {
        ...state,
      };
  }
};

// Get All Admin
export const GetAllAdminReducer = (state = {}, action) => {
  switch (action.type) {
    case "GetAllAdminRequest":
      return {
        ...state,
        loading: true,
      };

    case "GetAllAdminSuccess":
      return {
        ...state,
        data: action.payload,
        loading: false,
      };

    case "GetAllAdminFail":
      return {
        ...state,
        data: action.payload,
        loading: false,
      };
    case "GetAllAdminClear":
      return {};

    default:
      return {
        ...state,
      };
  }
};

// Get Bidding Document
export const GetPost_BiddingDocumentReducer = (state = {}, action) => {
  switch (action.type) {
    case "GetPost_BiddingDocumentRequest":
      return {
        ...state,
        loading: true,
      };

    case "GetPost_BiddingDocumentSuccess":
      return {
        ...state,
        data: action.payload,
        loading: false,
      };

    case "GetPost_BiddingDocumentFail":
      return {
        ...state,
        data: action.payload,
        loading: false,
      };
    case "GetPost_BiddingDocumentClear":
      return {};

    default:
      return {
        ...state,
      };
  }
};

// Get Tenent Response

export const GetTenentResponseReducer = (state = {}, action) => {
  switch (action.type) {
    case "GetAllTenentResponseRequest":
      return {
        ...state,
        loading: true,
      };

    case "GetAllTenentResponseSuccess":
      return {
        ...state,
        data: action.payload,
        loading: false,
      };

    case "GetAllTenentResponseFail":
      return {
        ...state,
        data: action.payload,
        loading: false,
      };
    case "GetAllTenentResponseFailClear":
      return {};

    default:
      return {
        ...state,
      };
  }
};

export const TenentResponseIsExitReducer = (state = {}, action) => {
  switch (action.type) {
    case "TenentResponseIsExitRequest":
      return {
        ...state,
        loading: true,
      };

    case "TenentResponseIsExitSuccess":
      return {
        ...state,
        data: action.payload,
        loading: false,
      };

    case "TenentResponseIsExitFail":
      return {
        ...state,
        data: action.payload,
        loading: false,
      };
    case "TenentResponseIsExitClear":
      return {};

    default:
      return {
        ...state,
      };
  }
};
export const getAllUserReducer = (state = {}, action) => {
  switch (action.type) {
    case "GetAllUserRequest":
      return {
        ...state,
        loading: true,
      };

    case "GetAllUserSuccess":
      return {
        ...state,
        data: action.payload,
        loading: false,
      };

    case "GetAllUserFail":
      return {
        ...state,
        data: action.payload,
        loading: false,
      };

    case "GetAllUserFailClear":
      return {};
    default:
      return {
        ...state,
      };
  }
};

export const paymentReducer = (state = {}, action) => {
  switch (action.type) {
    case "PaymentActionRequest":
      return {
        ...state,
        loading: true,
      };

    case "PaymentActionSuccess":
      return {
        ...state,
        data: action.payload,
        loading: false,
      };

    case "PaymentActionFail":
      return {
        ...state,
        data: action.payload,
        loading: false,
      };

    case "PaymentActionClear":
      return {};
    default:
      return {
        ...state,
      };
  }
};

// paid property
export const getPaidPropertyReducer = (state = {}, action) => {
  switch (action.type) {
    case "getPaidPropertyRequest":
      return {
        ...state,
        loading: true,
      };

    case "getPaidPropertySuccess":
      return {
        ...state,
        data: action.payload,
        loading: false,
      };

    case "getPaidPropertyFail":
      return {
        ...state,
        data: action.payload,
        loading: false,
      };

    case "getPaidPropertyFailClear":
      return {};
    default:
      return {
        ...state,
      };
  }
};

// export const getTransactionDetailReducer=(state={},action)=>{
//   switch(action.type){
//     case "getTransactionDetailRequest":
//       return {
//         ...state,
//         data:action.payload,
//         loading:true,
//       };

//       case"getTransactionDetailSuccess":
//       return {
//         ...state,
//         data:action.payload,
//         loading:false
//       };

//       case"getTransactionDetailFail":
//       return {
//         ...state,
//         data:action.payload,
//         loading:false
//       }

//       case"getPaidPropertyFailClear":
//       return{}
//           default:
//             return{
//               ...state,
//             };
//   }
// }
export const getTransactionDetailReducer = (state = {}, action) => {
  switch (action.type) {
    case "getTransactionDetailRequest":
      return {
        ...state,
        loading: true,
      };
    case "getTransactionDetailSuccess":
      return {
        ...state,
        data: action.payload,
        loading: false,
      };

    case "getTransactionDetailFail":
      return {
        ...state,
        data: action.payload,
        loading: false,
      };

    case "getTransactionDetailFailClear":
      return {};
    default:
      return {
        ...state,
      };
  }
};

// Get All user with property data if they posted
export const getAllUserResponseActionReducer = (state = {}, action) => {
  switch (action.type) {
    case "AllUserResponseActionRequest":
      return {
        ...state,
        loading: true,
      };
    case "AllUserResponseActionSuccess":
      return {
        ...state,
        data: action.payload,
        loading: false,
      };

    case "AllUserResponseActionFail":
      return {
        ...state,
        data: action.payload,
        loading: false,
      };

    case "AllUserResponseActionFailClear":
      return {};
    default:
      return {
        ...state,
      };
  }
};

// Get All user with property data if they posted
export const getSingleUserResponseActionReducer = (state = {}, action) => {
  switch (action.type) {
    case "SingleUserResponseActionRequest":
      return {
        ...state,
        loading: true,
      };
    case "SingleUserResponseActionSuccess":
      return {
        ...state,
        data: action.payload,
        loading: false,
      };

    case "SingleUserResponseActionFail":
      return {
        ...state,
        data: action.payload,
        loading: false,
      };

    case "SingleUserResponseActionFailClear":
      return {};
    default:
      return {
        ...state,
      };
  }
};

// get owner contact number

export const getViewOwnerDetailsActionReducer = (state = {}, action) => {
  switch (action.type) {
    case "ViewOwnerDetailsRequest":
      return {
        ...state,
        loading: true,
      };
    case "ViewOwnerDetailsRequestSuccess":
      return {
        ...state,
        data: action.payload,
        loading: false,
      };

    case "ViewOwnerDetailsRequestFail":
      return {
        ...state,
        data: action.payload,
        loading: false,
      };

    case "ViewOwnerDetailsRequestFailClear":
      return {};
    default:
      return {
        ...state,
      };
  }
};
// get all conatct us 

export const viewAllContactFormReducer = (state = {}, action) => {
  switch (action.type) {
    case "viewAllContactFormRequest":
      return {
        ...state,
        loading: true,
      };

    case "viewAllContactFormSuccess":
      return {
        ...state,
        data: action.payload,
        loading: false,
      };

    case "viewAllContactFormFail":
      return {
        ...state,
        data: action.payload,
        loading: false,
      };
    case "viewAllContactFormClear":
      return {};

    default:
      return {
        ...state,
      };
  }
};