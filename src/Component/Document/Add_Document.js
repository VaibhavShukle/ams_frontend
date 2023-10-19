// import axios from "axios";
// import React, { useState } from "react";
// import { Modal, ModalBody } from "reactstrap";
// import { useNavigate } from "react-router-dom";

// function Add_Document(props) {
//   const [data, setData] = useState({
//     dept_name: "",
//   });

//   const navigate = useNavigate();

//   const handleSubmit = (event) => {
//     event.preventDefault();
//     const formdata = new FormData();
//     console.log(data);
//     formdata.append("department_name", data.department_name);
//     axios
//       .post("http://localhost:8081/api/document/add_document", data)
//       .then((res) => {
//         props.toggle();
//         props.readData();
//         navigate("/department");
//       })
//       .catch((err) => console.log(err));
//   };

//   return (
//     <Modal size="lg" isOpen={props.modal} toggle={props.toggle}>
//       {/* <ModalHeader> Add New Category </ModalHeader> */}
//       <ModalBody>
//         <div className="fields">
//           <h4>Add New Document</h4>
//           <form className="input-field" onSubmit={handleSubmit}>
//             <div className="g col-8 mx-auto">
//               <label htmlFor="inputDepartment" className="form-label">
//                 Document
//               </label>
//               <input
//                 type="text"
//                 className="form-control"
//                 id="inputCategory"
//                 autoComplete="off"
//                 onChange={(e) =>
//                   setData({ ...data, dept_name: e.target.value })
//                 }
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

// export default Add_Document;

import axios from "axios";
import React, { useState, useEffect } from "react";
import { Modal, ModalBody, ModalHeader } from "reactstrap";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Add_Document(props) {
  const [data, setData] = useState({
    doc_name: null,
  });

  const navigate = useNavigate();
  const { id } = useParams();
  const { readDocument } = props;

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("doc_name", data.doc_name);

    axios
      .post(`http://localhost:8081/api/document/add_document/${id}`, formData)
      .then((res) => {
        props.toggle();
        navigate(`/view_asset/${id}`);
        toast("Document Added Successfull.", {
          type: "success",
          autoClose: 1500,
          theme: "dark",
        });
        updateDocumentList();
      })
      .catch((err) => {
        console.error(err);
        toast("Error", { type: "error" });
      });
  };

  const handleDocumentChange = (event) => {
    setData({ ...data, doc_name: event.target.files[0] });
  };

  const updateDocumentList = () => {
    readDocument();
  };

  useEffect(() => {
    updateDocumentList();
  }, []);
  return (
    <Modal size="md" isOpen={props.modal} toggle={props.toggle}>
      <ModalHeader> Add New Image </ModalHeader>
      <ModalBody>
        <div className="fields">
          <form className="input-field" onSubmit={handleSubmit}>
            <div className="input-field">
              <input
                type="file"
                className="form-control"
                id="inputGroupFile01"
                onChange={handleDocumentChange}
              />
            </div>
            <div className="text-end mt-3">
              <button
                type="button"
                className="btn btn-secondary me-2"
                onClick={props.toggle}
              >
                Close
              </button>
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

export default Add_Document;
