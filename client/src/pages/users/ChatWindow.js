import React from 'react'
import { Typography, Grid, Paper, Box } from "@mui/material";

import Message from '../common/Message'
const ChatWindow = () => {
    return (
        <div>
            <Box
      sx={{
        display: 'flex',
        '& > :not(style)': {
          m: 1,
          width: 400,
          height: 450,
          borderRadius: '15px',
        },
        
      }}
    >
      {/* <Paper variant="outlined" /> */}
      <Paper variant="outlined" square ><Message /></Paper>
    </Box>
    <Box
      sx={{
        display: 'flex',
        '& > :not(style)': {
          m: 1,
          width: 400,
          height: 100,
          borderRadius: '15px',
        },
        
      }}
    >
      {/* <Paper variant="outlined" /> */}
      <Paper variant="outlined" square ></Paper>
    </Box>
            
        </div>
    )
}

export default ChatWindow
