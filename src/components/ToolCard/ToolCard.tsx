import {
  CardContent,
  CardDescription,
  CardIcons,
  CardImage,
  CardPrice,
  CardStatus,
  CardTitle,
  CardWrapper,
  FavoriteIconConteiner,
  theme,
  toolStatusButtonStyle,
} from './styles'

import { useAppDispatch, useAppSelector } from 'store/hooks'
import {
  toolSliceAction,
  toolSliceSelectors,
} from 'store/redux/toolSlice/toolSlice'
import { CardProps } from './types'
import { useNavigate } from 'react-router-dom'
import {
  Box,
  createTheme,
  IconButton,
  ThemeProvider,
  ToggleButton,
  ToggleButtonGroup,
  Tooltip,
} from '@mui/material'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import FavoriteIcon from '@mui/icons-material/Favorite'
import { colors } from 'styles/colors'
import { ToolUserResponseDto } from 'store/redux/toolSlice/types'

function ToolCard({
  id,
  userTool,
  imageUrls,
  title,
  price,
  status,
  description,
  isMyAdvert = false,
}: CardProps) {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const { favCards } = useAppSelector(toolSliceSelectors.tools_data)
  const isFavorite = favCards.some(tool => tool.id === id)

  const tool = {
    id,
    title: title || '',
    description: description || '',
    status: status || '',
    imageUrls: imageUrls || [],
    price: price || '',
  }

  const handleChange = (
    event: React.MouseEvent<HTMLElement>,
    newStatus: string | null,
  ) => {
    if (newStatus) {
      dispatch(
        toolSliceAction.updateToolStatus({
          id,
          status: newStatus,
        }),
      )
    }
  }

  const handleAddToFavorites = (tool: ToolUserResponseDto) => {
    dispatch(toolSliceAction.addToFavorites(tool))
  }

  const goAdvertPage = (id: string) => {
    navigate(`/tools/${id}`)
  }

  const handleEdit = () => {
    navigate(`/profile/my-adverts/change-advert/${id}`)
  }

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this tool?')) {
      try {
        const result = await dispatch(toolSliceAction.deleteTool(id))
        if (toolSliceAction.deleteTool.fulfilled.match(result)) {
          console.log('Tool deleted successfully:', id)
        } else {
          console.error('Delete failed:', result.error)
        }
      } catch (error) {
        console.error('Error during delete:', error)
      }
    }
  }

  return (
    <CardWrapper>
      <CardImage
        onClick={() => goAdvertPage(id)}
        src={
          Array.isArray(imageUrls) && imageUrls.length > 0
            ? imageUrls[0]
            : '/placeholder.jpg'
        }
        alt={title || undefined}
      />
      <CardContent>
        <CardTitle onClick={() => goAdvertPage(id)}>{title}</CardTitle>
        <CardPrice>Price: {price}</CardPrice>
        <CardStatus>Status: {status}</CardStatus>
        <CardDescription>Description: {description}</CardDescription>

        {isMyAdvert ? (
          <>
            <CardIcons>
              <IconButton
                onClick={handleEdit}
                sx={{ color: colors.BUTTON }}
                aria-label="edit"
              >
                <EditIcon />
              </IconButton>
              <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
                <ToggleButtonGroup
                  value={status}
                  exclusive
                  onChange={handleChange}
                  aria-label="Status Toggle"
                  sx={{ display: 'flex', gap: 2 }}
                >
                  <ThemeProvider theme={theme}>
                    <Tooltip title="Available" arrow>
                      <ToggleButton
                        value="AVAILABLE"
                        aria-label="Rented"
                        sx={{
                          ...toolStatusButtonStyle,
                        }}
                      >
                        A
                      </ToggleButton>
                    </Tooltip>
                  </ThemeProvider>
                  <ThemeProvider theme={theme}>
                    <Tooltip title="Pending" arrow>
                      <ToggleButton
                        value="PENDING"
                        aria-label="Rented"
                        sx={{
                          ...toolStatusButtonStyle,
                        }}
                      >
                        P
                      </ToggleButton>
                    </Tooltip>
                  </ThemeProvider>
                  <ThemeProvider theme={theme}>
                    <Tooltip title="Rented" arrow>
                      <ToggleButton
                        value="RENTED"
                        aria-label="Rented"
                        sx={{
                          ...toolStatusButtonStyle,
                        }}
                      >
                        R
                      </ToggleButton>
                    </Tooltip>
                  </ThemeProvider>
                </ToggleButtonGroup>
              </Box>
              <IconButton
                onClick={() => handleDelete(id)}
                sx={{ color: colors.BUTTON }}
                aria-label="delete"
              >
                <DeleteIcon />
              </IconButton>
            </CardIcons>
          </>
        ) : (
          <FavoriteIconConteiner>
            <IconButton
              onClick={() => handleAddToFavorites(tool)}
              sx={{ color: colors.BUTTON }}
              aria-label="addToFavorite"
            >
              {isFavorite ? <FavoriteIcon /> : <FavoriteBorderIcon />}
            </IconButton>
          </FavoriteIconConteiner>
        )}
      </CardContent>
    </CardWrapper>
  )
}

export default ToolCard
