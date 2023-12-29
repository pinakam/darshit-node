import {Link} from "react-router-dom";

const Layout = () => {
    const value = ["home","career","about","call"]
  return (
    <div style={{display: "flex", minHeight: "100vh"}}>
      <nav
        style={{
          width: "200px",
          backgroundColor: "grey",
          color: "black",
          padding: "20px",
        }}
      >
        {
            value.map((item)=>{
                return(
                    <ul>
                        <li style={{color:"black"}}>
                        <Link to={item} style={{color:"black"}}>{item}</Link>
                        </li>
                    </ul>
                    
                )
                
            })
        }
        
      </nav>
    </div>
  );
};

export default Layout;
