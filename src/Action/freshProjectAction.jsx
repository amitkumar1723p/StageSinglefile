import axios from "axios";
const api_Base_Url = process.env.REACT_APP_API_URL;

export const createfreshProjectAction = (formData) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: "createfreshProjectRequest",
        payload: "createfreshProjectRequest",
      });

      let url = `${api_Base_Url}/fresh/create/project`;

      let config = {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true,
      };

      // Post the FormData to the backend
      const { data } = await axios.post(url, formData, config);

      dispatch({
        type: "createfreshProjectSuccess",
        payload: data,
      });
    } catch (error) {
      if (error.response) {
        dispatch({
          type: "createfreshProjectFail",
          payload: error.response.data,
        });
      } else {
        dispatch({
          type: "createfreshProjectFail",
          payload: { message: error.message, success: false },
        });
      }
    }
  };
};

export const getAllFreshProjectAction = (options = {}) => {
  const {
    RouteType = "",
    projectName = "",
    type = "",
    Adtype = "",
    projectStatus = "",
    address = "",
    searchText = "",
  } = options; // default value to prevent errors
  return async (dispatch) => {
    try {
      dispatch({
        type: `getAllFreshProjectRequest-${RouteType}`,
        payload: {
          Type: "DisplayDataRequest",
          StoreClear: "getAllFreshProjectClear",
        },
      });

      let url = `${api_Base_Url}/fresh/viewAllProject?projectName=${projectName}&type=${type}&Adtype=${Adtype}&projectStatus=${projectStatus}&address=${address}&searchText=${searchText}`;

      let config = {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true,
      };

      // Post the FormData to the backend
      const { data } = await axios.get(url, config);

      dispatch({
        type: `getAllFreshProjectSuccess-${RouteType}`,
        payload: data,
      });
    } catch (error) {
      if (error.response) {
        dispatch({
          type: `getAllFreshProjectFail-${RouteType}`,
          payload: error.response.data,
        });
      } else {
        dispatch({
          type: `getAllFreshProjectFail-${RouteType}`,
          payload: { message: error.message, success: false },
        });
      }
    }
  };
};
export const getviewOneProjectAction = (id) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: "viewOneProjectRequest",
        payload: {
          Type: "DisplayDataRequest",
          StoreClear: "viewOneProjectClear",
        },
      });

      let url = `${api_Base_Url}/fresh/viewOneProject/${id}`;

      let config = {
        headers: {},
        withCredentials: true,
      };
      const { data } = await axios.get(url, config);

      dispatch({ type: "viewOneProjectSuccess", payload: data });
    } catch (error) {
      if (error.response) {
        dispatch({
          type: "viewOneProjectFail",
          payload: error.response.data,
        });
      } else {
        dispatch({
          type: "viewOneProjectFail",
          payload: { message: error.message, success: false },
        });
      }
    }
  };
};

export const editFreshProjectionAction = (id, formData) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: "editFreshProjectionRequest",
        payload: "editFreshProjectionRequest",
      });

      let url = `${api_Base_Url}/fresh/updateProject/${id}`;

      let config = {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true,
      };

      const { data } = await axios.put(url, formData, config);

      dispatch({ type: "editFreshProjectionSuccess", payload: data });
    } catch (error) {
      if (error.response) {
        dispatch({
          type: "editFreshProjectionFail",
          payload: error.response.data,
        });
      } else {
        dispatch({
          type: "editFreshProjectionFail",
          payload: { message: error.message, success: false },
        });
      }
    }
  };
};

export const projectStatusAction = (id) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: "projectStatusRequest",
        payload: "projectStatusRequest",
      });

      let url = `${api_Base_Url}/fresh/changeStatus/${id}`;

      let config = {
        headers: {},
        withCredentials: true,
      };
      const { data } = await axios.post(url, config);

      dispatch({ type: "projectStatusSuccess", payload: data });
    } catch (error) {
      if (error.response) {
        dispatch({
          type: "projectStatusFail",
          payload: error.response.data,
        });
      } else {
        dispatch({
          type: "projectStatusFail",
          payload: { message: error.message, success: false },
        });
      }
    }
  };
};

export const getprojectLeadAllAction = () => {
  return async (dispatch) => {
    try {
      dispatch({
        type: "getprojectLeadAllRequest",
        payload: {
          Type: "DisplayDataRequest",
          StoreClear: "getprojectLeadAllClear",
        },
      });

      let url = `${api_Base_Url}/fresh/viewAllProjectLead`;
      let config = {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true,
      };
      // Post the FormData to the backend
      const { data } = await axios.get(url, config);

      dispatch({
        type: "getprojectLeadAllSuccess",
        payload: data,
      });
    } catch (error) {
      if (error.response) {
        dispatch({
          type: "getprojectLeadAllFail",
          payload: error.response.data,
        });
      } else {
        dispatch({
          type: "getprojectLeadAllFail",
          payload: { message: error.message, success: false },
        });
      }
    }
  };
};

export const updateProjectLeadAction = (id, remark) => {
  console.log(remark);

  return async (dispatch) => {
    try {
      dispatch({
        type: "updateProjectLeadRequest",
      });
      const data1 = { remark };
      let url = `${api_Base_Url}/fresh/update-remark/${id}`;
      let config = {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      };
      // Post the FormData to the backend
      const { data } = await axios.post(url, data1, config);

      dispatch({
        type: "updateProjectLeadSuccess",
        payload: data,
      });
    } catch (error) {
      if (error.response) {
        dispatch({
          type: "updateProjectLeadFail",
          payload: error.response.data,
        });
      } else {
        dispatch({
          type: "updateProjectLeadFail",
          payload: { message: error.message, success: false },
        });
      }
    }
  };
};

export const submitFreshProjectLead=(formData)=>{
  console.log(formData,"dis")
  return async(dispatch)=>{
    try {
      dispatch({
        type: "submitFreshProjectLeadRequest",
        payload: "submitFreshProjectLeadRequest",
      });

      let url = `${api_Base_Url}/fresh/lead/project`;

      let config = {
        headers: { "Content-Type": "application/JSON" },
        withCredentials: true,
      };
const form=JSON.stringify(formData)
console.log(form,"pppp")
      // Post the FormData to the backend
      const { data } = await axios.post(url, form, config);

      dispatch({
        type: "submitFreshProjectLeadSuccess",
        payload: data,
      });
    } catch (error) {
      if (error.response) {
        dispatch({
          type: "submitFreshProjectLeadFail",
          payload: error.response.data,
        });
      } else {
        dispatch({
          type: "submitFreshProjectLeadFail",
          payload: { message: error.message, success: false },
        });
      }
    }
  }
}

export const submitFreshProjectLead_VerifyOtp=(formData)=>{
  console.log(formData,"dis")
  return async(dispatch)=>{
    try {
      dispatch({
        type: "submitFreshProjectLead_VerifyOtpRequest",
        payload: "submitFreshProjectLead_VerifyOtpRequest",
      });

      let url = `${api_Base_Url}/fresh/otp-verify/project`;

      let config = {
        headers: { "Content-Type": "application/JSON" },
        withCredentials: true,
      };
const form=JSON.stringify(formData)
console.log(form,"pppp")
      // Post the FormData to the backend
      const { data } = await axios.post(url, form, config);

      dispatch({
        type: "submitFreshProjectLead_VerifyOtpSuccess",
        payload: data,
      });
    } catch (error) {
      if (error.response) {
        dispatch({
          type: "submitFreshProjectLead_VerifyOtpFail",
          payload: error.response.data,
        });
      } else {
        dispatch({
          type: "submitFreshProjectLead_VerifyOtpFail",
          payload: { message: error.message, success: false },
        });
      }
    }
  }
}

