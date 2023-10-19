import axios from "axios";
import React, { useState } from "react";
import { Modal, ModalBody, ModalHeader } from "reactstrap";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Add_Location(props) {
  const [data, setData] = useState({
    location_name: "",
    location_address: "",
    location_desc: "",
  });

  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    const formdata = new FormData();
    formdata.append("location_name", data.location_name); // Change 'location' to 'location_name'
    formdata.append("location_address", data.location_address); // Add this line
    formdata.append("location_desc", data.location_desc); // Add this line

    axios
      .post("http://localhost:8081/api/location/add_location", data) // Change 'data' to 'formdata'
      .then((res) => {
        props.toggle();
        props.readData();
        toast("Location Added Successfull.", {
          type: "success",
          autoClose: 1500,
          theme: "dark",
        });
      })
      .catch((err) => {
        console.error(err);
        toast("Error adding location.", { type: "error" }); // Add error toast
      });
  };

  return (
    <Modal size="lg" isOpen={props.modal} toggle={props.toggle}>
      <ModalHeader> Add Location </ModalHeader>
      <ModalBody>
        <div className="fields">
          <h4>Add Location</h4>
          <form className="input-field" onSubmit={handleSubmit}>
            <div className="g col-8 mx-auto">
              <label htmlFor="inputLocationName" className="form-label">
                Name Of Location
              </label>
              <input
                type="text"
                className="form-control"
                id="inputLocationName"
                autoComplete="off"
                onChange={(e) =>
                  setData({ ...data, location_name: e.target.value })
                }
              />
            </div>
            <div className="g col-8 mx-auto">
              <label htmlFor="inputLocationAddress" className="form-label">
                Address Of Location
              </label>
              <input
                type="text"
                className="form-control"
                id="inputLocationAddress"
                autoComplete="off"
                onChange={(e) =>
                  setData({ ...data, location_address: e.target.value })
                }
              />
            </div>
            <div className="g col-8 mx-auto">
              <label htmlFor="inputLocationDesc" className="form-label">
                Description Of Location
              </label>
              <input
                type="text"
                className="form-control"
                id="inputLocationDesc"
                autoComplete="off"
                onChange={(e) =>
                  setData({ ...data, location_desc: e.target.value })
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

export default Add_Location;
