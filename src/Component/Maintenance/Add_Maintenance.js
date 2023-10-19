import axios from "axios";
import React, { useState, useEffect } from "react";
import Select from "react-select";
import { Modal, ModalBody, ModalHeader } from "reactstrap";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Add_Maintenance(props) {
  const [data, setData] = useState({
    asset_id: "",
    main_title: "",
    main_details: "",
    main_date: "",
    main_by: "",
    mainStatus_id: "",
    main_complete: "",
    main_cost: "",
  });
  const navigate = useNavigate();
  const { id } = useParams();
  const { readMaintenance } = props;

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData();

    formData.append("asset_id", id);
    formData.append("main_title", data.main_title);
    formData.append("main_details", data.main_details);
    formData.append("main_date", data.main_date);
    formData.append("main_by", data.main_by);
    formData.append("mainStatus_id", data.mainStatus_id);
    formData.append("main_complete", data.main_complete);
    formData.append("main_cost", data.main_cost);

    axios
      .post(`http://localhost:8081/api/maintenance/add_maintenance/${id}`, data)
      .then((res) => {
        props.toggle();
        navigate(`/view_asset/${id}`);
        toast("Maintenance Added Successfully.", {
          type: "success",
          autoClose: 1500,
          theme: "dark",
        });
        updateMaintenanceList();
      })
      .catch((err) => {
        console.error(err);
        toast.error("Error");
      });
  };

  const [mainStatusOptions, setMainStatusOptions] = useState([]);

  const getMainStatus = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8081/api/main_status/getMain_Status/active`
      );

      if (response.data.Status) {
        const options = response.data.Result.map((main_status) => ({
          value: main_status.mainStatus_id,
          label: main_status.mainStatus_name,
        }));

        setMainStatusOptions(options);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const updateMaintenanceList = () => {
    readMaintenance();
  };

  useEffect(() => {
    getMainStatus();
    updateMaintenanceList();
  }, []);

  return (
    <Modal size="lg" isOpen={props.modal} toggle={props.toggle}>
      <ModalHeader> Add Maintenance </ModalHeader>
      <ModalBody>
        <div className="fields">
          <form className="input-field" onSubmit={handleSubmit}>
            <div className="g col-8 mx-auto">
              <label htmlFor="inputTitle" className="form-label">
                Title
              </label>
              <input
                type="text"
                className="form-control"
                id="inputTitle"
                autoComplete="off"
                value={data.main_title}
                onChange={(e) =>
                  setData({ ...data, main_title: e.target.value })
                }
              />
            </div>
            <div className="g col-8 mx-auto">
              <label
                htmlFor="exampleFormControlTextarea1"
                className="form-label"
              >
                Details
              </label>
              <textarea
                style={{ height: "100px" }}
                className="form-control"
                autoComplete="off"
                value={data.main_details}
                onChange={(e) =>
                  setData({ ...data, main_details: e.target.value })
                }
              />
            </div>
            <div className="g col-8 mx-auto">
              <label htmlFor="inputDueDate" className="form-label">
                Due Date
              </label>
              <input
                type="date"
                className="form-control"
                id="inputDueDate"
                autoComplete="off"
                value={data.main_date}
                onChange={(e) =>
                  setData({ ...data, main_date: e.target.value })
                }
              />
            </div>
            <div className="g col-8 mx-auto">
              <label htmlFor="inputMainBy" className="form-label">
                Maintenance By
              </label>
              <input
                type="text"
                className="form-control"
                id="inputMainBy"
                autoComplete="off"
                value={data.main_by}
                onChange={(e) => setData({ ...data, main_by: e.target.value })}
              />
            </div>
            <div className="g col-8 mx-auto">
              <label htmlFor="inputMainStatus" className="form-label">
                Maintenance Status
              </label>
              <Select
                options={mainStatusOptions}
                value={{ label: data.mainStatus_name }}
                onChange={(selectedOption) => {
                  setData({
                    ...data,
                    mainStatus_name: selectedOption.label,
                    mainStatus_id: selectedOption.value,
                  });
                }}
              />
            </div>
            <div className="g col-8 mx-auto">
              <label htmlFor="inputCompleteDate" className="form-label">
                Date Completed
              </label>
              <input
                type="date"
                className="form-control"
                id="inputCompleteDate"
                autoComplete="off"
                value={data.main_complete}
                onChange={(e) =>
                  setData({ ...data, main_complete: e.target.value })
                }
              />
            </div>
            <div className="g col-8 mx-auto">
              <label htmlFor="inputMainCost" className="form-label">
                Maintenance Cost
              </label>
              <input
                type="text"
                className="form-control"
                id="inputMainCost"
                autoComplete="off"
                value={data.main_cost}
                onChange={(e) =>
                  setData({ ...data, main_cost: e.target.value })
                }
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

export default Add_Maintenance;
