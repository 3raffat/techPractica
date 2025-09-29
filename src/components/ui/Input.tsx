import { InputHTMLAttributes, forwardRef } from "react";

interface IProps extends InputHTMLAttributes<HTMLInputElement> {
  errorStyle?: boolean;
}

const Inputs = forwardRef<HTMLInputElement, IProps>(
  ({ errorStyle, ...rest }, ref) => {
    return (
      <input
        ref={ref}
        className="w-full px-4 py-3 border border-gray-400 rounded-xl focus:ring-2 focus:ring-[#42D5AE] focus:border-transparent outline-none transition-all"
        {...rest}
      />
    );
  }
);

export default Inputs;
