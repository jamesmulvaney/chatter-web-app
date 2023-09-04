import React from "react";
import { Modal } from "flowbite-react";
import { Session } from "next-auth";
import NewChatForm from "./NewChatForm";

type NewChatModalProps = {
  session: Session;
  modalIsOpen: boolean;
  setModalIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

function NewChatModal({
  session,
  modalIsOpen,
  setModalIsOpen,
}: NewChatModalProps) {
  return (
    <Modal
      dismissible={true}
      show={modalIsOpen}
      onClose={() => setModalIsOpen(false)}
    >
      <Modal.Header className="dark:bg-gray-800">Start a New Chat</Modal.Header>
      <Modal.Body className="dark:bg-gray-800">
        <div className="space-y-6">
          <p className="text-base leading-relaxed text-gray-700 dark:text-white">
            Who would you like to start a chat with?
          </p>
          <NewChatForm session={session} />
        </div>
      </Modal.Body>
      <Modal.Footer className="dark:bg-gray-800"></Modal.Footer>
    </Modal>
  );
}

export default NewChatModal;
