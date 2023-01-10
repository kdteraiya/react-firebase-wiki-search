import React, {useContext} from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../Router";
import "./Nav.css";

function PrimaryHeader(props) {
  //useEffect(() => console.clear(), []);

  const { user } = useContext(AuthContext);

  return (
    <>
      <header className="primary-header d-flex">
        <div className="container">
          <div className="row align-items-sm-center">
            <div className="col-lg-8 col-md-4 col-sm-12">
              <Link className="logo" to="#" ><img src={user.userPic}/></Link>
            </div>
            <div className="col-lg-4 col-md-8 col-sm-12">
              <ul className="d-flex justify-content-between">
              <li><Link to="/" >Home</Link></li>
                <li><Link to="/search/" >Search</Link></li>
                <li><Link to="/scorecard/" >Scorecard</Link></li>
              </ul>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}

export default PrimaryHeader;
