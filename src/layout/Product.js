import React, { useEffect, useState } from "react";
import Header from "../component/Header";
import { fetchProducts, productDeleted } from "../redux/productSlice";
import { useDispatch, useSelector } from "react-redux";
import CreateNewProduct from "./CreateNewProduct";
import EditProduct from "./EditProduct";
import upIcon from "../icons/up.png";
import downIcon from "../icons/down.png";
const Product = () => {
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const [edit, setEdit] = useState(false);
  const [sort_by, setSortBy] = useState("id");
  const [sort_in, setSortIn] = useState(1);
  const [selected_data, setSelectedData] = useState({});
  let { product_list } = useSelector((state) => state.products);
  const loading = useSelector((state) => state.loading);
  let dataset = [...product_list];
  const handleDelete = (id) => {
    dispatch(productDeleted({ id }));
  };
  useEffect(() => {
    dispatch(fetchProducts());
  }, []);

  const hadleClose = () => {
    setShow(false);
    setEdit(false);
  };
  const handleModalClick = () => {
    setShow(true);
  };
  const handleEdit = (data) => {
    setSelectedData(data);
    setEdit(true);
  };
  const dynamicSort = (property, sortOrder) => {
    console.log(sortOrder);
    return (a, b) => {
      var result =
        a[property] < b[property] ? -1 : a[property] > b[property] ? 1 : 0;
      return result * sortOrder;
    };
  };
  const handleSort = (name) => {
    setSortBy(name);
    setSortIn(sort_in * -1);
  };

  dataset.sort(dynamicSort(sort_by, sort_in));
  return (
    <div>
      <Header />
      <div className="container mt-3">
        <div className="d-flex justify-content-end my-3">
          <button className="btn btn-primary" onClick={handleModalClick}>
            Add New Product
          </button>
        </div>
        <div className="table-container">
          {loading ? (
            "Loading..."
          ) : (
            <table className="table table-bordered">
              <thead>
                <tr>
                  <th className="text-center" style={{minWidth:"50px"}} onClick={() => handleSort("id")}>
                  Id
                    { sort_in === 1 ? (
                      <img src={upIcon}  className="up-arrow-icon"/>
                    ) : (
                      <img src={downIcon} className="down-arrow-icon"/>
                    )}
                  </th>
                  <th
                    className="text-center"
                    onClick={() => handleSort("title")}
                  >
                    Title
                    { sort_in === 1 ? (
                      <img src={upIcon}  className="up-arrow-icon"/>
                    ) : (
                      <img src={downIcon} className="down-arrow-icon"/>
                    )}
                  </th>
                  <th className="text-center">Description</th>
                  <th className="text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {dataset.length ? (
                  dataset.map(({ id, title, description }, i) => (
                    <tr key={i}>
                      <td>{id}</td>
                      <td>{title}</td>
                      <td>{description}</td>
                      <td className="d-flex">
                        <button
                          className="btn btn-danger mx-3"
                          onClick={() => handleDelete(id)}
                        >
                          Delete
                        </button>
                        <button
                          className="btn btn-success"
                          onClick={() => handleEdit({ id, title, description })}
                        >
                          Edit
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr colSpan="3">
                    <div className="text-center"> No data found</div>
                  </tr>
                )}
              </tbody>
            </table>
          )}
        </div>
      </div>
      {show && <CreateNewProduct hadleClose={hadleClose} />}
      {edit && (
        <EditProduct hadleClose={hadleClose} product_data={selected_data} />
      )}
    </div>
  );
};
export default Product;
