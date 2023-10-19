import axios from "axios";
import React, { useEffect, useState, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import moment from "moment";
import ReactToPrint from "react-to-print";
import { Tab, Tabs } from "react-bootstrap";
import Document from "../Document/Document";
import Photos from "../Photos/Photos";
import Warranty from "../Warranty/Warranty";
import Maintenance from "../Maintenance/Maintenance";

function View_Asset() {
  // const [modal, setModal] = useState(false);
  const [data, setData] = useState({
    asset_id: "",
    asset_name: "",
    // asset_type: "",
    asset_brand: "",
    asset_model: "",
    asset_location: "",
    asset_purchaseDate: "",
    asset_Cost: "",
    asset_owner: "",
    asset_vendorInfo: "",
    asset_serialNumber: "",
    asset_physicalCondition: "",
    asset_image: "",
  });
  const assetDetailsRef = useRef(null);
  document.save = "asset details.pdf";
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    axios
      .get("http://localhost:8081/api/asset/get/" + id)
      .then((res) => {
        setData({
          ...data,
          asset_id: res.data.Result[0].asset_id,
          asset_name: res.data.Result[0].asset_name,
          // asset_type: res.data.Result[0].asset_type,
          asset_brand: res.data.Result[0].asset_brand,
          asset_model: res.data.Result[0].asset_model,
          asset_location: res.data.Result[0].asset_location,
          asset_purchaseDate: res.data.Result[0].asset_purchaseDate,
          asset_Cost: res.data.Result[0].asset_Cost,
          asset_owner: res.data.Result[0].asset_owner,
          asset_vendorInfo: res.data.Result[0].asset_vendorInfo,
          asset_serialNumber: res.data.Result[0].asset_serialNumber,
          asset_physicalCondition: res.data.Result[0].asset_physicalCondition,
          asset_image: res.data.Result[0].asset_image,
        });
      })
      .catch((err) => console.log(err));
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .put("http://localhost:8081/api/asset/update/" + id)
      .then((res) => {
        if (res.data.Status === "Success") {
          navigate("/assets");
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <React.Fragment>
      <nav
        aria-label="breadcrumb"
        style={{ marginLeft: "20px", marginTop: "5px" }}
      >
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <a href="/list_asset">List Assets</a>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            View Asset
          </li>
        </ol>
      </nav>
      <div ref={assetDetailsRef}>
        <div className="container" style={{ marginTop: "25px" }}>
          <h2>View Asset</h2>

          <form onSubmit={handleSubmit}>
            <div className="col-12 mt-5 row align-items-center">
              <div>
                <img
                  src={`http://localhost:8081/` + data.asset_image}
                  alt=""
                  className="asset_images1"
                />
              </div>
              <div className="col-6">
                <label htmlFor="inputName" className="form-label">
                  Asset Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="inputName"
                  autoComplete="off"
                  onChange={(e) =>
                    setData({ ...data, asset_name: e.target.value })
                  }
                  value={data.asset_name}
                  disabled={true}
                />
              </div>
              <div className="g col-6">
                <label htmlFor="inputId" className="form-label">
                  Asset Id
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="inputId"
                  autoComplete="off"
                  onChange={(e) =>
                    setData({ ...data, asset_id: e.target.value })
                  }
                  value={data.asset_id}
                  disabled={true}
                />
              </div>

              <div className="g col-6">
                <label htmlFor="inputBrand" className="form-label">
                  Asset Brand
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="inputBrand"
                  autoComplete="off"
                  onChange={(e) =>
                    setData({ ...data, asset_brand: e.target.value })
                  }
                  value={data.asset_brand}
                  disabled={true}
                />
              </div>
              <div className="g col-6">
                <label htmlFor="inputModel" className="form-label">
                  Asset Model
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="inputModel"
                  autoComplete="off"
                  onChange={(e) =>
                    setData({ ...data, asset_model: e.target.value })
                  }
                  value={data.asset_model}
                  disabled={true}
                />
              </div>
              <div className="g col-6">
                <label htmlFor="inputLocation" className="form-label">
                  Asset Location
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="inputLocation"
                  autoComplete="off"
                  onChange={(e) =>
                    setData({ ...data, asset_location: e.target.value })
                  }
                  value={data.asset_location}
                  disabled={true}
                />
              </div>
              <div className="g col-6">
                <label className="form-label" htmlFor="purchaseDate">
                  Asset Purchase Date
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="purchaseDate"
                  onChange={(e) =>
                    setData({ ...data, asset_purchaseDate: e.target.value })
                  }
                  value={moment(data.asset_purchaseDate).format("DD/MM/YYYY")}
                  disabled={true}
                />
              </div>
              <div className="g col-6">
                <label htmlFor="inputCost">Asset Cost</label>
                <div className="input-group">
                  <div className="input-group-prepend">
                    <div className="input-group-text">₹</div>
                  </div>
                  <input
                    id="inputCost"
                    type="text"
                    className="form-control"
                    onChange={(e) =>
                      setData({ ...data, asset_Cost: e.target.value })
                    }
                    value={data.asset_Cost}
                    disabled={true}
                  />
                </div>
              </div>
              <div className="g col-6">
                <label htmlFor="inputOwner" className="form-label">
                  Asset Owner
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="inputOwner"
                  autoComplete="off"
                  onChange={(e) =>
                    setData({ ...data, asset_owner: e.target.value })
                  }
                  value={data.asset_owner}
                  disabled={true}
                />
              </div>
              <div className="g col-6">
                <label htmlFor="inputInfo" className="form-label">
                  Asset Vendor Info
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="inputInfo"
                  autoComplete="off"
                  onChange={(e) =>
                    setData({ ...data, asset_vendorInfo: e.target.value })
                  }
                  value={data.asset_vendorInfo}
                  disabled={true}
                />
              </div>
              <div className="g col-6 my-3">
                <label htmlFor="inputSerial" className="form-label">
                  Asset Serial Number
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="inputSerial"
                  autoComplete="off"
                  onChange={(e) =>
                    setData({ ...data, asset_serialNumber: e.target.value })
                  }
                  value={data.asset_serialNumber}
                  disabled={true}
                />
              </div>
              <div className="g col-6 my -3">
                <label htmlFor="inputCondition" className="form-label">
                  Asset Physical Condition
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="inputCondition"
                  autoComplete="off"
                  onChange={(e) =>
                    setData({
                      ...data,
                      asset_physicalCondition: e.target.value,
                    })
                  }
                  value={data.asset_physicalCondition}
                  disabled={true}
                />
              </div>
            </div>
          </form>
        </div>
        <br />
        <div className="container">
          <Tabs
            defaultActiveKey="profile"
            id="fill-tab-example"
            className="mb-3"
            fill
          >
            <Tab eventKey="Photos" title="Photos">
              <Photos />
            </Tab>

            <Tab eventKey="Document" title="Document">
              <Document />
            </Tab>
            <Tab eventKey="Warranty" title="Warranty">
              <Warranty />
            </Tab>
            <Tab eventKey="Maintenance" title="Maintenance">
              <Maintenance />
            </Tab>
          </Tabs>
        </div>
      </div>

      <div className="text-center mt-3">
        <ReactToPrint
          trigger={() => (
            <button className="btn btn-success">
              <i className="bi bi-printer"></i> Print
            </button>
          )}
          content={() => assetDetailsRef.current}
        />
      </div>
    </React.Fragment>
  );
}
export default View_Asset;
