import React, { useState, useEffect  } from 'react';
import "./ProfileEdit.css"
import { useDispatch ,useSelector} from 'react-redux';
import { ProfileEditAction } from '../../../Action/userAction';
import { useNavigate } from 'react-router-dom'; 
export default function ProfileEdit() {
  const [number, setNumber] = useState('');  // Store the number input
  const navigate = useNavigate();
  const dispatch=useDispatch()
 // Get state from Redux store
   const { data, LodingType } = useSelector((state) => {
     return state.userData;
   });
  
  const handleNumber = async (e) => {
    e.preventDefault();
    const editNumber = { ContactNumber: number };
    try {
       await dispatch(ProfileEditAction(editNumber));
    } catch (error) {
      // Handle the error if the dispatch fails
      console.log('Error updating profile:', error);
    }
  };

   // Effect to handle navigation on successful profile update
   useEffect(()=>{
    
 if(data && LodingType =="ProfileEdit"){
  if(data.success==true){
   
    navigate('/user/profileUpdate');
  }
 }
   },[data])

  const styles = {
    body: {
      fontFamily: 'Arial, sans-serif',
      height: '35vh',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#f0f0f0',
    },
    formContainer: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '35vh',
      padding: '20px',
      marginTop: '25px',
      marginBottom: '10px',
      flexDirection: 'column', // To stack the header and form vertically
    },
    form: {
      backgroundColor: 'white',
      padding: '30px',
      borderRadius: '8px',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
      display: 'flex',
      flexDirection: 'column',
      gap: '15px',
      width: '100%',
      maxWidth: '400px',
    },
    input: {
      padding: '10px',
      fontSize: '16px',
      margin: '5px 0',
      border: '1px solid #ccc',
      borderRadius: '5px',
    },
    inputFocus: {
      borderColor: '#4CAF50',
      outline: 'none',
    },
    button: {
      padding: '10px',
      fontSize: '16px',
      backgroundColor: 'var(--main-light-clr)',
      color: 'white',
      border: 'none',
      borderRadius: '5px',
      cursor: 'pointer',
      transition: 'background-color 0.3s',
    },
    buttonHover: {
      backgroundColor: '#45a049',
    },
    header: {
      textAlign: 'center', // Center the header text
      marginBottom: '20px', // Add some space below the header
      fontSize: '24px', // Increase the font size for the header
      color: '#333', // Darker color for the header text
    },
  };

  return (
    // <div style={styles.formContainer}>
    //   <div style={styles.header}>
    //     <h3>Update Your Profile</h3>
    //   </div>

    //   <form onSubmit={handleNumber} style={styles.form}>
    //     <p>Enter New Mobile Number</p>
    //     <input
    //       type="number"
    //       name="ContactNumber"
    //       placeholder="Type New number"
    //       value={number}
    //       onChange={(e) => setNumber(e.target.value)}
    //       style={styles.input}
    //       required
    //     />
    //     <button type="submit" style={styles.button}>
    //       Send OTP
    //     </button>
    //   </form>
    // </div>
    <></>
  );
}
