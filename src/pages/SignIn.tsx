import { useForm, SubmitHandler } from 'react-hook-form'
import './../css/form.css'
import { Link } from 'react-router-dom'

type Inputs = {
  name: string
  email: string
  password: string
  emailRequired: string
}

type SignUpProps = {
  signIn: (input: User) => void
}

function SignIn({ signIn }: SignUpProps) {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>()
  const onSubmit: SubmitHandler<Inputs> = (data) => signIn(data)

  watch('email')

  return (
    <div className="form-container">
      <h2>Sign in</h2>
      <form className="form" onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label>email:</label>
          <input
            defaultValue="enter your email"
            type="email"
            {...register('email', { required: true })}
          />
          {errors.email && <span>This field is required</span>}
        </div>
        <div>
          <label>password:</label>
          <input
            type="password"
            {...register('password', { required: true })}
          />
          {errors.password && <span>This field is required</span>}
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
