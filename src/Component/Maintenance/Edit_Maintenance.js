import React, { useState, useEffect } from "react";
import { Modal, ModalHeader, ModalBody } from "reactstrap";
import axios from "axios";
import Select from "react-select"; // Import the Select component
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Edit_Maintenance(props) {
  const { modal, toggle, maintenance } = props;

  const { readMaintenance } = props;

  const [editedMaintenance, setEditedMaintenance] = useState({
    main_id: maintenance ? maintenance.main_id : "",
    main_date: maintenance ? maintenance.main_date : "",
    main_title: maintenance ? maintenance.main_title : "",
    main_details: maintenance ? maintenance.main_details : "",
    main_by: maintenance ? maintenance.main_by : "",
    mainStatus_id: maintenance ? maintenance.mainStatus_id : "", // Fixed the field name
    main_complete: maintenance ? maintenance.main_complete : "",
    main_cost: maintenance ? maintenance.main_cost : "", // Fixed the field name
  });

  useEffect(() => {
    setEditedMaintenance({
      main_id: maintenance ? maintenance.main_id : "",
      main_date: maintenance ? maintenance.main_date : "",
      main_title: maintenance ? maintenance.main_title : "",
      main_details: maintenance ? maintenance.main_details : "",
      main_by: maintenance ? maintenance.main_by : "",
      mainStatus_id: maintenance ? maintenance.mainStatus_id : "", // Fixed the field name
      main_complete: maintenance ? maintenance.main_complete : "",
      main_cost: maintenance ? maintenance.main_cost : "", // Fixed the field name
    });
  }, [maintenance]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setEditedMaintenance({ ...editedMaintenance, [name]: value });
  };

  const handleSaveChanges = () => {
    const formData = {
      main_id: editedMaintenance.main_id,
      main_date: editedMaintenance.main_date,
      main_title: editedMaintenance.main_title,
      main_details: editedMaintenance.main_details,
      main_by: editedMaintenance.main_by,
      mainStatus_id: editedMaintenance.mainStatus_id, // Fixed the field name
      main_complete: editedMaintenance.main_complete,
      main_cost: editedMaintenance.main_cost, // Fixed the field name
    };

    axios
      .post(
        `http://localhost:8081/api/maintenance/update/${editedMaintenance.main_id}`,
        formData
      )
      .then((res) => {
        if (res.data.Status === "Success") {
          toggle();
          toast("Edit Maintenance Successfully.", {
            type: "success",
            autoClose: 1500,
            theme: "dark",
          });

          updateMaintenanceList();
        }
      })
      .catch((err) => console.log(err));
  };

  const [mainStatusOptions, setMainStatusOptions] = useState([]);

  const getMainStatus = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8081/api/main_status/getMain_Status/active`
      );

      if (response.data.Status) {
        const options = response.data.Result.map((main_status) => ({
          value: main_status.mainStatus_id,
          label: main_status.mainStatus_name,
        }));

        setMainStatusOptions(options);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const updateMaintenanceList = () => {
    readMaintenance();
  };

  useEffect(() => {
    getMainStatus();
    updateMaintenanceList();
  }, []);

  return (
    <Modal size="lg" isOpen={modal} toggle={toggle}>
      <ModalHeader>Edit Maintenance</ModalHeader>
      <ModalBody>
        <form>
          <div className="mb-4">
            <label htmlFor="main_date" className="form-label">
              Maintenance Date
            </label>
            <input
              type="date"
              className="form-control"
              id="main_date"
              name="main_date"
              value={editedMaintenance.main_date}
              onChange={handleInputChange}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="main_title" className="form-label">
              Title
            </label>
            <input
              type="text"
              className="form-control"
              id="main_title"
              name="main_title"
              value={editedMaintenance.main_title}
              onChange={handleInputChange}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="main_details" className="form-label">
              Details
            </label>
            <textarea
              style={{ height: "100px" }}
              className="form-control"
              id="main_details"
              name="main_details"
              value={editedMaintenance.main_details}
              onChange={handleInputChange}
            ></textarea>
          </div>
          <div className="mb-4">
            <label htmlFor="main_by" className="form-label">
              Maintenance By
            </label>
            <input
              type="text"
              className="form-control"
              id="main_by"
              name="main_by"
              value={editedMaintenance.main_by}
              onChange={handleInputChange}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="mainStatus_id" className="form-label">
              Status
            </label>
            <Select
              options={mainStatusOptions}
              value={{
                value: editedMaintenance.mainStatus_id,
                label: editedMaintenance.mainStatus_name,
              }}
              onChange={(selectedOption) => {
                setEditedMaintenance({
                  ...editedMaintenance,
                  mainStatus_name: selectedOption.label,
                  mainStatus_id: selectedOption.value,
                });
              }}
            />
          </div>

          <div className="mb-4">
            <label htmlFor="main_complete" className="form-label">
              Completion Date
            </label>
            <input
              type="date"
              className="form-control"
              id="main_complete"
              name="main_complete"
              value={editedMaintenance.main_complete}
              onChange={handleInputChange}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="main_cost" className="form-label">
              Maintenance Cost
            </label>
            <input
              type="text"
              className="form-control"
              id="main_cost"
              name="main_cost"
              value={editedMaintenance.main_cost}
              onChange={handleInputChange}
            />
          </div>

          <div className="text-end">
            <button
              type="button"
              className="btn btn-secondary me-2"
              onClick={toggle}
            >
              Close
            </button>
            <button
              type="button"
              className="btn btn-primary"
              onClick={handleSaveChanges}
            >
              Save Changes
            </button>
          </div>
        </form>
      </ModalBody>
    </Modal>
  );
}

export default Edit_Maintenance;
