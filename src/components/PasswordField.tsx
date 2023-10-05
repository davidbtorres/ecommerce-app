import { useFormContext } from 'react-hook-form'

type Inputs = {
  password: string
  emailRequired: string
}

function PasswordField({ checkLength }: { checkLength?: boolean }) {
  const {
    register,
    formState: { errors },
  } = useFormContext<Inputs>()

  return (
    <div>
      <label>password:</label>
      <input
        type="password"
        {...register('password', {
          required: 'Password is required',
          ...(checkLength
            ? {
                minLength: {
                  value: 6,
                  message: 'Password must be at least 6 characters long',
                },
                maxLength: {
                  value: 16,
                  message: 'Password must be no more than 16 characters long',
                },
              }
            : {}),
        })}
      />
      {errors.password && <span>{errors.password.message}</span>}
    </div>
  )
}

export default PasswordField
