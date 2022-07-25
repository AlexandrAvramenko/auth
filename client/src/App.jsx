import { AppBar, Box, Link, Toolbar, Typography, Button } from '@mui/material/'
import AppRoutes from './AppRoutes'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { checkAuth, signOut } from './actions/user'

function App() {
  const dispatch = useDispatch()
  const isAuth = useSelector((state) => state.user.isAuth)

  useEffect(() => {
    if (localStorage.getItem('token')) {
      dispatch(checkAuth())
    }
  }, [dispatch])

  return (
    <>
      <AppBar position="static" color="default">
        <Toolbar>
          <Box sx={{ flexGrow: 1 }}>
            <Link href="/" underline="hover">
              <Typography variant="h6" component="span">
                MyLogo
              </Typography>
            </Link>
          </Box>
          {isAuth ? (
            <Box>
              <Button
                href="/sign-in"
                onClick={() => dispatch(signOut())}
                variant="outlined"
                sx={{ my: 1, mx: 0.5 }}
              >
                Sign out
              </Button>
            </Box>
          ) : (
            <Box>
              <Button
                href="/sign-in"
                variant="outlined"
                sx={{ my: 1, mx: 1.5 }}
              >
                Sign In
              </Button>
              <Button
                href="/sign-up"
                variant="outlined"
                sx={{ my: 1, mx: 0.5 }}
              >
                Sign Up
              </Button>
            </Box>
          )}
        </Toolbar>
      </AppBar>
      <AppRoutes />
    </>
  )
}

export default App
