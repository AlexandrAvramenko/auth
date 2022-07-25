import { Container, Box, Paper, Typography, TextField, Button, Link } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { useForm, Controller } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { signIn } from '../actions/user'
import { useNavigate } from "react-router-dom";

const validationSchema = yup.object({
  email: yup.string().email().required(),
  password: yup
    .string()
    .min(4)
    .required('The minimum password length is 4 characters.'),
})

const SignIn = () => {
  const dispatch = useDispatch()
  const isLoading = useSelector((state) => state.user.isLoading)
  let navigate = useNavigate()
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(validationSchema),
  })

  const onSubmit = async (data) => {
    const { email, password } = data
    try {
      dispatch(signIn(email, password))
      navigate("../profile", { replace: true });
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
          Sign In
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
              name="email"
              defaultValue=""
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
              defaultValue=""
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
                disabled={isLoading}
                sx={{ my: 1, mx: 1.5 }}
              >
                Sign In
              </Button>
              <Link href="/sign-up">Don't have an account? Sign up</Link>
            </Box>
          </Box>
        </Paper>
      </Box>
    </Container>
  )
}

export default SignIn
