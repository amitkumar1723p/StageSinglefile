export const createfreshProjectReducer=(state = {}, action)=>{
   
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
// export const getviewoneProjectReducer=(state={},action)=>{
//   try {
//     switch (action.type) {
//       case "viewOneProjectRequest":
//         return {
//           ...state,
//           loading: true,
//         };
//         case "viewOneProjectSuccess":
//         return {
//           ...state,
//           loading: true,
//         };
//         case "viewOneProjectFail":
//         return {
//           ...state,
//           loading: true,
//         };
//       }
      
//   } catch (error) {
      
//   }
// }


export const getviewoneProjectReducer = (state = {}, action) => {
  switch (action.type) {
    case "viewOneProjectRequest":
      return {
        ...state,
        loading: true,
      };

    case "viewOneProjectSuccess":
      return {
        ...state,
        loading: false,
        data: action.payload,
      };

    case "viewOneProjectFail":
      return {
        ...state,
        loading: false,
        data: action.payload,
      };

    case "viewOneProjectClear":
      // alert("get All Post Clear")
      return {};
    default:
      return {
        ...state,
      };
  }
};

export const editFreshProjectionReducer = (state = {}, action) => {
  switch (action.type) {
    case "editFreshProjectionRequest":
      return {
        ...state,
        loading: true,
      };

    case "editFreshProjectionSuccess":
      return {
        ...state,
        loading: false,
        data: action.payload,
      };

    case "editFreshProjectionFail":
      return {
        ...state,
        loading: false,
        data: action.payload,
      };

    case "editFreshProjectionClear":
      // alert("get All Post Clear")
      return {};
    default:
      return {
        ...state,
      };
  }
};

export const projectStatusReducer=(state = {}, action)=>{
  switch (action.type) {
    case "projectStatusRequest":
      return {
        ...state,
        loading: true,
      };

    case "projectStatusSuccess":
      return {
        ...state,
        loading: false,
        data: action.payload,
      };

    case "projectStatusFail":
      return {
        ...state,
        loading: false,
        data: action.payload,
      };

    case "projectStatusClear":
      // alert("get All Post Clear")
      return {};
    default:
      return {
        ...state,
      };
  }
};

export const getprojectLeadAllReducer=(state={},action)=>{
  switch (action.type) {
    case "getprojectLeadAllRequest":
      return {
        ...state,
        loading: true,
      };

    case "getprojectLeadAllSuccess":
      return {
        ...state,
        loading: false,
        data: action.payload,
      };

    case "getprojectLeadAllFail":
      return {
        ...state,
        loading: false,
        data: action.payload,
      };

    case "getprojectLeadAllClear":
      // alert("get All Post Clear")
      return {};
    default:
      return {
        ...state,
      };
  }
}