import React, { useState } from "react";
import { productAdded } from "../redux/productSlice";
import { useDispatch, useSelector } from "react-redux";
const CreateNewProduct = ({hadleClose}) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const productsCount = useSelector(
    (state) => state.products.product_list.length
  );
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
        productAdded({
          id: productsCount + 1,
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
            <h5 className="modal-title">Create New Product</h5>
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
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateNewProduct;
