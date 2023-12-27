import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateComponentData } from "../slice/component1Slice";
import { RootState } from "../store/store";

const Component3 = () => {
  const reduxState = useSelector((state: RootState) => state.slice1);
  const dispatch = useDispatch();
  console.log("this is state", reduxState);
  const [localState, setLocalState] = useState({
    gender: reduxState.gender || "",
    country: reduxState.country || "",
  });

  useEffect(() => {
    setLocalState({
      gender: reduxState.gender || "",
      country: reduxState.country || "",
    });
  }, [reduxState]);

  const handleInputChange = (field: string, value: string) => {
    setLocalState((prev) => ({
      ...prev,
      [field]: value,
    }));
    dispatch(updateComponentData({ field, value }));
  };

  return (
    <div className="container mt-4">
      <form>
        <div className="mb-3">
          <label htmlFor="gender" className="form-label">
            Gender
          </label>
          <div>
            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="radio"
                name="gender"
                id="male"
                value="male"
                checked={localState.gender === "male"}
                onChange={() => handleInputChange("gender", "male")}
              />
              <label className="form-check-label" htmlFor="male">
                Male
              </label>
            </div>
            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="radio"
                name="gender"
                id="female"
                value="female"
                checked={localState.gender === "female"}
                onChange={() => handleInputChange("gender", "female")}
              />
              <label className="form-check-label" htmlFor="female">
                Female
              </label>
            </div>
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="country" className="form-label">
            Country
          </label>
          <select
            className="form-select"
            id="country"
            value={localState.country}
            onChange={(e) => handleInputChange("country", e.target.value)}
          >
            <option value="">Select Country</option>
            <option value="India">India</option>
            <option value="usa">United States</option>
            <option value="canada">Canada</option>
            <option value="uk">United Kingdom</option>
          </select>
        </div>
      </form>
    </div>
  );
};

export default Component3;
