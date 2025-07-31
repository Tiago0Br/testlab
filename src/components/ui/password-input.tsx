'use client'

import { EyeIcon, EyeOffIcon } from 'lucide-react'
import { forwardRef, useState } from 'react'
import { Input } from './input'

export interface PasswordInputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const PasswordInput = forwardRef<HTMLInputElement, PasswordInputProps>(
  ({ className, ...props }, ref) => {
    const [showPassword, setShowPassword] = useState(false)

    return (
      <div className="relative">
        <Input
          type={showPassword ? 'text' : 'password'}
          className={className}
          ref={ref}
          {...props}
        />
        <button
          type="button"
          className="absolute right-2 top-1/2 transform -translate-y-1/2"
          onClick={() => setShowPassword((state) => !state)}
        >
          {showPassword ? (
            <EyeOffIcon className="text-muted-foreground" />
          ) : (
            <EyeIcon className="text-muted-foreground" />
          )}
        </button>
      </div>
    )
  }
)
PasswordInput.displayName = 'PasswordInput'

export { PasswordInput }
