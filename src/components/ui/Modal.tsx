import {
  Dialog,
  DialogTitle,
  DialogPanel,
  Transition,
  TransitionChild,
} from "@headlessui/react";
import { Fragment, ReactNode } from "react";

interface IProps {
  isOpen: boolean;
  closeModal?: () => void;
  title?: string;
  description?: string;
  children: ReactNode;
  Position?: string;
}

const Modal = ({
  isOpen,
  title,
  description,
  children,
  closeModal = () => {},
  Position = "flex min-h-full  items-center justify-center p-4 text-center overflow-visible  ",
}: IProps) => {
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50 w-100" onClose={closeModal}>
        <div className="fixed inset-0 backdrop-blur-xs" aria-hidden="true" />
        <TransitionChild
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-opacity-25" aria-hidden="true" />
        </TransitionChild>

        <div className="fixed inset-0 overflow-y-auto overflow-x-visible">
          <div className={Position}>
            <TransitionChild
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <DialogPanel className="w-full max-w-2xl transform overflow-visible rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                {title && (
                  <DialogTitle
                    as="h3"
                    className="text-lg font-semibold text-gray-900"
                  >
                    {title}
                  </DialogTitle>
                )}
                {description && (
                  <p className="mt-2 text-sm text-gray-500">{description}</p>
                )}

                <div className="mt-4">{children}</div>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default Modal;
