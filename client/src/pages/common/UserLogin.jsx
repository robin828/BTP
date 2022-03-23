import React from 'react';
import { useHistory } from 'react-router';
const UserLogin = ({setIsLoggedIn}) => {
    const history = useHistory();
    setTimeout(() => {
        if(localStorage.getItem('email')) {
            history.push('/videos')
            setIsLoggedIn(true);
        }
        else {
            alert('Wrong id and password');
            history.push('/')
        }
    }, 3000);
    // if(localStorage.getItem('email')) {
    //     history.push('/videos')
    //     setIsLoggedIn(true);
    // }
    // else {
    //     alert('Wrong id and password');
    //     history.push('/')
    // }
    
    
    return (
        <div style={{textAlign: 'center'}} >
           Loading ...
        </div>
    )
}

export default UserLogin
