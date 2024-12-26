import { useFormik } from 'formik'
import * as Yup from 'yup'
import { useAppDispatch, useAppSelector } from 'store/hooks'
import {
  userSliceAction,
  userSliceSelectors,
} from 'store/redux/userSlice/userSlice'
import Input from 'components/Input/Input'
import Button from 'components/Button/Button'
import {
  ChangeUserFormContainer,
  Title,
  InputsContainer,
  ButtonControlWrapper,
  Label,
} from './styles'
import { UserFormValues } from './types'

import { useNavigate } from 'react-router-dom'
import { UserResponseDto } from 'store/redux/loginSlice/types'

interface ChangeUserFormProps {
  userData: UserResponseDto
  error?: string
}

const ChangeUserForm: React.FC<ChangeUserFormProps> = ({ userData, error }) => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const { isLoading } = useAppSelector(userSliceSelectors.user_data)

  const formik = useFormik<UserFormValues>({
    initialValues: {
      firstname: userData?.firstname || '',
      lastname: userData?.lastname || '',
      email: userData?.email || '',
      password: '',
      phone: userData?.phone || '',
    },
    enableReinitialize: true,
    validationSchema: Yup.object().shape({
      firstname: Yup.string()

        .required('First name is required')
        .min(2, 'First name is required')
        .max(30, 'First name can be a maximum of 30 characters long'),
      lastname: Yup.string()
        .required('Last name is required')
        .min(2, 'Last name must be at least 2 characters long')
        .max(30, 'Last name can be a maximum of 30 characters long'),
      email: Yup.string()
        .required('Email is required')
        .email('Invalid email format'),
      password: Yup.string()
        .min(6, 'Password must be at least 6 characters long')
        .max(30, 'Password can be a maximum of 30 characters long'),
      phone: Yup.string().matches(
        /^\+?[0-9\s]*$/,
        'Phone number must be valid (digits and optional "+" sign)',
      ),
    }),
    onSubmit: async values => {
      try {
        const result = await dispatch(
          userSliceAction.updateUser({
            userId: userData.id,
            userData: values,
          }),
        )
        console.log('formV', userData.id, values)

        if (userSliceAction.updateUser.fulfilled.match(result)) {
          navigate('/profile/change-user')
        } else {
          console.error('Update fehlgeschlagen:', result.error)
        }
      } catch (error) {
        console.error('Fehler beim Absenden:', error)
      }
    },
  })

  return (
    <ChangeUserFormContainer onSubmit={formik.handleSubmit}>
      <Title>Profil bearbeiten</Title>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <InputsContainer>
        <InputsContainer>
          <Label>Firstname:</Label>
          <Input
            id="editform-firstname"
            name="firstname"
            type="text"
            value={formik.values.firstname}
            onChange={formik.handleChange}
            error={formik.errors.firstname}
          />
        </InputsContainer>

        <InputsContainer>
          <Label>Lastname:</Label>
          <Input
            id="editform-lastname"
            name="lastname"
            type="text"
            value={formik.values.lastname}
            onChange={formik.handleChange}
            error={formik.errors.lastname}
          />
        </InputsContainer>

        <InputsContainer>
          <Label>E-Mail:</Label>
          <Input
            id="editform-email"
            name="email"
            type="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            error={formik.errors.email}
          />
        </InputsContainer>

        <InputsContainer>
          <Label>Password:</Label>
          <Input
            id="editform-password"
            name="password"
            type="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            error={formik.errors.password}
          />
        </InputsContainer>

        <InputsContainer>
          <Label>Phone:</Label>
          <Input
            id="editform-phone"
            name="phone"
            type="text"
            value={formik.values.phone}
            onChange={formik.handleChange}
            error={formik.errors.phone}
          />
        </InputsContainer>
      </InputsContainer>

      <ButtonControlWrapper>
        <Button
          type="submit"
          name={isLoading ? 'Updating...' : 'Update profile'}
          disabled={isLoading}
        />
      </ButtonControlWrapper>
    </ChangeUserFormContainer>
  )
}

export default ChangeUserForm
