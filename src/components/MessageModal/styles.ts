import { colors } from 'styles/colors'

export const modalStyle = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: `${colors.FOOTER}`,
  color: 'white',
  boxShadow: 24,
  border: '2px solid white',
  p: 4,
  borderRadius: 2,
  padding: '16px',
  textAlign: 'center',
}

export const successMessageStyle = {
  fontSize: 20,
  fontWeight: 'bold',
  color: '#4CAF50',
  textShadow: '1px 1px 2px rgba(0, 0, 0, 0.5)',
  padding: '8px',
  borderRadius: '4px',
  display: 'inline-block',
  textAlign: 'center',
}
