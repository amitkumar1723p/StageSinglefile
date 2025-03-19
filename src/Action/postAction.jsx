import axios from "axios";
const api_Base_Url = process.env.REACT_APP_API_URL;
// This Function Show Only Alert (Simple User)
export const CreatePostAction = (PostData) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: "CreatePostRequest",
        payload: "CreatePostRequest",
      });

      // const url = "/post/create";
      const url = `${api_Base_Url}/post/create`;

      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        
        
          // "Content-Type": "application/json",
        },

        withCredentials: true,
      };

      const { data } = await axios.post(url, PostData, config);

      dispatch({ type: "CreatePostSuccess", payload: data });
    } catch (error) {
      console.log(error);
      if (error.response) {
        dispatch({ type: "CreatePostFail", payload: error.response.data });
      } else {
        dispatch({
          type: "CreatePostFail",
          payload: { message: error.message, success: false },
        });
      }
    }
  };
};

//   Get Post (Action)-- Login User

export const LoginUserPostAction = () => {
  return async (dispatch) => {
    try {
      dispatch({ type: "LoginUserGetPostRequest" });

      const url = `${api_Base_Url}/post/login/allpost`;

      const config = {
        headers: { "Content-Type": "application/json" },

        withCredentials: true,
      };

      const { data } = await axios.get(url, config);

      dispatch({ type: "LoginUserGetPostSuccess", payload: data });
    } catch (error) {
      if (error.response) {
        dispatch({
          type: "LoginUserGetPostFail",
          payload: error.response.data,
        });
      } else {
        dispatch({
          type: "LoginUserGetPostFail",
          payload: { message: error.message, success: false },
        });
      }
    }
  };
};

// Get All Post

export const GetAllPostAction = ({
  PropertyAdType = "",
  ProjectName = "",
  BHK = "",
  ApartmentType = "",
  PropertyStatus = "",
  Furnishing = "",
}) => {
  return async (dispatch) => {
    try {
      dispatch({ type: "GetAllPostRequest" });

      let url = `${api_Base_Url}/post/allpost?LocationDetails.ProjectName=${ProjectName.trim()}&BasicDetails.PropertyAdType=${PropertyAdType.trim()}&PropertyDetails.BHKType=${BHK}&BasicDetails.ApartmentType=${ApartmentType}&BasicDetails.PropertyStatus=${PropertyStatus}&AmenitiesDetails.Furnishing=${Furnishing}`;
      // &Pricing[$gte]=${Price}
      const config = {
        headers: { "Content-Type": "application/json" },

        withCredentials: true,
      };

      const { data } = await axios.get(url, config);

      dispatch({ type: "GetAllPostSuccess", payload: data });
    } catch (error) {
      if (error.response) {
        dispatch({ type: "GetAllPostFail", payload: error.response.data });
      } else {
        dispatch({
          type: "GetAllPostFail",
          payload: { message: error.message, success: false },
        });
      }
    }
  };
};

// Delete Post Action and restore post

export const DeleteAndRestorePostAction = (PostData) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: `DeleteAndRestorePostRequest`,
        payload: `${
          PostData?.Status == "delete"
            ? "Delete"
            : PostData?.Status == "restore"
            ? "Restore"
            : ""
        }PostRequest`,
      });

      const url = `${api_Base_Url}/post/delete`;

      const config = {
        headers: { "Content-Type": "application/json" },

        withCredentials: true,
      };

      const { data } = await axios.post(url, PostData, config);

      dispatch({ type: "DeleteAndRestorePostSuccess", payload: data });
    } catch (error) {
      if (error.response) {
        dispatch({
          type: "DeleteAndRestorePostFail",
          payload: error.response.data,
        });
      } else {
        dispatch({
          type: "DeleteAndRestorePostFail",
          payload: { message: error.message, success: false },
        });
      }
    }
  };
};

// PermanentPostDelete delete
export const PermanentPostDeleteAction = () => {
  return async (dispatch) => {
    try {
      dispatch({
        type: `PermanentPostDeleteRequest`,
        payload: `PermanentPostDeleteRequest`,
      });

      const url = `${api_Base_Url}/post/delete`;

      const config = {
        headers: { "Content-Type": "application/json" },

        withCredentials: true,
      };

      const { data } = await axios.delete(url, config);

      dispatch({ type: "PermanentPostDeleteSuccess", payload: data });
    } catch (error) {
      if (error.response) {
        dispatch({
          type: "PermanentPostDeleteFail",
          payload: error.response.data,
        });
      } else {
        dispatch({
          type: "PermanentPostDeleteFail",
          payload: { message: error.message, success: false },
        });
      }
    }
  };
};

// Get Single Post

export const GetSinglePostAction = (PostId, showDeletePost) => {
  return async (dispatch) => {
    try {
      dispatch({ type: "GetSinglePostRequest" });
      let url;

      if (showDeletePost == true) {
        url = `${api_Base_Url}/post/single/delete/${PostId}`;
      } else {
        url = `${api_Base_Url}/post/single/${PostId}`;
      }

      const config = {
        headers: { "Content-Type": "application/json" },

        withCredentials: true,
      };

      const { data } = await axios.get(url, config);

      dispatch({ type: "GetSinglePostSuccess", payload: data });
    } catch (error) {
      if (error.response) {
        dispatch({ type: "GetSinglePostFail", payload: error.response.data });
      } else {
        dispatch({
          type: "GetSinglePostFail",
          payload: { message: error.message, success: false },
        });
      }
    }
  };
};

// Update Post Action

export const UpdatePostAction = (PostData, PostId) => {
 
  return async (dispatch) => {
    try {
      dispatch({
        type: "UpdatePostRequest",
        payload: "UpdatePostRequest",
      });

      const url = `${api_Base_Url}/post/update/${PostId}`;

      const config = {
        headers: { "Content-Type": "multipart/form-data" },

        withCredentials: true,
      };

      const { data } = await axios.put(url, PostData, config);

      dispatch({ type: "UpdatePostSuccess", payload: data });
    } catch (error) {
      if (error.response) {
        dispatch({ type: "UpdatePostFail", payload: error.response.data });
      } else {
        dispatch({
          type: "UpdatePostFail",
          payload: { message: error.message, success: false },
        });
      }
    }
  };
};

//Get Apartment Name Action

export const GetProjectNameAction = () => {
  return async (dispatch) => {
    try {
      dispatch({ type: "GetProjectNameRequest" });

      const url = `${api_Base_Url}/post/project-name`;

      const config = {
        headers: { "Content-Type": "application/json" },
      };

      const { data } = await axios.get(url, config);

      dispatch({
        type: "GetProjectNameSuccess",
        // payload: { success: true, ProjectNameAllData: data },
        payload: data,
      });
    } catch (error) {
      if (error.response) {
        dispatch({
          type: "GetProjectNameFail",
          payload: error.response.data,
          // payload: { success: false, message: error.response.data },
        });
      } else {
        dispatch({
          type: "GetProjectNameFail",
          payload: { message: error.message, success: false },
        });
      }
    }
  };
};

// GetSingle Project Name Data
export const GetSingleProjectNameDataAction = (projectname) => {
  return async (dispatch) => {
    try {
      dispatch({ type: "GetSingleProjectNameDataRequest" });

      const url = `${api_Base_Url}/post/project-name/single`;

      const config = {
        headers: { "Content-Type": "application/json" },
      };

      const { data } = await axios.post(url, projectname, config);

      dispatch({
        type: "GetSingleProjectNameDataSuccess",
        payload: data,
      });
    } catch (error) {
      if (error.response) {
        dispatch({
          type: "GetSingleProjectNameDataFail",
          payload: error.response.data,
        });
      } else {
        dispatch({
          type: "GetSingleProjectNameDataFail",
          payload: { message: error.message, success: false },
        });
      }
    }
  };
};

// Get All Post   -Admin_Owner

export const Admin_OwnerGetAllPostAction = (Keyword) => {
  return async (dispatch) => {
    try {
      dispatch({ type: "Admin_OwnerGetAllPostRequest" });

      let url;
      if (Keyword) {
        url = `${api_Base_Url}/admin-owner/all-post?PostVerify=${Keyword.PostVerify}`;
      } else {
        url = `${api_Base_Url}/admin-owner/all-post`;
      }

      const config = {
        headers: { "Content-Type": "application/json" },

        withCredentials: true,
      };

      const { data } = await axios.get(url, config);

      dispatch({ type: "Admin_OwnerGetAllPostSuccess", payload: data });
    } catch (error) {
      if (error.response) {
        dispatch({
          type: "Admin_OwnerGetAllPostFail",
          payload: error.response.data,
        });
      } else {
        dispatch({
          type: "Admin_OwnerGetAllPostFail",
          payload: { message: error.message, success: false },
        });
      }
    }
  };
};

//  Verify Post  --Admin_Owner

export const VerifyPostAction = ({ postdata }, postId) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: "VerifyPostActionRequest",
        payload: "VerifyPostActionRequest",
      });

      const url = `${api_Base_Url}/admin-owner/verify-post/${postId}`;

      const config = {
        headers: { "Content-Type": "application/json" },

        withCredentials: true,
      };

      const { data } = await axios.post(url, postdata, config);
      dispatch({ type: "VerifyPostActionSuccess", payload: data });
    } catch (error) {
      if (error.response) {
        dispatch({
          type: "VerifyPostActionFail",
          payload: error.response.data,
        });
      } else {
        dispatch({
          type: "VerifyPostActionFail",
          payload: { message: error.message, success: false },
        });
      }
    }
  };
};

export const showVeirifyPostIconAction = ({ postdata }, postId) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: "showVeirifyPostIconRequest",
        payload: "showVeirifyPostIconRequest",
      });

      const url = `${api_Base_Url}/admin-owner/show-verify-post-icon/${postId}`;

      const config = {
        headers: { "Content-Type": "application/json" },

        withCredentials: true,
      };

      const { data } = await axios.post(url, postdata, config);
      dispatch({ type: "showVeirifyPostIconSuccess", payload: data });
    } catch (error) {
      if (error.response) {
        dispatch({
          type: "showVeirifyPostIconFail",
          payload: error.response.data,
        });
      } else {
        dispatch({
          type: "showVeirifyPostIconFail",
          payload: { message: error.message, success: false },
        });
      }
    }
  };
};

export const ReOpenPostAction = (postId) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: "ReOpenPostActionRequest",
        payload: "ReOpenPostActionRequest",
      });

      const url = `${api_Base_Url}/admin-owner/reopen-post/${postId}`;

      const config = {
        headers: { "Content-Type": "application/json" },

        withCredentials: true,
      };

      const { data } = await axios.put(url, config);
      dispatch({ type: "ReOpenPostActionSuccess", payload: data });
    } catch (error) {
      if (error.response) {
        dispatch({
          type: "ReOpenPostActionFail",
          payload: error.response.data,
        });
      } else {
        dispatch({
          type: "ReOpenPostActionFail",
          payload: { message: error.message, success: false },
        });
      }
    }
  };
};

// Get All GetAllScheduleVisits Post Vise

export const Admin_OwnerGetAllScheduleVisits = (PostId, DeletePost) => {
  return async (dispatch) => {
    try {
      dispatch({ type: "Admin_OwnerGetAllScheduleVisitsRequest" });

      let url;

      if (DeletePost == true) {
        url = `${api_Base_Url}/admin-owner/all-schedulevisits/deleted-post/${PostId}`;
      } else {
        url = `${api_Base_Url}/admin-owner/all-schedulevisits/${PostId}`;
      }
      const config = {
        headers: { "Content-Type": "application/json" },

        withCredentials: true,
      };

      const { data } = await axios.get(url, config);

      dispatch({
        type: "Admin_OwnerGetAllScheduleVisitsSuccess",
        payload: data,
      });
    } catch (error) {
      if (error.response) {
        dispatch({
          type: "Admin_OwnerGetAllScheduleVisitsFail",
          payload: error.response.data,
        });
      } else {
        dispatch({
          type: "Admin_OwnerGetAllScheduleVisitsFail",
          payload: { message: error.message, success: false },
        });
      }
    }
  };
};

export const GetAllScheduleVisitsAndMakeOffer_Length = (PostId) => {
  return async (dispatch) => {
    try {
      dispatch({ type: "GetAllScheduleVisitsAndMakeOffer_LengthRequest" });

      let url = `${api_Base_Url}/admin-owner/all-schedulevisits-offerreceive-length`;

      const config = {
        headers: { "Content-Type": "application/json" },

        withCredentials: true,
      };

      const { data } = await axios.get(url, config);

      dispatch({
        type: "GetAllScheduleVisitsAndMakeOffer_LengthSuccess",
        payload: data,
      });
    } catch (error) {
      if (error.response) {
        dispatch({
          type: "GetAllScheduleVisitsAndMakeOffer_LengthFail",
          payload: error.response.data,
        });
      } else {
        dispatch({
          type: "GetAllScheduleVisitsAndMakeOffer_LengthFail",
          payload: { message: error.message, success: false },
        });
      }
    }
  };
};

export const Admin_OwnerScheduleVisitDone = ({ VisitStatus }, visitId) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: "Admin_OwnerScheduleVisitDoneRequest",
        payload: "Admin_OwnerScheduleVisitDoneRequest",
      });

      // let url = `/admin-owner/schedulevisit/status/${visitId}`;
      let url = `${api_Base_Url}/admin-owner/schedulevisit/status/${visitId}`;

      const config = {
        headers: { "Content-Type": "application/json" },

        withCredentials: true,
      };

      const { data } = await axios.post(url, { VisitStatus }, config);

      dispatch({
        type: "Admin_OwnerScheduleVisitDoneSuccess",
        payload: data,
      });
    } catch (error) {
      if (error.response) {
        dispatch({
          type: "Admin_OwnerScheduleVisitDoneFail",
          payload: error.response.data,
        });
      } else {
        dispatch({
          type: "Admin_OwnerScheduleVisitDoneFail",
          payload: { message: error.message, success: false },
        });
      }
    }
  };
};

export const adminAssigned = ({ AssignedData }) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: "Admin_AssignedRequest",
        payload: "Admin_AssignedRequest",
      });
      let url = `${api_Base_Url}/admin-owner/assign-property`;

      const config = {
        headers: { "Content-Type": "application/json" },

        withCredentials: true,
      };

      const { data } = await axios.post(url, AssignedData, config);

      dispatch({
        type: "Admin_AssignedSuccess",
        payload: data,
      });
    } catch (error) {
      if (error.response) {
        dispatch({
          type: "Admin_AssignedFail",
          payload: error.response.data,
        });
      } else {
        dispatch({
          type: "Admin_AssignedFail",
          payload: { message: error.message, success: false },
        });
      }
    }
  };
};

export const GetAllAssignProperty = () => {
  return async (dispatch) => {
    try {
      dispatch({ type: "GetAllAssignPropertyRequest" });

      let url = `${api_Base_Url}/admin-owner/get/assign-property`;

      const config = {
        headers: { "Content-Type": "application/json" },

        withCredentials: true,
      };

      const { data } = await axios.get(url, config);
      dispatch({
        type: "GetAllAssignPropertySuccess",
        payload: data,
      });
    } catch (error) {
      if (error.response) {
        dispatch({
          type: "GetAllAssignPropertyFail",
          payload: error.response.data,
        });
      } else {
        dispatch({
          type: "GetAllAssignPropertyFail",
          payload: { message: error.message, success: false },
        });
      }
    }
  };
};

export const RemoveAssignPropertyAction = ({ RemoveAssignProperty }) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: "RemoveAssignPropertyRequest",
        payload: "RemoveAssignPropertyRequest",
      });

      const url = `${api_Base_Url}/admin-owner/remove/assign-property`;

      const config = {
        headers: { "Content-Type": "application/json" },

        withCredentials: true,
      };

      const { data } = await axios.post(url, RemoveAssignProperty, config);
      dispatch({ type: "RemoveAssignPropertySuccess", payload: data });
    } catch (error) {
      if (error.response) {
        dispatch({
          type: "RemoveAssignPropertyFail",
          payload: error.response.data,
        });
      } else {
        dispatch({
          type: "RemoveAssignPropertyFail",
          payload: { message: error.message, success: false },
        });
      }
    }
  };
};

export const Admin_AgentGetAllPostAction = (Keyword) => {
  return async (dispatch) => {
    try {
      dispatch({ type: "Admin_AgentGetAllPostActionRequest" });

      // let url = `/admin-owner/get-admin/assign-property`;

      let url;
      if (Keyword) {
        url = `${api_Base_Url}/admin-owner/get-admin/assign-property?PostVerify=${Keyword.PostVerify}`;
      } else {
        url = `${api_Base_Url}/admin-owner/get-admin/assign-property`;
      }

      const config = {
        headers: { "Content-Type": "application/json" },

        withCredentials: true,
      };

      const { data } = await axios.get(url, config);

      dispatch({ type: "Admin_AgentGetAllPostActionSuccess", payload: data });
    } catch (error) {
      if (error.response) {
        dispatch({
          type: "Admin_AgentGetAllPostActionFail",
          payload: error.response.data,
        });
      } else {
        dispatch({
          type: "Admin_AgentGetAllPostActionFail",
          payload: { message: error.message, success: false },
        });
      }
    }
  };
};

// for active or de-active property

export const Active_InactiveProperty = (AssignProperty, status) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: "Active_InactivePropertyRequest",
        payload: "Active_InactivePropertyRequest",
      });
      const url = `${api_Base_Url}/admin-owner/active`;
      const dataToSend = {
        AssignProperty: AssignProperty,
        status: status,
      };

      const config = {
        headers: { "Content-Type": "application/json" }, // Changed to JSON if no file upload
        withCredentials: true,
      };

      const { data } = await axios.post(url, dataToSend, config);
      dispatch({ type: "Active_InactivePropertySuccess", payload: data });
    } catch (error) {
      if (error.response) {
        dispatch({
          type: "Active_InactivePropertyFail",
          payload: error.response.data,
        });
      } else {
        dispatch({
          type: "Active_InactivePropertyFail",
          payload: { message: error.message, success: false },
        });
      }
    }
  };
};

// get similar property data

export const SimilarProperty = (postId) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: "SimilarPropertyRequest",
        payload: "SimilarPropertyRequest",
      });

      let url = `${api_Base_Url}/post/project_name/similarProperty/${postId}`; // Ensure project_name is correct/

      const config = {
        headers: { "Content-Type": "application/json" },
        withCredentials: true, // Ensure that credentials are sent if needed
      };

      const { data } = await axios.get(url, config); // Pass postId as an object
      

      dispatch({
        type: "SimilarPropertySuccess",
        payload: data,
      });
    } catch (error) {
      console.log("API Error:", error); // Log the full error

      if (error.response) {
        // Server responded with an error
        dispatch({ type: "SimilarPropertyFail", payload: error.response.data });
      } else if (error.request) {
        // No response was received
        dispatch({
          type: "SimilarPropertyFail",
          payload: { message: "No response from server", success: false },
        });
      } else {
        // Something else happened
        dispatch({
          type: "SimilarPropertyFail",
          payload: { message: error.message, success: false },
        });
      }
    }
  };
};


export const OwnerUploadExcelFile = (file)=>{

  return async (dispatch) => {
    try {
      dispatch({
        type: "OwnerAllExcelFileRequest",
        payload: "OwnerAllExcelFileRequest",
      });
      if (!file) return alert("Please select a file!");
  
      const formData = new FormData();
      formData.append("file", file);
    
  
   
      let url = `${api_Base_Url}/excel/upload`;  // Ensure url is correct/

      const config = {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true,  // Ensure that credentials are sent if needed
      };
 
      const { data } = await axios.post(url, formData, config);  // Pass postId as an object
 
     
      dispatch({
        type: "OwnerAllExcelFileSuccess",
        payload: data,
      });
    } catch (error) {
      console.log("API Error:", error);  // Log the full error

      if (error.response) {
        // Server responded with an error
        dispatch({ type: "OwnerAllExcelFileFail", payload: error.response.data });
      } else if (error.request) {
        // No response was received
        dispatch({ type: "OwnerAllExcelFileFail", payload: { message: "No response from server", success: false } });
      } else {
        // Something else happened
        dispatch({
          type: "OwnerAllExcelFileFail",
          payload: { message: error.message, success: false },
        });
      }
    }
  };
};

//remove excel rom admin and agent
export const removeExcelFromAdminAction = (adminId, excelId) => {
  return async (dispatch) => {
    try {
      dispatch({ type: "Remove_ExcelFromAdminRequest", payload: "Removing Excel from Admin" });
      
      const url = `${api_Base_Url}/excel/remove-excel-access`;
      const config = { headers: { "Content-Type": "application/json" }, withCredentials: true };

      const { data } = await axios.put(url,{
        adminId,
        excelId
      }, config);
      dispatch({ type: "Remove_ExcelFromAdminSuccess", payload: data });
    } catch (error) {
      if (error.response) {
        dispatch({ type: "Remove_ExcelFromAdminFail", payload: error.response.data });
      } else {
        dispatch({ type: "Remove_ExcelFromAdminFail", payload: { message: error.message, success: false } });
      }
    }
  };
}
//all excel files of Owner
export const fetchAllOwnerFiles = () => {
  return async (dispatch) => {
    try {
      dispatch({
        type: "FetchAllOwnerFilesRequest",
      });

      const url = `${api_Base_Url}/excel/all-files`; // Ensure the endpoint is correct

      const config = {
        headers: { "Content-Type": "application/json" },
        withCredentials: true, // Ensures credentials are sent if required
      };

      const { data } = await axios.get(url, config); // Fetch all files

      dispatch({
        type: "FetchAllOwnerFilesSuccess",
        payload: data,
      });
    } catch (error) {
      console.error("API Error:", error); // Log full error

      if (error.response) {
        // Server responded with an error
        dispatch({ type: "FetchAllOwnerFilesFail", payload: error.response.data });
      } else if (error.request) {
        // No response received
        dispatch({ type: "FetchAllOwnerFilesFail", payload: { message: "No response from server", success: false } });
      } else {
        // Unexpected error
        dispatch({
          type: "FetchAllOwnerFilesFail",
          payload: { message: error.message, success: false },
        });
      }
    }
  };
};
//all excel file of  agent
export const fetchAllAdminFiles = () => {
  // console.log("im called")
  return async (dispatch) => {
    try {
      dispatch({
        type: "FetchAllAdminFilesRequest",
      });

      const url = `${api_Base_Url}/admin-owner/get-admin/assign-excel`; // Ensure the correct endpoint for Admin

      const config = {
        headers: { "Content-Type": "application/json" },
        withCredentials: true, // Ensures credentials are sent if required
      };

      const { data } = await axios.get(url, config); // Fetch admin files
// console.log("this sis data ",data)
      dispatch({
        type: "FetchAllAdminFilesSuccess",
        payload: data,
      });
    } catch (error) {
      console.error("API Error:", error); // Log full error

      if (error.response) {
        // Server responded with an error
        dispatch({ type: "FetchAllAdminFilesFail", payload: error.response.data });
      } else if (error.request) {
        // No response received
        dispatch({ type: "FetchAllAdminFilesFail", payload: { message: "No response from server", success: false } });
      } else {
        // Unexpected error
        dispatch({
          type: "FetchAllAdminFilesFail",
          payload: { message: error.message, success: false },
        });
      }
    }
  };
};
//all excel file of  agent
export const fetchAllAgentFiles = () => {
  return async (dispatch) => {
    try {
      dispatch({
        type: "FetchAllAgentFilesRequest",
      });

      const url = `${api_Base_Url}/admin-owner/get-agent/assign-excel`; // Ensure the endpoint is correct

      const config = {
        headers: { "Content-Type": "application/json" },
        withCredentials: true, // Ensures credentials are sent if required
      };

      const { data } = await axios.get(url, config); // Fetch all agent files

      dispatch({
        type: "FetchAllAgentFilesSuccess",
        payload: data,
      });
    } catch (error) {
      console.error("API Error:", error); // Log full error

      if (error.response) {
        // Server responded with an error
        dispatch({ type: "FetchAllAgentFilesFail", payload: error.response.data });
      } else if (error.request) {
        // No response received
        dispatch({ type: "FetchAllAgentFilesFail", payload: { message: "No response from server", success: false } });
      } else {
        // Unexpected error
        dispatch({
          type: "FetchAllAgentFilesFail",
          payload: { message: error.message, success: false },
        });
      }
    }
  };
};


export const GetAllNotificationsAndRequirements = () => {
  return async (dispatch) => {
    try {
      dispatch({ type: "GetNotifiesAndPropRequests" });

      let url = `${api_Base_Url}/notify/notifies-requests`;

      const config = {
        headers: { "Content-Type": "application/json" },

        withCredentials: true,
      };

      const { data } = await axios.get(url, config);
      dispatch({
        type: "GetNotifiesAndPropRequestsSuccess",
        payload: data,
      });
    } catch (error) {
      if (error.response) {
        dispatch({
          type: "GetNotifiesAndPropRequestsFail",
          payload: error.response.data,
        });
      } else {
        dispatch({
          type: "GetNotifiesAndPropRequests",
          payload: { message: error.message, success: false },
        });
      }
    }
  };
};
// change property state available or sold out

export const changePropertyStatus = (updateData) => {
 
  return async (dispatch) => {
    try {
      dispatch({
        type: "changePropertyStatusRequest",
        payload: "changePropertyStatusRequest",
      });
      const url = `${api_Base_Url}/post/updatePropertyStatus`;

      const config = {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      };
      const { data } = await axios.put(url, updateData, config);
      dispatch({ type: "changePropertyStatusSuccess", payload: data });
    } catch (error) {
      if (error.response) {
        dispatch({
          type: "changePropertyStatusFail",
          payload: error.response.data,
        });
      } else {
        dispatch({
          type: "changePropertyStatusFail",
          payload: { message: error.message, success: false },
        });
      }
    }
  };
};

// acknowledge profile

export const acknowledgeProfile = () => {
  return async (dispatch) => {
    try {
      dispatch({
        type: "acknowledgeProfileRequest",
        payload: "acknowledgeProfileRequest",
      });
      const url = `${api_Base_Url}/user/acknowledgeProfile`;

      const config = {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      };
      const { data } = await axios.post(url, config);
      dispatch({ type: "acknowledgeProfileSuccess", payload: data });
    } catch (error) {
      if (error.response) {
        dispatch({
          type: "acknowledgeProfileFail",
          payload: error.response.data,
        });
      } else {
        dispatch({
          type: "acknowledgeProfileFail",
          payload: { message: error.message, success: false },
        });
      }
    }
  };
};

// Get All DeletePostAction

export const GetDeletedPostsAction = () => {
  return async (dispatch) => {
    try {
      dispatch({
        type: "GetDeletedPostsRequest",
        payload: "GetDeletedPostsRequest",
      });

      const url = `${api_Base_Url}/post/all-deleted`;

      const config = {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      };
      const { data } = await axios.get(url, config);
      
      dispatch({ type: "GetDeletedPostsSuccess", payload: data });
    } catch (error) {
      console.log(error);
      if (error.response) {
        dispatch({
          type: "GetDeletedPostsFail",
          payload: error.response.data,
        });
      } else {
        dispatch({
          type: "GetDeletedPostsFail",
          payload: { message: error.message, success: false },
        });
      }
    }
  };
};


// elastic search action
export const getSerachProperty=(query,propertyAdType,body)=>{
  // console.log(query,propertyAdType,"post")
 
  
  return async(dispatch)=>{
  try {
    dispatch({
      type: "GetSerachPropertyRequest",
      payload: "GetSerachPropertyRequest",
    });

    const url = `${api_Base_Url}/post/allpost?query=${query}`;

    const config = {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    };
    console.log(url)
  //  const body.propertyAdType:propertyAdType
    const { data } = await axios.post(url,body, config);
    
    dispatch({ type: "GetSerachPropertySuccess", payload: data });
  } catch (error) {
    console.log(error);
    if (error.response) {
      dispatch({
        type: "GetSerachPropertyFail",
        payload: error.response.data,
      });
    } else {
      dispatch({
        type: "GetSerachPropertyFail",
        payload: { message: error.message, success: false },
      });
    }
  }
  }
}

//report page reportaction


export const ReportPagePostAction = (formdata) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: "ReportPagePostRequest",
        payload: "ReportPagePostRequest",
      });

      const url = `${api_Base_Url}/feedback/report-feedback`;
      // console.log('mu ddd ',formdata)

      const feedBack = new FormData();
      feedBack.append("feedbackType", formdata.type);
      feedBack.append("description", formdata.description);

      // Append multiple files correctly
      if (formdata.file) {
        // console.log(formdata.file)
        
        formdata.file.forEach((files) => {
          feedBack.append("PropertyImages", files);
        });
      }
      // console.log('mu ddd ',feedBack)

      const config = {
     
        withCredentials: true,
      };

      const { data } = await axios.post(url, feedBack, config);
      dispatch({ type: "ReportPagePostSuccess", payload: data });
    } catch (error) {
      if (error.response) {
        dispatch({
          type: "ReportPagePostFail",
          payload: error.response.data,
        });
      } else {
        dispatch({
          type: "ReportPagePostFail",
          payload: { message: error.message, success: false },
        });
      }
    }
  };
};

//handle submit applyjob 

export const ApplyJobAction = (formdata) => {
  return async (dispatch) => {
    
    try {
      dispatch({
        type: "ApplyJobActionRequest",
        payload: "ApplyJobActionRequest",
      });

      const url = `${api_Base_Url}/application/apply-job`;
      // console.log('mu ddd ',formdata)

      const userApplication = new FormData();
      userApplication.append("jobName", formdata.jobName);
      userApplication.append("fullName", formdata.fullName);
      userApplication.append("mobileNo", formdata.mobile);
      userApplication.append("email", formdata.email);
      userApplication.append("linkedIn", formdata.LinkedIn);

      // Append multiple files correctly
      if (formdata.resume) {
        // console.log(formdata.file)
        
     
        userApplication.append("resume", formdata.resume);
      
      }
      // console.log('mu ddd ',feedBack)

      const config = {
     
        withCredentials: true,
      };

      const { data } = await axios.post(url, userApplication, config);
      dispatch({ type: "ApplyJobActionSuccess", payload: data });
    } catch (error) {
      if (error.response) {
        dispatch({
          type: "ApplyJobActionFail",
          payload: error.response.data,
        });
      } else {
        dispatch({
          type: "ApplyJobActionFail",
          payload: { message: error.message, success: false },
        });
      }
    }
  };
};



//get all post for hero and all-post section 

export const getPostsByAddress = () => {
  return async (dispatch) => {
    try {
      dispatch({
        type: "GetPostsByAddressRequest",
        payload: "GetPostsByAddressRequest",
      });

      const url = `${api_Base_Url}/post/all-property/`;

      const config = {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      };
      const d= "new gurgaon";
      const { data } = await axios.get(url, config);
      
      dispatch({ type: "GetPostsByAddressSuccess", payload: data });
    } catch (error) {
      console.log(error);
      if (error.response) {
        dispatch({
          type: "GetPostsByAddressFail",
          payload: error.response.data,
        });
      } else {
        dispatch({
          type: "GetPostsByAddressFail",
          payload: { message: error.message, success: false },
        });
      }
    }
  };
};
