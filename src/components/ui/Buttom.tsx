import { ButtonHTMLAttributes, ReactNode } from "react";

interface IProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  width?: "w-full" | "w-fit";
  children?: ReactNode;
}
const Button = ({ className, children, width = "w-full", ...Rest }: IProps) => {
  return (
    <>
      <button
        className={`${className} ${width}   p-2 rounded-md text-white font-bold flex items-center justify-center space-x-1 disabled:bg-gray-500  disabled:hover:bg-gray-500`}
        {...Rest}
      >
        {children}
      </button>
    </>
  );
};
export default Button;
