import axios from "axios";
import React, { useEffect, useState } from "react";
import Add_Category from "./Add_Category";
import ConfirmationModal from "../../ConfirmationModel/Confirmation_Modal";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function List_Category() {
  const [isConfirmationModalOpen, setConfirmationModalOpen] = useState(false);
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  const [data, setData] = useState([]);
  const [modal, setModal] = useState(false);

  const readCategory = () => {
    axios
      .get(`http://localhost:8081/api/category/getcategory`)
      .then((res) => {
        if (res.data.Status === "Success") {
          setData(res.data.Result);
        } else {
          alert("Error");
        }
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    // eslint-disable-next-line
    readCategory();
  }, []);

  const handleDelete = (id) => {
    setSelectedCategoryId(id);
    setConfirmationModalOpen(true);
  };
  const confirmDelete = () => {
    if (selectedCategoryId) {
      axios
        .delete(
          `http://localhost:8081/api/category/delete/${selectedCategoryId}`
        )
        .then((res) => {
          if (res.data.Status === "Success") {
            readCategory();
            toast("Category Delete Successfull.", {
              type: "success",
              autoClose: 1500,
              theme: "dark",
            });
          } else {
            alert("Error");
          }
        })
        .catch((err) => console.log(err));
    }
    setConfirmationModalOpen(false);
  };

  const handleToggleStatus = (id, newStatus) => {
    console.log(newStatus);
    axios
      .put(`http://localhost:8081/api/category/toggleStatus/` + id, {
        status: newStatus ? "active" : "inactive",
      })
      .then((res) => {
        if (res.data.Status === "Success") {
          readCategory();
        } else {
          alert("Error");
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="px-5 py-3">
      <div className="d-flex justify-content-center mt-2">
        <h3>Asset Category List</h3>
      </div>
      {/* <Link to="/add_assetType" className='btn btn-success my-3'>Add Asset Type</Link> */}

      <button onClick={() => setModal(true)} className="btn btn-success my-3">
        Add Category
      </button>

      <Add_Category
        modal={modal}
        toggle={() => setModal(!modal)}
        readData={readCategory}
      />

      <div className="mt-3">
        <table className="table  table-bordered">
          <thead className="thead-light">
            <tr>
              <th>Sr.</th>
              <th>Category</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {data.map((category, index) => {
              return (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{category.category_name}</td>
                  <td>
                    {category.status === "inactive" ? (
                      <button
                        className="btn btn-sm btn-warning"
                        onClick={() =>
                          handleToggleStatus(category.category_id, true)
                        }
                      >
                        Inactive
                      </button>
                    ) : (
                      <button
                        className="btn btn-sm btn-success"
                        onClick={() =>
                          handleToggleStatus(category.category_id, false)
                        }
                      >
                        Active
                      </button>
                    )}
                  </td>
                  <td>
                    {/* <Link to={`/view_asset/` + category.id} className='btn btn-primary btn-sm me-2'><i className="bi bi-pencil-square"></i></Link> */}
                    {/* <Link to={`/edit_asset/` + category.id} className='btn btn-primary btn-sm me-2'>Edit</Link> */}
                    <button
                      onClick={(e) => handleDelete(category.category_id)}
                      className="btn btn-sm btn-danger"
                    >
                      <i className="bi bi-trash"></i> Delete
                    </button>
                    <ConfirmationModal
                      isOpen={isConfirmationModalOpen}
                      toggle={() =>
                        setConfirmationModalOpen(!isConfirmationModalOpen)
                      }
                      onConfirm={confirmDelete}
                    />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default List_Category;
