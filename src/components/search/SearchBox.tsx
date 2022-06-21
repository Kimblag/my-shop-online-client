import { IconButton, Slide } from '@mui/material';
import React from 'react'
import { SearchBoxContainer, SearchField } from '../../styles/search';
import { useUIContext } from '../context/ui'
import SearchIcon from '@mui/icons-material/Search'
import CloseIcon from '@mui/icons-material/Close'

const SearchBox: React.FC = (): JSX.Element => {
  const { showSearchBox, setShowSearchBox } = useUIContext()

  return (
    <Slide direction="down" in={showSearchBox} timeout={500}>
      <SearchBoxContainer>
        <SearchField color="secondary" variant="standard" fullWidth placeholder="Search..." />
        <IconButton>
          <SearchIcon
            sx={{ fontSize: { xs: '2rem', md: '2.5rem' } }}
            color="secondary"
          />
        </IconButton>
        <IconButton
        onClick={() => setShowSearchBox(false)}
          sx={{
            position: 'absolute',
            top: 10,
            right: 10
          }}
        >
          <CloseIcon sx={{ fontSize: '3rem' }} color="secondary" />
        </IconButton>
      </SearchBoxContainer>
    </Slide>
  )
}

export default SearchBox