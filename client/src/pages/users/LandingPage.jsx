import { Typography } from '@mui/material'
import React from 'react'
import TableComponent from '../common/TableComponent';

const LandingPage = () => {
    // Axios.get('http://localhost:5000')
    return (
        <div >
            <div style={{margin: '2rem'}} > 
            <Typography style={{fontFamily: 'Montserrat', fontWeight: 'bold', fontSize: '30px', color: '#344663'}} >Video Content</Typography> </div>
            <div style={{marginLeft: '2rem', marginRight: '2rem'}}>
            <TableComponent />

            </div>
        </div>
    )
}

export default LandingPage
