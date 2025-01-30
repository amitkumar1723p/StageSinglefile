// This Function Show Only Alert (Admin User)
export const CreatePostReducer = (state = {}, action) => {
  switch (action.type) {
    // user Routes
    // case "CreatePostRequest":
    // case "DeletePostRequest":
    // Admin routes
    // case "UpdatePostRequest":
    case "VerifyPostActionRequest":
    case "ReOpenPostActionRequest":
    case "VerifyAdminRequest":
    case "VerifyBidRequest":
    case "Admin_OwnerScheduleVisitDoneRequest":
    // case "AddPriceRequest":
    case "Admin_AssignedRequest":
    case "Admin_RemovedRequest":
    case "RemoveAssignPropertyRequest":
      // Activ in active
    case "Active_InactivePropertyRequest":
      return {
        ...state,
        loading: true,
        LodingType: action.payload,
      };

    // case "CreatePostSuccess":
    // case "DeletePostSuccess":
    // case "UpdatePostSuccess":
    case "VerifyPostActionSuccess":
    case "ReOpenPostActionSuccess":
    case "VerifyAdminSuccess":
    case "VerifyBidSuccess":
    case "Admin_OwnerScheduleVisitDoneSuccess":
    // case "AddPriceSuccess":
    case "Admin_AssignedSuccess":
    case "Admin_RemovedSuccess":
    case "RemoveAssignPropertySuccess":
         // Activ in active
    case "Active_InactivePropertySuccess":  
      return {
        ...state,
        loading: false,
        data: action.payload,
      };

    // case "CreatePostFail":
    // case "DeletePostFail":
    // case "UpdatePostFail":
    case "VerifyPostActionFail":
    case "ReOpenPostActionFail":
    case "VerifyAdminFail":
    case "VerifyBidFail":
    case "Admin_OwnerScheduleVisitDoneFail":
    // case "AddPriceFail":
    case "Admin_AssignedFail":
    case "Admin_RemovedFail":
    case "RemoveAssignPropertyFail":
      // Activ in active
    case "Active_InactivePropertyFail":
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
