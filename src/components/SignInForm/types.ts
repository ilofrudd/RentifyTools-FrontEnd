export enum SIGNIN_FORM_NAMES {
  EMAIL = 'email',
  PASSWORD = 'password',
  REPEAT_PASSWORD = 'repeatPassword',
}
export interface SignInFormProps {
  isSignInMode: boolean
  onSwitchToSignUp: () => void
  onSwitchToSignIn: () => void
}
export interface VariantType {
  variant: 'error' | 'default' | 'success' | 'warning' | 'info'
}
