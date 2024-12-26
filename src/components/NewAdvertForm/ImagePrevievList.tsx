import { Box, Card, CardMedia, IconButton, Stack } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import OpenInNewIcon from '@mui/icons-material/OpenInNew'
import { colors } from 'styles/colors'
import { ImagePreviewListProps } from './types'

function ImagePreviewList({ images, onRemove }: ImagePreviewListProps) {
  return (
    <Stack direction="row" spacing={2} flexWrap="wrap" justifyContent="center">
      {images.map((image, index) => (
        <Box key={index} sx={{ textAlign: 'center', maxWidth: 120 }}>
          <Card
            sx={{
              width: 100,
              height: 100,
              margin: '0 auto',
              backgroundColor: `${colors.TRANSPARENT}`,
              border: `1px dashed ${colors.WHITE}`,
              borderRadius: 2,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              overflow: 'hidden',
            }}
          >
            <CardMedia
              component="img"
              image={image instanceof File ? URL.createObjectURL(image) : image}
              alt={`Preview ${index}`}
              sx={{
                maxWidth: '100%',
                maxHeight: '100%',
                objectFit: 'contain',
              }}
            />
          </Card>
          <Stack direction="row" justifyContent="center" spacing={1} mt={1}>
            <IconButton
              sx={{
                color: colors.BUTTON,
                fontSize: 20,
              }}
              href={image instanceof File ? URL.createObjectURL(image) : image}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="open"
            >
              <OpenInNewIcon />
            </IconButton>
            <IconButton
              sx={{
                color: colors.BUTTON,
                fontSize: 20,
              }}
              onClick={() => onRemove(index)}
              aria-label="remove"
            >
              <DeleteIcon />
            </IconButton>
          </Stack>
        </Box>
      ))}
    </Stack>
  )
}

export default ImagePreviewList
