import React from "react";
import { Modal, ModalBody, ModalHeader } from "reactstrap";
import moment from "moment";

function View_Warranty(props) {
  const { modal, toggle, warranty } = props;

  const exp_date = warranty ? warranty.exp_date : "N/A";
  const notes = warranty ? warranty.notes : "N/A";

  const formatDate = (inputDate) => {
    return moment(inputDate).format("DD/MM/YYYY");
  };

  const handleClose = () => {
    toggle();
  };

  return (
    <Modal size="lg" isOpen={modal} toggle={toggle}>
      <ModalHeader>View Warranty</ModalHeader>
      <ModalBody>
        <div>
          {warranty ? (
            <table className="table table-bordered">
              <thead className="thead-light">
                <tr>
                  <th style={{ width: "300px" }}>Expiration Date:</th>

                  <td>{formatDate(warranty.exp_date)}</td>
                </tr>
                <tr>
                  <th>Notes:</th>

                  <td>{notes}</td>
                </tr>
              </thead>
            </table>
          ) : (
            <p>No warranty data available.</p>
          )}
        </div>
        <div className="modal-footer">
          <button
            type="button"
            className="btn btn-secondary"
            onClick={handleClose}
          >
            Close
          </button>
        </div>
      </ModalBody>
    </Modal>
  );
}

export default View_Warranty;
