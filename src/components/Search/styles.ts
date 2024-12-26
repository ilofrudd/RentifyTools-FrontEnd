import { styled } from '@mui/material/styles'
import { Box, TextField, Button } from '@mui/material'
import { colors } from 'styles/colors'

export const SearchContainer = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  backgroundColor: colors.WHITE,
  borderRadius: 8,
  width: '100%',
  maxWidth: 550,
  height: 50,
  '@media (max-width: 600px)': {
    height: 40,
  },
})

export const SearchInput = styled(TextField)({
  flex: 1,
  minWidth: 0,
  borderTopLeftRadius: 8,
  borderBottomLeftRadius: 8,
  '& .MuiInputBase-root': {
    height: '100%',
  },
  '& .MuiInputBase-input': {
    color: colors.BLACK,
    height: '100%',
    paddingLeft: '10px',
  },
  '@media (max-width: 600px)': {
    fontSize: '0.875rem',
  },
})

export const SearchButton = styled(Button)({
  backgroundColor: colors.BUTTON,
  height: '100%',
  borderRadius: '0 8px 8px 0',
  padding: '0 16px',
  '@media (max-width: 600px)': {
    padding: '0 8px',
    fontSize: '0.875rem',
  },
})

export const CityInputContainer = styled(Box)({
  height: '100%',
  position: 'relative',
  flex: 1,
  minWidth: 0,
  display: 'flex',
  flexDirection: 'column',
  borderLeft: `2px solid ${colors.HEADER}`,
  '& .MuiInputBase-root': {
    height: '100%',
  },
})

export const CitySuggestionList = styled(Box)({
  position: 'absolute',
  top: '100%',
  left: 0,
  right: 0,
  backgroundColor: colors.WHITE,
  border: `1px solid ${colors.GREY}`,
  borderRadius: 4,
  maxHeight: 200,
  overflowY: 'auto',
  zIndex: 10,
  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
})

export const CitySuggestion = styled(Box)({
  padding: '8px 10px',
  cursor: 'pointer',
  color: colors.BLACK,
  '&:hover': {
    backgroundColor: colors.GREY,
    color: colors.WHITE,
  },
  '&:not(:last-child)': {
    borderBottom: `1px solid ${colors.GREY}`,
  },
})
