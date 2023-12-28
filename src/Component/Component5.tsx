import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateComponentData,setImage } from "../slice/component1Slice";
import { RootState } from "../store/store";

const Component5 = () => {
  const reduxState = useSelector((state: RootState) => state.slice1);
  const dispatch = useDispatch();

  const [localState, setLocalState] = useState({
    Institute: reduxState.institute || "",
    degree: reduxState.degree || "",
    base64Image: reduxState.getImage || ""
  });


  useEffect(() => {
    setLocalState({
      Institute: reduxState.institute || "",
      degree: reduxState.degree || [],
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

  const handleCheckBox = (field: string, value: string) => {
  const updateDegree: string[] = reduxState.degree.includes(value)
    ? reduxState.degree.filter((degree: string) => degree !== value)
    : [...reduxState.degree, value];

  dispatch(updateComponentData({ field, value: updateDegree }));
};

  
  
const handleImage =(e:any)=>{
  const file = e.target.files[0]
  if (file) {
    const reader = new FileReader();
    reader.onload = () => {
      const imageDataUrl = reader.result;
      dispatch(setImage(imageDataUrl));
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
    onChange={() => handleCheckBox("degree", "Bachelor's Degree")}
    checked={reduxState.degree.includes("Bachelor's Degree") }
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
    value="Master's Degree"
    checked={reduxState.degree.includes("Master's Degree") }
    onChange={() => handleCheckBox("degree", "Master's Degree")}
  />
  <label className="form-check-label" htmlFor="masters">
    Master's Degree
  </label>
</div>
<div className="form-check">
  <input
    type="checkbox"
    className="form-check-input"
    id="PHD"
    value="P.H.D"
    checked={reduxState.degree.includes("P.H.D") }
    onChange={() => handleCheckBox("degree", "P.H.D")}
  />
  <label className="form-check-label" htmlFor="P.H.D">
    P.H.D
  </label>
</div>
<div className="form-check">
  <input
    type="checkbox"
    className="form-check-input"
    id="other"
    value="other"
   onChange={() => handleCheckBox("degree", "other")}
   checked={reduxState.degree.includes("other") }
  />
  <label className="form-check-label" htmlFor="other">
    other
  </label>
</div>


        <input type="file"
        onChange={handleImage}
        />
        { 
            
          <img src={reduxState.getImage?reduxState.getImage:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAANwAAACUCAMAAADPj7eyAAAAY1BMVEXy8vJmZmbz8/NgYGD4+Ph1dXVaWlrm5uaEhITh4eFqamqXl5fv7+9dXV1jY2Pq6urb29v+/v6Li4vV1dV9fX27u7ujo6PMzMxvb2+vr6/CwsKpqalVVVWdnZ21tbWRkZFNTU0W52YbAAAJcklEQVR4nO2c6XqjOgyGQYjFxtgsZgnZ5v6v8siGtEkKNJlpgvscvk77IyETv0iW5A3P27Rp06ZNmzZt2rRp06ZNmzZt2rRp06ZNmzZt+huBBwI88eIvgdf+/9NfOv6+mM0TdP/ezQfjV8Lr5b3+Dn7Fo38I3qtvKyCu4Zgeqjp9vY61wvdymZuJlQ4CmQUvl65e7yB3eKC6TPp+x18sGWRcvdkzRbH/I89VzF6t6iwP++KdpgMQhc7CvEDq8K9VkYeRfjtcGCUxCHx1mIY4ycJ3R8wB7vV3lOCid8MBjnCvFg5w742WG9wPaIP7Yf1P4X64Ga7AmdGr+eMJMMOwn5ErcMO4knKSED/XGlfgzJwDiGqXlum++qli1xU425QjP0RZFMm0+pnKzB04iMtMct/nvgxCZujmGmVaSz10mEFYarkzcIDnzDfiPpeZ9paH0Cb6mOmzZQu7A9f70r+IH3YoYKHh5j0zA7QcWV2BA3UM/E8FemFaDkzC8EQcC1huuDNwLJGj5UzH8302C2e7HKtLHSYntuiXzsDl+tMrTVCp5judAKySLAqCKEqqpcjjEhz/QCO/JLg5y3nIysxeRe6rUMwazxk4VgYXNGp20C25pTiObJwHqbjMzn+VK3Ce2Et/NB35Z5YahulPi6LOPj1YnmA2YroCJ7AKr8Jl1s53OYzl1ZUynC9nXIGjjnQaw6XkMmpg3itFGfFPOD86qznbuQMHcMqoK3GqT+RxurUWGHYfTjkwZnsc372XK3B2YavVfw70E/bTVrM1F1bddbYnwkDmqIbVzDu5AocmfQHGfV0znO1vBBDrwOc3dL7sTD6YQHAFTgwrhVgUBcWHuQhBRdeRhg7yDi5Lp1f7XIGD8a8QdrZhsmg0btlzeWc3qx6m6FyB88Zw4Y1tnG4QMB1MoPlSV1NZ0SG4RaEdnBZJNMVGFU06NTXxS+BsiQVFf5hmo3xQo7vR8ntRh6t8OQcns4lC5bfAURKAOJmH8zP91TF/DRz97CeDyUVR8yU9OgVn4/ns5EK7YDfrmT3eFaROwV1dcv8CeixZNJwZHzC8Tf9OwQ25e6oxQmCzzEZj3KCx6w2fcgturMK+ShSnP4tOSSWZ9IMdOOyWgMOE3b1bCmSH5Q5Ho0BOv7fTSu7AmYlKVadJkvbKu6oU7fyrKLNltkFZMtwZcA2O+lueZFkQZDLN8SamgNh9E0wuivZ4ZXdX4IgGmY7Geb0kNnHvcoXAlvNgajDw1Tn99moe3hU40xIdUbexocHOpn86ZpwEpks95Jja3BfH3FJgzrNhFGowoqucBSI9GLIH6CgfHM7wkRAcgLM2wpxy9Kd1eJYwHN/E/ptAeaca3OpzwrLd+lfJhr6DrJscfM9J2g2krsCZNUSms3sAWTKzDACoZwaocwpK5VCfE6gSs3P2Cs8sGJhFDnr3lD3S267vSrQrhCtwguIkRcMbBBtaslABsvDBFPfxUe4fcnQEDob8dll0vFamGUWaj0nYhw0YhPHg0SvDAfW3cs42PCtzKNruOdvRPciOZugu1oUzgX6ezdiA6KB91jOpFOiNY65tORNL/AWPC5IcoQqfCirSrLjmZLp14YRZj/LH+DHVTE79TiC23UODgg9xnh0VruyW9O3Dssa8XbiNmW34JQ8uskk/q2FFy6EwO6Kib6sPHpGLFTn/WDJ/TDKocNx6v4rlkKWPRAoZUK3yrGcaf14zoIAqH6uIiY6iSvtcVLErruu5Jd7XXDM2IMcNaIxgY+YzCnirksM6cCJ9vCCWQedZz3xqeBAkVbmK5UpGbI95pQXKwphi5hBVHi/DklUCSqaT53zMzxITM/3napWAysz3wwW+lE+FB24qseez+UpwT0ryMWZOrxvPfuzdcDDAyeml+2lxaUevlPlb/ozF+UqWe254PWxA7ETB9GMzmONn5LvPzwm0leJzdFaR7psve2y++UTxVjbPK/aHp5zrU8Ehemqejx+a4sdOzzwmjOWTQe/S1mdvScZj9Ja2uf+4hKCQHgWZfPpM+7PH5qOwfSuZZ44jCWT75A3as4XtSC8EpAiNL3+qBr78tPakxhMdr9X7nxcyyH73u93lPRpu65e11bmr/+mr/uXDf/eNw27lO6+Zc6K/dq7JHaYraGzHuFnjdnlrfufsL5FxVOENJ6xuUZa2TP0aKYV2G/CXjeYi/uWGM7sxzrFZhszNGYjrdzAfV5B/r0Clf2rqXdgG8W2OwDbKf7lbEpzWZtGnlWbR14aVwYDCY8MVaKPNpWsOvJezj+PpcoGOxMdbgSjrsEcqqX3T6SCOL1HEZnuCUIxqNsWIQgAKFoPZTWNfMHcBvVgR35uHN49KlH0doodVoMw+qS48j84I7BjD7rQLwzKvw9DsVYBeh51ZX8SartuVhN4mod5Zm66LMSljOcFbxEoqZLph7FgOS3jAghj3QZOzMihjluoYqu4UV1GP0Aa96kNOr+haVXrnIpkRwRVNCYXpc7UmD2S6tW3FvGO45wViTyPPotIV9meBRdkglGkB2HQKdmcBRZ8oNzOisVyRh5WFOzZmRfu8s7HDwjVlIcgZKW7kBMeYJ4rzEUVIAZaYlZfuaAyV2+XUtUkmZOAQ08b0OXE+mSYej2jP9VzgsA+VhTMDNWhlU8RdS720pZeTfV6xPqzWxpiWhfMqzajPqbI2qa45D7u/JuDYLtRhU+ScogtWXax0l2it09xdt6Rwfq4r38KRezXpDBx1R90Wx7TIuwFOKV3bIyPwzSMdVpKFo9BetgbuZM9LNzNwxTFRWKRH45ZgJpvILWuTwtnCgfg1NVgOWdJwJdKGzECIdgZkAi7Zw11AOe9sWcpcRDPll7Ec4I53Me40mE1fQyoguBiPSeEZOBjgGkAM9wWWZVHgkVMqKE0q0MrRuQvyLLIcxL6MMdYlq5LxSBxUkiyXFMpaDky6OMk2Pwc6L6poz+ztyPWR9X5/tTPdJYE4VWa2Cuu9Mg/s6cJGXcqvnYK+pjxX7cwuvl1Mhgq7HStr84TTrqnJoMDSUPdveE7tXwqHaQZEUyojpetxztHW+2DmGuiP8VzPzr6gmfZkirI5BRQwE70eOmq4UfbOj4/guT40YWfKbh45ZBMadU7lqfMZ4PPD72/0Q3qoXXC50FopLpM00bmTye0fRe4bt3Ufeys8ivoNgmEk7mhh8m+6jAEWHzT1a2WmGuwDAdZuyGsEbof/TZs2bdq0yVH9B5sClIgmZ28WAAAAAElFTkSuQmCC"} 
          style={{height:"100px", width:"100px"}}/>
        }
        <br></br>
        <button type="submit" className="btn btn-primary mt-2">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Component5;
