import "./account.css";
import Login from "../Login/Login";
import Register from "../Register/Register";

function account() {

    return (

        <div className="Account">
            <div className="container mx-auto mt-5 px-4">
                <ul className="nav nav-underline justify-content-center" id="myTab" role="tablist">
                    <li className="nav-item"  role="presentation">
                        <button className="nav-link login-link active" id="login-tab" data-bs-toggle="tab" data-bs-target="#home-tab-pane" type="button" role="tab" aria-controls="home-tab-pane" aria-selected="true">Login</button>
                    </li>
                    <li className="nav-item" role="presentation">
                        <button className="nav-link" id="register-tab" data-bs-toggle="tab" data-bs-target="#profile-tab-pane" type="button" role="tab" aria-controls="profile-tab-pane" aria-selected="false">Register</button>
                    </li>
                </ul>
                <div className="tab-content" id="myTabContent">
                    <div className="tab-pane fade show active" id="home-tab-pane" role="tabpanel" aria-labelledby="home-tab" tabindex="0">
                        <Login/>
                    </div>
                    <div className="tab-pane fade" id="profile-tab-pane" role="tabpanel" aria-labelledby="profile-tab" tabindex="0">
                        <Register />
                    </div>
                </div>
            </div>
        </div>
    );
}
export default account;
