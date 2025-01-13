
import { Button, CircularProgress } from '@mui/material'
import React from 'react'

type props= {
  loading: boolean,
  text: string,
}

function LoadingButton({loading, text}:props) {
  return (
    <Button
    sx={{
        '&:hover': {
backgroundColor: 'blue',
          display:"flex",
          flexDirection:"row",
          gap:"2px"
},
    }}
    type="submit" className="bg-secondary px-6 py-1 rounded-md bg-blue-600 border-2 text-white border-blue-400 text-lightBrown">
        Pay  {loading ? <CircularProgress size= "10px"/>  : ""}
    </Button>
  )
}

export default LoadingButton
