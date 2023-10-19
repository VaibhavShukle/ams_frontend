// import axios from "axios";
// import React, { useEffect, useState } from "react";
// import Add_User from "./Add_User";

// function List_User() {
//   const [data, setData] = useState([]);
//   const [modal, setModal] = useState(false);

//   const readUser = () => {
//     axios
//       .get("http://localhost:8081/api/user/getuser")
//       .then((res) => {
//         if (res.data.Status === "Success") {
//           setData(res.data.Result);
//         } else {
//           console.error("Error fetching user data");
//         }
//       })
//       .catch((err) => {
//         console.error("Error fetching user data:", err);
//       });
//   };

//   useEffect(() => {
//     readUser();
//   }, []);

//   const getLocationName = async (locationId) => {
//     try {
//       const response = await axios.get(
//         `http://localhost:8081/api/location/getLocationName/${locationId}`
//       );
//       if (response.data.Status === "Success") {
//         return response.data.Result.location_name;
//       } else {
//         console.error("Error fetching location name");
//         return "Unknown Location";
//       }
//     } catch (err) {
//       console.error("Error fetching location name:", err);
//       return "Unknown Location";
//     }
//   };

//   const getDepartmentName = async (deptId) => {
//     try {
//       const response = await axios.get(
//         `http://localhost:8081/api/department/getDepartmentName/${deptId}`
//       );
//       if (response.data.Status === "Success") {
//         return response.data.Result.department_name;
//       } else {
//         console.error("Error fetching department name");
//         return "Unknown Department";
//       }
//     } catch (err) {
//       console.error("Error fetching department name:", err);
//       return "Unknown Department";
//     }
//   };

//   const handleDelete = (id) => {
//     axios
//       .delete(`http://localhost:8081/api/user/delete/${id}`)
//       .then((res) => {
//         if (res.data.Status === "Success") {
//           readUser();
//         } else {
//           console.error("Error deleting user");
//         }
//       })
//       .catch((err) => {
//         console.error("Error deleting user:", err);
//       });
//   };

//   const handleToggleStatus = (id, newStatus) => {
//     axios
//       .put(`http://localhost:8081/api/user/toggleStatus/${id}`, {
//         status: newStatus ? "active" : "inactive",
//       })
//       .then((res) => {
//         if (res.data.Status === "Success") {
//           readUser();
//         } else {
//           console.error("Error toggling user status");
//         }
//       })
//       .catch((err) => {
//         console.error("Error toggling user status:", err);
//       });
//   };

//   const renderLocationAndDepartment = async () => {
//     const updatedData = await Promise.all(
//       data.map(async (user) => {
//         const locationName = await getLocationName(user.location_id);
//         const deptName = await getDepartmentName(user.dept_id);

//         return {
//           ...user,
//           locationName,
//           deptName,
//         };
//       })
//     );

//     setData(updatedData);
//   };

//   useEffect(() => {
//     renderLocationAndDepartment();
//   }, [data]);

//   return (
//     <div className="px-5 py-3">
//       <div className="d-flex justify-content-center mt-2">
//         <h3>User List</h3>
//       </div>

//       <button onClick={() => setModal(true)} className="btn btn-success my-3">
//         Add User
//       </button>

//       <Add_User
//         modal={modal}
//         toggle={() => setModal(!modal)}
//         readData={readUser}
//       />

//       <div className="mt-3">
//         <table className="table table-bordered">
//           <thead>
//             <tr>
//               <th>Sr.</th>
//               <th>Full Name</th>
//               <th>Employee ID</th>
//               <th>Phone</th>
//               <th>Email</th>
//               <th>Location</th>
//               <th>Department</th>
//               <th>Status</th>
//               <th>Action</th>
//             </tr>
//           </thead>
//           <tbody>
//             {data.map((user, index) => (
//               <tr key={index}>
//                 <td>{index + 1}</td>
//                 <td>{user.u_name}</td>
//                 <td>{user.u_empid}</td>
//                 <td>{user.u_phone}</td>
//                 <td>{user.u_email}</td>
//                 <td>{user.locationName}</td>
//                 <td>{user.deptName}</td>
//                 <td>
//                   {user.status === "inactive" ? (
//                     <button
//                       className="btn btn-sm btn-warning"
//                       onClick={() => handleToggleStatus(user.u_id, true)}
//                     >
//                       Inactive
//                     </button>
//                   ) : (
//                     <button
//                       className="btn btn-sm btn-success"
//                       onClick={() => handleToggleStatus(user.u_id, false)}
//                     >
//                       Active
//                     </button>
//                   )}
//                 </td>
//                 <td>
//                   <button
//                     onClick={() => handleDelete(user.u_id)}
//                     className="btn btn-sm btn-danger"
//                   >
//                     Delete
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// }

// export default List_User;

// import axios from "axios";
// import React, { useEffect, useState } from "react";

// import Add_User from "./Add_User";

// function List_User() {
//   const [data, setData] = useState([]);

//   const [modal, setModal] = useState(false);

//   const readUser = () => {
//     axios
//       .get(`http://localhost:8081/api/user/getuser`)
//       .then((res) => {
//         if (res.data.Status === "Success") {
//           setData(res.data.Result);
//         } else {
//           alert("Error");
//         }
//       })
//       .catch((err) => console.log(err));
//   };

//   useEffect(() => {
//     // eslint-disable-next-line
//     readUser();
//   }, []);

//   const handleDelete = (id) => {
//     axios
//       .delete("http://localhost:8081/api/user/delete/" + id)
//       .then((res) => {
//         if (res.data.Status === "Success") {
//           readUser();
//         } else {
//           alert("Error");
//         }
//       })
//       .catch((err) => console.log(err));
//   };

//   const handleToggleStatus = (id, newStatus) => {
//     console.log(newStatus);
//     axios
//       .put(`http://localhost:8081/api/user/toggleStatus/` + id, {
//         status: newStatus ? "active" : "inactive",
//       })
//       .then((res) => {
//         if (res.data.Status === "Success") {
//           readUser();
//         } else {
//           alert("Error");
//         }
//       })
//       .catch((err) => console.log(err));
//   };

//   return (
//     <div className="px-5 py-3">
//       <div className="d-flex justify-content-center mt-2">
//         <h3>Asset Department List</h3>
//       </div>
//       {/* <Link to="/add_assetType" className='btn btn-success my-3'>Add Asset Type</Link> */}

//       <button onClick={() => setModal(true)} className="btn btn-success my-3">
//         Add User
//       </button>

//       <Add_User
//         modal={modal}
//         toggle={() => setModal(!modal)}
//         readData={readUser}
//       />

//       <div className="mt-3">
//         <table className="table  table-bordered">
//           <thead>
//             <tr>
//               <th>Sr.</th>
//               <th>Full Name</th>
//               <th>Employee ID</th>
//               <th>Phone</th>
//               <th>Email</th>
//               <th>Location</th>
//               <th>Department</th>
//               <th>Status</th>
//               <th>Action</th>
//             </tr>
//           </thead>
//           <tbody>
//             {data.map((user, index) => {
//               return (
//                 <tr key={index}>
//                   <td>{index + 1}</td>
//                   <td>{user.u_name}</td>
//                   <td>{user.u_empid}</td>
//                   <td>{user.u_phone}</td>
//                   <td>{user.u_email}</td>
//                   <td>{user.location_id}</td>
//                   <td>{user.dept_id}</td>
//                   <td>
//                     {user.status === "inactive" ? (
//                       <button
//                         className="btn btn-sm btn-warning"
//                         onClick={() => handleToggleStatus(user.u_id, true)}
//                       >
//                         Inactive
//                       </button>
//                     ) : (
//                       <button
//                         className="btn btn-sm btn-success"
//                         onClick={() => handleToggleStatus(user.u_id, false)}
//                       >
//                         Active
//                       </button>
//                     )}
//                   </td>
//                   <td>
//                     {/* <Link to={`/view_asset/` + category.id} className='btn btn-primary btn-sm me-2'><i className="bi bi-pencil-square"></i></Link> */}
//                     {/* <Link to={`/edit_asset/` + category.id} className='btn btn-primary btn-sm me-2'>Edit</Link> */}
//                     <button
//                       onClick={(e) => handleDelete(user.u_id)}
//                       className="btn btn-sm btn-danger"
//                     >
//                       <i className="bi bi-trash"></i> Delete
//                     </button>
//                   </td>
//                 </tr>
//               );
//             })}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// }

// export default List_User;

import axios from "axios";
import React, { useEffect, useState } from "react";
import Add_User from "./Add_User";
import ConfirmationModal from "../../ConfirmationModel/Confirmation_Modal";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function List_User() {
  const [isConfirmationModalOpen, setConfirmationModalOpen] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);

  const [data, setData] = useState([]);
  const [modal, setModal] = useState(false);

  const readUser = () => {
    axios
      .get("http://localhost:8081/api/user/getuser")
      .then((res) => {
        if (res.data.Status === "Success") {
          setData(res.data.Result);
        } else {
          console.error("Error fetching user data");
        }
      })
      .catch((err) => {
        console.error("Error fetching user data:", err);
      });
  };

  useEffect(() => {
    readUser();
  }, []);

  const handleDelete = (id) => {
    setSelectedUserId(id);
    setConfirmationModalOpen(true);
  };

  const confirmDelete = () => {
    if (selectedUserId) {
      axios
        .delete(`http://localhost:8081/api/user/delete/${selectedUserId}`)
        .then((res) => {
          if (res.data.Status === "Success") {
            readUser();
            toast("User Delete Successfull.", {
              type: "success",
              autoClose: 1500,
              theme: "dark",
            });
          } else {
            console.error("Error deleting user");
          }
        })
        .catch((err) => {
          console.error("Error deleting user:", err);
        });
    }
    setConfirmationModalOpen(false);
  };

  const handleToggleStatus = (id, newStatus) => {
    axios
      .put(`http://localhost:8081/api/user/toggleStatus/${id}`, {
        status: newStatus ? "active" : "inactive",
      })
      .then((res) => {
        if (res.data.Status === "Success") {
          readUser();
        } else {
          console.error("Error toggling user status");
        }
      })
      .catch((err) => {
        console.error("Error toggling user status:", err);
      });
  };

  return (
    <div className="px-5 py-3">
      <div className="d-flex justify-content-center mt-2">
        <h3>User List</h3>
      </div>

      <button onClick={() => setModal(true)} className="btn btn-success my-3">
        Add User
      </button>

      <Add_User
        modal={modal}
        toggle={() => setModal(!modal)}
        readData={readUser}
      />

      <div className="mt-3">
        <table className="table table-bordered">
          <thead className="thead-light">
            <tr>
              <th>Sr.</th>
              <th>Full Name</th>
              <th>Employee ID</th>
              <th>Phone</th>
              <th>Email</th>
              <th>Location</th>
              <th>Department</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {data.map((user, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{user.u_name}</td>
                <td>{user.u_empid}</td>
                <td>{user.u_phone}</td>
                <td>{user.u_email}</td>
                <td>{user.locationName}</td>
                <td>{user.departmentName}</td>
                <td>
                  {user.status === "inactive" ? (
                    <button
                      className="btn btn-sm btn-warning"
                      onClick={() => handleToggleStatus(user.u_id, true)}
                    >
                      Inactive
                    </button>
                  ) : (
                    <button
                      className="btn btn-sm btn-success"
                      onClick={() => handleToggleStatus(user.u_id, false)}
                    >
                      Active
                    </button>
                  )}
                </td>
                <td>
                  <button
                    onClick={() => handleDelete(user.u_id)}
                    className="btn btn-sm btn-danger"
                  >
                    Delete
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
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default List_User;
