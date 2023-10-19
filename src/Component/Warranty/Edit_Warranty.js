import React, { useState, useEffect } from "react";
import { Modal, ModalHeader, ModalBody } from "reactstrap";
import axios from "axios";
import { useParams } from "react-router-dom"; // Import useParams

function Edit_Warranty(props) {
  const { modal, toggle, warranty } = props;
  const { readWarranty } = props;

  const [editedWarranty, setEditedWarranty] = useState({
    warranty_id: warranty ? warranty.warranty_id : "",
    exp_date: warranty ? warranty.exp_date : "",
    notes: warranty ? warranty.notes : "",
  });

  const { id } = useParams(); // Get the asset ID from params

  useEffect(() => {
    setEditedWarranty({
      warranty_id: warranty ? warranty.warranty_id : "",
      exp_date: warranty ? warranty.exp_date : "",
      notes: warranty ? warranty.notes : "",
    });
  }, [warranty]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setEditedWarranty({ ...editedWarranty, [name]: value });
  };

  const handleSaveChanges = () => {
    const formData = {
      warranty_id: editedWarranty.warranty_id,
      exp_date: editedWarranty.exp_date,
      notes: editedWarranty.notes,
    };

    axios
      .post(
        `http://localhost:8081/api/warranty/update/${editedWarranty.warranty_id}`,
        formData
      )
      .then((res) => {
        if (res.data.Status === "Success") {
          toggle();
          updateWarrantyList();
        } else {
          alert("Error");
        }
      })
      .catch((err) => console.log(err));
  };

  const updateWarrantyList = () => {
    readWarranty();
  };

  useEffect(() => {
    updateWarrantyList();
  }, [id]);

  return (
    <Modal size="lg" isOpen={modal} toggle={toggle}>
      <ModalHeader>Edit Warranty</ModalHeader>
      <ModalBody>
        <form>
          <div className="mb-4">
            <label htmlFor="exp_date" className="form-label">
              Expiration Date
            </label>
            <input
              type="date"
              className="form-control"
              id="exp_date"
              name="exp_date"
              value={editedWarranty.exp_date}
              onChange={handleInputChange}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="notes" className="form-label">
              Notes
            </label>
            <textarea
              style={{ height: "100px" }}
              className="form-control"
              id="notes"
              name="notes"
              value={editedWarranty.notes}
              onChange={handleInputChange}
            ></textarea>
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

export default Edit_Warranty;
