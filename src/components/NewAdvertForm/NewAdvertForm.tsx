import { ChangeEvent, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { useSnackbar } from 'notistack'

import { useAppDispatch, useAppSelector } from 'store/hooks'
import {
  toolSliceAction,
  toolSliceSelectors,
} from 'store/redux/toolSlice/toolSlice'
import {
  categorySliceAction,
  categorySliceSelectors,
} from 'store/redux/categorySlice/categorySlice'

import Input from 'components/Input/Input'
import Button from 'components/Button/Button'

import {
  NewAdvertFormContainer,
  Title,
  InputsContainer,
  InputLabel,
  DescriptionContainer,
  ImagePreviewContainer,
  ButtonControlWrapper,
} from './styles'
import { NEWADVERT_FORM_NAMES } from './types'
import { ToolRequestDto } from 'store/redux/toolSlice/types'
import ImagePreviewList from './ImagePrevievList'
import { Select, MenuItem, FormControl } from '@mui/material'
import { colors } from 'styles/colors'
import { TOOLS_APP_ROUTES } from 'constants/routes'

function NewAdvertForm() {
  const [localImages, setLocalImages] = useState<File[]>([])
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const { enqueueSnackbar } = useSnackbar()

  const { isLoading } = useAppSelector(toolSliceSelectors.tools_data)
  const { categories } = useAppSelector(categorySliceSelectors.categories_data)

  useEffect(() => {
    dispatch(categorySliceAction.fetchCategories())
  }, [dispatch])

  const handleAddImages = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const files = Array.from(event.target.files)
      const validFiles = files.filter(file => file.size <= 10 * 1024 * 1024)
      if (validFiles.length < files.length) {
        alert('Some files are too large and were not added.')
      }
      setLocalImages(prev => [...prev, ...validFiles])
    }
  }

  const handleRemoveImage = (index: number) => {
    setLocalImages(prev => prev.filter((_, i) => i !== index))
  }

  const uploadImages = async (): Promise<string[]> => {
    if (localImages.length === 0) return []
    try {
      const resultAction = await dispatch(
        toolSliceAction.uploadImage(localImages),
      )
      if (toolSliceAction.uploadImage.fulfilled.match(resultAction)) {
        return resultAction.payload
      } else {
        console.error('Image upload failed:', resultAction.error)
        return []
      }
    } catch (error) {
      console.error('Image upload error:', error)
      return []
    }
  }

  const formik = useFormik<ToolRequestDto>({
    initialValues: {
      [NEWADVERT_FORM_NAMES.TITLE]: '',
      [NEWADVERT_FORM_NAMES.DESCRIPTION]: '',
      [NEWADVERT_FORM_NAMES.STATUS]: 'AVAILABLE',
      [NEWADVERT_FORM_NAMES.IMAGE_URLS]: [] as string[],
      [NEWADVERT_FORM_NAMES.PRICE]: '',
      [NEWADVERT_FORM_NAMES.CATEGORY_IDS]: [] as number[],
    },
    validationSchema: Yup.object({
      [NEWADVERT_FORM_NAMES.TITLE]: Yup.string()
        .required('Title is required')
        .min(2, 'Minimum 2 characters')
        .max(50, 'Maximum 50 characters'),
      [NEWADVERT_FORM_NAMES.PRICE]: Yup.number()
        .required('Price is required')
        .min(0, 'Price must be at least 0')
        .max(500000, 'Price cannot exceed 500,000'),
      [NEWADVERT_FORM_NAMES.DESCRIPTION]: Yup.string()
        .required('Description is required')
        .min(5, 'Minimum 5 characters')
        .max(2000, 'Maximum 2000 characters'),
      [NEWADVERT_FORM_NAMES.CATEGORY_IDS]: Yup.array()
        .of(Yup.number())
        .min(1, 'At least one category must be selected'),
    }),
    validateOnChange: false,
    onSubmit: async values => {
      console.log('Submitting form:', values)
      try {
        const uploadedUrls = await uploadImages()
        const result = await dispatch(
          toolSliceAction.createTool({
            ...values,
            imageUrls: uploadedUrls,
          }),
        )

        if (toolSliceAction.createTool.fulfilled.match(result)) {
          enqueueSnackbar('Advert created successfully !', {
            variant: 'success',
          })
          formik.resetForm()
          navigate(TOOLS_APP_ROUTES.MY_ADVERTS)
        } else {
          enqueueSnackbar('Failed to create advert', { variant: 'error' })
        }
      } catch (error) {
        console.error('Submission error:', error)
      }
    },
  })

  return (
    <NewAdvertFormContainer onSubmit={formik.handleSubmit}>
      <Title>Create New Advert</Title>
      <InputsContainer>
        <Input
          id="advert-title"
          label="Title"
          name={NEWADVERT_FORM_NAMES.TITLE}
          type="text"
          value={formik.values.title}
          onChange={formik.handleChange}
          error={formik.errors.title}
        />
        <Input
          id="advert-price"
          label="Price (USD)"
          name={NEWADVERT_FORM_NAMES.PRICE}
          type="number"
          value={formik.values.price}
          onChange={formik.handleChange}
          error={formik.errors.price}
        />
        <FormControl fullWidth>
          <InputLabel>Categories</InputLabel>
          <Select
            id="categories"
            multiple
            value={formik.values.categoryIds}
            onChange={event =>
              formik.setFieldValue(
                NEWADVERT_FORM_NAMES.CATEGORY_IDS,
                event.target.value,
              )
            }
            name={NEWADVERT_FORM_NAMES.CATEGORY_IDS}
            renderValue={selected =>
              categories
                .filter(category => selected.includes(category.id))
                .map(category => category.title)
                .join(', ')
            }
            sx={{
              fontFamily: 'Inter, sans-serif',
              background: colors.WHITE,
              color: 'black',
              '& .MuiOutlinedInput-notchedOutline': {
                border: 'none',
              },
              '&:hover .MuiOutlinedInput-notchedOutline': {
                border: 'none',
              },
              '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                border: 'none',
              },
            }}
          >
            {categories.map(category => (
              <MenuItem key={category.id} value={category.id}>
                {category.title}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <InputLabel>Description</InputLabel>
        <DescriptionContainer
          id="advert-description"
          name={NEWADVERT_FORM_NAMES.DESCRIPTION}
          value={formik.values.description}
          onChange={formik.handleChange}
        />
      </InputsContainer>
      {localImages.length > 0 && (
        <ImagePreviewContainer>
          <ImagePreviewList images={localImages} onRemove={handleRemoveImage} />
        </ImagePreviewContainer>
      )}
      <ButtonControlWrapper>
        <input
          type="file"
          id="image-upload"
          style={{ display: 'none' }}
          accept="image/*"
          multiple
          onChange={handleAddImages}
        />
        <Button
          type="button"
          name="Add Photos"
          onClick={() => document.getElementById('image-upload')?.click()}
        />
        <Button
          type="submit"
          name={isLoading ? 'Creating...' : 'Create Advert'}
          disabled={isLoading}
        />
      </ButtonControlWrapper>
    </NewAdvertFormContainer>
  )
}

export default NewAdvertForm
