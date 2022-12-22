import React from 'react'
import { Card, CardContent, Typography } from '@mui/material'
import Box from '@mui/material/Box';

export default function Voorstellingen() {
  return (
    <Box sx={{ display: 'flex', m:2 }}>
      <div style={{
                    alignContent: "top",

                    display: "flex",
                    pt: 10,
                }}>
        <Card variant="outlined" sx={{width:700, display:'flex'}}>
            <Card variant="outlined" sx={{width:150, padding:3}}>
              <Typography sx={{fontSize: 30, fontWeight:"bold", textAlign:"center"}}>
                17 dec
              </Typography>
              <Typography sx={{fontSize: 24, fontWeight:"regular", textAlign:"center"}}>
                20:00
              </Typography>
            </Card>
            <Box sx={{width: 150, padding:2}}>
              <Typography sx={{fontSize: 24, fontWeight:"regular", textAlign:"right" }}>
                zaal:
              </Typography>
              <Typography sx={{fontSize: 24, fontWeight:"regular", textAlign:"right" }}>
                bezoeker:
              </Typography>
              <Typography sx={{fontSize: 24, fontWeight:"regular", textAlign:"right" }}>
                stoelen:
              </Typography>
            </Box>
            <Box sx={{width: 50, padding:2}}>
              <Typography sx={{fontSize: 24, fontWeight:"regular", textAlign:"left" }}>
                1
              </Typography>
              <Typography sx={{fontSize: 24, fontWeight:"regular", textAlign:"left" }}>
                69
              </Typography>
              <Typography sx={{fontSize: 24, fontWeight:"regular", textAlign:"left" }}>
                240
              </Typography>
            </Box>
            <Box sx={{width: 200, padding:2}}>
              <Typography sx={{fontSize: 24, fontWeight:"regular", textAlign:"right" }}>
                eersterangs:
              </Typography>
              <Typography sx={{fontSize: 24, fontWeight:"regular", textAlign:"right" }}>
                tweederangs:
              </Typography>
              <Typography sx={{fontSize: 24, fontWeight:"regular", textAlign:"right" }}>
                derderangs:
              </Typography>
            </Box>
            <Box sx={{width: 50, padding:2}}>
              <Typography sx={{fontSize: 24, fontWeight:"regular", textAlign:"left" }}>
                20
              </Typography>
              <Typography sx={{fontSize: 24, fontWeight:"regular", textAlign:"left" }}>
                100
              </Typography>
              <Typography sx={{fontSize: 24, fontWeight:"regular", textAlign:"left" }}>
                120
              </Typography>
            </Box>
        </Card>
      </div>
    </Box>
    
  )
}
