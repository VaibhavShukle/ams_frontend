import axios from "axios";
import React, { useState } from "react";
import { Modal, ModalBody, ModalHeader } from "reactstrap";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Add_AssetModel(props) {
  const [data, setData] = useState({
    model_name: "",
    model_assetType: "",
  });

  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    const formdata = new FormData();
    console.log(data);
    formdata.append("model_name", data.model_name);
    formdata.append("model_assetType", data.model_assetType);
    axios
      .post("http://localhost:8081/api/assetModel/add_assetModel", data)
      .then((res) => {
        props.toggle();
        props.readData();
        navigate("/asset-model");
        toast("Asset Model Added Successfull.", {
          type: "success",
          autoClose: 1500,
          theme: "dark",
        });
      })
      .catch((err) => {
        console.error(err);
        toast("Error adding Asset Model.", { type: "error" }); // Add error toast
      });
  };

  return (
    <Modal size="lg" isOpen={props.modal} toggle={props.toggle}>
      <ModalHeader> Add Asset Model </ModalHeader>
      <ModalBody>
        <div className="fields">
          <h4>Add Assets Model</h4>
          <form className="input-field" onSubmit={handleSubmit}>
            <div className="g col-8 mx-auto">
              <label htmlFor="inputModelName" className="form-label">
                Asset Model Name
              </label>
              <input
                type="text"
                className="form-control"
                id="inputModelName"
                autoComplete="off"
                onChange={(e) =>
                  setData({ ...data, model_name: e.target.value })
                }
              />
            </div>
            <div className="g col-8 mx-auto">
              <label htmlFor="inputModelType" className="form-label">
                Asset Model Type
              </label>
              <input
                type="text"
                className="form-control"
                id="inputModelType"
                autoComplete="off"
                onChange={(e) =>
                  setData({ ...data, model_assetType: e.target.value })
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

export default Add_AssetModel;
