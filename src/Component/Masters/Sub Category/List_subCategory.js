import axios from "axios";
import React, { useEffect, useState } from "react";
import Add_subCategory from "./Add_subCategory";

function List_subCategory() {
  const [data, setData] = useState([]);

  const [modal, setModal] = useState(false);

  const readsubCategory = () => {
    axios
      .get(`http://localhost:8081/api/subcategory/getsubcategory`)
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
    readsubCategory();
  }, []);

  const handleDelete = (id) => {
    axios
      .delete("http://localhost:8081/api/subcategory/delete/" + id)
      .then((res) => {
        if (res.data.Status === "Success") {
          readsubCategory();
        } else {
          alert("Error");
        }
      })
      .catch((err) => console.log(err));
  };

  const handleToggleStatus = (id, newStatus) => {
    console.log(newStatus);
    axios
      .put(`http://localhost:8081/api/subcategory/toggleStatus/` + id, {
        status: newStatus ? "active" : "inactive",
      })
      .then((res) => {
        if (res.data.Status === "Success") {
          readsubCategory();
        } else {
          alert("Error");
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="px-5 py-3">
      <div className="d-flex justify-content-center mt-2">
        <h3>Asset Sub Category List</h3>
      </div>
      {/* <Link to="/add_assetType" className='btn btn-success my-3'>Add Asset Type</Link> */}

      <button onClick={() => setModal(true)} className="btn btn-success my-3">
        Add Sub Category
      </button>

      <Add_subCategory
        modal={modal}
        toggle={() => setModal(!modal)}
        readData={readsubCategory}
      />

      <div className="mt-3">
        <table className="table table-bordered">
          <thead className="thead-light">
            <tr>
              <th>Sr.</th>
              <th>Sub Category</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {data.map((subcategory, index) => {
              return (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{subcategory.subcategory_name}</td>
                  <td>
                    {subcategory.status === "inactive" ? (
                      <button
                        className="btn btn-sm btn-warning"
                        onClick={() =>
                          handleToggleStatus(subcategory.subcategory_id, true)
                        }
                      >
                        Inactive
                      </button>
                    ) : (
                      <button
                        className="btn btn-sm btn-success"
                        onClick={() =>
                          handleToggleStatus(subcategory.subcategory_id, false)
                        }
                      >
                        Active
                      </button>
                    )}
                  </td>
                  <td>
                    {/* <Link to={`/view_asset/` + subcategory.subcategory_id} className='btn btn-primary btn-sm me-2'><i className="bi bi-pencil-square"></i></Link> */}
                    {/* <Link to={`/edit_asset/` + subcategory.subcategory_id} className='btn btn-primary btn-sm me-2'>Edit</Link> */}
                    <button
                      onClick={(e) => handleDelete(subcategory.subcategory_id)}
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
    </div>
  );
}

export default List_subCategory;
