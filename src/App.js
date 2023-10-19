import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Dashboard from "./Component/Dashboard";
import Home from "./Component/Home";
import Login from "./Component/Login";
import Add_Asset from "./Component/Asset/Add_Asset";
import List_Asset from "./Component/Asset/List_Asset";
import View_Asset from "./Component/Asset/View_Asset";
import AssetType from "./Component/Masters/Asset Type/AssetType";
import Add_AssetType from "./Component/Masters/Asset Type/Add_AssetType";
import List_Location from "./Component/Masters/Location/List_Location";
import Add_Location from "./Component/Masters/Location/Add_Location";
import List_Category from "./Component/Masters/Category/List_category";
import Add_Category from "./Component/Masters/Category/Add_Category";
import CheckOut from "./Component/Check-in-out/CheckOut";
import Add_Checkout from "./Component/Check-in-out/Add_Checkout";
import Edit_Asset from "./Component/Asset/Edit_Asset";
import List_Department from "./Component/Masters/Department/List_Department";
import Add_Department from "./Component/Masters/Department/Add_Department";
import List_User from "./Component/Masters/User/List_User";
import Add_User from "./Component/Masters/User/Add_User";
import CheckIn from "./Component/Check-in-out/CheckIn";
import Add_Checkin from "./Component/Check-in-out/Add_Checkin";
import { ToastContainer } from "react-toastify";
import List_Main_Status from "./Component/Masters/Maintenance Status/List_Main_Status";
import Add_Main_Status from "./Component/Masters/Maintenance Status/Add_Main_Status";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />}>
          <Route path="" element={<Home />}></Route>
          <Route path="/add_asset" element={<Add_Asset />}></Route>
          <Route path="/list_asset" element={<List_Asset />}></Route>
          <Route path="/edit_asset/:id" element={<Edit_Asset />}></Route>
          <Route path="/view_asset/:id" element={<View_Asset />}></Route>

          <Route path="/asset-type" element={<AssetType />}></Route>
          <Route path="/add_assetType" element={<Add_AssetType />}></Route>

          <Route path="/location" element={<List_Location />}></Route>
          <Route path="/add_location" element={<Add_Location />}></Route>

          <Route path="/category" element={<List_Category />}></Route>
          <Route path="/add_category" element={<Add_Category />}></Route>

          <Route path="/department" element={<List_Department />}></Route>
          <Route path="/add_department" element={<Add_Department />}></Route>

          <Route path="/user" element={<List_User />}></Route>
          <Route path="/add_user" element={<Add_User />}></Route>

          <Route path="/checkout" element={<CheckOut />}></Route>
          <Route path="/add_checkout" element={<Add_Checkout />}></Route>

          <Route path="/Checkin" element={<CheckIn />}></Route>
          <Route path="/add_document" element={<Add_Checkin />}></Route>
          <Route path="/main_status" element={<List_Main_Status />}></Route>
          <Route path="/add_main_status" element={<Add_Main_Status />}></Route>
        </Route>
        <Route path="/login" element={<Login />}></Route>
      </Routes>
      <ToastContainer />
    </BrowserRouter>
  );
}
export default App;
