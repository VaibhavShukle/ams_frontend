import React, { useState, useEffect } from "react";
import "bootstrap-icons/font/bootstrap-icons.css";
import { Link, Outlet, useNavigate } from "react-router-dom";
import axios from "axios";

function Dashboard() {
  const navigate = useNavigate();
  // axios.defaults.withCredentials = true;
  useEffect(() => {
    axios
      .get("http://localhost:8081/api/dashboard", {
        headers: { token: localStorage.getItem("token") },
      })
      .then((res) => {
        if (res.data.Status === "Success") {
          if (res.data.role === "admin") {
            navigate("/");
          } else {
            // navigate('/employeedetail/' + id)
          }
        } else {
          navigate("/login");
        }
      });
  }, []);

  const [isAssetDropdownOpen, setIsAssetDropdownOpen] = useState(false);
  const toggleAssetDropdown = () => {
    setIsAssetDropdownOpen(!isAssetDropdownOpen);
  };
  const [isMasterDropdownOpen, setIsMasterDropdownOpen] = useState(false);

  const toggleMasterDropdown = () => {
    setIsMasterDropdownOpen(!isMasterDropdownOpen);
  };

  const handleLogout = () => {
    axios
      .get("http://localhost:8081/api/auth/logout")
      .then((res) => {
        navigate("/");
      })
      .catch((err) => console.log(err));
  };
  return (
    <div className="container-fluid">
      <div className="row flex-nowrap">
        <div className="col-auto col-md-3 col-xl-2 px-sm-2 px-0 bg-dark">
          <div className="d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 text-white min-vh-100">
            <Link
              to="/"
              className="d-flex align-items-center pb-3 mb-md-1 mt-md-3 me-md-auto text-white text-decoration-none"
            >
              <span className="fs-5 fw-bolder d-none d-sm-inline">
                Admin Dashboard
              </span>
            </Link>
            <ul
              className="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start"
              id="menu"
            >
              <li>
                <Link
                  to="/"
                  data-bs-toggle="collapse"
                  className="nav-link text-white px-0 align-middle"
                >
                  <i className="fs-4 bi-speedometer2"></i>{" "}
                  <span className="ms-1 d-none d-sm-inline">Dashboard</span>{" "}
                </Link>
              </li>
              {/* <li>
								<Link to="/asset" className="nav-link px-0 align-middle text-white">
									<i className="fs-4 bi-people"></i> <span className="ms-1 d-none d-sm-inline">Assets</span> </Link>
							</li> */}
              {/* <li className="nav-item dropdown">
								<a className="nav-link dropdown-toggle text-white px-0 align-middle" href="/" role="button" data-bs-toggle="dropdown">
									<i className="fs-4 bi-people"></i> <span className="ms-1 d-none d-sm-inline">Assets</span>
								</a>
								<ul className="dropdown-menu">
									<li>
										<Link to="/asset" className="nav-link px-0 align-middle text-white dropdown-item">
											<span className="fs-4 bi-list"></span> <span className="ms-1 d-none d-sm-inline">List of Assets</span>
										</Link>
									</li>
									<li>
										<Link to="/add-asset" className="nav-link px-0 align-middle text-white dropdown-item">
											<span className="fs-4 bi-plus"></span> <span className="ms-1 d-none d-sm-inline">Add Assets</span>
										</Link>
									</li>
								</ul>
							</li> */}
              <div className="sidebar">
                <button
                  className={`toggle-button ${
                    isAssetDropdownOpen ? "open" : ""
                  }`}
                  onClick={toggleAssetDropdown}
                >
                  <i className="fs-4 bi-people"></i>
                  <span className="ms-1 d-none d-sm-inline">
                    {" "}
                    Asset <span className="dropdown-arrow"></span>
                  </span>
                </button>
                {isAssetDropdownOpen && (
                  <div className="dropdown-content">
                    <Link to="/list_asset">
                      <span className="fs-4 bi-list"></span>{" "}
                      <span className="ms-1 d-none d-sm-inline"></span>List Of
                      Assets
                    </Link>
                    <Link to="/add_asset">
                      <span className="fs-4 bi-plus"></span>{" "}
                      <span className="ms-1 d-none d-sm-inline"></span>Add An
                      Assets
                    </Link>
                    <hr></hr>
                    <Link to="/checkout">
                      <span className="fs-4 bi-person-check"></span>{" "}
                      <span className="ms-1 d-none d-sm-inline"></span>Check Out
                    </Link>
                    <Link to="/checkin">
                      <span className="fs-4 bi-person-x"></span>{" "}
                      <span className="ms-1 d-none d-sm-inline"></span>Check In
                    </Link>
                    <hr></hr>
                  </div>
                )}
              </div>

              <div className="sidebar">
                <button
                  className={`toggle-button ${
                    isMasterDropdownOpen ? "open" : ""
                  }`}
                  onClick={toggleMasterDropdown}
                >
                  <i className="fs-4 bi-journal-text"></i>
                  <span className="ms-1 d-none d-sm-inline">
                    {" "}
                    Masters <span className="dropdown-arrow"></span>
                  </span>
                </button>
                {isMasterDropdownOpen && (
                  <div className="dropdown-content">
                    {/* <Link to="/asset-type">
                      <span className="fs-4 bi-list-nested"></span>{" "}
                      <span className="ms-1 d-none d-sm-inline"></span>Asset
                      Types
                    </Link>
                    <Link to="/asset-model">
                      <span className="fs-4 bi-boxes"></span>{" "}
                      <span className="ms-1 d-none d-sm-inline"></span>Asset
                      Model
                    </Link> */}
                    <Link to="/location">
                      <span className="fs-4 bi-geo-alt-fill"></span>{" "}
                      <span className="ms-1 d-none d-sm-inline"></span>
                      Location
                    </Link>
                    <Link to="/category">
                      <span className="fs-4 bi-card-list"></span>{" "}
                      <span className="ms-1 d-none d-sm-inline"></span>
                      Categories
                    </Link>
                    {/* <Link to="/sub-category">
                      <span className="fs-4 bi-list-ul"></span>{" "}
                      <span className="ms-1 d-none d-sm-inline"></span>Sub
                      Categories
                    </Link> */}
                    <Link to="/department">
                      <span className="fs-4 bi-grid"></span>
                      <span className="ms-1 d-none d-sm-inline"></span>
                      Department
                    </Link>
                    <Link to="/main_status">
                      <span className="fs-4 bi-gear"></span>
                      <span className="ms-1 d-none d-sm-inline"></span>
                      Maintenance Status
                    </Link>
                    <Link to="/user">
                      <span className="fs-4 bi-person"></span>
                      <span className="ms-1 d-none d-sm-inline"></span>User
                    </Link>

                    <hr></hr>
                  </div>
                )}
              </div>

              <li>
                <Link
                  to="profile"
                  className="nav-link px-0 align-middle text-white"
                >
                  <i className="fs-4 bi-person"></i>{" "}
                  <span className="ms-1 d-none d-sm-inline">Profile</span>
                </Link>
              </li>
              <li onClick={handleLogout}>
                <Link
                  href="/login"
                  className="nav-link px-0 align-middle text-white"
                >
                  <i className="fs-4 bi-power"></i>{" "}
                  <span className="ms-1 d-none d-sm-inline">Logout</span>
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="col p-0 m-0">
          <div className="p-2 d-flex justify-content-center shadow">
            <h4>Assets Tracking System</h4>
          </div>
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;

// import React, { useState, useEffect } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import axios from "axios";
// import "bootstrap-icons/font/bootstrap-icons.css";

// function Dashboard() {
//   const navigate = useNavigate();
//   const [isSidebarOpen, setSidebarOpen] = useState(true);
//   const [isDarkMode, setDarkMode] = useState(false);

//   const toggleSidebar = () => {
//     setSidebarOpen(!isSidebarOpen);
//   };

//   const toggleDarkMode = () => {
//     setDarkMode(!isDarkMode);
//   };

//   useEffect(() => {
//     const handleResize = () => {
//       if (window.innerWidth < 768) {
//         setSidebarOpen(false);
//       } else {
//         setSidebarOpen(true);
//       }
//     };

//     window.addEventListener("resize", handleResize);
//     handleResize();

//     return () => {
//       window.removeEventListener("resize", handleResize);
//     };
//   }, []);

//   useEffect(() => {
//     // Check user authentication here and redirect if not authenticated
//     axios
//       .get("http://localhost:8081/api/dashboard", {
//         headers: { token: localStorage.getItem("token") },
//       })
//       .then((res) => {
//         if (res.data.Status === "Success") {
//           if (res.data.role === "admin") {
//             navigate("/");
//           } else {
//             // Redirect to another route for non-admin users
//             // navigate('/employeedetail/' + id);
//           }
//         } else {
//           navigate("/login");
//         }
//       });
//   }, []);

//   const toggleSubmenu = (event) => {
//     const submenu = event.target.closest(".submenu_item");
//     if (submenu) {
//       submenu.classList.toggle("show_submenu");
//     }
//   };

//   return (
//     <div className={`App ${isDarkMode ? "dark" : ""}`}>
//       <nav className="navbar">
//         <div className="logo_item" onClick={toggleSidebar}>
//           <i className={`bi ${isSidebarOpen ? "bi-list" : "bi-list-ul"}`}></i>
//           Asset Tracking System
//         </div>
//         <div className="search_bar">
//           <input type="text" placeholder="Search" />
//         </div>
//         <div className="navbar_content">
//           <i className="bi bi-grid"></i>
//           <i
//             className={`bi ${isDarkMode ? "bi-moon" : "bi-sun"}`}
//             onClick={toggleDarkMode}
//           ></i>
//           <i className="bi bi-bell"></i>
//         </div>
//       </nav>
//       <nav className={`sidebar ${isSidebarOpen ? "" : "close"}`}>
//         {/* Add your sidebar content here */}
//         <div className="menu_content">
//           <ul className="menu_items">
//             <div className="menu_title menu_dashboard"></div>
//             <li className="item">
//               <Link to="/" className="nav_link">
//                 <span className="navlink_icon">
//                   <i className="bi bi-house-door"></i>
//                 </span>
//                 <span className="navlink">Dashboard</span>
//               </Link>
//             </li>
//             <li className="item">
//               <div className="nav_link submenu_item" onClick={toggleSubmenu}>
//                 <span className="navlink_icon">
//                   <i className="bi bi-columns-gap"></i>
//                 </span>
//                 <span className="navlink">Asset</span>
//                 <i className="bi bi-chevron-right arrow-left"></i>
//               </div>
//               <ul className="menu_items submenu">
//                 <Link to="/list_asset" className="nav_link sublink">
//                   <span className="bi bi-list"></span>&nbsp;List Of Assets
//                 </Link>
//                 <Link to="/add_asset" className="nav_link sublink">
//                   <span className="bi bi-plus"></span>&nbsp;Add An Asset
//                 </Link>
//               </ul>
//               <ul className="menu_items submenu">
//                 <Link to="/checkout" className="nav_link sublink">
//                   <span className="bi bi-person-check"></span>&nbsp;Check Out
//                 </Link>
//                 <Link to="/checkin" className="nav_link sublink">
//                   <span className="bi bi-person-x"></span>&nbsp;Check In
//                 </Link>
//               </ul>
//             </li>
//             <li className="item">
//               <div className="nav_link submenu_item" onClick={toggleSubmenu}>
//                 <span className="navlink_icon">
//                   <i className="bi bi-grid"></i>
//                 </span>
//                 <span className="navlink">Master</span>
//                 <i className="bi bi-chevron-right arrow-left"></i>
//               </div>
//               <ul className="menu_items submenu">
//                 <Link to="/category" className="nav_link sublink">
//                   <span className="bi bi-card-list"></span>&nbsp;Categories
//                 </Link>
//                 <Link to="/department" className="nav_link sublink">
//                   <span className="bi bi-grid"></span>&nbsp;Department
//                 </Link>
//                 <Link to="/main_status" className="nav_link sublink">
//                   <span className="bi bi-gear"></span>&nbsp;Maintenance Status
//                 </Link>
//                 <Link to="/user" className="nav_link sublink">
//                   <span className="bi bi-person"></span>&nbsp;User
//                 </Link>
//               </ul>
//             </li>
//           </ul>
//           <ul className="menu_items">
//             <div className="menu_title menu_editor"></div>
//             {/* <li className="item">
//               <Link to="/" className="nav_link">
//                 <span className="navlink_icon">
//                   <i className="bi bi-magic-wand"></i>
//                 </span>
//                 <span className="navlink">Magic build</span>
//               </Link>
//             </li> */}
//             <li className="item">
//               <Link to="/" className="nav_link">
//                 <span className="navlink_icon">
//                   <i className="bi bi-person"></i>
//                 </span>
//                 <span className="navlink">Profile</span>
//               </Link>
//             </li>
//             <li className="item">
//               <Link to="/login" className="nav_link">
//                 <span className="navlink_icon">
//                   <i className="bi bi-power"></i>
//                 </span>
//                 <span className="navlink">Logout</span>
//               </Link>
//             </li>
//           </ul>
//           <div className="bottom_content">
//             <div className="bottom expand_sidebar">
//               <span>Expand</span>
//               <i className="bi bi-box-arrow-in-right"></i>
//             </div>
//             <div className="bottom collapse_sidebar" onClick={toggleSidebar}>
//               <span>Collapse</span>
//               <i className="bi bi-box-arrow-left"></i>
//             </div>
//           </div>
//         </div>
//       </nav>
//     </div>
//   );
// }

// export default Dashboard;
