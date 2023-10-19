import axios from "axios";
import React, { useEffect, useState } from "react";
import { Modal, ModalBody, ModalHeader } from "reactstrap";
import Select from "react-select";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function ListAsset(props) {
  const [data, setData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [pageLimit] = useState(5);
  const [selectedAssets, setSelectedAssets] = useState([]);
  // const [selectedUserList, setSelectedUserList] = useState([]);
  const [selectedAssetsList, setSelectedAssetsList] = useState([]);
  const [assetLocationOptions, setLocationOptions] = useState([]);
  const [assetDepartmentOptions, setAssetDepartmentOptions] = useState([]);
  const [assetAssignOptions, setAssetAssignOptions] = useState([]);
  const [formData, setFormData] = useState({
    user_id: "",
    asset_id: "",
    assign_date: "",
    release_date: "",
    location_id: "",
    dept_id: "",
  });

  const navigate = useNavigate();

  useEffect(() => {
    readAsset();
    getLocation();
    getDepartment();
    getUser();
  }, [currentPage]);

  const readAsset = () => {
    axios
      .get(
        `http://localhost:8081/api/asset/getAssetCount?page=${currentPage}&limit=${pageLimit}`
      )
      .then((res) => {
        if (res.data.Status === "Success") {
          const assetsWithSelection = res.data.Result.map((asset) => ({
            ...asset,
            selected: false,
          }));
          setData(assetsWithSelection);
          setTotalPages(Math.ceil(res.data.TotalCount / pageLimit));
        } else {
          alert("Error");
        }
      })
      .catch((err) => console.log(err));
  };

  const handleToggleStatus = (id, newStatus) => {
    axios
      .put(`http://localhost:8081/api/asset/toggleStatus/` + id, {
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

  const searchAssetData = (value) => {
    axios
      .get("http://localhost:8081/api/asset/searchAsset?search=" + value)
      .then((res) => {
        if (res.data.Status === true) {
          setData(res.data.Result);
        } else {
          alert("Error");
        }
      })
      .catch((err) => console.log(err));
  };

  const toggleAssetSelection = (id) => {
    const updatedData = data.map((asset) => {
      if (asset.asset_id === id) {
        return { ...asset, selected: !asset.selected };
      }
      return asset;
    });
    setData(updatedData);

    const selectedAssetIds = updatedData
      .filter((asset) => asset.selected)
      .map((asset) => asset.asset_id);
    setSelectedAssets(selectedAssetIds);
  };

  const handleSelectAll = () => {
    const allSelected = data.every((asset) => asset.selected);
    const updatedData = data.map((asset) => ({
      ...asset,
      selected: !allSelected,
    }));
    setData(updatedData);

    const selectedAssetIds = updatedData
      .filter((asset) => asset.selected)
      .map((asset) => asset.asset_id);
    setSelectedAssets(selectedAssetIds);
  };

  const getLocation = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8081/api/location/getLocation/active"
      );

      if (response.data.Result) {
        const options = response.data.Result.map((asset) => ({
          value: asset.location_id,
          label: asset.location_name,
        }));

        setLocationOptions(options);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const addToSelectedAssets = () => {
    const selectedAssetsToAdd = data.filter((asset) =>
      selectedAssets.includes(asset.asset_id)
    );
    setSelectedAssetsList(selectedAssetsToAdd);
    setSelectedAssets([]);
    props.toggle();
  };

  const getUser = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8081/api/user/getuser/"
      );

      if (response.data.Result) {
        const options = response.data.Result.map((user_details) => ({
          value: user_details.u_id,
          label: user_details.u_name,
        }));

        setAssetAssignOptions(options);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const getDepartment = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8081/api/department/getDepartment/active"
      );

      if (response.data.Result) {
        const options = response.data.Result.map((department) => ({
          value: department.dept_id,
          label: department.dept_name,
        }));

        setAssetDepartmentOptions(options);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const selectedAssetIds = selectedAssetsList.map((asset) => asset.id);
    const selectedUserId = assetAssignOptions.find(
      (option) => option.label === formData.user_id
    ).value;
    const selectedLocationId = assetLocationOptions.find(
      (option) => option.label === formData.location_id
    ).value;
    const selectedDeptId = assetDepartmentOptions.find(
      (option) => option.label === formData.dept_id
    ).value;

    const checkoutData = {
      user_id: selectedUserId,
      asset_ids: selectedAssetIds,
      assign_date: formData.assign_date,
      release_date: formData.release_date,
      location_id: selectedLocationId,
      dept_id: selectedDeptId,
    };

    axios
      .post("http://localhost:8081/api/checkout/add_checkout", checkoutData)
      .then((res) => {
        navigate("/checkin");
        toast("Checkout Successfully.", {
          type: "success",
          autoClose: 1500,
          theme: "dark",
        });
      })
      .catch((err) => {
        console.log(err);
        toast("Error occurred.", {
          type: "error",
          autoClose: 1500,
          theme: "dark",
        });
      });
  };
  return (
    <div>
      <Modal isOpen={props.modal} toggle={props.toggle}>
        <ModalHeader> Select Asset </ModalHeader>
        <ModalBody>
          <div className="form-body d-flex flex-column align-items-center pt-1">
            <div className="d-flex justify-content-center mt-2">
              <h3>Select Asset</h3>
            </div>
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
                    <th>
                      <input
                        type="checkbox"
                        onChange={handleSelectAll}
                        checked={
                          data.length > 0 &&
                          data.every((asset) => asset.selected)
                        }
                      />
                    </th>
                    <th>Asset ID</th>
                    <th>Asset Name</th>
                    {/* <th>Brand</th> */}
                    <th>Assign To</th>
                    <th>Location</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {data.length > 0 ? (
                    data.map((asset, index) => (
                      <tr key={index}>
                        <td>
                          <input
                            type="checkbox"
                            onChange={() =>
                              toggleAssetSelection(asset.asset_id)
                            }
                            checked={asset.selected}
                          />
                        </td>
                        <td>{asset.asset_id}</td>
                        <td>{asset.asset_name}</td>
                        {/* <td>{asset.asset_brand}</td> */}
                        <td>{asset.u_name}</td>
                        <td>{asset.asset_location}</td>
                        <td>
                          {asset.status == 1 ? (
                            <button
                              className="btn btn-sm btn-success"
                              onClick={() =>
                                handleToggleStatus(asset.asset_id, true)
                              }
                            >
                              Available
                            </button>
                          ) : (
                            <button
                              className="btn btn-sm btn-warning"
                              onClick={() =>
                                handleToggleStatus(asset.asset_id, false)
                              }
                            >
                              unavailable
                            </button>
                          )}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="7">No data available</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
            <div className="d-flex justify-content-center">
              <button
                onClick={() => setCurrentPage(currentPage - 1)}
                disabled={currentPage === 1}
                className="btn btn-outline-danger me-2"
              >
                {" "}
                Previous{" "}
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
            <div className="d-flex justify-content-center mt-3">
              <button
                onClick={addToSelectedAssets}
                disabled={selectedAssets.length === 0}
                className="btn btn-success"
              >
                Add to List
              </button>
            </div>
          </div>
        </ModalBody>
      </Modal>

      <div>
        <form onSubmit={handleSubmit}>
          {selectedAssetsList.length > 0 && (
            <div>
              <h5>Selected Assets:</h5>
              <table className="table table-bordered">
                <thead className="thead-light">
                  <tr>
                    <th>Asset Name</th>
                    <th>Brand</th>
                    <th>Assign To</th>
                    <th>Location</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {selectedAssetsList.map((asset) => (
                    <tr key={asset.asset_id}>
                      <td>{asset.asset_name}</td>
                      <td>{asset.asset_brand}</td>
                      <td>{asset.u_name}</td>
                      <td>{asset.asset_location}</td>
                      <td>
                        {asset.status == 0 ? (
                          <button
                            className="btn btn-sm btn-warning"
                            onClick={() =>
                              handleToggleStatus(asset.asset_id, false)
                            }
                          >
                            Unavailable
                          </button>
                        ) : (
                          <button
                            className="btn btn-sm btn-success"
                            onClick={() =>
                              handleToggleStatus(asset.asset_id, true)
                            }
                          >
                            Available
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <div className="row" style={{ marginTop: "60px" }}>
                {/* <div className="fields"> */}
                <div className="col-sm">
                  <label htmlFor="inputLocation" className="form-label">
                    Asset Location
                  </label>
                  <Select
                    options={assetLocationOptions}
                    value={{ label: formData.location_id }}
                    onChange={(selectedOption) =>
                      setFormData({
                        ...formData,
                        location_id: selectedOption.label,
                      })
                    }
                  />
                </div>
                <div className="col-sm">
                  <label className="form-label" htmlFor="dateAquire">
                    Check-out Date
                  </label>
                  <input
                    type="date"
                    className="form-control"
                    id="dateAquire"
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        assign_date: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="col-sm">
                  <label className="form-label" htmlFor="dateAquire">
                    Due date
                  </label>
                  <input
                    type="date"
                    className="form-control"
                    id="dateAquire"
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        release_date: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="col-sm">
                  <label htmlFor="inputDepartment" className="form-label">
                    Department
                  </label>
                  <Select
                    options={assetDepartmentOptions}
                    value={{ label: formData.dept_id }}
                    onChange={(selectedOption) =>
                      setFormData({
                        ...formData,
                        dept_id: selectedOption.label,
                      })
                    }
                  />
                </div>
                <div className="col-sm">
                  <label htmlFor="inputAssign" className="form-label">
                    Assign to
                  </label>
                  <Select
                    options={assetAssignOptions}
                    value={{ label: formData.user_id }}
                    onChange={(selectedOption) =>
                      setFormData({
                        ...formData,
                        user_id: selectedOption.label,
                      })
                    }
                  />
                </div>
                <div
                  className="col-7 mb-3 d-grid gap-2 col-6 mx-auto"
                  style={{ marginTop: "100px" }}
                >
                  <button type="submit" className="btn btn-success">
                    Submit
                  </button>
                </div>
              </div>
            </div>
            // </div>
          )}
        </form>
      </div>
    </div>
  );
}

export default ListAsset;

// import axios from "axios";
// import React, { useEffect, useState } from "react";
// import { Modal, ModalBody, ModalHeader } from "reactstrap";
// import Select from "react-select";
// import { useNavigate } from "react-router-dom";

// function ListAsset(props) {
//   const [data, setData] = useState({
//     user_id: "",
//     asset_id: "",
//     assign_date: "",
//     release_date: "",
//     location_id: "",
//     dept_id: "",
//   });

//   const navigate = useNavigate();

//   const handleSubmit = async (event) => {
//     event.preventDefault();
//     const checkoutData = new FormData();
//     checkoutData.append("user_id", data.user_id);
//     checkoutData.append("asset_id", data.asset_id);
//     checkoutData.append("assign_date", data.assign_date);
//     checkoutData.append("release_date", data.release_date);
//     checkoutData.append("location_id", data.location_id);
//     checkoutData.append("dept_id", data.dept_id);

//     console.log(data);

//     axios
//       .post("http://localhost:8081/api/checkout/add_checkout", data)
//       .then((res) => {
//         navigate("/checkout");
//       })
//       .catch((err) => console.log(err));
//   };

//   const [selectedAssets, setSelectedAssets] = useState([]);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [currentPage, setCurrentPage] = useState(1);
//   const [totalPages, setTotalPages] = useState(1);
//   const [pageLimit, setPageLimit] = useState(5);
//   const [selectedAssetDetails, setSelectedAssetDetails] = useState([]);
//   const [selectedAssetLocation, setSelectedAssetLocation] = useState(null);
//   const [assetPurchaseDate, setAssetPurchaseDate] = useState("");
//   const [selectedAssetsList, setSelectedAssetsList] = useState([]);

//   useEffect(() => {
//     readAsset();
//     getAssetLocation();
//     getDepartment();
//     getUser();
//   }, [currentPage]);

//   const readAsset = () => {
//     axios
//       .get(
//         `http://localhost:8081/api/asset/getAssetCount?page=${currentPage}&limit=${pageLimit}`
//       )
//       .then((res) => {
//         if (res.data.Status === "Success") {
//           const assetsWithSelection = res.data.Result.map((asset) => ({
//             ...asset,
//             selected: false,
//           }));
//           setData(assetsWithSelection);
//           setTotalPages(Math.ceil(res.data.TotalCount / pageLimit));
//         } else {
//           alert("Error");
//         }
//       })
//       .catch((err) => console.log(err));
//   };

//   const handleToggleStatus = (id, newStatus) => {
//     axios
//       .put(`http://localhost:8081/api/asset/toggleStatus/` + id, {
//         status: newStatus ? "active" : "inactive",
//       })
//       .then((res) => {
//         if (res.data.Status === "Success") {
//           readAsset();
//         } else {
//           alert("Error");
//         }
//       })
//       .catch((err) => console.log(err));
//   };
//   const [assetLocationOptions, setAssetLocationOptions] = useState([]);

//   const getAssetLocation = async () => {
//     try {
//       const response = await axios.get(
//         "http://localhost:8081/api/asset/getAssetLocation/active"
//       );

//       if (response.data.Result) {
//         const options = response.data.Result.map((asset) => ({
//           value: asset.location_id,
//           label: asset.location_name,
//         }));

//         setAssetLocationOptions(options);
//       }
//     } catch (error) {
//       console.log(error.message);
//     }
//   };

//   const addToSelectedAssets = () => {
//     const selectedAssetsToAdd = data.filter((asset) =>
//       selectedAssets.includes(asset.asset_id)
//     );
//     setSelectedAssetsList(selectedAssetsToAdd);
//     setSelectedAssets([]);
//     props.toggle();
//   };

//   const toggleAssetSelection = (id) => {
//     const updatedData = data.map((asset) => {
//       if (asset.asset_id === id) {
//         return { ...asset, selected: !asset.selected };
//       }
//       return asset;
//     });
//     setData(updatedData);

//     const selectedAssetIds = updatedData
//       .filter((asset) => asset.selected)
//       .map((asset) => asset.asset_id);
//     setSelectedAssets(selectedAssetIds);
//   };

//   const handleSelectAll = () => {
//     const allSelected = data.every((asset) => asset.selected);
//     const updatedData = data.map((asset) => ({
//       ...asset,
//       selected: !allSelected,
//     }));
//     setData(updatedData);

//     const selectedAssetIds = updatedData
//       .filter((asset) => asset.selected)
//       .map((asset) => asset.asset_id);
//     setSelectedAssets(selectedAssetIds);
//   };
//   const [assetAssignOptions, setAssetAssignOptions] = useState([]);

//   const getUser = async () => {
//     try {
//       const response = await axios.get(
//         "http://localhost:8081/api/user/getUser/active"
//       );

//       if (response.data.Result) {
//         const options = response.data.Result.map((user_details) => ({
//           value: user_details.u_id,
//           label: user_details.u_name,
//         }));

//         setAssetAssignOptions(options);
//       }
//     } catch (error) {
//       console.log(error.message);
//     }
//   };

//   const [assetDepartmentOptions, setAssetDepartmentOptions] = useState([]);

//   const getDepartment = async () => {
//     try {
//       const response = await axios.get(
//         "http://localhost:8081/api/department/getDepartment/active"
//       );

//       if (response.data.Result) {
//         const options = response.data.Result.map((department) => ({
//           value: department.dept_id,
//           label: department.dept_name,
//         }));

//         setAssetDepartmentOptions(options);
//       }
//     } catch (error) {
//       console.log(error.message);
//     }
//   };

//   //   const selectedAssetsToAdd = data.filter((asset) =>
//   //     selectedAssets.includes(asset.asset_id)
//   //   );

//   //   setSelectedAssetDetails(selectedAssetsToAdd);

//   //   setSelectedAssets([]);
//   //   props.toggle();
//   // };

//   return (
//     <div>
//       <Modal isOpen={props.modal} toggle={props.toggle}>
//         <ModalHeader> Select Asset </ModalHeader>
//         <ModalBody>
//           <div className="form-body d-flex flex-column align-items-center pt-1">
//             <div className="d-flex justify-content-center mt-2">
//               <h3>Select Asset</h3>
//             </div>
//             <div className="d-flex justify-content-end">
//               <input
//                 type="text"
//                 placeholder="Search..."
//                 className="form-control"
//                 value={searchQuery}
//                 onChange={(e) => {
//                   searchAssetData(e.target.value);
//                   setSearchQuery(e.target.value);
//                 }}
//               />
//             </div>

//             <div className="mt-3">
//               <table className="table table-bordered">
//                 <thead className="thead-light">
//                   <tr>
//                     <th>
//                       <input
//                         type="checkbox"
//                         onChange={handleSelectAll}
//                         checked={
//                           data.length > 0 &&
//                           data.every((asset) => asset.selected)
//                         }
//                       />
//                     </th>
//                     <th>Asset ID</th>
//                     <th>Asset Name</th>
//                     <th>Brand</th>
//                     <th>Assign To</th>
//                     <th>Location</th>
//                     <th>Status</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {data.length > 0 ? (
//                     data.map((asset, index) => (
//                       <tr key={index}>
//                         <td>
//                           <input
//                             type="checkbox"
//                             onChange={() =>
//                               toggleAssetSelection(asset.asset_id)
//                             }
//                             checked={asset.selected}
//                           />
//                         </td>
//                         <td>{asset.asset_id}</td>
//                         <td>{asset.asset_name}</td>
//                         <td>{asset.asset_brand}</td>
//                         <td>{asset.asset_asignTo}</td>
//                         <td>{asset.asset_location}</td>
//                         <td>
//                           {asset.status ? (
//                             <button
//                               className="btn btn-sm btn-warning"
//                               onClick={() =>
//                                 handleToggleStatus(asset.asset_id, false)
//                               }
//                             >
//                               Unavailable
//                             </button>
//                           ) : (
//                             <button
//                               className="btn btn-sm btn-success"
//                               onClick={() =>
//                                 handleToggleStatus(asset.asset_id, true)
//                               }
//                             >
//                               Available
//                             </button>
//                           )}
//                         </td>
//                       </tr>
//                     ))
//                   ) : (
//                     <tr>
//                       <td colSpan="7">No data available</td>
//                     </tr>
//                   )}
//                 </tbody>
//               </table>
//             </div>
//             <div className="d-flex justify-content-center">
//               <button
//                 onClick={() => setCurrentPage(currentPage - 1)}
//                 disabled={currentPage === 1}
//                 className="btn btn-outline-danger me-2"
//               >
//                 {" "}
//                 Previous{" "}
//               </button>
//               <span>
//                 Page {currentPage} of {totalPages}
//               </span>
//               <button
//                 onClick={() => setCurrentPage(currentPage + 1)}
//                 disabled={currentPage === totalPages}
//                 className="btn btn-outline-success ms-2"
//               >
//                 Next
//               </button>
//             </div>
//             <div className="d-flex justify-content-center mt-3">
//               <button
//                 // onClick={performActionOnSelected}
//                 onClick={addToSelectedAssets}
//                 disabled={selectedAssets.length === 0}
//                 className="btn btn-success"
//               >
//                 Add to List
//               </button>
//             </div>
//           </div>
//         </ModalBody>
//       </Modal>

//       <div>
//         <form onSubmit={handleSubmit}>
//           {selectedAssetsList.length > 0 && (
//             <div>
//               <h5>Selected Assets:</h5>
//               <table className="table table-bordered">
//                 <thead className="thead-light">
//                   <tr>
//                     <th>Asset Name</th>
//                     <th>Brand</th>
//                     <th>Assign To</th>
//                     <th>Location</th>
//                     <th>Status</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {selectedAssetsList.map((asset) => (
//                     <tr key={asset.asset_id}>
//                       <td>{asset.asset_name}</td>
//                       <td>{asset.asset_brand}</td>
//                       <td>{asset.asset_asignTo}</td>
//                       <td>{asset.asset_location}</td>
//                       <td>
//                         {asset.status ? (
//                           <button
//                             className="btn btn-sm btn-warning"
//                             onClick={() =>
//                               handleToggleStatus(asset.asset_id, false)
//                             }
//                           >
//                             Unavailable
//                           </button>
//                         ) : (
//                           <button
//                             className="btn btn-sm btn-success"
//                             onClick={() =>
//                               handleToggleStatus(asset.asset_id, true)
//                             }
//                           >
//                             Available
//                           </button>
//                         )}
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>

//               <div className="container" style={{ marginTop: "60px" }}>
//                 <div className="fields">
//                   <div className="input-field">
//                     <label htmlFor="inputLocation" className="form-label">
//                       Asset Location
//                     </label>
//                     <Select
//                       options={assetLocationOptions}
//                       value={{ label: data.location_id }}
//                       onChange={(selectedOption) =>
//                         setData({
//                           ...data,
//                           location_id: selectedOption.label,
//                         })
//                       }
//                     />
//                   </div>
//                   <div className="input-field">
//                     <label className="form-label" htmlFor="dateAquire">
//                       Check-out Date
//                     </label>
//                     <input
//                       type="date"
//                       className="form-control"
//                       id="dateAquire"
//                       onChange={(e) =>
//                         setData({ ...data, assign_date: e.target.value })
//                       }
//                     />
//                   </div>
//                   <div className="input-field">
//                     <label className="form-label" htmlFor="dateAquire">
//                       Due date
//                     </label>
//                     <input
//                       type="date"
//                       className="form-control"
//                       id="dateAquire"
//                       onChange={(e) =>
//                         setData({ ...data, release_date: e.target.value })
//                       }
//                     />
//                   </div>
//                   <div className="input-field">
//                     <label htmlFor="inputDepartment" className="form-label">
//                       Department
//                     </label>
//                     <Select
//                       options={assetDepartmentOptions}
//                       value={{ label: data.dept_id }}
//                       onChange={(selectedOption) =>
//                         setData({ ...data, dept_id: selectedOption.label })
//                       }
//                     />
//                   </div>
//                   <div className="input-field">
//                     <label htmlFor="inputAssign" className="form-label">
//                       Assign to
//                     </label>
//                     <Select
//                       options={assetAssignOptions}
//                       value={{ label: data.user_id }}
//                       onChange={(selectedOption) =>
//                         setData({ ...data, user_id: selectedOption.label })
//                       }
//                     />
//                   </div>
//                   <div
//                     className="col-12  d-grid gap-2 col-6 mx-auto"
//                     style={{ marginTop: "30px" }}
//                   >
//                     <button type="submit" className="btn btn-success">
//                       Submit
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           )}
//         </form>
//       </div>
//     </div>
//   );
// }

// export default ListAsset;
