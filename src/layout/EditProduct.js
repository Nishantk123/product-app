import React, { useEffect, useState } from "react";
import { productUpdated } from "../redux/productSlice";
import { useDispatch, useSelector } from "react-redux";
const EditProduct = ({hadleClose, product_data}) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const productsCount = useSelector(
    (state) => state.products.product_list.length
  );
  useEffect(()=>{
    if(product_data){
        setName(product_data.title);
        setDescription(product_data.description)
    }
  },[])
  const handleChange = (e, name) => {
    if (name == "name") {
      setName(e.target.value);
    } else {
      setDescription(e.target.value);
    }
  };
  const handleSubmit = () => {
    if (name && description) {
      dispatch(
        productUpdated({
          id: product_data.id,
          title: name,
          description,
        })
      );

      setError(null);
      hadleClose()
    } else {
      setError("Please fill in all fields");
    }
    setName("");
    setDescription("");
  };
  return (
    <div className="modal d-block" tabindex="-1">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Edit Product</h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
              onClick={hadleClose}
            ></button>
          </div>
          <div className="modal-body">
            <input
              className="form-control my-3"
              value={name}
              placeholder="Enter product name"
              onChange={(e) => handleChange(e, "name")}
            />
            <input
              className="form-control my-3"
              value={description}
              placeholder="Enter product Description"
              onChange={(e) => handleChange(e, "description")}
            />
            {error && <div className="text-danger p-2">{error}</div>}
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              data-bs-dismiss="modal"
              onClick={hadleClose}
            >
              Close
            </button>
            <button
              type="button"
              className="btn btn-primary"
              onClick={handleSubmit}
            >
              Update
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditProduct;
