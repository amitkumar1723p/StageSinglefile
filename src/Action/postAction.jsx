import axios from "axios";
const api_Base_Url = process.env.REACT_APP_API_URL
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
          // { "Content-Type": "application/json" },
        },

        withCredentials: true,
      };

      const { data } = await axios.post(url, PostData, config);

      dispatch({ type: "CreatePostSuccess", payload: data });
    } catch (error) {
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

// Delete Post Action

export const DeletePostAction = (PostId) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: "DeletePostRequest",
        payload: "DeletePostRequest",
      });

      const url = `${api_Base_Url}/post/delete/${PostId}`;

      const config = {
        headers: { "Content-Type": "application/json" },

        withCredentials: true,
      };

      const { data } = await axios.delete(url, config);

      dispatch({ type: "DeletePostSuccess", payload: data });
    } catch (error) {
      if (error.response) {
        dispatch({ type: "DeletePostFail", payload: error.response.data });
      } else {
        dispatch({
          type: "DeletePostFail",
          payload: { message: error.message, success: false },
        });
      }
    }
  };
};

// Get Single Post

export const GetSinglePostAction = (PostId) => {
  return async (dispatch) => {
    try {
      dispatch({ type: "GetSinglePostRequest" });

      const url = `${api_Base_Url}/post/single/${PostId}`;

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

export const Admin_OwnerGetAllScheduleVisits = (PostId) => {
  return async (dispatch) => {
    try {
      dispatch({ type: "Admin_OwnerGetAllScheduleVisitsRequest" });

      let url = `${api_Base_Url}/admin-owner/all-schedulevisits/${PostId}`;

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
