import { FormProvider, useForm } from 'react-hook-form'
import './../css/form.css'
import { Link } from 'react-router-dom'
import PasswordField from '../components/PasswordField'

type Inputs = {
  name: string
  email: string
  password: string
}

type SignInProps = {
  signIn: (input: User) => void
}

function SignIn({ signIn }: SignInProps) {
  const formMethods = useForm<Inputs>()

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = formMethods

  watch('email')

  return (
    <div className="form-container">
      <h2>Sign in</h2>
      <FormProvider {...formMethods}>
        <form className="form" onSubmit={handleSubmit((data) => signIn(data))}>
          <div>
            <label>email:</label>
            <input
              placeholder="enter your email"
              type="email"
              {...register('email', { required: 'Email is required' })}
            />
            {errors.email && <span>{errors.email.message}</span>}
          </div>
          <PasswordField />
          <div>
            <input type="submit" />
          </div>
        </form>
      </FormProvider>
      <div className="link-container">
        <Link to="/signup">
          <p className="link-text">Create an account</p>
        </Link>
      </div>
    </div>
  )
}

export default SignIn
