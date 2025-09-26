import { InputHTMLAttributes, forwardRef } from "react";

interface IProps extends InputHTMLAttributes<HTMLInputElement> {
  errorStyle?: boolean;
}

const Inputs = forwardRef<HTMLInputElement, IProps>(
  ({ errorStyle, ...rest }, ref) => {
    return (
      <input
        ref={ref}
        className="w-full px-4 py-3 text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#42D5AE] focus:border-transparent transition-colors duration-200"
        {...rest}
      />
    );
  }
);

export default Inputs;
