import React, { useState } from "react";
function Basic({ names, token }) {
  const sendMail = async () => {
    const api =
      "https://eaf-dms-api.yecor.com/api/inventory/bulk_stock_in_out/";

    const isMissingData = containers.some(
      (container) =>
        !container.selectedValue ||
        !container.batchNumber ||
        !container.updatedDate ||
        !container.inwardQty
    );
    if (isMissingData) {
      alert(
        "Please fill in all the fields for each container before submitting."
      );
    } else {
      const request = {
        stock_entries: containers.map((container) => ({
          product_id: `${container.selectedValue}`,
          batch_number: `${container.batchNumber}`,
          expiry_date: `${container.updatedDate}`,
          qty: `${container.inwardQty}`,
        })),
        stock_type: "FreshProduct",
        stock_entry_type: "In",
        receiver_warehouse_id: "62",
      };
      try {
        const response = await fetch(api, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(request),
        });
        if (response) {
          const data = await response.json();
          console.log(data);
          Cancel()
        } else {
          console.log("api failed:", response.statusText);
        }
      } catch (error) {
        console.log(error);
      }
    }
  };
  const [containers, setContainers] = useState([
    { selectedValue: "", batchNumber: "", updatedDate: "", inwardQty: "" },
  ]);
  //console.log("this is container", containers)
  const handleSelectChange = (e, index) => {
    const updatedContainers = [...containers];
    updatedContainers[index].selectedValue = e.target.value;
    setContainers(updatedContainers);
  };
  const handleBatchNumberChange = (e, index) => {
    const regrex =/^[0-9#]*$/
    const inputValue = e.target.value;
    console.log(inputValue);
    if (regrex.test(inputValue) || inputValue==="") {
      const updatedContainers = [...containers];
      updatedContainers[index].batchNumber =
        inputValue[0] === "#" ? inputValue :"#"+inputValue
      setContainers(updatedContainers);
    } else {
      alert("Batch Number should contain only numeric values.");
      return;
    }
  };  
  const handleAddContainer = () => {
    setContainers([
      ...containers,
      { selectedValue: "", batchNumber: "", updatedDate: "", inwardQty: "" },
    ]);
  };
  const handleRemoveContainer = (index) => {
    if (containers.length > 1) {
      const updatedContainers = [...containers];
      updatedContainers.splice(index, 1);
      setContainers(updatedContainers);
    } else {
      alert("you cannot delete the container");
    }
  };
  const handleDate = (e, index) => {
    const updatedContainers = [...containers];
    updatedContainers[index].updatedDate = e.target.value;
    setContainers(updatedContainers);
  };
  const handleInwardQty = (e, index) => {
    const quantity = e.target.value
    const Re = /^[0-9]+(\.[0-9]+)?$/
      if(Re.test(quantity) || quantity===""){
        const updatedContainers = [...containers];
    updatedContainers[index].inwardQty =quantity;
    setContainers(updatedContainers);
      }
      else{
        alert("enter only number")
      }
  };
  const Cancel = () => {
    setContainers([
      { selectedValue: "", batchNumber: "", updatedDate: "", inwardQty: "" },
    ]);
  };
  return (
    <div className="border border-success">
      <br />
    
{containers.map((container, index) => (
  <div key={index} className="container">
    <div className="row align-items-center">
      <div className="col-md-3">
        <h6>Product SKU</h6>
        <div className="form-group">
          <select
            className="form-control"
            value={container.selectedValue}
            onChange={(e) => handleSelectChange(e, index)}
          >
            <option value="">--Select--</option>
            {names.map((product, productIndex) => (
              <option key={productIndex} value={product.id}>
                {product.name}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="col-md-3">
        <h6>Batch Number</h6>
        <div className="form-group">
          <input
            type="text"
            className="form-control"
            placeholder="Type here..."
            value={container.batchNumber}
            onChange={(e) => handleBatchNumberChange(e, index)}
          />
        </div>
      </div>
      <div className="col-md-3">
        <h6>Expiry Date</h6>
        <div className="form-group">
          <input
            type="date"
            className="form-control"
            value={
              container.updatedDate === ""
                ? new Date().toISOString().split("T")[0]
                : container.updatedDate
            }
            onChange={(e) => handleDate(e, index)}
            min={new Date().toISOString().split("T")[0]}
          />
        </div>
      </div>
      <div className="col-md-2">
        <h6>Inward Qty</h6>
        <div className="form-group">
          <input
            type="text"
            className="form-control"
            placeholder="Type Here..."
            value={container.inwardQty}
            onChange={(e) => handleInwardQty(e, index)}
          />
        </div>
      </div>
      <div className="col-md-1">
        <button
          className="btn btn-danger"
          onClick={() => handleRemoveContainer(index)}
        >
          Delete
        </button>
      </div>
    </div>
  </div>
))}
      <br />
      <div>
        <button className="btn btn-secondary" onClick={handleAddContainer}>
          Add
        </button>
      </div>
      <br />
      <div className="container  ">
        <div className="row justify-content-center">
          <div className="col-md-1">
            <button className="btn btn-primary" onClick={sendMail}>
              submit
            </button>
          </div>
          <div className="col-md-1">
            <button className="btn btn-danger" onClick={Cancel}>
              cancel
            </button>
          </div>
        </div>
      </div>
      <br />
    </div>
  );
}
export default Basic;
