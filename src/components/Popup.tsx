import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { Dialog, DialogPanel } from "@headlessui/react";
import React, { FC } from "react";
import Button from "./Button";

interface PopupProps {
  isOpen: boolean;
  title: string;
  children: React.ReactNode;
  setIsOpen: (isOpen: boolean) => void;
  hideShowButton?: boolean;
}

const Popup: FC<PopupProps> = ({
  isOpen,
  title,
  children,
  setIsOpen,
  hideShowButton = false,
}) => {
  return (
    <Dialog
      open={isOpen}
      onClose={() => setIsOpen(false)}
      transition
      className="fixed inset-0 flex w-screen items-center justify-center bg-black/30 p-4 transition duration-300 ease-out data-closed:opacity-0"
    >
      <DialogPanel className="w-full max-w-[300px] rounded-4xl bg-white">
        <div className="flex w-full items-center justify-between rounded-t-4xl bg-[#F5F5F5] p-[25px]">
          <h2
            className={`text-2xl font-black ${hideShowButton ? "w-full text-center" : ""}`}
          >
            {title}
          </h2>
          {!hideShowButton && (
            <Button icon={faXmark} onClick={() => setIsOpen(false)} />
          )}
        </div>
        <div className="p-5">{children}</div>
      </DialogPanel>
    </Dialog>
  );
};

export default Popup;
