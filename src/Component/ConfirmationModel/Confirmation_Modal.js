import React from "react";
import { Modal, ModalBody, ModalFooter, Button } from "reactstrap";

const ConfirmationModal = ({ isOpen, toggle, onConfirm }) => {
  return (
    <Modal isOpen={isOpen} toggle={toggle}>
      <ModalBody>Are you sure you want to delete this item?</ModalBody>
      <ModalFooter>
        <Button color="danger" onClick={onConfirm}>
          Delete
        </Button>
        <Button color="secondary" onClick={toggle}>
          Cancel
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default ConfirmationModal;
