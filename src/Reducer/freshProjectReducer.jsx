export const createfreshProjectReducer=(state = {}, action)=>{
    console.log("listen reducer")
    switch (action.type) {
        case "createfreshProjectRequest":
          return {
            ...state,
            loading: true,
          };
    
        case "createfreshProjectSuccess":
          return {
            ...state,
            logoutdata: action.payload,
            loading: false,
          };
    
        case "createfreshProjectFail":
          return {
            ...state,
            logoutdata: action.payload,
            loading: false,
          };
        case "createfreshProjectClear":
          return {};
    
        default:
          return {
            ...state,
          };
      }
}