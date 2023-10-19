import React, { useState, useEffect } from "react";
import axios from "axios";
import moment from "moment";
import "react-toastify/dist/ReactToastify.css";
import { useParams } from "react-router-dom"; // Import useParams here
import Add_Warranty from "./Add_Warranty";
import View_Warranty from "./View_Warranty";
import Edit_Warranty from "./Edit_Warranty";

function Warranty() {
  const [data, setData] = useState([]);
  const [modal, setModal] = useState(false);
  const [viewModal, setViewModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [selectedWarranty, setSelectedWarranty] = useState(null);

  const { id } = useParams(); // Move useParams call here

  const readWarranty = async () => {
    try {
      const warrantyResponse = await axios.get(
        `http://localhost:8081/api/warranty/getWarranty/${id}`
      );
      const warrantyData = warrantyResponse.data.Result;

      const assetResponse = await axios.get(
        `http://localhost:8081/api/asset/get/${id}`
      );
      const assetData = assetResponse.data.Result[0];
      const assetName = assetData.asset_name;

      const updatedWarranties = warrantyData.map((warranty) => ({
        ...warranty,
        assetName: assetName,
      }));

      setData(updatedWarranties);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    readWarranty();
  }, []);

  const formatDate = (inputDate) => {
    return moment(inputDate).format("DD/MM/YYYY"); // Adjust the format as needed
  };

  const handleToggleStatus = (warranty_id, assetPurchaseDate, expiryDate) => {
    const isAssetLessOrEqualExpiry =
      moment(assetPurchaseDate).isSameOrBefore(expiryDate);
    const newStatus = isAssetLessOrEqualExpiry ? "active" : "inactive";
    axios
      .put(`http://localhost:8081/api/warranty/toggleStatus/${warranty_id}`, {
        status: newStatus,
      })
      .then((res) => {
        if (res.data.Status === "Success") {
          // You may want to update the warranty data again after changing the status.
          readWarranty(warranty_id); // Read the updated data for the specific warranty.
        } else {
          alert("Error");
        }
      })
      .catch((err) => console.log(err));
  };

  const openViewModal = (warranty) => {
    setSelectedWarranty(warranty);
    setViewModal(true);
  };

  const closeViewModal = () => {
    setSelectedWarranty(null);
    setViewModal(false);
  };

  const openEditModal = (warranty) => {
    setSelectedWarranty(warranty);
    setEditModal(true);
  };

  const closeEditModal = () => {
    setSelectedWarranty(null);
    setEditModal(false);
  };

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center">
        <b>Warranty</b>
        <button onClick={() => setModal(true)} className="btn btn-success my-3">
          Add Warranty
        </button>
      </div>
      <Add_Warranty
        modal={modal}
        toggle={() => setModal(!modal)}
        readWarranty={readWarranty}
      />

      <hr />
      <div className="mt-3">
        <table className="table table-bordered">
          <thead className="thead-light">
            <tr>
              <th>Sr.</th>
              {/* <th>Active</th> */}
              <th>Expiration Date</th>
              <th>Notes</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {data.map((warranty, index) => {
              return (
                <tr key={index}>
                  <td>{index + 1}</td>
                  {/* <td>
                    {warranty.status === "inactive" ? (
                      <button
                        className="btn btn-sm btn-warning"
                        onClick={() =>
                          handleToggleStatus(
                            warranty.warranty_id,
                            warranty.assetPurchaseDate,
                            warranty.exp_date
                          )
                        }
                      >
                        Inactive
                      </button>
                    ) : (
                      <button
                        className="btn btn-sm btn-success"
                        onClick={() =>
                          handleToggleStatus(
                            warranty.warranty_id,
                            warranty.assetPurchaseDate,
                            warranty.exp_date
                          )
                        }
                      >
                        Active
                      </button>
                    )}
                  </td> */}
                  <td>{formatDate(warranty.exp_date)}</td>
                  <td>{warranty.notes}</td>

                  <td>
                    <button
                      className="btn btn-warning btn-sm me-2"
                      onClick={() => openEditModal(warranty)}
                    >
                      <i className="bi bi-pencil"></i>
                    </button>
                    <button
                      className="btn btn-primary btn-sm me-2"
                      onClick={() => openViewModal(warranty)}
                    >
                      <i className="bi bi-eye"></i>
                    </button>
                  </td>
                </tr>
              );
            })}
            <View_Warranty
              modal={viewModal}
              toggle={closeViewModal}
              warranty={selectedWarranty}
            />
            <Edit_Warranty
              modal={editModal}
              toggle={closeEditModal}
              warranty={selectedWarranty}
              readWarranty={readWarranty}
            />
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Warranty;
