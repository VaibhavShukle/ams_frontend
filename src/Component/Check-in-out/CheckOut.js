import React, { useState } from "react";
import Add_Checkout from "./Add_Checkout";

function CheckOut() {
  const [modal, setModal] = useState(false);

  return (
    <div className="px-5 py-3">
      <div className="d-flex justify-content-center mt-2">
        <h3>Asset List</h3>
      </div>
      {/* <Link to="/add_assetType" className='btn btn-success my-3'>Add Asset Type</Link> */}

      <button onClick={() => setModal(true)} className="btn btn-success my-3">
        CheckOut Asset
      </button>

      <Add_Checkout modal={modal} toggle={() => setModal(!modal)} />
    </div>
  );
}

export default CheckOut;
