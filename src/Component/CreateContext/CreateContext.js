import React, { createContext, useContext, useRef, useState ,useEffect} from "react";
// Create a context
export const UserContext = createContext();
// Create a provider component
export function UserProvider({ children }) {
  const [RedirectPath, setRedirectPath] = useState("");
  const [RedirectPathIsHomeCard, setRedirectPathIsHomeCard] = useState(null);

  // varb is used for update forfile
  const [varb, setVarb] = useState(null);

  const [profile, setProfile] = useState("");
  // propertyId used for the assigned property id
  const [propertyId, setPropertyId] = useState([]);

  //this store All Property fetched from backend
  // const [allPropertyData, setAllPropertyData] = useState([]);

  const [allPropertyData, setAllPropertyData] = useState(() => {
    const storedState = localStorage.getItem('Admin_OwnerGetAllPostState');
    return storedState ? JSON.parse(storedState) : {}; // Initialize state from localStorage or empty object
  });

    // Whenever `allPropertyData` changes, update localStorage
    useEffect(() => {
      if (allPropertyData) {
        localStorage.setItem('Admin_OwnerGetAllPostState', JSON.stringify(allPropertyData));
      }
    }, [allPropertyData]);
    
// this state is store the dashboard keyword for active ,inactive or active 
const[postVerify,setPostVerify]=useState(null)
console.log(postVerify,"check")
  return (
    <UserContext.Provider
      value={{
        propertyId,
        setPropertyId,

        varb,
        setVarb,

        profile,
        setProfile,

        setRedirectPath,
        RedirectPath,

        RedirectPathIsHomeCard,
        setRedirectPathIsHomeCard,


        allPropertyData, setAllPropertyData,
        postVerify,setPostVerify

      }}
    >
      {children}
    </UserContext.Provider>
  );
  
}
