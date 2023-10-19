import axios from "axios";
import React, { useState, useEffect } from "react";
import { Modal, ModalBody, ModalHeader } from "reactstrap";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Add_Warranty(props) {
  const [data, setData] = useState({
    exp_date: "",
    notes: "",
  });

  const navigate = useNavigate();
  const { id } = useParams();
  const { readWarranty } = props;

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("exp_date", data.exp_date);
    formData.append("notes", data.notes);

    axios
      .post(`http://localhost:8081/api/warranty/add_warranty/${id}`, data)
      .then((res) => {
        console.log(JSON.stringify(res));
        props.toggle();
        navigate(`/view_asset/${id}`);
        toast("Warranty Added Successfully.", {
          type: "success",
          autoClose: 1500,
          theme: "dark",
        });
        updateWarrantyList();
      })
      .catch((err) => {
        console.error(err);
        toast("Error", { type: "error" });
      });
  };

  const updateWarrantyList = () => {
    readWarranty();
  };

  useEffect(() => {
    updateWarrantyList();
  }, []);

  return (
    <Modal size="lg" isOpen={props.modal} toggle={props.toggle}>
      <ModalHeader> Add Warranty </ModalHeader>
      <ModalBody>
        <div className="fields">
          <h4>Add Warranty</h4>
          <form className="input-field" onSubmit={handleSubmit}>
            <div className="g col-8 mx-auto">
              <label htmlFor="inputExpDate" className="form-label">
                Expiration Date
              </label>
              <input
                type="date"
                className="form-control"
                id="inputExpDate"
                autoComplete="off"
                value={data.exp_date}
                onChange={(e) => setData({ ...data, exp_date: e.target.value })}
              />
            </div>
            <div className="g col-8 mx-auto">
              <label
                htmlFor="exampleFormControlTextarea1"
                className="form-label"
              >
                Notes
              </label>
              <textarea
                style={{ height: "100px" }}
                className="form-control"
                autoComplete="off"
                value={data.notes}
                onChange={(e) => setData({ ...data, notes: e.target.value })}
              />
            </div>
            <div className="text-end mt-3">
              <button
                type="button"
                className="btn btn-secondary me-2"
                onClick={props.toggle}
              >
                Close
              </button>
              <button type="submit" className="btn btn-success">
                Submit
              </button>
            </div>
          </form>
        </div>
      </ModalBody>
    </Modal>
  );
}

export default Add_Warranty;
