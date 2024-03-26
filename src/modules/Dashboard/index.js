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

const Dashboard = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const toggle = () => setDropdownOpen((prevState) => !prevState);
  return (
    <div className="vh-100 d-flex flex-column">
      <Dropdown
        className="w-full d-flex justify-content-end px-2"
        isOpen={dropdownOpen}
        toggle={toggle}
      >
        <DropdownToggle data-toggle="dropdown" tag="span">
          <div className="p-2 bg-white">
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
            <div className="d-flex justify-content-between align-items-center">
              <span>Log out</span>
              <Power />
            </div>
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>

      <div
        className="bg-grey h-full d-flex justify-content-center align-items-center flex-column"
        style={{ flex: "auto" }}
      >
        <p className="fs-24">Welcome to Demo App</p>
        <div className="w-50 mt-5 position-relative">
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
