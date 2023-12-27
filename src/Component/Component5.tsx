import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateComponentData } from "../slice/component1Slice";
import { RootState } from "../store/store";

const Component5 = () => {
  const reduxState = useSelector((state: RootState) => state.slice1);
  const dispatch = useDispatch();
  console.log("this is state", reduxState);
  console.log("this is redux state file upload:",reduxState.file)

  const [localState, setLocalState] = useState({
    Institute: reduxState.institute || "",
    degree: reduxState.degree || "",
    file:reduxState.file ||""
  });


  useEffect(() => {
    setLocalState({
      Institute: reduxState.institute || "",
      degree: reduxState.degree || "",
      file:reduxState.file
    });
  }, [reduxState]);
 

  const handleInputChange = (field: string, value: string) => {
    setLocalState((prev) => ({
      ...prev,
      [field]: value,
    }));
    dispatch(updateComponentData({ field, value }));
  };
  

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
    console.log("file",reduxState.file);
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
        <div className="custom-file">
  <input type="file" className="custom-file-input" id="customFile"
  onChange={(e)=>handleInputChange("file",e.target.value)}
  />
  <label className="custom-file-label">
  {localState.file ?localState.file : "Choose file"}
          </label>
</div>
        <button type="submit" className="btn btn-primary mt-2">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Component5;
