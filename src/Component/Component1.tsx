import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateComponentData } from "../slice/component1Slice";
import { RootState } from "../store/store";

const Component1 = () => {
  const reduxState = useSelector((state: RootState) => state.slice1);
  const dispatch = useDispatch();
  console.log("this is state", reduxState);
  const [localState, setLocalState] = useState({
    firstName: reduxState.firstName || "",
    lastName: reduxState.lastName || "",
  });

  useEffect(() => {
    setLocalState({
      firstName: reduxState.firstName || "",
      lastName: reduxState.lastName || "",
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
    <div className="container">
      <form className="border p-4 justify-content-center">
        <div className="col">
          <div className="row-md-6 mb-3">
            <label htmlFor="firstName" className="form-label">
              First Name
            </label>
            <input
              type="text"
              className="form-control"
              id="firstName"
              value={localState.firstName}
              onChange={(e) => handleInputChange("firstName", e.target.value)}
            />
          </div>
          <div className="row-md-6 mb-3">
            <label htmlFor="lastName" className="form-label">
              Last Name
            </label>
            <input
              type="text"
              className="form-control"
              id="lastName"
              value={localState.lastName}
              onChange={(e) => handleInputChange("lastName", e.target.value)}
            />
          </div>
        </div>
      </form>
    </div>
  );
};

export default Component1;
