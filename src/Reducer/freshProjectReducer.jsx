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
