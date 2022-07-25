import { Container, Typography } from '@mui/material'
import { useSelector } from 'react-redux'

const Profile = () => {
  const user = useSelector((state) => state.user.user)
  return (
    <Container maxWidth="md">
      <Typography
        variant="h3"
        component="div"
        sx={{ textAlign: 'center', marginTop: '5rem' }}
      >
        Profile: {user.email}
      </Typography>
    </Container>
  )
}

export default Profile
