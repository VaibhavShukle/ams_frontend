import axios from "axios";
import React, { useState, useEffect } from "react";
import { Modal, ModalBody, ModalHeader } from "reactstrap";
import { useNavigate } from "react-router-dom";
import Select from "react-select";

function Add_subCategory(props) {
  const [data, setData] = useState({
    subcategory_name: "",
    selectedCategory: "",
    selectedCategoryId: "",
  });

  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    const formdata = new FormData();
    console.log(data);
    formdata.append("subcategory_name", data.subcategory_name);
    formdata.append("category_id", data.selectedCategoryId);
    axios
      .post("http://localhost:8081/api/subcategory/add_subcategory", data)
      .then((res) => {
        props.toggle();
        props.readData();
        navigate("/sub-category");
      })
      .catch((err) => console.log(err));
  };

  const [categoryOptions, setCategoryOptions] = useState([]);

  const getCategory = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8081/api/asset/getAssetCategory/active"
      );

      if (response.data.Status) {
        const options = [
          ...response.data.Result.map((category) => ({
            value: category.category_id,
            label: category.category_name,
          })),
        ];

        setCategoryOptions(options);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    getCategory();
  }, []);

  return (
    <Modal size="lg" isOpen={props.modal} toggle={props.toggle}>
      <ModalHeader> Add New Sub Category </ModalHeader>
      <ModalBody>
        <div className="fields">
          <h4>Add New Sub Category</h4>
          <form className="input-field" onSubmit={handleSubmit}>
            <div className="g col-8 mx-auto">
              <label htmlFor="inputCategory" className="form-label">
                Category
              </label>
              <Select
                options={categoryOptions}
                // value={{ label: data.selectedCategoryId }}
                onChange={(selectedOption) =>
                  setData({
                    ...data,
                    selectedCategory: selectedOption.label,
                    selectedCategoryId: selectedOption.value,
                  })
                }
              />
            </div>

            <div className="g col-8 mx-auto">
              <label htmlFor="inputsubCategory" className="form-label">
                Sub Category
              </label>
              <input
                type="text"
                className="form-control"
                id="inputsubCategory"
                autoComplete="off"
                onChange={(e) =>
                  setData({ ...data, subcategory_name: e.target.value })
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

export default Add_subCategory;
