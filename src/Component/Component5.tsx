import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateComponentData,setImage } from "../slice/component1Slice";
import { RootState } from "../store/store";

const Component5 = () => {
  const reduxState = useSelector((state: RootState) => state.slice1);
  const dispatch = useDispatch();
  console.log("this is state", reduxState);

  const [localState, setLocalState] = useState({
    Institute: reduxState.institute || "",
    degree: reduxState.degree || "",
    base64Image: reduxState.getImage || ""
  });


  useEffect(() => {
    setLocalState({
      Institute: reduxState.institute || "",
      degree: reduxState.degree || "",
      base64Image: localState.base64Image || ""
    });
    
  }, [reduxState,localState.base64Image]);
 

  
  const handleInputChange = (field: string, value: string) => {
    setLocalState((prev) => ({
      ...prev,
      [field]: value,
    }));
    dispatch(updateComponentData({field,value}))

    
  };
const handleImage =(e:any)=>{
  const file = e.target.files[0]
  if (file) {
    const reader = new FileReader();
    reader.onload = () => {
      const imageDataUrl = reader.result;
      dispatch(setImage(imageDataUrl));
      console.log(imageDataUrl);
    };
    reader.readAsDataURL(file);
  }
}

  const handleSubmit = (e: any) => {
    e.preventDefault();
    console.log("Form submitted:");
    console.log("firstNAME:", reduxState.firstName);
    console.log("lastNAME:", reduxState.lastName);
    console.log("email:", reduxState.email);
    console.log("password", reduxState.password);
    console.log("gender:", reduxState.gender);
    console.log("country:", reduxState.country);
    console.log("address:", reduxState.address);
    console.log("date", reduxState.date);
    console.log("institute:", reduxState.institute);
    console.log("degree:", reduxState.degree);
    console.log("file",reduxState.getImage);
  };

  

  return (
    <div className="container mt-4">
      <form onSubmit={handleSubmit}>
        <label>Institute Name:</label>
        <input
          type="text"
          onChange={(e) => handleInputChange("institute", e.target.value)}
          value={localState.Institute}
        />
        <div className="form-check">
          <input
            type="checkbox"
            className="form-check-input"
            id="bachelors"
            checked={localState.degree === "Bachelor's Degree"}
            onChange={() => handleInputChange("degree", "Bachelor's Degree")}
            value="Bachelor's Degree"
          />
          <label className="form-check-label" htmlFor="bachelors">
            Bachelor's Degree
          </label>
        </div>
        <div className="form-check">
          <input
            type="checkbox"
            className="form-check-input"
            id="masters"
            checked={localState.degree === "Master's Degree"}
            value="Master's Degree"
            onChange={() => handleInputChange("degree", "Master's Degree")}
          />
          <label className="form-check-label" htmlFor="masters">
            Master's Degree
          </label>
        </div>
        <div className="form-check">
          <input
            type="checkbox"
            className="form-check-input"
            id="phd"
            checked={localState.degree === "PH.D."}
            value="PH.D."
            onChange={() => handleInputChange("degree", "PH.D.")}
          />
          <label className="form-check-label" htmlFor="phd">
            Ph.D.
          </label>
        </div>
        <div className="form-check">
          <input
            type="checkbox"
            className="form-check-input"
            id="other"
            checked={localState.degree === "other"}
            value="other"
            onChange={() => handleInputChange("degree", "other")}
          />
          <label className="form-check-label" htmlFor="other">
            Other
          </label>
        </div>
        <input type="file"
        onChange={handleImage}
        />
        {
          <img src={reduxState.getImage} 
          style={{height:"100px", width:"100px"}}/>
        }
        <button type="submit" className="btn btn-primary mt-2">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Component5;
