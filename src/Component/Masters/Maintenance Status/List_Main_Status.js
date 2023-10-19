import axios from "axios";
import React, { useEffect, useState } from "react";
import ConfirmationModal from "../../ConfirmationModel/Confirmation_Modal";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Add_Main_Status from "./Add_Main_Status";

function List_Main_Status() {
  const [isConfirmationModalOpen, setConfirmationModalOpen] = useState(false);
  const [selectedStatusId, setSelectedStatusId] = useState(null);
  const [data, setData] = useState([]);
  const [modal, setModal] = useState(false);

  const readMainStatus = () => {
    axios
      .get(`http://localhost:8081/api/main_status/getMain_Status/active`)
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
    readMainStatus();
  }, []);

  const handleDelete = (id) => {
    setSelectedStatusId(id);
    setConfirmationModalOpen(true);
  };

  const confirmDelete = () => {
    if (selectedStatusId) {
      axios
        .delete(
          `http://localhost:8081/api/main_status/delete/${selectedStatusId}`
        )
        .then((res) => {
          if (res.data.Status === "Success") {
            readMainStatus();
            toast("Maintenance Status Delete Successfull.", {
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
      .put(`http://localhost:8081/api/main_status/toggleStatus/` + id, {
        status: newStatus ? "active" : "inactive",
      })
      .then((res) => {
        if (res.data.Status === "Success") {
          readMainStatus();
        } else {
          alert("Error");
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="px-5 py-3">
      <div className="d-flex justify-content-center mt-2">
        <h3>Asset Maintenance Status List</h3>
      </div>
      {/* <Link to="/add_assetType" className='btn btn-success my-3'>Add Asset Type</Link> */}

      <button onClick={() => setModal(true)} className="btn btn-success my-3">
        Add Maintenance Status
      </button>

      <Add_Main_Status
        modal={modal}
        toggle={() => setModal(!modal)}
        readData={readMainStatus}
      />

      <div className="mt-3">
        <table className="table  table-bordered">
          <thead className="thead-light">
            <tr>
              <th>Sr.</th>
              <th>Maintenance Status</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {data.map((mainStatus, index) => {
              return (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{mainStatus.mainStatus_name}</td>
                  <td>
                    {mainStatus.status === "inactive" ? (
                      <button
                        className="btn btn-sm btn-warning"
                        onClick={() =>
                          handleToggleStatus(mainStatus.mainStatus_id, true)
                        }
                      >
                        Inactive
                      </button>
                    ) : (
                      <button
                        className="btn btn-sm btn-success"
                        onClick={() =>
                          handleToggleStatus(mainStatus.mainStatus_id, false)
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
                      onClick={(e) => handleDelete(mainStatus.mainStatus_id)}
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

export default List_Main_Status;
