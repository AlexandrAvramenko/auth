import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
// import { styled } from '@mui/material/styles'

// const Wrapper = styled('div')`
//     display: flex;
//     justify-content: center;
//     align-items: center;
//     margin-top: 5rem;
// `

const Home = () => {
  return (
    <Container>
      <Typography variant="h3" component="div" sx={{ textAlign: 'center', marginTop: "5rem" }}>
        Home page
      </Typography>
    </Container>
  )
}

export default Home
