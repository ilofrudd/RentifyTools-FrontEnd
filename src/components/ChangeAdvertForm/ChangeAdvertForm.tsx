import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { useAppDispatch, useAppSelector } from 'store/hooks'
import {
  toolSliceAction,
  toolSliceSelectors,
} from 'store/redux/toolSlice/toolSlice'
import Input from 'components/Input/Input'
import Button from 'components/Button/Button'
import ImagePreviewList from 'components/NewAdvertForm/ImagePrevievList'

import {
  ChangeAdvertFormContainer,
  Title,
  InputsContainer,
  ButtonControlWrapper,
} from './styles'
import { ToolRequestDto } from 'store/redux/toolSlice/types'

function ChangeAdvertForm() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  const { toolObj, isLoading } = useAppSelector(toolSliceSelectors.toolObj_data)

  const [localImages, setLocalImages] = useState<File[]>([])
  const [existingUrls, setExistingUrls] = useState<string[]>([])

  useEffect(() => {
    if (id) {
      dispatch(toolSliceAction.fetchTool(id))
    }
  }, [id, dispatch])

  useEffect(() => {
    if (toolObj?.imageUrls) {
      setExistingUrls(toolObj.imageUrls)
      setLocalImages([])
    }
  }, [toolObj])

  const addLocalImages = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const files = Array.from(event.target.files)
      const validFiles = files.filter(file => file.size <= 10 * 1024 * 1024)
      if (validFiles.length < files.length) {
        alert('Some files are too large and were not added.')
      }
      setLocalImages(prev => [...prev, ...validFiles])
    }
  }

  const removeImage = (index: number) => {
    if (index < localImages.length) {
      setLocalImages(prev => prev.filter((_, i) => i !== index))
    } else {
      const urlIndex = index - localImages.length
      setExistingUrls(prev => prev.filter((_, i) => i !== urlIndex))
    }
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
      console.error('Error uploading images:', error)
      return []
    }
  }

  const formik = useFormik<ToolRequestDto>({
    initialValues: {
      title: toolObj?.title || '',
      description: toolObj?.description || '',
      price: toolObj?.price || '',
      status: toolObj?.status || 'AVAILABLE',
      imageUrls: [],
      categoryIds: [],
    },
    enableReinitialize: true,
    validationSchema: Yup.object().shape({
      title: Yup.string()
        .required('Title is required field')
        .min(2, 'The min title length is 2 characters')
        .max(50, 'The max title length is 50 characters'),
      price: Yup.number()
        .typeError('Price must be a number')
        .required('Price is required field')
        .min(0, 'Price must be at least 0')
        .max(500000, 'Price can not exceed 500,000'),
      description: Yup.string()
        .required('Description is required field')
        .min(5, 'The min description length is 5 characters')
        .max(2000, 'The max description length is 2000 characters'),
    }),
    onSubmit: async values => {
      try {
        const newImageUrls = await uploadImages()
        const allImageUrls = [...existingUrls, ...newImageUrls]

        const updatedTool = {
          ...values,
          imageUrls: allImageUrls,
        }

        const result = await dispatch(
          toolSliceAction.updateTool({
            id: id!,
            ...updatedTool,
          }),
        )

        if (toolSliceAction.updateTool.fulfilled.match(result)) {
          navigate('/profile/my-adverts')
        } else {
          console.error('Update failed:', result.error)
        }
      } catch (error) {
        console.error('Submit error:', error)
      }
    },
  })

  return (
    <ChangeAdvertFormContainer onSubmit={formik.handleSubmit}>
      <Title>Edit Advert</Title>
      <InputsContainer>
        <Input
          id="editform-title"
          label="Title:"
          name="title"
          type="text"
          value={formik.values.title}
          onChange={formik.handleChange}
          error={formik.errors.title}
        />
        <Input
          id="editform-price"
          label="Price (USD):"
          name="price"
          type="number"
          value={formik.values.price}
          onChange={formik.handleChange}
          error={formik.errors.price}
        />
        <Input
          id="editform-description"
          label="Description:"
          name="description"
          type="text"
          value={formik.values.description}
          onChange={formik.handleChange}
          error={formik.errors.description}
        />
      </InputsContainer>
      <ImagePreviewList
        images={[...localImages, ...existingUrls]}
        onRemove={removeImage}
      />
      <ButtonControlWrapper>
        <input
          type="file"
          id="image-upload"
          style={{ display: 'none' }}
          accept="image/*"
          multiple
          onChange={addLocalImages}
        />
        <Button
          type="button"
          name="Add Photos"
          onClick={() => document.getElementById('image-upload')?.click()}
        />
        <Button
          type="submit"
          name={isLoading ? 'Updating...' : 'Update Advert'}
          disabled={isLoading}
        />
      </ButtonControlWrapper>
    </ChangeAdvertFormContainer>
  )
}

export default ChangeAdvertForm
