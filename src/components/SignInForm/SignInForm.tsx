import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { useSnackbar } from 'notistack'

import { useAppDispatch, useAppSelector } from 'store/hooks'
import {
  loginSliceAction,
  loginSliceSelectors,
} from 'store/redux/loginSlice/loginSlice'

import Input from 'components/Input/Input'
import Button from 'components/Button/Button'
import { ButtonControl } from 'components/SignUpForm/styles'
import { TOOLS_APP_ROUTES } from 'constants/routes'

import {
  SignInFormContainer,
  Title,
  Text,
  InputsContainer,
  TitleContainer,
} from './styles'
import { SIGNIN_FORM_NAMES, SignInFormProps } from './types'

function SignInForm({
  isSignInMode,
  onSwitchToSignUp,
  onSwitchToSignIn,
}: SignInFormProps) {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const { user, isLoading } = useAppSelector(loginSliceSelectors.login_user)
  const { enqueueSnackbar } = useSnackbar()

  const validationSchema = Yup.object({
    [SIGNIN_FORM_NAMES.EMAIL]: Yup.string()
      .email('Invalid email address')
      .required('Email is required'),
    [SIGNIN_FORM_NAMES.PASSWORD]: Yup.string()
      .required('Password is required')
      .min(6, 'Password must be at least 6 characters'),
    ...(!isSignInMode && {
      [SIGNIN_FORM_NAMES.REPEAT_PASSWORD]: Yup.string()
        .required('Confirm your password')
        .oneOf([Yup.ref(SIGNIN_FORM_NAMES.PASSWORD)], 'Passwords must match'),
    }),
  })

  const formik = useFormik({
    initialValues: {
      [SIGNIN_FORM_NAMES.EMAIL]: '',
      [SIGNIN_FORM_NAMES.PASSWORD]: '',
      ...(!isSignInMode && { [SIGNIN_FORM_NAMES.REPEAT_PASSWORD]: '' }),
    },
    validationSchema: validationSchema,
    validateOnChange: false,
    onSubmit: (values, helpers) => {
      if (isSignInMode) {
        console.log(values)
        dispatch(loginSliceAction.loginUser(values))
          .unwrap()
          .then(() => {
            dispatch(loginSliceAction.getCurrentUser())
            console.log(user)
            enqueueSnackbar('Login successful !', { variant: 'success' })
            setTimeout(() => {
              helpers.resetForm()
              navigate(TOOLS_APP_ROUTES.HOME)
            }, 2000)
          })
          .catch(error => {
            enqueueSnackbar(error, { variant: 'error' })
            helpers.resetForm()
          })
      } else {
        dispatch(loginSliceAction.checkEmail(values))
          .unwrap()
          .then(() => {
            enqueueSnackbar('Email is available', { variant: 'success' })
            setTimeout(() => {
              onSwitchToSignUp()
            }, 2000)
          })
          .catch(error => enqueueSnackbar(error, { variant: 'error' }))
      }
    },
  })

  useEffect(() => {
    formik.resetForm()
  }, [isSignInMode])

  return (
    <SignInFormContainer onSubmit={formik.handleSubmit} noValidate>
      <TitleContainer>
        <Title isActive={isSignInMode} onClick={onSwitchToSignIn}>
          Sign In
        </Title>
        <Title isActive={!isSignInMode} onClick={onSwitchToSignUp}>
          Sign Up
        </Title>
      </TitleContainer>
      <InputsContainer>
        <Input
          id="signinform-email"
          label="Email:"
          name={SIGNIN_FORM_NAMES.EMAIL}
          type="email"
          value={formik.values.email}
          onChange={formik.handleChange}
          error={formik.errors.email}
        />
        <Input
          id="signinform-password"
          label="Password:"
          name={SIGNIN_FORM_NAMES.PASSWORD}
          type="password"
          value={formik.values.password}
          onChange={formik.handleChange}
          error={formik.errors.password}
        />
        {!isSignInMode && (
          <Input
            id="signupform-repeat_password"
            label="Repeat password:"
            name={SIGNIN_FORM_NAMES.REPEAT_PASSWORD}
            type="password"
            value={formik.values.repeatPassword}
            onChange={formik.handleChange}
            error={formik.errors.repeatPassword}
          />
        )}
      </InputsContainer>
      {!isSignInMode && <Text>Step 1 of 2</Text>}
      <ButtonControl>
        <Button
          type="submit"
          name={isSignInMode ? 'Sign In' : 'Next'}
          disabled={isLoading}
        />
      </ButtonControl>
      <Text>
        {' '}
        {isSignInMode
          ? 'By signing in, you agree to our Terms of Service'
          : 'By signing up, you accept our Terms and Conditions and acknowledge our Privacy Policy'}
      </Text>
    </SignInFormContainer>
  )
}
export default SignInForm
