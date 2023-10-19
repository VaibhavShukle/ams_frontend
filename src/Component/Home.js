import axios from "axios";
import React, { useEffect, useState } from "react";

function Home() {
  const [activeAsset, setActiveAsset] = useState();
  const [assetValue, setAssetValue] = useState();

  useEffect(() => {
    axios
      .get("http://localhost:8081/api/asset/activeAsset")
      .then((res) => {
        setActiveAsset(res.data[0].asset_id);
      })
      .catch((err) => console.log(err));

    axios
      .get("http://localhost:8081/api/asset/assetValue")
      .then((res) => {
        setAssetValue(res.data[0].asset_Cost);
      })
      .catch((err) => console.log(err));
  }, []);
  return (
    <div>
      <div className="p-3 d-flex justify-content-around mt-3">
        <div className="px-3 pt-2 pb-3 border shadow-sm w-25">
          <div className="text-center pb-1">
            <h4>Active Assets</h4>
          </div>
          <hr />
          <div className="">
            <h5>Total: {activeAsset}</h5>
          </div>
        </div>
        <div className="px-3 pt-2 pb-3 border shadow-sm w-25">
          <div className="text-center pb-1">
            <h4>Assets Value</h4>
          </div>
          <hr />
          <div className="">
            <h5>Total: {assetValue}</h5>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
