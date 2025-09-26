interface PaginatorProps {
  page: number;
  pageCount: number;
  onClickPrev: () => void;
  onClickNext: () => void;
}

const Paginator = ({
  page,
  pageCount,
  onClickPrev,
  onClickNext,
}: PaginatorProps) => {
  return (
    <div className="flex justify-center items-center mt-8 gap-4">
      {/* Previous Button */}
      <button
        type="button"
        className="flex items-center justify-center px-4 h-10 rounded-md  bg-[#42D5AE] hover:bg-[#38b28d] text-[#022639] text-sm font-medium  disabled:bg-gray-300 disabled:text-gray-500 disabled:cursor-not-allowed transition-colors duration-200"
        disabled={page <= 1}
        onClick={onClickPrev}
      >
        <svg
          className="w-4 h-4 mr-2 rtl:rotate-180"
          aria-hidden="true"
          fill="none"
          viewBox="0 0 14 10"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M13 5H1m0 0 4 4M1 5l4-4"
          />
        </svg>
        Previous
      </button>

      {/* Next Button */}
      <button
        type="button"
        className="flex items-center justify-center px-4 h-10 rounded-md  bg-[#42D5AE] text-[#022639] text-sm font-medium hover:bg-[#38b28d] disabled:bg-gray-300 disabled:text-gray-500 disabled:cursor-not-allowed transition-colors duration-200"
        disabled={page >= pageCount}
        onClick={onClickNext}
      >
        Next
        <svg
          className="w-4 h-4 ml-2 rtl:rotate-180"
          aria-hidden="true"
          fill="none"
          viewBox="0 0 14 10"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M1 5h12m0 0L9 1m4 4L9 9"
          />
        </svg>
      </button>
    </div>
  );
};

export default Paginator;
