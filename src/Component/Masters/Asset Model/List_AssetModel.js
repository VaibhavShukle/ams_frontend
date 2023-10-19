import axios from "axios";
import React, { useEffect, useState } from "react";
import Add_AssetModel from "./Add_AssetModel";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ConfirmationModal from "../../ConfirmationModel/Confirmation_Modal";

function List_AssetModel() {
  const [data, setData] = useState([]);
  const [modal, setModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  const readAssetModel = () => {
    axios
      .get(`http://localhost:8081/api/assetModel/getAssetModel`)
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
    readAssetModel();
  }, []);

  const handleDelete = (id) => {
    // Set the ID and show the confirmation modal
    setDeleteId(id);
    setDeleteModal(true);
  };

  // Function to perform the actual delete action
  const confirmDelete = () => {
    axios
      .delete("http://localhost:8081/api/assetModel/delete/" + deleteId)
      .then((res) => {
        if (res.data.Status === "Success") {
          readAssetModel();
          toast("Asset Model Delete Successfull.", {
            type: "success",
            autoClose: 1500,
            theme: "dark",
          });
        } else {
          alert("Error");
        }
      })
      .catch((err) => console.log(err));

    // Close the delete confirmation modal
    setDeleteModal(false);
  };

  const handleToggleStatus = (id, newStatus) => {
    console.log(newStatus);
    axios
      .put(`http://localhost:8081/api/assetModel/toggleStatus/` + id, {
        status: newStatus ? "active" : "inactive",
      })
      .then((res) => {
        if (res.data.Status === "Success") {
          readAssetModel();
        } else {
          alert("Error");
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="px-5 py-3">
      <div className="d-flex justify-content-center mt-2">
        <h3>Asset Model List</h3>
      </div>
      {/* <Link to="/add_assetType" className='btn btn-success my-3'>Add Asset Type</Link> */}

      <button onClick={() => setModal(true)} className="btn btn-success my-3">
        Add Asset Model
      </button>

      <Add_AssetModel
        modal={modal}
        toggle={() => setModal(!modal)}
        readData={readAssetModel}
      />

      <div className="mt-3">
        <table className="table  table-bordered">
          <thead className="thead-light">
            <tr>
              <th>Sr.</th>
              <th>Asset Model Name</th>
              <th>Asset Model Type</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {data.map((assetsModel, index) => {
              return (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{assetsModel.model_name}</td>
                  <td>{assetsModel.model_assetType}</td>
                  <td>
                    {assetsModel.status === "inactive" ? (
                      <button
                        className="btn btn-sm btn-warning"
                        onClick={() =>
                          handleToggleStatus(assetsModel.model_id, true)
                        }
                      >
                        Inactive
                      </button>
                    ) : (
                      <button
                        className="btn btn-sm btn-success"
                        onClick={() =>
                          handleToggleStatus(assetsModel.model_id, false)
                        }
                      >
                        Active
                      </button>
                    )}
                  </td>
                  <td>
                    {/* <Link to={`/view_asset/` + model_id} className='btn btn-primary btn-sm me-2'><i className="bi bi-pencil-square"></i></Link> */}
                    {/* <Link to={`/edit_asset/` + model_id} className='btn btn-primary btn-sm me-2'>Edit</Link> */}
                    <button
                      onClick={(e) => handleDelete(assetsModel.model_id)}
                      className="btn btn-sm btn-danger"
                    >
                      <i className="bi bi-trash"></i> Delete
                    </button>
                    <ConfirmationModal
                      isOpen={deleteModal}
                      onClose={() => setDeleteModal(false)}
                      onConfirm={confirmDelete}
                      message="Are you sure you want to delete this asset model?"
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

export default List_AssetModel;
