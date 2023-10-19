import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Add_Photos from "../Photos/Add_Photos";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons"; // Import your icon library

function Photos() {
  const [imageUrls, setImageUrls] = useState([]);
  const [modal, setModal] = useState(false);
  const { id } = useParams();
  const [onvalue, setOnValue] = useState(false);
  const [img, setImg] = useState();

  // Function to handle image upload
  const handleImageUpload = (event) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      const urls = Array.from(files).map((file) => URL.createObjectURL(file));
      setImageUrls([...imageUrls, ...urls]);
      setModal(false);
    }
  };

  // Function to handle image deletion
  const handleDeleteImage = (id) => {
    // Delete image from the backend
    axios
      .delete(`http://localhost:8081/api/image/delete/${id}`)
      .then((res) => {
        console.log(res);
        if (res.data.Status === "Success") {
          setOnValue(!onvalue);
          // Remove the image from the frontend
          // setImageUrls(imageUrls.filter((url) => url !== imagePath));
        }
      })
      .catch((err) => console.log(err));
  };
  // Photos API

  useEffect(() => {
    const imageArray = [];
    axios
      .get("http://localhost:8081/api/asset/get/" + id)
      .then((res) => {
        console.log(res);
        // imageArray.push(
        //   `http://localhost:8081/` + res.data.Result[0].asset_image
        // );
        setImg(imageArray);
      })
      .catch((err) => console.log(err));

    axios
      .get("http://localhost:8081/api/image/get/" + id)
      .then((res) => {
        res.data.data.forEach((e) => {
          imageArray.push({
            path: `http://localhost:8081/` + e.image_path,
            image_id: e.image_id,
          });
        });
        setImageUrls(imageArray);
      })
      .catch((err) => console.log(err));
  }, [onvalue]);

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center">
        <b>Photos</b>
        <button onClick={() => setModal(true)} className="btn btn-success my-3">
          Add Image
        </button>
      </div>
      <Add_Photos modal={modal} toggle={() => setModal(!modal)} />
      <hr />
      <div className="image-grid">
        <img src={img} alt={`Image`} className="img1" />
        {imageUrls.map((imageUrl, index) => (
          <div key={index} className="image-item">
            <img src={imageUrl.path} alt={`Image ${index}`} className="img1" />
            <button
              onClick={() => handleDeleteImage(imageUrl.image_id)}
              className="delete-button"
            >
              <FontAwesomeIcon icon="trash" /> Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Photos;
