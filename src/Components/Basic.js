import React, { useState, useEffect } from "react";
import { AsyncPaginate } from "react-select-async-paginate";

function Basic({ names, token, loadMore, hasMore ,fetchInventoryData,search,page ,setInventory,setPage}) {
  
  const [containers, setContainers] = useState([
    { selectedValue: "", batchNumber: "", updatedDate: "", inwardQty: "" },
  ]);
  const [options, setOptions] = useState([])
  const [missingFields, setMissingFields] = useState([])

  useEffect(() => {
    setOptions([]);
    const uniqueOptions = names.map((product) => ({
      value: product.id,
      label: product.name,
    }))

    setOptions((prevOptions) => {
      const stringifiedPrevOptions = prevOptions.map(JSON.stringify);
      const stringifiedUniqueOptions = uniqueOptions.map(JSON.stringify);
      const combinedStrings = [
        ...new Set([...stringifiedPrevOptions, ...stringifiedUniqueOptions]),
      ];  
      return combinedStrings.map(JSON.parse);
    })
  },[names,setInventory,page,loadMore])

  const sendMail = async () => {
    const api = "https://eaf-dms-api.yecor.com/api/inventory/bulk_stock_in_out/";
    const missingFieldsArray = containers.map((container, index) => {
      const missingFields = [];
      
      if (!container.selectedValue) {
        missingFields.push("Product SKU");
      }
      if (!container.batchNumber) {
        missingFields.push("Batch Number");
      }
      if (!container.updatedDate) {
        missingFields.push("Expiry Date");
      }
      if (!container.inwardQty) {
        missingFields.push("Inward Qty");
      }
  
      return { index, missingFields };
    });
  
    const isMissingData = missingFieldsArray.some((fields) => fields.missingFields.length > 0);
  
    if (isMissingData) {
      setMissingFields(missingFieldsArray);
      console.log("this is missing data:",missingFields)
      return;
    } 
    else {
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
          console.log(data)
          Cancel()
        } else {
          console.log("api failed:", response.statusText)
        }
      } catch (error) {
        console.log(error)
      }
    }
  };
  console.log("this is missing field:",missingFields)
  const handleSelectChange = (selectedOption, index) => {
    const updatedContainers = [...containers]
    updatedContainers[index].selectedValue = selectedOption.value
    setContainers(updatedContainers)
  }

  const handleBatchNumberChange = (e, index) => {
    const regrex = /^[0-9#]*$/;
    const inputValue = e.target.value
    if (regrex.test(inputValue) || inputValue === "") {
      const updatedContainers = [...containers];
      updatedContainers[index].batchNumber =
        inputValue[0] === "#" ? inputValue : "#" + inputValue;
      setContainers(updatedContainers)
    } else {
      alert("Batch Number should contain only numeric values.")
      return
    }
  }

  
  const handleAddContainer = async() => {
    setContainers([
      ...containers,
      { selectedValue: "", batchNumber: "", updatedDate: "", inwardQty: "" },
    ])   
    setPage(1)
    const pageSize = 10
    const offset = 0
    const inventoryApiUrl = `https://eaf-dms-api.yecor.com/api/inventory/product-SKUs/?warehouse_id=22&ordering=name&search=${search}&limit=${pageSize}&offset=${offset}&remove_product_stocking=true`;
    await fetchInventoryData(inventoryApiUrl, token, setInventory,hasMore)
    setOptions([])
    loadMore()
  }

  const handleRemoveContainer = (index) => {
    if (containers.length > 1) {
      const updatedContainers = [...containers]
      updatedContainers.splice(index, 1)
      setContainers(updatedContainers)
    } else {
      alert("you cannot delete the container");
    }
  }

  const handleDate = (e, index) => {
    const updatedContainers = [...containers]
    updatedContainers[index].updatedDate = e.target.value
    setContainers(updatedContainers)
  }

  const handleInwardQty = (e, index) => {
    const quantity = e.target.value;
    const Re = /^[0-9]+(\.[0-9]+)?$/;
    if (Re.test(quantity) || quantity === "") {
      const updatedContainers = [...containers];
      updatedContainers[index].inwardQty = quantity;
      setContainers(updatedContainers);
    } else {
      alert("enter only number");
    }
  }

  const Cancel = () => {
    setContainers([
      { selectedValue: "", batchNumber: "", updatedDate: "", inwardQty: "" },
    ])
    setMissingFields([])
  }

  const loadOptions = async (search) => {
  await new Promise((resolve) => setTimeout(resolve, 1000))
  loadMore();
  if (!search) {
    return {
      options,
      hasMore,
    }
  } else {
    const searchLower = search.toLowercase()
    const filteredOptions = options.filter(({ label }) =>
      label.toLowercase().includes(searchLower)
    )
    return {
      options:filteredOptions,
      hasMore,
    }
  }
}
  return (
    <div className="border border-success">
      <br />
      {containers.map((container, index) => (
        <div key={index} className="container">
          <div className="row align-items-center">
            <div className="col-md-3">
              <h6>Product SKU</h6>
              <div className="form-group">
                <AsyncPaginate
                className={` ${missingFields[index]?.missingFields.includes('Product SKU') ? 'border border-danger' : ''}`}
                isSearchable
                  value={containers.selectedValue}
                  onChange={(selectedOption) =>
                    handleSelectChange(selectedOption, index)
                  }
                loadOptions={(search)=>loadOptions(search)}
                />               
              </div>
            </div>
            <div className="col-md-3">
              <h6>Batch Number</h6>
              <div className="form-group">
                <input
                  type="text"
                  className={`form-control ${missingFields[index]?.missingFields.includes('Batch Number') ? 'border border-danger' : ''}`}
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
                  className={`form-control  ${missingFields[index]?.missingFields.includes('Expiry Date') ? 'border border-danger' : ''}`}
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
                  className={`form-control ${missingFields[index]?.missingFields.includes('Inward Qty') ? 'border border-danger' : ''}`}
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
  )
}
export default Basic