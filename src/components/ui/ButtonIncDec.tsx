import { Box, IconButton, Typography } from '@mui/material'
import React, { useState } from 'react'
import { Colors } from '../../styles/theme'
import { clamp } from './clamp'
import RemoveIcon from '@mui/icons-material/Remove'
import AddIcon from '@mui/icons-material/Add'

const ButtonIncDec: React.FC = (): JSX.Element => {
  const clampValue = clamp(1, 10)
  const [value, setValue] = useState<number>(1)
  return (
    <Box display='flex'>
      <IconButton
        sx={{ borderRadius: 0, background: `${Colors.secondary}` }}
        onClick={() => setValue(clampValue(value - 1))}>
        <RemoveIcon />
      </IconButton>
      <Typography
        variant='h6'
        sx={{ border: `1px solid ${Colors.secondary}`, p: 2 }}
      >
        {value}
      </Typography>
      <IconButton
        sx={{ borderRadius: 0, background: `${Colors.secondary}` }}
        onClick={() => setValue(clampValue(value + 1))}>
        <AddIcon />
      </IconButton>
    </Box>
  )
}

export default ButtonIncDec