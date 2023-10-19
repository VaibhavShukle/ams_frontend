import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import moment from "moment";

function Edit_Asset() {
  const [data, setData] = useState({
    asset_id: "",
    asset_name: "",
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

  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    axios
      .get(`http://localhost:8081/api/asset/get/${id}`)
      .then((res) => {
        const assetData = res.data.Result[0];
        setData({
          ...data,
          asset_id: assetData.asset_id,
          asset_name: assetData.asset_name,
          asset_brand: assetData.asset_brand,
          asset_model: assetData.asset_model,
          asset_location: assetData.asset_location,
          asset_purchaseDate: moment(assetData.asset_purchaseDate).format(
            "YYYY-MM-DD" // Change to the expected date format
          ),
          asset_Cost: assetData.asset_Cost,
          asset_owner: assetData.asset_owner,
          asset_vendorInfo: assetData.asset_vendorInfo,
          asset_serialNumber: assetData.asset_serialNumber,
          asset_physicalCondition: assetData.asset_physicalCondition,
          asset_image: assetData.asset_image,
        });
      })
      .catch((err) => console.log(err));
  }, [id]);

  const handleSubmit = (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("asset_id", data.asset_id);
    formData.append("asset_name", data.asset_name);
    formData.append("asset_brand", data.asset_brand);
    formData.append("asset_model", data.asset_model);
    formData.append("asset_location", data.asset_location);
    formData.append("asset_purchaseDate", data.asset_purchaseDate);
    formData.append("asset_Cost", data.asset_Cost);
    formData.append("asset_owner", data.asset_owner);
    formData.append("asset_vendorInfo", data.asset_vendorInfo);
    formData.append("asset_serialNumber", data.asset_serialNumber);
    formData.append("asset_physicalCondition", data.asset_physicalCondition);
    formData.append("asset_image", data.asset_image);

    axios
      .put(`http://localhost:8081/api/asset/update/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        if (res.data.Status === "Success") {
          navigate("/list_asset");
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
            Edit Asset
          </li>
        </ol>
      </nav>
      <div className="container" style={{ marginTop: "60px" }}>
        <h2>Edit Assets</h2>
        <form onSubmit={handleSubmit}>
          <div className="fields">
            {/* Render your input fields here */}
            {/* Example for "Asset Id" */}
            <div className="input-field">
              <label htmlFor="inputId" className="form-label">
                Asset Id
              </label>
              <input
                type="text"
                className="form-control"
                id="inputId"
                autoComplete="off"
                onChange={(e) => setData({ ...data, asset_id: e.target.value })}
                value={data.asset_id}
              />
            </div>
            <div className="input-field">
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
              />
            </div>
            {/* <div className="input-field">
              <label htmlFor="inputType" className="form-label">
                Asset Type
              </label>
              <input
                type="text"
                className="form-control"
                id="inputType"
                autoComplete="off"
                onChange={(e) =>
                  setData({ ...data, asset_type: e.target.value })
                }
                value={data.asset_type}
              />
            </div> */}
            <div className="input-field">
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
              />
            </div>
            <div className="input-field">
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
              />
            </div>
            <div className="input-field">
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
              />
            </div>
            <div className="input-field">
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
              />
            </div>
            <div className="input-field">
              <label htmlFor="inputCost">Asset Cost</label>
              <div className="input-group">
                <input
                  id="inputCost"
                  type="text"
                  className="form-control"
                  onChange={(e) =>
                    setData({ ...data, asset_Cost: e.target.value })
                  }
                  value={data.asset_Cost}
                />
              </div>
            </div>
            <div className="input-field">
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
              />
            </div>
            <div className="input-field">
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
              />
            </div>
            <div className="input-field">
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
              />
            </div>
            <div className="input-field">
              <label htmlFor="inputCondition" className="form-label">
                Asset Physical Condition
              </label>
              <input
                type="text"
                className="form-control"
                id="inputCondition"
                autoComplete="off"
                onChange={(e) =>
                  setData({ ...data, asset_physicalCondition: e.target.value })
                }
                value={data.asset_physicalCondition}
              />
            </div>{" "}
            <div className="input-field"></div>
            <div className="input-field">
              <label className="form-label" htmlFor="inputGroupFile01">
                Asset Image
              </label>
              <input
                type="file"
                className="form-control"
                id="inputGroupFile01"
                onChange={(e) =>
                  setData({ ...data, asset_image: e.target.files[0] })
                }
              />
              <img
                src={`http://localhost:8081/` + data.asset_image}
                alt="Uploading Image"
                className="asset_images2"
              />
            </div>
            <div className="col-12 mb-2">
              <button type="submit" className="btn btn-success">
                Submit
              </button>
            </div>
          </div>
        </form>
      </div>
    </React.Fragment>
  );
}

export default Edit_Asset;
