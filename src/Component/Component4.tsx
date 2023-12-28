import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateComponentData } from "../slice/component1Slice";
import { RootState } from "../store/store";

const Component4 = () => {
  const reduxState = useSelector((state: RootState) => state.slice1);
  const dispatch = useDispatch();
  const [localState, setLocalState] = useState({
    address: reduxState.address || "",
    date: reduxState.date || "",
  });

  useEffect(() => {
    setLocalState({
      address: reduxState.address || "",
      date: reduxState.date || "",
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
        <div className="form-group">
          <label htmlFor="address">Address</label>
          <textarea
            id="address"
            className="form-control"
            rows={3}
            value={localState.address}
            onChange={(e) => handleInputChange("address", e.target.value)}
          ></textarea>
        </div>
        <div className="form-group">
          <label htmlFor="date">Date</label>
          <input
            type="date"
            id="date"
            className="form-control"
            value={localState.date}
            onChange={(e) => handleInputChange("date", e.target.value)}
          />
        </div>
      </form>
    </div>
  );
};

export default Component4;
