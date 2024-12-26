import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from 'store/hooks'
import {
  toolSliceAction,
  toolSliceSelectors,
} from 'store/redux/toolSlice/toolSlice'
import {
  categorySliceAction,
  categorySliceSelectors,
} from 'store/redux/categorySlice/categorySlice'
import ToolCard from 'components/ToolCard/ToolCard'
import {
  PageTitle,
  PageWrapper,
  PageContainer,
  CategoryImg,
  ImageTitle,
  ImageWrapper,
  CategoryContainer,
  CardsContainer,
  TextContainer,
  BackButtonControl,
  LoaderWrapper,
} from './styles'
import Button from 'components/Button/Button'
import { CircularProgress } from '@mui/material'
import { colors } from 'styles/colors'

function Home() {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const [selectCategory, setSelectCategory] = useState<number | null>(null)
  const { tools, isCategoryLoading } = useAppSelector(
    toolSliceSelectors.tools_data,
  )

  const {
    categories,
    error,
    isLoading: isCategoriesLoading,
  } = useAppSelector(categorySliceSelectors.categories_data)

  useEffect(() => {
    dispatch(categorySliceAction.fetchCategories())
    dispatch(toolSliceAction.fetchTools())
  }, [dispatch])

  const handleCategory = (categoryId: number) => {
    setSelectCategory(categoryId)
    dispatch(toolSliceAction.fetchToolsByCategory(categoryId))
  }

  const handleBack = () => {
    setSelectCategory(null)
    dispatch(toolSliceAction.fetchTools())
  }

  const imageContainers = categories.map(category => (
    <ImageWrapper key={category.id} onClick={() => handleCategory(category.id)}>
      <CategoryImg>
        <img src={category.image} alt={category.title} />
      </CategoryImg>
      <ImageTitle>{category.title}</ImageTitle>
    </ImageWrapper>
  ))

  const toolCards = tools.map(tool => (
    <ToolCard
      id={tool.id}
      key={tool.id}
      imageUrls={tool.imageUrls}
      title={tool.title}
      price={tool.price}
      description={tool.description}
      status={tool.status}
    />
  ))

  return (
    <PageWrapper>
      {selectCategory ? (
        <>
          <PageTitle>
            {categories.find(category => category.id === selectCategory)?.title}
          </PageTitle>
          <BackButtonControl>
            <Button name="Back" onClick={handleBack} />
          </BackButtonControl>
          {isCategoryLoading ? (
            <LoaderWrapper>
              <CircularProgress sx={{ color: colors.WHITE }} />{' '}
            </LoaderWrapper>
          ) : tools.length > 0 ? (
            <CardsContainer>{toolCards}</CardsContainer>
          ) : (
            <TextContainer>No tools available in this category.</TextContainer>
          )}
        </>
      ) : (
        <>
          {isCategoriesLoading ? (
            <LoaderWrapper>
              <CircularProgress sx={{ color: colors.WHITE }} />
            </LoaderWrapper>
          ) : (
            <CategoryContainer>
              <PageTitle>RentifyTools Categories</PageTitle>
              <PageContainer>{imageContainers}</PageContainer>
            </CategoryContainer>
          )}
          <TextContainer>Last Adverts</TextContainer>
          <CardsContainer>{toolCards}</CardsContainer>
        </>
      )}
    </PageWrapper>
  )
}

export default Home
