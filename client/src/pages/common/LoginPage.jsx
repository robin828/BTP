import React, { useState } from "react";
// import {useGoogleLogin} from '../components/GoogleLoginButton'
import logo from "./resources/google-cta.png";
import Button from "@mui/material/Button";
import { useGoogleLogin } from "react-google-login";
import { useHistory } from "react-router";
import axios from "axios";



const LoginPage = () => {
  const clientId = "325542883606-e4b5v6036u5a32siipql0b0c5ouv8i9l.apps.googleusercontent.com";
  const history = useHistory();

  const [googleLoggedIn, setGoogleLoggedIn] = useState(false);

  const onFailure = (result) => {
    console.log("googleData", result);
    // alert(result);
  };
  const url = "https://class.chartr.in/api/"
  // const url = "http://localhost:5000"

  
  const onSuccess = async (googleData) => {
    axios.post(`${url}/api/login`, {
        token: googleData.tokenId,
      }).then(res=>{
        console.log(res)
        setGoogleLoggedIn(res.data.name)
        localStorage.setItem('admin', res.data.admin)
        localStorage.setItem('email', res.data.email)
        localStorage.setItem('name', res.data.name)
        localStorage.setItem('userId', res.data.userId)
      });
        history.push('/user/login')
  };
  
const { signIn } = useGoogleLogin({
    onSuccess,
      onFailure,
      clientId,
      // isSignedIn: true,
      accessType: 'offline',
    // responseType: 'code',
    // prompt: 'consent',
  });
  return (
    <div
      style={{
        backgroundColor: "#5375E2",
        height: "100vh",
        justifyContent: "center",
        display: "flex",
        alignItem: "center",
      }}
    >
      <Button onClick={signIn} disableRipple>
        <img src={logo} />
      </Button>
    </div>
  );
};

export default LoginPage;
