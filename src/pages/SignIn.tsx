import { useForm } from 'react-hook-form'
import './../css/form.css'
import { Link } from 'react-router-dom'

type Inputs = {
  name: string
  email: string
  password: string
}

type SignInProps = {
  signIn: (input: User) => void
}

function SignIn({ signIn }: SignInProps) {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>()

  watch('email')

  return (
    <div className="form-container">
      <h2>Sign in</h2>
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
        <div>
          <label>password:</label>
          <input
            type="password"
            {...register('password', { required: 'Password is required' })}
          />
          {errors.password && <span>{errors.password.message}</span>}
        </div>
        <div>
          <input type="submit" />
        </div>
      </form>
      <div className="link-container">
        <Link to="/signup">
          <p className="link-text">Create an account</p>
        </Link>
      </div>
    </div>
  )
}

export default SignIn
