import { useNavigate } from 'react-router-dom'
import { PageWrapper, CardsContainer } from './styles'
import ToolCard from 'components/ToolCard/ToolCard'
import { useAppDispatch, useAppSelector } from 'store/hooks'
import {
  toolSliceAction,
  toolSliceSelectors,
} from 'store/redux/toolSlice/toolSlice'
import { useEffect } from 'react'

function MyAdvert() {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const { userTools, isLoading, error } = useAppSelector(
    toolSliceSelectors.userTools_data,
  )

  useEffect(() => {
    dispatch(toolSliceAction.fetchUserTools())
  }, [dispatch])

  const userToolCards = userTools.map(tool => (
    <ToolCard
      id={tool.id}
      key={tool.id}
      imageUrls={tool.imageUrls}
      title={tool.title}
      price={tool.price}
      status={tool.status}
      description={tool.description}
      isMyAdvert
    />
  ))

  return (
    <PageWrapper>
      <CardsContainer>{userToolCards}</CardsContainer>
    </PageWrapper>
  )
}

export default MyAdvert
