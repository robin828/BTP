import React from 'react'
import { Typography, Box, Paper } from "@mui/material";


const Message = () => {
    let hieght = 64;
    return (
        <div>
            <Box
      sx={{
        display: 'flex',
        '& > :not(style)': {
          m: 1,
          width: 256,
          height: hieght,
          borderRadius: '15px',
          backgroundColor: "#5375E2"
        },
        
      }}
    >
      {/* <Paper variant="outlined" /> */}
      <Paper variant="outlined" square />
    </Box>
        </div>
    )
}

export default Message
