// import axios from "axios";
// import React, { useState } from "react";
// import { Modal, ModalBody } from "reactstrap";
// import { useNavigate } from "react-router-dom";
// import Select from "react-select";

// function Add_User(props) {
//   const [data, setData] = useState({
//     u_name: "",
//     u_empid: "",
//     u_phone: "",
//     u_email: "",
//     location_id: "",
//     dept_id: "",
//   });

//   const navigate = useNavigate();

//   const handleSubmit = (event) => {
//     event.preventDefault();
//     const formdata = new FormData();
//     console.log(data);
//     formdata.append("u_name", data.u_name);
//     formdata.append("u_empid", data.u_empid);
//     formdata.append("u_phone", data.u_phone);
//     formdata.append("u_email", data.u_email);
//     formdata.append("location_id", data.location_id);
//     formdata.append("dept_id", data.dept_id);
//     axios
//       .post("http://localhost:8081/api/user/add_user", data)
//       .then((res) => {
//         props.toggle();
//         props.readData();
//         navigate("/user");
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
//   return (
//     <Modal size="lg" isOpen={props.modal} toggle={props.toggle}>
//       {/* <ModalHeader> Add New Category </ModalHeader> */}
//       <ModalBody>
//         <div className="fields">
//           <h4>Add New User</h4>
//           <form className="input-field" onSubmit={handleSubmit}>
//             <div className="g col-8 mx-auto">
//               <label htmlFor="inputUser" className="form-label">
//                 User Name
//               </label>
//               <input
//                 type="text"
//                 className="form-control"
//                 id="inputUser"
//                 autoComplete="off"
//                 onChange={(e) => setData({ ...data, u_name: e.target.value })}
//               />
//             </div>
//             <div className="g col-8 mx-auto">
//               <label htmlFor="inputUser" className="form-label">
//                 Employee Id
//               </label>
//               <input
//                 type="text"
//                 className="form-control"
//                 id="inputUser"
//                 autoComplete="off"
//                 onChange={(e) => setData({ ...data, u_empid: e.target.value })}
//               />
//             </div>
//             <div className="g col-8 mx-auto">
//               <label htmlFor="inputUser" className="form-label">
//                 Phone
//               </label>
//               <input
//                 type="text"
//                 className="form-control"
//                 id="inputUser"
//                 autoComplete="off"
//                 onChange={(e) => setData({ ...data, u_phone: e.target.value })}
//               />
//             </div>
//             <div className="g col-8 mx-auto">
//               <label htmlFor="inputLocation" className="form-label">
//                 Location
//               </label>
//               <Select
//                 options={assetLocationOptions}
//                 value={{ label: data.asset_location }}
//                 onChange={(selectedOption) =>
//                   setData({ ...data, asset_location: selectedOption.label })
//                 }
//               />
//             </div>
//             <div className="g col-8 mx-auto">
//               <label htmlFor="inputUser" className="form-label">
//                 Department
//               </label>
//               <input
//                 type="text"
//                 className="form-control"
//                 id="inputUser"
//                 autoComplete="off"
//                 onChange={(e) => setData({ ...data, dept_id: e.target.value })}
//               />
//             </div>

//             <div className="col-8 mb-3 d-grid gap-2 col-6 mx-auto">
//               <button type="submit" className="btn btn-success">
//                 Submit
//               </button>
//             </div>
//           </form>
//         </div>
//       </ModalBody>
//     </Modal>
//   );
// }

// export default Add_User;

import axios from "axios";
import React, { useState, useEffect } from "react";
import { Modal, ModalBody } from "reactstrap";
import { useNavigate } from "react-router-dom";
import Select from "react-select";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Add_User(props) {
  const [data, setData] = useState({
    u_name: "",
    u_empid: "",
    u_phone: "",
    u_email: "",
    location_id: "",
    dept_id: "",
  });

  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .post("http://localhost:8081/api/user/add_user", data)
      .then((res) => {
        props.toggle();
        props.readData();
        navigate("/user");
        toast("User Added Successfull.", {
          type: "success",
          autoClose: 1500,
          theme: "dark",
        });
      })
      .catch((err) => {
        console.error(err);
        toast("Error adding User.", { type: "error" }); // Add error toast
      });
  };

  const [assetLocationOptions, setLocationOptions] = useState([]);
  const [assetDepartmentOptions, setDepartmentOptions] = useState([]);

  useEffect(() => {
    getDepartment();
    getLocation();
  }, []);

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

        setDepartmentOptions(options);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <Modal size="lg" isOpen={props.modal} toggle={props.toggle}>
      <ModalBody>
        <div className="fields">
          <h4>Add New User</h4>
          <form className="input-field" onSubmit={handleSubmit}>
            <div className="g col-8 mx-auto">
              <label htmlFor="inputUser" className="form-label">
                User Name
              </label>
              <input
                type="text"
                className="form-control"
                id="inputUser"
                autoComplete="off"
                onChange={(e) => setData({ ...data, u_name: e.target.value })}
              />
            </div>
            <div className="g col-8 mx-auto">
              <label htmlFor="inputEmpId" className="form-label">
                Employee Id
              </label>
              <input
                type="text"
                className="form-control"
                id="inputEmpId"
                autoComplete="off"
                onChange={(e) => setData({ ...data, u_empid: e.target.value })}
              />
            </div>
            <div className="g col-8 mx-auto">
              <label htmlFor="inputPhone" className="form-label">
                Phone
              </label>
              <input
                type="text"
                className="form-control"
                id="inputPhone"
                autoComplete="off"
                onChange={(e) => setData({ ...data, u_phone: e.target.value })}
              />
            </div>
            <div className="g col-8 mx-auto">
              <label htmlFor="inputEmail" className="form-label">
                Email
              </label>
              <input
                type="text"
                className="form-control"
                id="inputEmail"
                autoComplete="off"
                onChange={(e) => setData({ ...data, u_email: e.target.value })}
              />
            </div>
            <div className="g col-8 mx-auto">
              <label htmlFor="inputLocation" className="form-label">
                Location
              </label>
              <Select
                options={assetLocationOptions}
                value={assetLocationOptions.find(
                  (option) => option.value === data.location_id
                )}
                onChange={(selectedOption) =>
                  setData({ ...data, location_id: selectedOption.value })
                }
              />
            </div>
            <br />
            <div className="g col-8 mx-auto">
              <label htmlFor="inputDepartment" className="form-label">
                Department
              </label>
              <Select
                options={assetDepartmentOptions}
                value={assetDepartmentOptions.find(
                  (option) => option.value === data.dept_id
                )}
                onChange={(selectedOption) =>
                  setData({ ...data, dept_id: selectedOption.value })
                }
              />
            </div>
            <br />
            <div className="col-8 mb-3 d-grid gap-2 col-6 mx-auto">
              <button type="submit" className="btn btn-success">
                Submit
              </button>
            </div>
          </form>
        </div>
      </ModalBody>
    </Modal>
  );
}

export default Add_User;
