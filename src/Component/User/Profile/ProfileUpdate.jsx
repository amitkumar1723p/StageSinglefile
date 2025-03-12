import React, { useEffect, useState,useContext } from 'react';
import{dispatch, useDispatch} from 'react-redux';
import { ProfileUpdateAction } from '../../../Action/userAction';
import { UserContext } from '../../CreateContext/CreateContext';
import { useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom'; 
export default function ProfileEdit() {

  const { data, LodingType } = useSelector((state) => {
    return state.userData;
  });

const navigate = useNavigate();
const dispatch=useDispatch()
const {varb}=useContext(UserContext);


  const [number, setNumber] = useState(varb?.Name);
  const [email, setEmail] = useState(varb?.emil);
  const [name, setName] = useState(varb?.ContactNumber);
  const [otp, setOtp] = useState('');

  const handleNumber = async (e) => {
    e.preventDefault();
    const updateData={ContactNumber:varb.ContactNumber,LastName:varb.LastName,email:varb.email,Name:varb.Name,Otp:otp};
     
    dispatch(ProfileUpdateAction(updateData))
    
  }

   useEffect(()=>{
    
 if(data && LodingType =="ProfileUpdateRequest"){
  if(data.success==true){
    navigate('/user');
  }
 }
   },[data])

  // Inline styles
  const styles = {
    body: {
      fontFamily: 'Arial, sans-serif',
      height: '45vh',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#f0f0f0',
    },
    
    formContainer: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '45vh',
      padding: '10px',
      marginTop: '25px',
      marginBottom: '25px',
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
      backgroundColor: '(--main-light-clr);',
      color: 'white',
      border: 'none',
      borderRadius: '5px',
      cursor: 'pointer',
      transition: 'background-color 0.3s',
    },
    buttonHover: {
      backgroundColor: '#45a049',
    },
  };

  return (
    <div style={styles.formContainer}>
      {/* <div>fhe</div> */}
      <div>
      <form onSubmit={handleNumber} style={styles.form}>
        <p>Provide the OTP !</p>
        <input
          type="number"
          name="Otp"
          required
          placeholder="Enter OTP here"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          style={styles.input}
        />
        <button className="updatepropfile-section" type="submit" style={styles.button}>Submit</button>
      </form>
      </div>
    </div>
  );
}
