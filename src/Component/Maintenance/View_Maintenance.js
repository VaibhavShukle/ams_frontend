import React from "react";
import { Modal, ModalBody, ModalHeader } from "reactstrap";
import moment from "moment";

function View_Maintenance(props) {
  const { modal, toggle, maintenance } = props;

  // Check if maintenance is null and provide default values if it is
  const main_date = maintenance
    ? moment(maintenance.main_date).format("DD/MM/YYYY")
    : "N/A";
  const main_title = maintenance ? maintenance.main_title : "N/A";
  const main_details = maintenance ? maintenance.main_details : "N/A";
  const main_by = maintenance ? maintenance.main_by : "N/A";
  const status =
    maintenance && maintenance.status
      ? maintenance.status.mainStatus_name
      : "N/A";
  const completionDate =
    maintenance && maintenance.main_complete
      ? moment(maintenance.main_complete).format("DD/MM/YYYY")
      : "N/A";
  const maintenanceCost = maintenance ? maintenance.main_cost : "N/A";

  const handleClose = () => {
    toggle();
  };

  return (
    <Modal size="lg" isOpen={modal} toggle={toggle}>
      <ModalHeader>View Maintenance</ModalHeader>
      <ModalBody>
        <div>
          {maintenance ? (
            <table className="table table-bordered">
              <thead className="thead-light">
                <tr>
                  <th style={{ width: "300px" }}>Maintenance Date:</th>

                  <td>{main_date}</td>
                </tr>
                <tr>
                  <th>Title:</th>

                  <td>{main_title}</td>
                </tr>
                <tr>
                  <th>Details:</th>

                  <td>{main_details}</td>
                </tr>
                <tr>
                  <th>Maintenance By:</th>

                  <td>{main_by}</td>
                </tr>
                <tr>
                  <th>Status:</th>

                  <td>{status}</td>
                </tr>
                <tr>
                  <th>Completion Date:</th>

                  <td>{completionDate}</td>
                </tr>
                <tr>
                  <th>Maintenance Cost:</th>

                  <td>{maintenanceCost}</td>
                </tr>
              </thead>
            </table>
          ) : (
            <p>No maintenance data available.</p>
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

export default View_Maintenance;
