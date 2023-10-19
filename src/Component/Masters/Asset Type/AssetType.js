import axios from "axios";
import React, { useEffect, useState } from "react";
import Add_AssetType from "./Add_AssetType";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ConfirmationModal from "../../ConfirmationModel/Confirmation_Modal";

function AssetType() {
  const [data, setData] = useState([]);
  const [modal, setModal] = useState(false);
  const [selectedAssetTypeId, setselectedAssetTypeId] = useState(null);
  const [isConfirmationModalOpen, setConfirmationModalOpen] = useState(false);

  const readAsset = () => {
    axios
      .get(`http://localhost:8081/api/assetType/getAssetTypes`)
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
    readAsset();
  }, []);

  const handleDelete = (id) => {
    setselectedAssetTypeId(id); // Store the selected category ID
    setConfirmationModalOpen(true); // Open the confirmation modal
  };

  const confirmDelete = () => {
    axios
      .delete(
        "http://localhost:8081/api/assetType/delete/" + selectedAssetTypeId
      )
      .then((res) => {
        if (res.data.Status === "Success") {
          setConfirmationModalOpen(false); // Close the confirmation modal
          readAsset();
          toast("Asset Type Delete Successful.", {
            type: "success",
            autoClose: 1500,
            theme: "dark",
          });
        } else {
          alert("Error");
        }
      })
      .catch((err) => console.log(err));
  };

  const handleToggleStatus = (id, newStatus) => {
    axios
      .put(`http://localhost:8081/api/assetType/toggleStatus/` + id, {
        status: newStatus ? "active" : "inactive",
      })
      .then((res) => {
        if (res.data.Status === "Success") {
          readAsset();
        } else {
          alert("Error");
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="px-5 py-3">
      <div className="d-flex justify-content-center mt-2">
        <h3>Asset List</h3>
      </div>
      <button onClick={() => setModal(true)} className="btn btn-success my-3">
        Add Asset Type
      </button>

      <Add_AssetType
        modal={modal}
        toggle={() => setModal(!modal)}
        readData={readAsset}
      />

      <div className="mt-3">
        <table className="table table-bordered">
          <thead className="thead-light">
            <tr>
              <th>Sr.</th>
              <th>Types Of Assets</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {data.map((assets, index) => {
              return (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{assets.asset_types}</td>
                  <td>
                    {assets.status === "inactive" ? (
                      <button
                        className="btn btn-sm btn-warning"
                        onClick={() =>
                          handleToggleStatus(assets.assetType_id, true)
                        }
                      >
                        Inactive
                      </button>
                    ) : (
                      <button
                        className="btn btn-sm btn-success"
                        onClick={() =>
                          handleToggleStatus(assets.assetType_id, false)
                        }
                      >
                        Active
                      </button>
                    )}
                  </td>
                  <td>
                    <button
                      onClick={() => handleDelete(assets.assetType_id)}
                      className="btn btn-sm btn-danger"
                    >
                      <i className="bi bi-trash"></i> Delete
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Delete Confirmation Modal */}
      <ConfirmationModal
        isOpen={isConfirmationModalOpen}
        toggle={() => setConfirmationModalOpen(!isConfirmationModalOpen)}
        onConfirm={confirmDelete}
      />
    </div>
  );
}

export default AssetType;
