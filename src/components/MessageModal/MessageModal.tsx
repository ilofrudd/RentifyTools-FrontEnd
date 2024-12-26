import { useState } from 'react'
import { Modal, Box, Typography, TextField, Button } from '@mui/material'
import { useAppDispatch, useAppSelector } from 'store/hooks'
import {
  messageSliceAction,
  messageSliceSelectors,
} from 'store/redux/messageSlice/messageSlice'
import { MessageModalProps } from './types'
import { modalStyle, successMessageStyle } from './styles'
import { colors } from 'styles/colors'

function MessageModal({
  isOpen,
  onClose,
  recipientName,
  recipientEmail,
  senderName,
  senderEmail,
}: MessageModalProps) {
  const [message, setMessage] = useState('')
  const dispatch = useAppDispatch()
  const { isLoading, success, error } = useAppSelector(
    messageSliceSelectors.message_state,
  )

  const handleSendMessage = () => {
    if (!message.trim()) {
      alert('Message cannot be empty!')
      return
    }

    dispatch(
      messageSliceAction.sendMessage({
        senderName,
        senderEmail,
        recipientName,
        recipientEmail,
        message,
      }),
    )
  }

  const handleClose = () => {
    setMessage('')
    onClose()
  }

  return (
    <Modal open={isOpen} onClose={handleClose}>
      <Box sx={{ ...modalStyle }}>
        <Typography variant="h6" mb={2}>
          Send a Message to {recipientName}
        </Typography>
        <TextField
          fullWidth
          multiline
          rows={4}
          variant="outlined"
          placeholder="Write your message here..."
          value={message}
          onChange={e => setMessage(e.target.value)}
          InputProps={{
            style: { color: 'white' },
          }}
          sx={{
            marginBottom: 2,
            '& .MuiOutlinedInput-root': {
              '& fieldset': {
                borderColor: 'white',
              },
              '&:hover fieldset': {
                borderColor: 'white',
              },
              '&.Mui-focused fieldset': {
                borderColor: 'white',
              },
              '&::placeholder': {
                color: 'white',
              },
            },
          }}
        />
        {error && <Typography color="error">{error}</Typography>}
        {success && (
          <Typography
            color="success"
            sx={{
              ...successMessageStyle,
            }}
          >
            Message sent successfully!
          </Typography>
        )}
        <Button
          variant="contained"
          sx={{ background: colors.BUTTON }}
          fullWidth
          onClick={handleSendMessage}
          disabled={isLoading}
        >
          {isLoading ? 'Sending...' : 'Send Message'}
        </Button>
      </Box>
    </Modal>
  )
}

export default MessageModal
