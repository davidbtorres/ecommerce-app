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
  addUser: (input: User) => void
}

function SignUp({ addUser }: SignUpProps) {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>()
  const onSubmit: SubmitHandler<Inputs> = (data) => addUser(data)

  watch('email')

  return (
    <div className="form-container">
      <h2>Create new account</h2>
      <form className="form" onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label>name:</label>
          <input
            defaultValue="enter a name"
            {...register('name', { required: true })}
          />
          {errors.name && <span>This field is required</span>}
        </div>
        <div>
          <label>email:</label>
          <input
            defaultValue="enter an email"
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
        <Link to="/signin">
          <p className="link-text">Already have an account?</p>
        </Link>
      </div>
    </div>
  )
}

export default SignUp
