import { IconButton, Slide } from '@mui/material';
import React from 'react'
import { SearchBoxContainer, SearchField } from '../../styles/search';
import { useUIContext } from '../context/ui'
import SearchIcon from '@mui/icons-material/Search'
import CloseIcon from '@mui/icons-material/Close'
import { useState } from 'react';
import { useAppDispatch } from '../../redux/hooks';
import { getProducts } from '../../redux/features/products/products.slice';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

type Props = {
  setCurrentPage?: React.Dispatch<React.SetStateAction<number>>
}
const SearchBox: React.FC<Props> = ({setCurrentPage}): JSX.Element => {
  const { showSearchBox, setShowSearchBox } = useUIContext()
  const [search, setSearch] = useState('' || null || undefined)
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const handleOnChange = (e: { preventDefault: () => void; target: { value: React.SetStateAction<string>; }; }) => {
    e.preventDefault()
    setSearch(e.target.value)
  }
  console.log(search)

  const handleSubmit = (e: { preventDefault: () => void; }) => {
    e.preventDefault()
    try {
      if (!search) {
        toast.warn('Insert a name', {
          hideProgressBar: true,
          autoClose: 2000,
          position: toast.POSITION.TOP_CENTER,
        })
      } else {
        dispatch(getProducts(search))
        setCurrentPage(1)
        navigate('/shop')
        setShowSearchBox(false)
        setSearch('')
      }
    } catch (error: any) {
      console.log('SOY ERROR')
      console.error(error || error.message)
    }
  }

  return (
    <Slide direction="down" in={showSearchBox} timeout={500}>
      <SearchBoxContainer>
        <SearchField value={search} name='search' onChange={handleOnChange} color="secondary" variant="standard" fullWidth placeholder="Search..." />
        <IconButton onClick={handleSubmit}>
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