import { Container, Box, Paper, Typography, TextField, Button, Link } from '@mui/material'
import { useForm, Controller } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { signUp } from '../actions/user'

const validationSchema = yup.object({
  firstName: yup.string().min(3).required('FirstName field is required'),
  lastName: yup.string().min(3).required('LastName field is required'),
  email: yup.string().email().required(),
  password: yup
    .string()
    .min(4)
    .required('The minimum password length is 4 characters.'),
})

const SignUp = () => {
  const dispatch = useDispatch()
  const isLoading = useSelector((state) => state.user.isLoading)
  let navigate = useNavigate()
  //   const auth = useAuth()
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(validationSchema),
  })

  const onSubmit = async (data) => {
    try {
      const { firstName, lastName, email, password } = data
      dispatch(signUp(firstName, lastName, email, password))
      navigate('../profile', { replace: true })
      reset()
    } catch (err) {
      console.log(err.message)
    }
  }

  return (
    <Container maxWidth="sm">
      <Box sx={{ marginTop: '5rem' }}>
        <Typography
          variant="h5"
          component="div"
          sx={{ marginBottom: '0.5rem' }}
        >
          Sign Up
        </Typography>
        <Paper variant="outlined" sx={{ padding: '2rem' }}>
          <Box
            component="form"
            sx={{
              '& .MuiTextField-root': { m: 1, width: '100%' },
            }}
            noValidate
            autoComplete="off"
            onSubmit={handleSubmit(onSubmit)}
          >
            <Controller
              control={control}
              name="firstName"
              defaultValue="First name"
              rules={{ required: true }}
              render={({ field }) => (
                <TextField
                  {...field}
                  error={Boolean(errors.firstName?.message)}
                  fullWidth={true}
                  type="text"
                  label="First name"
                  helperText={errors.firstName?.message}
                />
              )}
            />
            <Controller
              control={control}
              name="lastName"
              defaultValue="Last name"
              rules={{ required: true }}
              render={({ field }) => (
                <TextField
                  {...field}
                  error={Boolean(errors.lastName?.message)}
                  fullWidth={true}
                  type="text"
                  label="Last name"
                  helperText={errors.lastName?.message}
                />
              )}
            />
            <Controller
              control={control}
              name="email"
              defaultValue="test@test.com"
              rules={{ required: true }}
              render={({ field }) => (
                <TextField
                  {...field}
                  error={Boolean(errors.email?.message)}
                  fullWidth={true}
                  type="email"
                  label="Email *"
                  helperText={errors.email?.message}
                />
              )}
            />
            <Controller
              control={control}
              name="password"
              defaultValue="test"
              rules={{ required: true }}
              render={({ field }) => (
                <TextField
                  {...field}
                  error={Boolean(errors.password?.message)}
                  fullWidth={true}
                  type="password"
                  label="Password *"
                  helperText={errors.password?.message}
                />
              )}
            />
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <Button
                variant="contained"
                type="submit"
                sx={{ my: 1, mx: 1.5 }}
                disabled={isLoading}
              >
                Sign Up
              </Button>
              <Link href="/sign-in">Already have an account? Sign in</Link>
            </Box>
          </Box>
        </Paper>
      </Box>
    </Container>
  )
}

export default SignUp
