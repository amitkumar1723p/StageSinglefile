import React, { createContext, useContext, useRef, useState } from 'react';
// Create a context
 export const UserContext = createContext();
// Create a provider component
export function UserProvider({ children }) {
    const [RedirectPath, setRedirectPath] = useState("");
    const [RedirectPathIsHomeCard ,setRedirectPathIsHomeCard] =useState(null)

    
// varb is used for update forfile
    const [varb,setVarb]=useState(null)

    const [profile, setProfile] = useState('');
    // propertyId used for the assigned property id 
    const [propertyId,setPropertyId]=useState([])
     
    return (
        <UserContext.Provider value={{propertyId,setPropertyId,  varb,setVarb ,profile, setProfile,setRedirectPath , RedirectPath ,RedirectPathIsHomeCard ,setRedirectPathIsHomeCard }}>
          
            {children}
        </UserContext.Provider>
    );
}
