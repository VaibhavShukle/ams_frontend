import axios from "axios";
import React, { useState } from "react";
import { Modal, ModalBody, ModalHeader } from "reactstrap";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Add_Photos(props) {
  const [data, setData] = useState({
    image_path: null,
  });

  const navigate = useNavigate();
  const { id } = useParams();

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("image_path", data.image_path);

    axios
      .post(`http://localhost:8081/api/image/add_image/${id}`, formData)
      .then((res) => {
        props.toggle();
        props.readData();
        navigate(`/view_asset/${id}`);
        toast("error", {
          type: "error",
          autoClose: 1500,
          theme: "dark",
        });
      })
      .catch((err) => {
        console.error(err);
        toast("Image Added Successfully.", { type: "success" });
      });
  };

  const handleImageChange = (event) => {
    setData({ ...data, image_path: event.target.files[0] });
  };

  return (
    <Modal size="md" isOpen={props.modal} toggle={props.toggle}>
      <ModalHeader> Add New Image </ModalHeader>
      <ModalBody>
        <div className="fields">
          <form className="input-field" onSubmit={handleSubmit}>
            <div className="input-field">
              <input
                type="file"
                className="form-control"
                id="inputGroupFile01"
                onChange={handleImageChange}
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

export default Add_Photos;
