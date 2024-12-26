import { useNavigate } from 'react-router-dom'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { useSnackbar } from 'notistack'

import { useAppDispatch, useAppSelector } from 'store/hooks'
import {
  adminSliceAction,
  adminSliceSelectors,
} from 'store/redux/adminSlice/adminSlice'

import Input from 'components/Input/Input'
import Button from 'components/Button/Button'

import { FINDUSER_FORM_NAMES, FindUsersProps } from './types'

import {
  FindUserFormContainer,
  TitleContainer,
  Title,
  InputsContainer,
  ButtonControl,
} from './styles'

function FindUsersForm({ onSearch }: FindUsersProps) {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const { enqueueSnackbar } = useSnackbar()
  const { isLoading, foundUsers } = useAppSelector(
    adminSliceSelectors.search_users,
  )

  const validationSchema = Yup.object().shape({
    [FINDUSER_FORM_NAMES.LAST_NAME]: Yup.string().max(
      15,
      'Up to 15 characters',
    ),

    [FINDUSER_FORM_NAMES.PHONE]: Yup.string()
      .max(15, 'Up to 15 characters')
      .matches(
        /^\+?[1-9]\d{1,14}$/,
        'Use international format, e.g., +1234567890',
      ),

    [FINDUSER_FORM_NAMES.EMAIL]: Yup.string()
      .max(30, 'Up to 30 characters')
      .matches(
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        'Enter a valid email, e.g., example@mail.com',
      ),
  })

  const formik = useFormik({
    initialValues: {
      [FINDUSER_FORM_NAMES.LAST_NAME]: '',
      [FINDUSER_FORM_NAMES.EMAIL]: '',
      [FINDUSER_FORM_NAMES.PHONE]: '',
    },
    validationSchema: validationSchema,
    validateOnChange: false,
    onSubmit: (values, helpers) => {
      console.log('Sending data:', values)
      dispatch(adminSliceAction.searchUsers(values))
        .unwrap()
        .then(() => {
          console.log(foundUsers)
          if (foundUsers.length) {
            onSearch()
            enqueueSnackbar('User found !', { variant: 'success' })
          } else {
            enqueueSnackbar('No users found!', { variant: 'warning' })
          }

          setTimeout(() => {
            helpers.resetForm()
          }, 2000)
        })
        .catch(() => {
          enqueueSnackbar('Check the input data!', { variant: 'error' })
          helpers.resetForm()
        })
    },
  })

  return (
    <FindUserFormContainer onSubmit={formik.handleSubmit} noValidate>
      <TitleContainer>
        <Title>Find Users</Title>
      </TitleContainer>
      <InputsContainer>
        <Input
          id="searchform-surname"
          label="Last name:"
          name={FINDUSER_FORM_NAMES.LAST_NAME}
          type="text"
          value={formik.values.lastname}
          onChange={formik.handleChange}
          error={formik.errors.lastname}
        />
        <Input
          id="searchform-phone"
          label="Phone:"
          name={FINDUSER_FORM_NAMES.PHONE}
          type="tel"
          value={formik.values.phone}
          onChange={formik.handleChange}
          error={formik.errors.phone}
        />
        <Input
          id="searchform-email"
          label="Email:"
          name={FINDUSER_FORM_NAMES.EMAIL}
          type="email"
          value={formik.values.email}
          onChange={formik.handleChange}
          error={formik.errors.email}
        />
      </InputsContainer>
      <ButtonControl>
        <Button
          type="submit"
          name={isLoading ? 'Searching...' : 'Search'}
          disabled={isLoading}
        />
      </ButtonControl>
    </FindUserFormContainer>
  )
}
export default FindUsersForm
