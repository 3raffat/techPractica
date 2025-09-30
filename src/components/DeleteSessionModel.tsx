import { Button } from "../imports";

interface IProps {
  OpenDeleteModal: boolean;
  closeDeleteModal: () => void;
  onSubmitRemoveSession: () => void;
}
const DeleteSessionModel = ({
  OpenDeleteModal,
  closeDeleteModal,
  onSubmitRemoveSession,
}: IProps) => {
  return (
    <>
      {OpenDeleteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-xl">
            <h2 className="text-xl font-semibold text-gray-900">
              Remove Session
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              Are you sure you want to remove this session? This action cannot
              be undone.
            </p>

            <div className="mt-6 flex gap-3">
              <Button
                onClick={() => {
                  onSubmitRemoveSession();
                }}
                className="flex-1 bg-[#42D5AE] hover:bg-[#38b28d] text-white font-medium transition-colors duration-200"
              >
                Yes, remove
              </Button>
              <Button
                onClick={() => {
                  closeDeleteModal();
                }}
                className="flex-1 bg-white border border-gray-300 text-[#022639]! hover:bg-gray-50 font-medium transition-colors duration-200"
                type="button"
              >
                No
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
export default DeleteSessionModel;
