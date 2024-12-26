import { createAppSlice } from 'store/createAppSlice'
import { Address, AddressCityZip, AddressInitialState } from './types'

const addressDataInitialState: AddressInitialState = {
  addresses: [],
  addressesCityZip: [],
  isLoading: false,
  addressObj: undefined,
  error: undefined,
}

export const addressSlice = createAppSlice({
  name: 'ADDRESS',
  initialState: addressDataInitialState,
  reducers: create => ({
    createAddress: create.asyncThunk(
      async (addressData: Address, { rejectWithValue }) => {
        const response = await fetch('/api/address', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(addressData),
        })

        const result = await response.json()

        if (!response.ok) {
          return rejectWithValue(result.message || 'Failed to create address')
        }

        return result as Address
      },
      {
        pending: (state: AddressInitialState) => {
          state.isLoading = true
          state.error = undefined
        },
        fulfilled: (state: AddressInitialState, action) => {
          state.isLoading = false
          state.addressObj = action.payload
          state.addresses.push(action.payload)
          state.error = undefined
        },
        rejected: (state: AddressInitialState, action) => {
          state.isLoading = false
          state.error = action.payload as string
        },
      },
    ),

    fetchAddresses: create.asyncThunk(
      async (_, { rejectWithValue }) => {
        const response = await fetch('/api/address', {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
        })

        const result = await response.json()

        if (!response.ok) {
          return rejectWithValue(result.message || 'Failed to fetch addresses')
        }

        return result as Address[]
      },
      {
        pending: (state: AddressInitialState) => {
          state.isLoading = true
          state.error = undefined
        },
        fulfilled: (state: AddressInitialState, action) => {
          state.isLoading = false
          state.addresses = action.payload
          state.error = undefined
        },
        rejected: (state: AddressInitialState, action) => {
          state.isLoading = false
          state.error = action.payload as string
        },
      },
    ),

    fetchCityZipSuggestions: create.asyncThunk(
      async (_, { rejectWithValue }) => {
        const response = await fetch(`/api/address/city-zip`)
        const result = await response.json()

        if (!response.ok) {
          return rejectWithValue(
            result.message || 'Failed to fetch city-zip suggestions',
          )
        }

        return result as AddressCityZip[]
      },
      {
        pending: (state: AddressInitialState) => {
          state.isLoading = true
          state.error = undefined
        },
        fulfilled: (state: AddressInitialState, action) => {
          state.isLoading = false
          state.addressesCityZip = action.payload
        },
        rejected: (state: AddressInitialState, action) => {
          state.isLoading = false
          state.error = action.payload as string
        },
      },
    ),
  }),

  selectors: {
    address_state: (state: AddressInitialState) => state,
  },
})

export const addressSliceAction = addressSlice.actions
export const addressSliceSelectors = addressSlice.selectors