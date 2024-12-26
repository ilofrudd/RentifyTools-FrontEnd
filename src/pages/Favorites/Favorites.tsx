import { useAppSelector } from 'store/hooks'
import { PageWrapper, CardsContainer, TextContainer } from './styles'
import ToolCard from 'components/ToolCard/ToolCard'
import { toolSliceSelectors } from 'store/redux/toolSlice/toolSlice'

function Favorites() {
  const { favCards } = useAppSelector(toolSliceSelectors.tools_data)

  if (!favCards || favCards.length === 0) {
    return (
      <PageWrapper>
        <TextContainer>No favorite tools added yet.</TextContainer>
      </PageWrapper>
    )
  }

  return (
    <PageWrapper>
      <CardsContainer>
        {favCards.map(tool => (
          <ToolCard
            id={tool.id}
            key={tool.id}
            imageUrls={tool.imageUrls}
            title={tool.title}
            price={tool.price}
            status={tool.status}
            description={tool.description}
          />
        ))}
      </CardsContainer>
    </PageWrapper>
  )
}

export default Favorites
