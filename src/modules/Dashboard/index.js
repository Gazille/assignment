import "./styles.css";
import avatar from "../../assets/avatar.svg";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
} from "reactstrap";
import cloudStorage from "../../assets/cloudstorage.svg";
import { useState } from "react";
import { ReactComponent as Power } from "../../assets/power.svg";
import { useDispatch } from "react-redux";
import { logout } from "../../appSlice";
import { useHistory } from "react-router";

const Dashboard = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const toggle = () => setDropdownOpen((prevState) => !prevState);

  const handleLogout = () => {
    const accessToken = localStorage.getItem("accessToken");
    const refreshToken = localStorage.getItem("refreshToken");
    dispatch(
      logout({
        accessToken,
        refreshToken,
      })
    ).then(() => history.push("/login"));
  };
  return (
    <div className="d-flex flex-column position-relative">
      <Dropdown
        className="vw-100 d-flex justify-content-end px-2 position-absolute bg-white"
        isOpen={dropdownOpen}
        toggle={toggle}
      >
        <DropdownToggle data-toggle="dropdown" tag="span">
          <div className="p-2">
            <div className="d-flex">
              <div className="me-2">
                <p className="m-0">John Doe</p>
                <p className="m-0">Available</p>
              </div>
              <div>
                <img src={avatar} alt="Avatar" className="avatar" />
              </div>
            </div>
          </div>
        </DropdownToggle>
        <DropdownMenu>
          <DropdownItem>
            <div
              className="d-flex justify-content-between align-items-center"
              onClick={handleLogout}
            >
              <span>Log out</span>
              <Power />
            </div>
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>

      <div className="bg-grey h-full d-flex justify-content-center align-items-center flex-column pt-120">
        <p className="fs-24">Welcome to Demo App</p>
        <div className="mt-5 position-relative">
          <img
            src={cloudStorage}
            alt="cloundstorage"
            className="object-fit-contain w-100"
          />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
