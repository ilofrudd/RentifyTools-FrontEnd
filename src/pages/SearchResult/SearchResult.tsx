import { useAppSelector } from 'store/hooks'
import ToolCard from 'components/ToolCard/ToolCard'
import { toolSliceSelectors } from 'store/redux/toolSlice/toolSlice'
import { useLocation } from 'react-router-dom'
import Switch from '@mui/material/Switch'
import { colors } from 'styles/colors'
import {
  PageWrapper,
  CardsContainer,
  TextContainer,
  SwitchContainer,
  SwitchContainerText,
} from './styles'
import { useState } from 'react'

function SearchResults() {
  const location = useLocation()
  const { tools, isLoading, error } = useAppSelector(
    toolSliceSelectors.tools_data,
  )
  const [showAvailableOnly, setShowAvailableOnly] = useState(false)

  const handleSwitchChange = (event: {
    target: { checked: boolean | ((prevState: boolean) => boolean) }
  }) => {
    setShowAvailableOnly(event.target.checked)
  }

  const filteredCards = showAvailableOnly
    ? tools.filter(card => card.status === 'AVAILABLE')
    : tools

  const searchTerm = location.state?.searchTerm || ''


  return (
    <PageWrapper>
      <TextContainer>Search Results:</TextContainer>
      <SwitchContainer>
        <SwitchContainerText>All</SwitchContainerText>
        <Switch
          checked={showAvailableOnly}
          onChange={handleSwitchChange}
          inputProps={{ 'aria-label': 'Show available only' }}
          sx={{
            color: colors.BUTTON,
            '& .MuiSwitch-switchBase.Mui-checked': {
              color: colors.BUTTON,
            },
            '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
              backgroundColor: colors.BUTTON,
            },
          }}
        />
        <SwitchContainerText>Available</SwitchContainerText>
      </SwitchContainer>
      <CardsContainer>
        {filteredCards.length > 0 ? (
          filteredCards.map(tool => (
            <ToolCard
              id={tool.id}
              key={tool.id}
              imageUrls={tool.imageUrls}
              title={tool.title}
              price={tool.price}
              status={tool.status}
              description={tool.description}
            />
          ))
        ) : (
          <TextContainer>No tools found</TextContainer>
        )}
      </CardsContainer>
    </PageWrapper>
  )
}

export default SearchResults
