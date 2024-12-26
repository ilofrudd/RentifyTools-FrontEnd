export interface AddressInitialState {
  addresses: Address[]
  addressesCityZip: AddressCityZip[]
  addressObj?: Address
  isLoading: boolean
  error: string | undefined
}

export interface AddressCityZip {
  city: string
  zipCode: string
}
export interface Address {
  country: string
  zipCode: string
  city: string
  street: string
}