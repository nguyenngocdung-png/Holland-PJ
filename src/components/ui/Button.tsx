import type { ButtonHTMLAttributes } from 'react'

type Variant = 'primary' | 'secondary' | 'ghost'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant
  block?: boolean
}

export default function Button({ variant = 'primary', block, className = '', type = 'button', ...rest }: ButtonProps) {
  const cls = ['btn', `btn--${variant}`, block ? 'btn--block' : '', className].filter(Boolean).join(' ')
  return <button type={type} className={cls} {...rest} />
}
