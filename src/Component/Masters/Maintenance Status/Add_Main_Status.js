import axios from "axios";
import React, { useState } from "react";
import { Modal, ModalBody } from "reactstrap";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Add_Main_Status(props) {
  const [data, setData] = useState({
    mainStatus_name: "",
  });

  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    const formdata = new FormData();
    console.log(data);
    formdata.append("mainStatus_name", data.mainStatus_name);
    axios
      .post("http://localhost:8081/api/main_status/add_main_status", data)
      .then((res) => {
        props.toggle();
        props.readData();
        navigate("/main_status");
        toast("Maintenance Status Added Successfull.", {
          type: "success",
          autoClose: 1500,
          theme: "dark",
        });
      })
      .catch((err) => {
        console.error(err);
        toast("Error adding Department.", { type: "error" }); // Add error toast
      });
  };

  return (
    <Modal size="lg" isOpen={props.modal} toggle={props.toggle}>
      {/* <ModalHeader> Add New Category </ModalHeader> */}
      <ModalBody>
        <div className="fields">
          <h4>Add Maintenance Status</h4>
          <form className="input-field" onSubmit={handleSubmit}>
            <div className="g col-8 mx-auto">
              <label htmlFor="inputMainStatus" className="form-label">
              Maintenance Status
              </label>
              <input
                type="text"
                className="form-control"
                id="inputMainStatus"
                autoComplete="off"
                onChange={(e) =>
                  setData({ ...data, mainStatus_name: e.target.value })
                }
              />
            </div>
            <div className="col-8 mb-3 d-grid gap-2 col-6 mx-auto">
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

export default Add_Main_Status;
