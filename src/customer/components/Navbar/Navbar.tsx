import { Box, IconButton } from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import React from 'react'

const Navbar = () => {
  return (
    <div>
      <Box>
        <div>
          <div>
            <div>
              <IconButton>
                <MenuIcon />
                
              </IconButton>
            </div>
          </div>
        </div>
      </Box>
    </div>
  )
}

export default Navbar
