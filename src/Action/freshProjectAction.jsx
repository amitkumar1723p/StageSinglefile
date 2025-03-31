import axios from "axios";
const api_Base_Url = process.env.REACT_APP_API_URL;

export const createfreshProjectAction = (formData) => {
    console.log(formData, "hd");
    return async (dispatch) => {
        try {
            dispatch({
                type: "createfreshProjectRequest",
                payload: "createfreshProjectRequest"
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
                payload: data
            });
        } catch (error) {
            if (error.response) {
                dispatch({
                    type: "createfreshProjectFail",
                    payload: error.response.data
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

