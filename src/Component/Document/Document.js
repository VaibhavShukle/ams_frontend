import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Add_Document from "./Add_Document";
import ConfirmationModal from "../ConfirmationModel/Confirmation_Modal";
import moment from "moment";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Document() {
  const [documentUrls, setDocumentUrls] = useState([]);
  const [documents, setDocuments] = useState([]);
  const [modal, setModal] = useState(false);
  const [isConfirmationModalOpen, setConfirmationModalOpen] = useState(false);
  const [selectedDocumentId, setselectedDocumentId] = useState(null);
  const [assetNames, setAssetNames] = useState({});

  const { id } = useParams();

  // Function to handle document upload
  const handleDocumentUpload = (event) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      const urls = Array.from(files).map((file) => URL.createObjectURL(file));
      setDocumentUrls((prevUrls) => [...prevUrls, ...urls]); // Use a function to update state
      setModal(false); // Close the modal after uploading
    }
  };
  // Function to fetch asset details and associated documents
  const readDocument = async () => {
    try {
      const assetResponse = await axios.get(
        `http://localhost:8081/api/asset/get/${id}`
      );
      const assetData = assetResponse.data.Result[0];
      const assetName = assetData.asset_name;

      const documentResponse = await axios.get(
        `http://localhost:8081/api/document/get/${id}`
      );
      const documentData = documentResponse.data.data;

      const updatedDocuments = documentData.map((doc) => ({
        ...doc,
        assetName: assetName,
      }));

      setDocuments(updatedDocuments);
    } catch (error) {
      console.error(error);
    }
  };

  // Function to handle document deletion
  const handleDelete = (docId) => {
    setConfirmationModalOpen(true);
    setselectedDocumentId(docId);
  };

  // Function to confirm document deletion
  const confirmDelete = () => {
    if (selectedDocumentId) {
      axios
        .delete(
          `http://localhost:8081/api/document/delete/${selectedDocumentId}`
        )
        .then((res) => {
          if (res.data.Status === "Success") {
            readDocument(); // Fetch documents again after deletion
            toast("Document Delete Successful.", {
              type: "success",
              autoClose: 1500,
              theme: "dark",
            });
          } else {
            toast("Error deleting document.", {
              type: "error",
              autoClose: 1500,
              theme: "dark",
            });
          }
        })
        .catch((err) => console.log(err));
    }
    setConfirmationModalOpen(false);
  };

  const formatDate = (inputDate) => {
    return moment(inputDate).format("DD/MM/YYYY"); // Adjust the format as needed
  };

  const toggle = () => {
    setModal(!modal); // Toggles the value of the modal state
  };

  useEffect(() => {
    // Fetch documents when the component mounts
    readDocument();
  }, [id]);

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center">
        <b>Document</b>
        <button onClick={() => setModal(true)} className="btn btn-success my-3">
          Add Document
        </button>
      </div>
      <Add_Document modal={modal} toggle={toggle} readDocument={readDocument} />

      <hr />
      <div className="mt-3">
        <table className="table table-bordered">
          <thead className="thead-light">
            <tr>
              <th>Sr.</th>
              <th>Asset Name</th>
              <th>File Name</th>
              <th>Uploaded Date</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {documents.map((document, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{document.assetName}</td>
                <td>{document.doc_name.split("/").pop()}</td>
                <td>{formatDate(document.doc_date)}</td>
                <td>
                  <a
                    download=""
                    href={`http://localhost:8081/${document.doc_name}`}
                    target="_blank"
                    className="btn btn-sm btn-primary"
                  >
                    <i className="bi bi-download"></i> Download
                  </a>
                  &nbsp; &nbsp;
                  <button
                    onClick={() => handleDelete(document.doc_id)}
                    className="btn btn-sm btn-danger"
                  >
                    <i className="bi bi-trash"></i> Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <ConfirmationModal
        isOpen={isConfirmationModalOpen}
        toggle={() => setConfirmationModalOpen(!isConfirmationModalOpen)}
        onConfirm={confirmDelete}
      />
    </div>
  );
}

export default Document;
