// This Function Show Only Alert (Admin User)
export const CreatePostReducer = (state = {}, action) => {
  switch (action.type) {
    // user Routes
    // case "CreatePostRequest":
    case "DeleteAndRestorePostRequest":
    // Admin routes
    // case "UpdatePostRequest":
    case "VerifyPostActionRequest":
    case "ReOpenPostActionRequest-AdminRoutes":
    case "VerifyAdminRequest":
    case "VerifyBidRequest":
    case "Admin_OwnerScheduleVisitDoneRequest":
    case "Admin_AssignedRequest":
    case "Admin_RemovedRequest":
    case "RemoveAssignPropertyRequest":
    case "Active_InactivePropertyRequest":
    case "showVeirifyPostIconRequest":
    case "changePropertyStatusRequest":
    case "acknowledgeProfileRequest":
    case "PermanentPostDeleteRequest":
      case "AssignExecleRequest":
    case "Remove_ExcelFromAdminRequest":
      case "UserRoleUpdationRequest":
    case "Delete_ExcelFileRequest":
    case "OwnerAllExcelFileRequest":
    case "ReportPagePostRequest":
    
      return {
        ...state,
        loading: true,
        LodingType: action.payload,
      };

    // case "CreatePostSuccess":
    case "DeleteAndRestorePostSuccess":
    // case "UpdatePostSuccess":
    case "VerifyPostActionSuccess":
    case "ReOpenPostActionSuccess-AdminRoutes":
    case "VerifyAdminSuccess":
    case "VerifyBidSuccess":
    case "Admin_OwnerScheduleVisitDoneSuccess":
    // case "AddPriceSuccess":
    case "Admin_AssignedSuccess":
    case "Admin_RemovedSuccess":
    case "RemoveAssignPropertySuccess":
    // Activ in active
    case "Active_InactivePropertySuccess":
    case "showVeirifyPostIconSuccess":
    case "changePropertyStatusSuccess":
    case "acknowledgeProfileSuccess":
    case "PermanentPostDeleteSuccess":
      case "AssignExecleSucess":
    case "Remove_ExcelFromAdminSuccess":
      case "UserRoleUpdationSuccess":
    case "Delete_ExcelFileSuccess":
    case "OwnerAllExcelFileSuccess":
      case "ReportPagePostSuccess":
   
     
    return {
        ...state,
        loading: false,
        data: action.payload,
      };

    // case "CreatePostFail":
    case "DeleteAndRestorePostFail":
    // case "UpdatePostFail":
    case "VerifyPostActionFail":
    case "ReOpenPostActionFail-AdminRoutes":
    case "VerifyAdminFail":
    case "VerifyBidFail":
    case "Admin_OwnerScheduleVisitDoneFail":
    // case "AddPriceFail":
    case "Admin_AssignedFail":
    case "Admin_RemovedFail":
    case "RemoveAssignPropertyFail":
    // Activ in active
    case "Active_InactivePropertyFail":
    case "showVeirifyPostIconFail":
    case "changePropertyStatusFail":
    case "acknowledgeProfileFail":
    case "PermanentPostDeleteFail":
      case "AssignExeclFail":
    case "Remove_ExcelFromAdminFail":
    case "UserRoleUpdationFail":
    case "Delete_ExcelFileFail":
    case "OwnerAllExcelFileFail":
    case "ReportPagePostFail":
   

      return {
        ...state,
        loading: false,
        data: action.payload,
      };

    case "AdminAlertClear":
      return {};
    default:
      return {
        ...state,
      };
  }
};

//  Get Post (Reducer) -- Login User

export const GetPostReducer = (state = {}, action) => {
  switch (action.type) {
    case "LoginUserGetPostRequest":
      return {
        ...state,
        loading: true,
      };

    case "LoginUserGetPostSuccess":
      return {
        ...state,
        loading: false,
        data: action.payload,
      };

    case "LoginUserGetPostFail":
      return {
        ...state,
        loading: false,
        data: action.payload,
      };

    case "LoginUserGetPostClear":
      return {};
    default:
      return {
        ...state,
      };
  }
};

// Get All Post

export const GetAllPostReducer = (state = {}, action) => {
  switch (action.type) {
    case "GetAllPostRequest":
      return {
        ...state,
        loading: true,
      };

    case "GetAllPostSuccess":
      return {
        ...state,
        loading: false,
        data: action.payload,
      };

    case "GetAllPostFail":
      return {
        ...state,
        loading: false,
        data: action.payload,
      };

    case "GetAllPostClear":
      // alert("get All Post Clear")
      return {};
    default:
      return {
        ...state,
      };
  }
};

//  Get Single Post

export const GetSinglePostReducer = (state = {}, action) => {
  switch (action.type) {
    case "GetSinglePostRequest":
      return {
        ...state,
        loading: true,
      };

    case "GetSinglePostSuccess":
      return {
        ...state,
        loading: false,
        data: action.payload,
      };

    case "GetSinglePostFail":
      return {
        ...state,
        loading: false,
        data: action.payload,
      };

    case "GetSinglePostClear":
      return {};
    default:
      return {
        ...state,
      };
  }
};

export const GetProjectNameReducer = (state = {}, action) => {
  switch (action.type) {
    case "GetProjectNameRequest":
      return {
        ...state,
        loading: true,
      };

    case "GetProjectNameSuccess":
      return {
        ...state,
        loading: false,
        data: action.payload,
      };

    case "GetProjectNameFail":
      return {
        ...state,
        loading: false,
        data: action.payload,
      };

    case "GetProjectNameClear":
      return {};
    default:
      return {
        ...state,
      };
  }
};

export const GetSingleProjectNameDataReducer = (state = {}, action) => {
  switch (action.type) {
    case "GetSingleProjectNameDataRequest":
      return {
        ...state,
        loading: true,
      };

    case "GetSingleProjectNameDataSuccess":
      return {
        ...state,
        loading: false,
        data: action.payload,
      };

    case "GetSingleProjectNameDataFail":
      return {
        ...state,
        loading: false,
        data: action.payload,
      };

    case "GetSingleProjectNameDataClear":
      return {};
    default:
      return {
        ...state,
      };
  }
};

export const Admin_OwnerGetAllPostReducer = (state = {}, action) => {
  switch (action.type) {
    case "Admin_OwnerGetAllPostRequest":
      return {
        ...state,
        loading: true,
      };

    case "Admin_OwnerGetAllPostSuccess":
      return {
        ...state,
        loading: false,
        data: action.payload,
      };

    case "Admin_OwnerGetAllPostFail":
      return {
        ...state,
        loading: false,
        data: action.payload,
      };

    case "Admin_OwnerGetAllPostClear":
      return {};
    default:
      return {
        ...state,
      };
  }
};

export const Admin_OwnerGetAllScheduleVisitsReducer = (state = {}, action) => {
  switch (action.type) {
    case "Admin_OwnerGetAllScheduleVisitsRequest":
      return {
        ...state,
        loading: true,
      };

    case "Admin_OwnerGetAllScheduleVisitsSuccess":
      return {
        ...state,
        loading: false,
        data: action.payload,
      };

    case "Admin_OwnerGetAllScheduleVisitsFail":
      return {
        ...state,
        loading: false,
        data: action.payload,
      };

    case "Admin_OwnerGetAllScheduleVisitsClear":
      return {};
    default:
      return {
        ...state,
      };
  }
};
export const GetAllScheduleVisitsAndMakeOffer_LengthReducer = (
  state = {},
  action
) => {
  switch (action.type) {
    case "GetAllScheduleVisitsAndMakeOffer_LengthRequest":
      return {
        ...state,
        loading: true,
      };

    case "GetAllScheduleVisitsAndMakeOffer_LengthSuccess":
      return {
        ...state,
        loading: false,
        data: action.payload,
      };

    case "GetAllScheduleVisitsAndMakeOffer_LengthFail":
      return {
        ...state,
        loading: false,
        data: action.payload,
      };

    case "GetAllScheduleVisitsAndMakeOffer_LengthClear":
      return {};
    default:
      return {
        ...state,
      };
  }
};

export const GetAllAssignPropertyReducer = (state = {}, action) => {
  switch (action.type) {
    case "GetAllAssignPropertyRequest":
      return {
        ...state,
        loading: true,
      };

    case "GetAllAssignPropertySuccess":
      return {
        ...state,
        loading: false,
        data: action.payload,
      };

    case "GetAllAssignPropertyFail":
      return {
        ...state,
        loading: false,
        data: action.payload,
      };

    case "GetAllAssignPropertyClear":
      return {};
    default:
      return {
        ...state,
      };
  }
};

export const GetAdminAgentAssignPropertyReducer = (state = {}, action) => {
  switch (action.type) {
    case "Admin_AgentGetAllPostActionRequest":
      return {
        ...state,
        loading: true,
      };

    case "Admin_AgentGetAllPostActionSuccess":
      return {
        ...state,
        loading: false,
        data: action.payload,
      };

    case "Admin_AgentGetAllPostActionFail":
      return {
        ...state,
        loading: false,
        data: action.payload,
      };

    case "Admin_AgentGetAllPostActionClear":
      return {};
    default:
      return {
        ...state,
      };
  }
};

export const GetMyVisitsReducer = (state = {}, action) => {
  switch (action.type) {
    case "GetMyVisitsRequest":
      return {
        ...state,
        loading: true,
      };

    case "GetMyVisitsSuccess":
      return {
        ...state,
        loading: false,
        data: action.payload,
      };

    case "GetMyVisitsFail":
      return {
        ...state,
        loading: false,
        data: action.payload,
      };

    case "GetMyVisitsClear":
      return {};
    default:
      return {
        ...state,
      };
  }
};

export const GetSimilarProperty = (state = {}, action) => {
  switch (action.type) {
    case "SimilarPropertyRequest":
      return {
        ...state,
        loading: true,
      };

    case "SimilarPropertySuccess":
      return {
        ...state,
        loading: false,
        data: action.payload,
      };

    case "SimilarPropertyFail":
      return {
        ...state,
        loading: false,
        data: action.payload,
      };

    case "SimilarPropertyClear":
      return {};
    default:
      return {
        ...state,
      };
  }
};

export const OwnerAllPostsVisitsReducer = (state = {}, action) => {
  switch (action.type) {
    case "OwnerAllPostsVisitRequest":
      return {
        ...state,
        loading: true,
      };

    case "OwnerAllPostsVisitSuccess":
      return {
        ...state,
        loading: false,
        data: action.payload,
      };

    case "OwnerAllPostsVisitFail":
      return {
        ...state,
        loading: false,
        data: action.payload,
      };

    case "OwnerAllPostsVisitClear":
      return {};
    default:
      return {
        ...state,
      };
  }
};

export const OwnerUploadExcelFileReducer = (state = {}, action) => {
  switch (action.type) {
    case "OwnerUploadExcelFile":
      return {
        ...state,
        loading: true,
      };

    case "OwnerUploadExcelFileSuccess":
      return {
        ...state,
        loading: false,
        data: action.payload,
      };

    case "OwnerUploadExcelFileFail":
      return {
        ...state,
        loading: false,
        data: action.payload,
      };
      case "OwnerUploadExcelFileClear":
        return {};
      default:
        return {
          ...state,
        };
  }
}

//owner all file excel reducer 
export const fetchAllOwnerFilesReducer = (state = {}, action) => {
  switch (action.type) {
    case "FetchAllOwnerFilesRequest":
      return {
        ...state,
        loading: true,
      };

    case "FetchAllOwnerFilesSuccess":
      return {
        ...state,
        loading: false,
        data: action.payload,
      };

    case "FetchAllOwnerFilesFail":
      return {
        ...state,
        loading: false,
        error: action.payload, // Changed "data" to "error" for better clarity
      };

    case "FetchAllOwnerFilesClear":
      return {};

    default:
      return state;
  }
};

//admin all excel file
export const fetchAllAdminFilesReducer = (state = {}, action) => {
  switch (action.type) {
    case "FetchAllAdminFilesRequest":
      return {
        ...state,
        loading: true,
      };

    case "FetchAllAdminFilesSuccess":
      // console.log("this is in reducer ",action)
      return {
        ...state,
        loading: false,
        data: action.payload,
      };

    case "FetchAllAdminFilesFail":
      return {
        ...state,
        loading: false,
        error: action.payload, // Stores error details
      };

    case "FetchAllAdminFilesClear":
      return {}; // Clears state when necessary

    default:
      return state;
  }
};
//agent all excel file
export const fetchAllAgentFilesReducer = (state = {}, action) => {
  switch (action.type) {
    case "FetchAllAgentFilesRequest":
      return {
        ...state,
        loading: true,
      };

    case "FetchAllAgentFilesSuccess":
      return {
        ...state,
        loading: false,
        data: action.payload,
      };

    case "FetchAllAgentFilesFail":
      return {
        ...state,
        loading: false,
        error: action.payload, // Stores error details
      };

    case "FetchAllAgentFilesClear":
      return {}; // Clears state when necessary

    default:
      return state;
  }
};
//remove excel reducer



// notify
export const GetAllNotificationsAndRequirementsReducer = (
  state = {},
  action
) => {
  switch (action.type) {
    case "GetNotifiesAndPropRequests":
      return {
        ...state,
        loading: true,
      };

    case "GetNotifiesAndPropRequestsSuccess":
      return {
        ...state,
        loading: false,
        data: action.payload,
      };

    case "GetNotifiesAndPropRequestsFail":
      return {
        ...state,
        loading: false,
        data: action.payload,
      };

    case "GetNotifiesAndPropRequestsClear":
      return {};
    default:
      return {
        ...state,
      };
  }
};

// Get All Deleted Posts

export const GetDeletedPostsReducer = (state = {}, action) => {
  switch (action.type) {
    case "GetDeletedPostsRequest":
      return {
        ...state,
        loading: true,
      };

    case "GetDeletedPostsSuccess":
      return {
        ...state,
        loading: false,
        data: action.payload,
      };

    case "GetDeletedPostsFail":
      return {
        ...state,
        loading: false,
        data: action.payload,
      };

    case "GetDeletedPostsClear":
      return {};
    default:
      return {
        ...state,
      };
  }
};




export const getSerachPropertyReducer=(state={},action)=>{
  switch(action.type){
    case "GetSerachPropertyRequest":
      return {
        ...state,
        loading: true,

      };

    case"GetSerachPropertySuccess":
    return {
      ...state,
      data: action.payload,
      loading: false,
    };


    case"GetSerachPropertyFail":
    return {
      ...state,
      data: action.payload,
      loading: false,
    };

    case"GetSerachPropertyClear":
  
    return {}; // Clears state when necessary

    default:
      return state;
  }
}
export const getPostsByAddressReducer=(state={},action)=>{
  switch(action.type){
    case "GetPostsByAddressRequest":
      return {
        ...state,
        loading: true,
      };
      
    case"GetPostsByAddressSuccess":
    return {
      ...state,
      data: action.payload,
      loading: false,
    };
    case"GeetPostsByAddressFail":
    return {
      ...state,
      data: action.payload,
      loading: false,
    };

    case"GeetPostsByAddressClear":

    return {}; // Clears state when necessary

    default:
      return state;
  }
}
