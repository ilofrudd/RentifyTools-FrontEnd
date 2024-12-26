export enum SIGNUP_FORM_NAMES {
  FIRST_NAME = 'firstname',
  LAST_NAME = 'lastname',
  PHONE = 'phone',
  COUNTRY = 'country',
  ZIPCODE = 'zipCode',
  CITY = 'city',
  STREET = 'street',
}

export interface SignUpFormProps {
  onSwitchToSignIn: () => void
  onRegistrationSuccess: () => void
}
