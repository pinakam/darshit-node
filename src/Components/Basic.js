import React, { useState } from "react";

function Basic({ names,token }) {
  
      const sendMail = async ()=>{
                const api = "https://eaf-dms-api.yecor.com/api/inventory/bulk_stock_in_out/"
                /*const request = {
                  "stock_entries": containers.map(container => ({
                    "product_id": 29, // Assuming this is a static value, replace it if needed
                    "batch_number": `${container.batchNumber}`,
                    "expiry_date": `${container.updatedDate}`,
                    "qty": `${container.inwardqty}`,
                  })
                  ),*/
                /*const request={
                  "stock_entries": [
                    {
                      "product_id": 29,
                        "batch_number": `${containers[0].batchNumber}`,
                        "expiry_date": `${containers[0].updatedDate}`,
                        "qty": `${containers[0].inwardqty}`
                    }
                ],
                "stock_type": "FreshProduct", // pass static value as FreshProduct
                "stock_entry_type": "In", // pass static value as In
                "receiver_warehouse_id": "62" // pass static value as 62
                }*/
                const request = {
                  "stock_entries": containers.map(container => ({
                    "product_id": 29, // Assuming this is a static value, replace it if needed
                    "batch_number": `${container.batchNumber}`,
                    "expiry_date": `${container.updatedDate}`,
                    "qty": `${container.inwardqty}`,
                  })),
                  "stock_type": "FreshProduct",
                  "stock_entry_type": "In",
                  "receiver_warehouse_id": "62",
                  
                };
                try{
                      const response  =await fetch(api,{
                        method:"POST",
                        headers: {
                          'Content-Type': 'application/json',
                          Authorization: `Bearer ${token}`,
                      },
                      body: JSON.stringify(request),
                      })
                      if(response){
                              const data  =await response.json()
                              console.log(data)
                      }
                      else{
                              console.log("api failed:",response.statusText)
                      }
                }
                catch(error){
                        console.log(error)
                }
               
      }






  const [containers, setContainers] = useState([{ selectedValue: "", batchNumber: "",updatedDate:"",inwardqty:""}]);
  console.log("this is container",containers)
  const handleSelectChange = (e, index) => {
    const updatedContainers = [...containers]
    updatedContainers[index].selectedValue = e.target.value
    setContainers(updatedContainers)
  };

  const handleBatchNumberChange = (e, index) => {
    const updatedContainers = [...containers]
    updatedContainers[index].batchNumber = e.target.value
    setContainers(updatedContainers)
  };

  const handleAddContainer = () => {
    setContainers([...containers, { selectedValue: "", batchNumber: "" }]);
  };

  const handleRemoveContainer = (index) => {
    if(containers.length>1){
        const updatedContainers = [...containers];
    updatedContainers.splice(index, 1)
    setContainers(updatedContainers)

    }
    else{
        alert("you cannot delet the container")
    }
    
  };
const handleDate = (e,index)=>{
  const updatedContainers = [...containers]
  updatedContainers[index].updatedDate=e.target.value
  setContainers(updatedContainers)
}
const handleInwardqty=(e,index)=>{
  const updatedContainers = [...containers]
  updatedContainers[index].inwardqty=e.target.value
  setContainers(updatedContainers)
}

  return (
    <div className="border">
      {containers.map((container, index) => (
        <div key={index} className="container">
          <div className="row align-items-center">
            <div className="col-md-2">
              <p>product sku</p>
              <div className="dropdown">
                <button className="dropdown-toggle" type="button" data-bs-toggle="dropdown">
                {container.selectedValue ? container.selectedValue : "--Select--"}
      </button>
                <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                  <select value={container.selectedValue} onChange={(e) => handleSelectChange(e, index)}>
                    <option value="">--Select--</option>
                    {names.map((product, productIndex) => (
                      <option key={productIndex} value={product.name}>
                        {product.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
            <div className="col-md-2">
              <p>Batch Number</p>
              <input
                type="number"
                placeholder="Type here..."
                value={container.batchNumber}
                onChange={(e) => handleBatchNumberChange(e, index)}
              />
            </div>
            <div className="col-md-2">
              <p>Expiry Date</p>
              <input type="Date" value={new Date().toISOString().split("T")[0]} onChange={(e) =>handleDate(e,index)} />
            </div>
            <div className="col-md-2">
              <p>Inward Qty</p>
              <input type="number" placeholder="Type Here..."onChange={(e)=>handleInwardqty(e,index)} />
            </div>
            <div className="col-md-2">
              <button onClick={() => handleRemoveContainer(index)}>X</button>
            </div>
          </div>
        </div>
      ))}
      <br />
      <button type="button" onClick={handleAddContainer}>
        +
      </button>
      <div className="container ">
        <div className="row">
          <div className="col-md-4">
                <button type="button" onClick={sendMail}>submit</button>
                      </div>
                      <div className="col-md-4">
                      <button type="reset">cancel</button>
                      </div>

        </div>

      </div>
    </div>
    
  );
}

export default Basic;
