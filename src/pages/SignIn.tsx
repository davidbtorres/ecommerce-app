import { useForm, SubmitHandler } from 'react-hook-form'
import './../css/form.css'
import { Link } from 'react-router-dom'

type Inputs = {
  email: string
  emailRequired: string
}

function SignIn() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>()
  const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data)

  console.log(watch('email')) // watch input value by passing the name of it

  return (
    <div className="form-container">
      <form className="form" onSubmit={handleSubmit(onSubmit)}>
        {/* register your input into the hook by invoking the "register" function */}
        <input defaultValue="enter an email" {...register('email')} />

        {/* include validation with required or other standard HTML validation rules */}
        <input {...register('emailRequired', { required: true })} />
        {/* errors will return when field validation fails  */}
        {errors.emailRequired && <span>This field is required</span>}

        <input type="submit" />
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
