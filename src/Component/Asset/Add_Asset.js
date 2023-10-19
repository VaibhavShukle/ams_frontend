import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Select from "react-select";

function Add_Asset() {
  const [isDepreciable, setIsDepreciable] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [assetImage, setAssetImage] = useState(null);

  const handleDepreciableChange = (e) => {
    setIsDepreciable(e.target.value === "yes");
  };

  const [data, setData] = useState({
    asset_id: "",
    asset_name: "",
    asset_brand: "",
    asset_model: "",
    asset_Cost: "",
    asset_purchaseDate: "",
    asset_vendorInfo: "",
    asset_serialNumber: "",
    asset_owner: "",
    asset_location: "",
    asset_category: "",
    asset_physicalCondition: "",
    asset_image: null,
    depreciation_cost: "",
    asset_life: "",
    salvage_value: "",
    depreciation_method: "",
    date_acquired: "",
  });

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const assetFormData = new FormData();
    assetFormData.append("asset_id", data.asset_id);
    assetFormData.append("asset_name", data.asset_name);
    assetFormData.append("asset_brand", data.asset_brand);
    assetFormData.append("asset_model", data.asset_model);
    assetFormData.append("asset_Cost", data.asset_Cost);
    assetFormData.append("asset_purchaseDate", data.asset_purchaseDate);
    assetFormData.append("asset_vendorInfo", data.asset_vendorInfo);
    assetFormData.append("asset_serialNumber", data.asset_serialNumber);
    assetFormData.append("asset_owner", data.asset_owner);
    assetFormData.append("asset_location", data.asset_location);
    assetFormData.append("asset_category", selectedCategory);
    assetFormData.append(
      "asset_physicalCondition",
      data.asset_physicalCondition
    );
    if (assetImage) {
      assetFormData.append("asset_image", assetImage);
    }

    let depreciationId = null;
    if (isDepreciable) {
      const res = await axios.post(
        "http://localhost:8081/api/depreciation/add_depreciation",
        {
          date_acquired: data.date_acquired,
          depreciation_cost: data.depreciation_cost,
          asset_life: data.asset_life,
        }
      );

      depreciationId = res.data.data.depreciation_id;
    }

    assetFormData.append("depreciation_id", depreciationId);

    const res1 = await axios
      .post("http://localhost:8081/api/asset/add_asset", assetFormData, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then(() => {
        navigate("/list_asset");
      })
      .catch((assetError) => {
        console.error(assetError);
      });
  };
  const [categoryOptions, setCategoryOptions] = useState([]);

  const getAssetCategory = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8081/api/asset/getAssetCategory/active"
      );

      if (response.data.Status) {
        const options = response.data.Result.map((category) => ({
          value: category.category_id,
          label: category.category_name,
        }));

        setCategoryOptions(options);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const [assetLocationOptions, setAssetLocationOptions] = useState([]);

  const getAssetLocation = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8081/api/location/getLocation/active"
      );

      if (response.data.Result) {
        const options = response.data.Result.map((asset) => ({
          value: asset.location_id,
          label: asset.location_name,
        }));

        setAssetLocationOptions(options);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    getAssetCategory();
    getAssetLocation();
  }, []);

  return (
    <div className="container" style={{ marginTop: "60px" }}>
      <h2>Add Assets</h2>
      <form onSubmit={handleSubmit}>
        <div className="fields">
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
              required
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
              onChange={(e) => setData({ ...data, asset_name: e.target.value })}
              required
            />
          </div>
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
              required
            />
          </div>
          <div className="input-field">
            <label htmlFor="inputModel" className="form-label">
              Asset Model
            </label>
            <input
              type="text"
              className="form-control"
              id="inputCondition"
              autoComplete="off"
              onChange={(e) =>
                setData({ ...data, asset_model: e.target.value })
              }
              required
            />
          </div>
          <div className="input-field">
            <label htmlFor="inputCost">Asset Cost</label>
            <div className="input-group">
              <div className="input-group-prepend"></div>
              <input
                id="inputCost"
                type="text"
                className="form-control"
                autoComplete="off"
                onChange={(e) =>
                  setData({ ...data, asset_Cost: e.target.value })
                }
                required
              />
            </div>
          </div>
          <div className="input-field">
            <label className="form-label" htmlFor="purchaseDate">
              Asset Purchase Date
            </label>
            <input
              type="date"
              className="form-control"
              id="purchaseDate"
              onChange={(e) =>
                setData({ ...data, asset_purchaseDate: e.target.value })
              }
              required
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
              required
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
              required
            />
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
              required
            />
          </div>
          <hr></hr>
          <div className="input-field">
            <label htmlFor="inputLocation" className="form-label">
              Asset Location
            </label>
            <Select
              options={assetLocationOptions}
              value={{ label: data.asset_location }}
              onChange={(selectedOption) =>
                setData({ ...data, asset_location: selectedOption.label })
              }
              required
            />
          </div>
          <div className="input-field">
            <label htmlFor="inputCategory" className="form-label">
              Asset Category
            </label>
            <Select
              options={categoryOptions}
              value={categoryOptions.find(
                (option) => option.value === selectedCategory
              )}
              onChange={(selectedOption) => {
                setSelectedCategory(selectedOption.value);
              }}
              required
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
              required
            />
          </div>
          <div className="input-field">
            <label className="form-label" htmlFor="inputGroupFile01">
              Asset Image
            </label>
            <input
              type="file"
              className="form-control"
              id="inputGroupFile01"
              onChange={(e) => {
                setAssetImage(e.target.files[0]);
              }}
              required
            />
          </div>
        </div>
        <hr></hr>
        <h4>Depreciation</h4>
        <div className="fields">
          <div className="input-field">
            <label htmlFor="depreciableAsset" className="form-label">
              Is this a depreciable asset?
            </label>
            <select
              id="depreciableAsset"
              className="form-control"
              onChange={handleDepreciableChange}
            >
              <option value="select">Select</option>
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </select>
          </div>
        </div>
        {isDepreciable && (
          <div className="fields">
            <div className="input-field">
              <label htmlFor="inputDepCost" className="form-label">
                Depreciation Cost
              </label>
              <input
                type="text"
                className="form-control"
                id="inputDepCost"
                autoComplete="off"
                onChange={(e) =>
                  setData({ ...data, depreciation_cost: e.target.value })
                }
              />
            </div>

            <div className="input-field">
              <label htmlFor="inputAssetLife" className="form-label">
                Asset Life (Months)
              </label>
              <input
                type="text"
                className="form-control"
                id="inputAssetLife"
                autoComplete="off"
                onChange={(e) =>
                  setData({ ...data, asset_life: e.target.value })
                }
              />
            </div>

            <div className="input-field">
              <label className="form-label" htmlFor="dateAquire">
                Date Accuired
              </label>
              <input
                type="date"
                className="form-control"
                id="dateAquire"
                onChange={(e) =>
                  setData({ ...data, date_acquired: e.target.value })
                }
              />
            </div>
            <div className="input-field"></div>
          </div>
        )}

        <div className="col-12 mb-4 d-grid gap-2 col-6 mx-auto">
          <button type="submit" className="btn btn-success">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}

export default Add_Asset;
