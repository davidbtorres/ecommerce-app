import { FormProvider, useForm } from 'react-hook-form'
import './../css/form.css'
import { Link } from 'react-router-dom'
import PasswordField from '../components/PasswordField'

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
  const formMethods = useForm<Inputs>()

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = formMethods

  watch('email')

  console.log(watch())

  return (
    <div className="form-container">
      <h2>Create new account</h2>
      <FormProvider {...formMethods}>
        <form className="form" onSubmit={handleSubmit((data) => addUser(data))}>
          <div>
            <label>name:</label>
            <input
              placeholder="enter a name"
              {...register('name', { required: 'Name is required' })}
            />
            {errors.name && <span>{errors.name.message}</span>}
          </div>
          <div>
            <label>email:</label>
            <input
              placeholder="enter an email"
              type="email"
              {...register('email', { required: 'Email is required' })}
            />
            {errors.email && <span>{errors.email.message}</span>}
          </div>
          <PasswordField checkLength={true} />
          <div>
            <input type="submit" />
          </div>
        </form>
      </FormProvider>
      <div className="link-container">
        <Link to="/signin">
          <p className="link-text">Already have an account?</p>
        </Link>
      </div>
    </div>
  )
}

export default SignUp
