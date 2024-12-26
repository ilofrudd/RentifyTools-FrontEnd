import { createAppSlice } from 'store/createAppSlice'
import {
  MessageInitialState,
  MessageRequest,
} from 'store/redux/messageSlice/types'
import emailjs from 'emailjs-com'

const initialState: MessageInitialState = {
  isLoading: false,
  success: false,
  error: undefined,
}

export const messageSlice = createAppSlice({
  name: 'MESSAGE',
  initialState,
  reducers: create => ({
    sendMessage: create.asyncThunk(
      async (message_data: MessageRequest, { rejectWithValue }) => {
        const {
          senderName,
          senderEmail,
          recipientName,
          recipientEmail,
          message,
        } = message_data

        const templateParams = {
          from_name: senderName,
          from_email: senderEmail,
          to_name: recipientName,
          to_email: recipientEmail,
          message,
        }

        const response = await emailjs.send(
          'service_xvcr7jm', // Service ID
          'template_g24tj5e', // Template ID
          templateParams,
          'a0ElsdQn3UmP81ftS', // User ID
        )

        if (response.status === 200) {
          return { success: true }
        }

        return rejectWithValue('Failed to send message.')
      },
      {
        pending: (state: MessageInitialState) => {
          state.isLoading = true
          state.success = false
          state.error = undefined
        },
        fulfilled: (state: MessageInitialState) => {
          state.isLoading = false
          state.success = true
          state.error = undefined
        },
        rejected: (state: MessageInitialState, action) => {
          state.isLoading = false
          state.success = false
          state.error = action.payload as string
        },
      },
    ),
    resetState: create.reducer((state: MessageInitialState) => {
      state.isLoading = false
      state.success = false
      state.error = undefined
    }),
  }),
  selectors: {
    message_state: (state: MessageInitialState) => state,
  },
})

export const messageSliceAction = messageSlice.actions
export const messageSliceSelectors = messageSlice.selectors
