import { Avatar, Box, IconButton, Rating }  from '@mui/material'
import { Delete } from '@mui/icons-material'
import Grid from '@mui/material/Grid';
import React from 'react'
import { red } from '@mui/material/colors';

const ReviewCard = () => {
  return (
    <div className='flex justify-between'>

      <Grid container spacing={10}>
        
        <Grid size={{ xs: 1 }} >
            <Box>
                <Avatar className='text-white' sx={{width: 56, height: 56, bgcolor: "#9155FD"}}>
                    Z
                </Avatar>
            </Box>
        
        </Grid>

        <Grid size={{ xs: 9 }}>

            <div className='space-y-2'>
                <div className=''>
                    <p className='font-semibold text-lg'>TQP</p>
                    <p className='opacity-70'>2025-12-26 14:26:03</p>
                </div>
            </div>

            <Rating
            readOnly
            value={4.5}
            precision={0.5}
            />

            <p>
                Gia cua san pham nay la bao nhieu?
            </p>

            <div>
                <img
                className='w-2/4 h-2/4 object-cover'
                src="" alt="" />
            </div>
        </Grid>

      </Grid>

        <div>
            <IconButton>
                <Delete sx={{color:red[700]}}/>
            </IconButton>
        </div>
    </div>
  )
}

export default ReviewCard
