import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateComponentData } from "../slice/component1Slice";
import { RootState } from "../store/store";
import { useEffect, useState } from "react";

const Component2 = () => {
  const reduxState = useSelector((state: RootState) => state.slice1);
  const dispatch = useDispatch();
  const [localState, setLocalState] = useState({
    email: reduxState.email || "",
    password: reduxState.password || "",
  });

  useEffect(() => {
    setLocalState({
      email: reduxState.email || "",
      password: reduxState.password || "",
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
      <form>
        <div className="mb-3">
          <label className="form-label">Email address</label>
          <input
            type="email"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            value={localState.email}
            onChange={(e) => handleInputChange("email", e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Password</label>
          <input
            type="password"
            className="form-control"
            id="exampleInputPassword1"
            value={localState.password}
            onChange={(e) => handleInputChange("password", e.target.value)}
          />
        </div>
        <div className="mb-3 form-check">
          <input
            type="checkbox"
            className="form-check-input"
            id="exampleCheck1"
          />
        </div>
      </form>
    </div>
  );
};

export default Component2;
