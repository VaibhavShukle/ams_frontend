import axios from "axios";
import React, { useEffect, useState } from "react";
import Add_Location from "./Add_Location";
import ConfirmationModal from "../../ConfirmationModel/Confirmation_Modal";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function List_Location() {
  const [data, setData] = useState([]);
  const [modal, setModal] = useState(false);
  const [isConfirmationModalOpen, setConfirmationModalOpen] = useState(false);
  const [selectedLocationId, setSelectedLocationId] = useState(null);

  const readLocation = () => {
    axios
      .get(`http://localhost:8081/api/location/getLocation`)
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
    readLocation();
  }, []);

  const handleDelete = (id) => {
    setSelectedLocationId(id);
    setConfirmationModalOpen(true);
  };

  const confirmDelete = () => {
    if (selectedLocationId) {
      axios
        .delete(
          `http://localhost:8081/api/location/delete/${selectedLocationId}`
        )
        .then((res) => {
          if (res.data.Status === "Success") {
            readLocation();
            toast("Location Delete Successfull.", {
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
      .put(`http://localhost:8081/api/location/toggleStatus/` + id, {
        status: newStatus ? "active" : "inactive",
      })
      .then((res) => {
        if (res.data.Status === "Success") {
          readLocation();
        } else {
          alert("Error");
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="px-5 py-3">
      <div className="d-flex justify-content-center mt-2">
        <h3>Location List</h3>
      </div>
      {/* <Link to="/add_assetType" className='btn btn-success my-3'>Add Asset Type</Link> */}

      <button onClick={() => setModal(true)} className="btn btn-success my-3">
        Add Location
      </button>

      <Add_Location
        modal={modal}
        toggle={() => setModal(!modal)}
        readData={readLocation}
      />

      <div className="mt-3">
        <table className="table  table-bordered">
          <thead className="thead-light">
            <tr>
              <th>Sr.</th>
              <th>Name Of Location</th>
              <th>Address Of Location</th>
              <th>Description Of Location</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {data.map((location, index) => {
              return (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{location.location_name}</td>
                  <td>{location.location_address}</td>
                  <td>{location.location_desc}</td>
                  <td>
                    {location.status === "inactive" ? (
                      <button
                        className="btn btn-sm btn-warning"
                        onClick={() =>
                          handleToggleStatus(location.location_id, true)
                        }
                      >
                        Inactive
                      </button>
                    ) : (
                      <button
                        className="btn btn-sm btn-success"
                        onClick={() =>
                          handleToggleStatus(location.location_id, false)
                        }
                      >
                        Active
                      </button>
                    )}
                  </td>
                  <td>
                    {/* <Link to={`/view_location/` + location.id} className='btn btn-primary btn-sm me-2'><i className="bi bi-pencil-square"></i></Link> */}
                    {/* <Link to={`/edit_location/` + location.id} className='btn btn-primary btn-sm me-2'>Edit</Link> */}
                    <button
                      onClick={(e) => handleDelete(location.location_id)}
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

export default List_Location;
