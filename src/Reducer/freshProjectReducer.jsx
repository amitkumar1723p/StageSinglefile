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
            data: action.payload,
            loading: false,
          };
    
        case "createfreshProjectFail":
          return {
            ...state,
          data: action.payload,
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


export const getAllFreshProjectReducer=(state = {}, action)=>{
  console.log("listen reducer")
  switch (action.type) {
      case "getAllFreshProjectRequest":
        return {
          ...state,
          loading: true,
        };
      case "getAllFreshProjectSuccess":
        return {
          ...state,
          data: action.payload,
          loading: false,
        };
  
      case "getAllFreshProjectFail":
        return {
          ...state,
          data: action.payload,
          loading: false,
        };
      case "getAllFreshProjectClear":
        return {};
      default:
        return {
          ...state,
        };
    }
}
