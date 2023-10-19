import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { format } from "date-fns";
import ReactToPrint from "react-to-print";

function List_Asset() {
  const [data, setData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const pageLimit = 5; // Set the page limit directly

  const readAsset = () => {
    axios
      .get(
        `http://localhost:8081/api/asset/getAssetCount?page=${currentPage}&limit=${pageLimit}`
      )
      .then((res) => {
        if (res.data.Status === "Success") {
          setData(res.data.Result);
          setTotalPages(Math.ceil(res.data.TotalCount / pageLimit));
        } else {
          alert("Error");
        }
      })
      .catch((err) => console.log(err));
  };

  const searchAssetData = (value) => {
    axios
      .get("http://localhost:8081/api/asset/searchAsset?search=" + value)
      .then((res) => {
        if (res.data.Status === "Success") {
          // Correct the condition
          setData(res.data.Result);
        } else {
          alert("Error");
        }
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    readAsset();
  }, [currentPage]);

  const handleDelete = (id) => {
    const shouldDelete = window.confirm(
      "Are you sure you want to delete this asset?"
    );
    if (shouldDelete) {
      axios
        .delete(`http://localhost:8081/api/asset/delete/${id}`)
        .then((res) => {
          if (res.data.Status === "Success") {
            readAsset();
          } else {
            alert("Error");
          }
        })
        .catch((err) => console.log(err));
    }
  };

  const handleToggleStatus = (id, newStatus) => {
    axios
      .put(`http://localhost:8081/api/asset/toggleStatus/${id}`, {
        Status: newStatus,
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

      <Link to="/add_asset" className="btn btn-success my-3">
        Add Asset
      </Link>
      <div className="d-flex justify-content-end">
        <input
          type="text"
          placeholder="Search..."
          className="form-control"
          value={searchQuery}
          onChange={(e) => {
            searchAssetData(e.target.value);
            setSearchQuery(e.target.value);
          }}
        />
      </div>

      <div className="mt-3">
        <table className="table table-bordered">
          <thead className="thead-light">
            <tr>
              <th>Sr</th>
              <th>Image</th>
              <th>Asset ID</th>
              <th>Asset Name</th>
              <th>Brand</th>
              <th>Purchase Date</th>
              <th>Cost</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {data.map((assets, index) => {
              return (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>
                    <img
                      src={`http://localhost:8081/${assets.asset_image}`}
                      alt=""
                      className="asset_image"
                    />
                  </td>
                  <td>{assets.asset_id}</td>
                  <td>{assets.asset_name}</td>
                  <td>{assets.asset_brand}</td>
                  <td>
                    {format(new Date(assets.asset_purchaseDate), "dd/MM/yyyy")}
                  </td>
                  <td>{assets.asset_Cost}</td>
                  <td>
                    {assets.status ? (
                      <button
                        className="btn btn-sm btn-success"
                        onClick={() => handleToggleStatus(assets.id, false)}
                      >
                        Available
                      </button>
                    ) : (
                      <button
                        className="btn btn-sm btn-warning"
                        onClick={() => handleToggleStatus(assets.id, true)}
                      >
                        Unavailable
                      </button>
                    )}
                  </td>
                  <td>
                    <Link
                      to={`/view_asset/${assets.id}`}
                      className="btn btn-primary btn-sm me-2"
                    >
                      <i className="bi bi-eye"></i>
                    </Link>
                    <Link
                      to={`/edit_asset/${assets.id}`}
                      className="btn btn-warning btn-sm me-2"
                    >
                      <i className="bi bi-pencil"></i>
                    </Link>
                    <button
                      onClick={() => handleDelete(assets.id)}
                      className="btn btn-sm btn-danger"
                    >
                      <i className="bi bi-trash"></i>
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div className="d-flex justify-content-center">
        <button
          onClick={() => setCurrentPage(currentPage - 1)}
          disabled={currentPage === 1}
          className="btn btn-outline-danger me-2"
        >
          Previous
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() => setCurrentPage(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="btn btn-outline-success ms-2"
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default List_Asset;
