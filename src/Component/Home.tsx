import {Link} from "react-router-dom";
const Home = () => {
  return (
    <div>
      <div className="justify-content-center ">
        <h1>This is home page</h1>
        <button>
          <Link to={"/home/detail"}>Detail</Link>
        </button>
      </div>
    </div>
  );
};

export default Home;
