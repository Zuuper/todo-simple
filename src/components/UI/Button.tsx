import { ComponentProps } from "react";

export interface ButtonProps extends ComponentProps<'button'> { }
export const Button: React.FC<ButtonProps> = ({ ...rest }) => {
  return <button className={`font-semibold h-14 bg-slate-900 text-slate-50 px-4 rounded-lg hover:bg-slate-700 ${rest.className}`} {...rest} />
}

export interface ButtonIconProps extends ComponentProps<'button'> {
  children: React.ReactNode
}
export const ButtonIcon: React.FC<ButtonIconProps> = ({ children, ...rest }) => {
  return <button className="h-8 aspect-square" {...rest}>
    {children}
  </button>
}