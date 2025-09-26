import { PiWarningCircleBold } from "react-icons/pi";

interface IProps {
  Msg?: string | undefined;
}
const ErrorMsg = ({ Msg }: IProps) => {
  return Msg ? (
    <div className="flex flex-row items-center text-red-500  px-2">
      <PiWarningCircleBold />
      <span className="block text-red-500 px-0.5  font-semibold text-sm">
        {Msg}
      </span>
    </div>
  ) : null;
};
export default ErrorMsg;
