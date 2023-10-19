import axios from "axios";
import React, { useState } from "react";
import { Modal, ModalBody } from "reactstrap";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Add_Category(props) {
  const [data, setData] = useState({
    category_name: "",
  });

  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    const formdata = new FormData();
    console.log(data);
    formdata.append("category_name", data.category_name);
    axios
      .post("http://localhost:8081/api/category/add_category", data)
      .then((res) => {
        props.toggle();
        props.readData();
        navigate("/category");
        toast("Category Added Successfull.", {
          type: "success",
          autoClose: 1500,
          theme: "dark",
        });
      })
      .catch((err) => {
        console.error(err);
        toast("Error adding Category.", { type: "error" }); // Add error toast
      });
  };

  return (
    <Modal size="lg" isOpen={props.modal} toggle={props.toggle}>
      {/* <ModalHeader> Add New Category </ModalHeader> */}
      <ModalBody>
        <div className="fields">
          <h4>Add New Category</h4>
          <form className="input-field" onSubmit={handleSubmit}>
            <div className="g col-8 mx-auto">
              <label htmlFor="inputCategory" className="form-label">
                Category
              </label>
              <input
                type="text"
                className="form-control"
                id="inputCategory"
                autoComplete="off"
                onChange={(e) =>
                  setData({ ...data, category_name: e.target.value })
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

export default Add_Category;
