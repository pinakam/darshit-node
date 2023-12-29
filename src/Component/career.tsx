import { Link } from "react-router-dom"

const Career = ()=>{
    return(
        <div>
            <h1>this is career</h1>
            <button><Link to={"/career/detail"}>detail</Link></button>
        </div>
    )
}


export default Career