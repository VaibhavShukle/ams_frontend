import axios from "axios";
import React, { useEffect, useState } from "react";
import Add_Department from "./Add_Department";
import ConfirmationModal from "../../ConfirmationModel/Confirmation_Modal";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function List_Department() {
  const [isConfirmationModalOpen, setConfirmationModalOpen] = useState(false);
  const [selectedDepartmentId, setSelectedDepartmentId] = useState(null);
  const [data, setData] = useState([]);
  const [modal, setModal] = useState(false);

  const readDepartment = () => {
    axios
      .get(`http://localhost:8081/api/department/getDepartment`)
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
    readDepartment();
  }, []);

  const handleDelete = (id) => {
    setSelectedDepartmentId(id);
    setConfirmationModalOpen(true);
  };

  const confirmDelete = () => {
    if (selectedDepartmentId) {
      axios
        .delete(
          `http://localhost:8081/api/department/delete/${selectedDepartmentId}`
        )
        .then((res) => {
          if (res.data.Status === "Success") {
            readDepartment();
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
      .put(`http://localhost:8081/api/department/toggleStatus/` + id, {
        status: newStatus ? "active" : "inactive",
      })
      .then((res) => {
        if (res.data.Status === "Success") {
          readDepartment();
        } else {
          alert("Error");
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="px-5 py-3">
      <div className="d-flex justify-content-center mt-2">
        <h3>Asset Department List</h3>
      </div>
      {/* <Link to="/add_assetType" className='btn btn-success my-3'>Add Asset Type</Link> */}

      <button onClick={() => setModal(true)} className="btn btn-success my-3">
        Add Department
      </button>

      <Add_Department
        modal={modal}
        toggle={() => setModal(!modal)}
        readData={readDepartment}
      />

      <div className="mt-3">
        <table className="table  table-bordered">
          <thead className="thead-light">
            <tr>
              <th>Sr.</th>
              <th>Department</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {data.map((department, index) => {
              return (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{department.dept_name}</td>
                  <td>
                    {department.status === "inactive" ? (
                      <button
                        className="btn btn-sm btn-warning"
                        onClick={() =>
                          handleToggleStatus(department.dept_id, true)
                        }
                      >
                        Inactive
                      </button>
                    ) : (
                      <button
                        className="btn btn-sm btn-success"
                        onClick={() =>
                          handleToggleStatus(department.dept_id, false)
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
                      onClick={(e) => handleDelete(department.dept_id)}
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

export default List_Department;
