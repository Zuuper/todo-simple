import { ComponentProps } from "react";

export interface ChipsProps extends ComponentProps<'div'> {
  title: string
}
export const Chip: React.FC<ChipsProps> = ({ title, ...rest }) => {
  return <div className="p-2 text-xs font-semibold rounded-full bg-orange-200 text-slate-900" {...rest}>
    {title}
  </div>

}