import {Link} from "react-router-dom";

const Layout = () => {
  let Navigation: string[] = [];
  const userRole = localStorage.getItem("role");
  switch (userRole) {
    case "manager":
      Navigation = ["home", "career", "about", "call", "managerpanel"];
      break;
    case "admin":
      Navigation = ["home", "career", "about", "call", "adminpanel"];
  }
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
        {Navigation.map((item) => (
          <ul key={item}>
            <li style={{color: "black"}}>
              <Link to={item} style={{color: "black"}}>
                {item}
              </Link>
            </li>
          </ul>
        ))}
      </nav>
    </div>
  );
};

export default Layout;
