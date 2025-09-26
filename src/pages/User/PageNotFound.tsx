import { useNavigate } from "react-router-dom";

export const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4">
      {/* Giant 404 Text */}
      <h1 className="text-[20vw] md:text-[15rem] font-black text-[#022639] leading-none">
        404
      </h1>

      {/* Page Not Found Text */}
      <h2 className="text-2xl md:text-4xl font-bold text-[#022639] mb-8 tracking-wide">
        PAGE NOT FOUND
      </h2>

      {/* Action Button */}
      <button
        onClick={() => navigate("/")}
        className="px-8 py-3 bg-[#42D5AE] hover:bg-[#38b28d] text-white font-bold rounded-lg text-lg transition-colors duration-200 shadow-md"
      >
        Return to Home
      </button>
    </div>
  );
};
export default NotFound;
