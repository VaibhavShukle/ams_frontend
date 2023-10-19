import axios from "axios";
import React, { useState } from "react";
import { Modal, ModalBody, ModalHeader } from "reactstrap";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Add_AssetType(props) {
  const [data, setData] = useState({
    asset_types: "",
  });

  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    const formdata = new FormData();
    console.log(data);
    formdata.append("asset_types", data.asset_types);
    axios
      .post("http://localhost:8081/api/assetType/add_assetType", data)
      .then((res) => {
        props.toggle();
        props.readData();
        navigate("/asset-type");
        toast("Asset Type Added Successfull.", {
          type: "success",
          autoClose: 1500,
          theme: "dark",
        });
      })
      .catch((err) => {
        console.error(err);
        toast("Error adding Asset.", { type: "error" }); // Add error toast
      });
  };

  return (
    <Modal size="lg" isOpen={props.modal} toggle={props.toggle}>
      <ModalHeader> Add Select Asset </ModalHeader>
      <ModalBody>
        <div className="fields">
          <h4>Select Asset</h4>
          <form className="input-field" onSubmit={handleSubmit}>
            <div className="g col-8 mx-auto">
              <label htmlFor="inputTypeName" className="form-label">
                Asset Type
              </label>
              <input
                type="text"
                className="form-control"
                id="inputTypeName"
                autoComplete="off"
                onChange={(e) =>
                  setData({ ...data, asset_types: e.target.value })
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

export default Add_AssetType;
