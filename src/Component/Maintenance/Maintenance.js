import React, { useState, useEffect } from "react";
import axios from "axios";
import moment from "moment";
import "react-toastify/dist/ReactToastify.css";
import { useParams } from "react-router-dom";
import Add_Maintenance from "./Add_Maintenance";
import View_Maintenance from "./View_Maintenance";
import Edit_Maintenance from "./Edit_Maintenance"; // Import Edit_Maintenance

function Maintenance() {
  const [data, setData] = useState([]);
  const [viewModal, setViewModal] = useState(false);
  const [addModal, setAddModal] = useState(false);
  const [editModal, setEditModal] = useState(false); // State for edit modal
  const [selectedMaintenance, setSelectedMaintenance] = useState(null);

  const { id } = useParams();

  const readMaintenance = async () => {
    try {
      const maintenanceResponse = await axios.get(
        `http://localhost:8081/api/maintenance/getMaintenance/${id}`
      );
      const maintenanceData = maintenanceResponse.data.Result;

      const assetResponse = await axios.get(
        `http://localhost:8081/api/asset/get/${id}`
      );
      const assetData = assetResponse.data.Result[0];
      const assetName = assetData.asset_name;

      const updatedMaintenances = maintenanceData.map((maintenance) => ({
        ...maintenance,
        assetName: assetName,
      }));

      setData(updatedMaintenances);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    readMaintenance();
  }, []);

  const formatDate = (inputDate) => {
    return moment(inputDate).format("DD/MM/YYYY");
  };

  const openViewMaintenanceModal = (maintenance) => {
    setSelectedMaintenance(maintenance);
    setViewModal(true);
  };

  const openAddMaintenanceModal = () => {
    setAddModal(true);
  };

  const openEditMaintenanceModal = (maintenance) => {
    setSelectedMaintenance(maintenance);
    setEditModal(true);
  };

  const closeViewMaintenanceModal = () => {
    setSelectedMaintenance(null);
    setViewModal(false);
  };

  const closeAddMaintenanceModal = () => {
    setAddModal(false);
  };

  const closeEditMaintenanceModal = () => {
    setSelectedMaintenance(null);
    setEditModal(false);
  };

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center">
        <b>Maintenance</b>
        <button
          onClick={openAddMaintenanceModal}
          className="btn btn-success my-3"
        >
          Add Maintenance
        </button>
      </div>
      <Add_Maintenance
        modal={addModal}
        toggle={closeAddMaintenanceModal}
        readMaintenance={readMaintenance}
      />
      <hr />
      <div className="mt-3">
        <table className="table table-bordered">
          <thead className="thead-light">
            <tr>
              <th>Sr.</th>
              <th>Schedule Date</th>
              <th>Title</th>
              <th>Maintenance By</th>
              <th>Status</th>
              <th>Completion Date</th>
              <th>Maintenance Cost</th>
              <th>Details</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {data.map((maintenance, index) => {
              return (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{formatDate(new Date(maintenance.main_date))}</td>
                  <td>{maintenance.main_title}</td>
                  <td>{maintenance.main_by}</td>
                  <td>
                    {maintenance.status
                      ? maintenance.status.mainStatus_name
                      : ""}
                  </td>
                  <td>{formatDate(new Date(maintenance.main_complete))}</td>
                  <td>{maintenance.main_cost}</td>
                  <td>{maintenance.main_details}</td>
                  <td>
                    <button
                      className="btn btn-warning btn-sm me-2"
                      onClick={() => openEditMaintenanceModal(maintenance)}
                    >
                      <i className="bi bi-pencil"></i>
                    </button>
                    <button
                      className="btn btn-primary btn-sm me-2"
                      onClick={() => openViewMaintenanceModal(maintenance)}
                    >
                      <i className="bi bi-eye"></i>
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <View_Maintenance
        modal={viewModal}
        toggle={closeViewMaintenanceModal}
        maintenance={selectedMaintenance}
      />
      <Edit_Maintenance
        modal={editModal}
        toggle={closeEditMaintenanceModal}
        maintenance={selectedMaintenance}
        readMaintenance={readMaintenance}
      />
    </div>
  );
}

export default Maintenance;
