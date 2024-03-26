/* eslint-disable jsx-a11y/anchor-is-valid */
import { useHistory } from "react-router";
import {
  Button,
  Form,
  FormFeedback,
  FormGroup,
  Input,
  Label,
} from "reactstrap";
// import { ReactComponent as GroupImage } from "../../assets/group.svg";
import { ReactComponent as SocialButtons } from "../../assets/social-buttons.svg";
import GroupImage from "../../assets/group.svg";
import { useDispatch } from "react-redux";
import { signup } from "../../appSlice";
import { useState } from "react";
import { regEmail } from "../../constants";
import { isEmpty } from "lodash";

const Signup = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  const [validates, setValidates] = useState(() => ({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
  }));

  const handleSubmitForm = async (e) => {
    e.preventDefault();
    const email = e.target.elements.email.value;
    const password = e.target.elements.password.value;
    const lastName = e.target.elements.lastName.value;
    const firstName = e.target.elements.firstName.value;

    const result = await Promise.all([
      handleValidateEmail(email),
      handleValidatefirstName(firstName),
      handleValidateLastName(lastName),
      handleValidatePassword(password),
    ]);
    if (result.every((value) => value)) {
      dispatch(
        signup({
          email,
          password,
          firstName,
          lastName,
        })
      ).then(() => history.push("/login"));
    }
  };

  const handleValidateEmail = (value) => {
    if (!value) {
      setValidates((prevState) => ({ ...prevState, email: "error-required" }));
      return false;
    } else {
      if (!regEmail.test(value)) {
        setValidates((prevState) => ({
          ...prevState,
          email: "error-invalid",
        }));
        return false;
      }
    }
    setValidates((prevState) => ({ ...prevState, email: "" }));
    return true;
  };

  const handleValidatePassword = (value) => {
    if (!value) {
      setValidates((prevState) => ({
        ...prevState,
        password: "error-required",
      }));
      return false;
    }

    setValidates((prevState) => ({
      ...prevState,
      password: "",
    }));
    return true;
  };

  const handleValidateLastName = (value) => {
    if (!value) {
      setValidates((prevState) => ({
        ...prevState,
        lastName: "error-required",
      }));
      return false;
    }

    setValidates((prevState) => ({
      ...prevState,
      lastName: "",
    }));
    return true;
  };

  const handleValidatefirstName = (value) => {
    if (!value) {
      setValidates((prevState) => ({
        ...prevState,
        firstName: "error-required",
      }));
      return false;
    }

    setValidates((prevState) => ({
      ...prevState,
      firstName: "",
    }));
    return true;
  };

  return (
    <div className="container-fluid vh-100">
      <div className="row">
        <div className="col-8 vh-100 d-flex justify-content-center align-items-center">
          <div className="w-75">
            <img
              src={GroupImage}
              alt="group"
              className="object-fit-contain w-100"
            />
          </div>
        </div>
        <div className="col-4 d-flex justify-content-center vh-100 flex-column px-70">
          <div className="header mb-4">
            <p className="fs-18 fw-medium mb-3">Adventure starts here</p>
            <p className="fs-16 m-0">Make your app management easy and fun!</p>
          </div>
          <Form onSubmit={handleSubmitForm}>
            <FormGroup>
              <Label
                className="fs-12 label-required"
                for="form-signup-firstName"
              >
                FirstName
              </Label>
              <Input
                id="form-signup-firstName"
                name="firstName"
                onChange={(e) => handleValidatefirstName(e.target.value)}
                invalid={!isEmpty(validates.firstName)}
              />
              {validates.firstName === "error-required" && (
                <FormFeedback>The first name is required.</FormFeedback>
              )}
            </FormGroup>
            <FormGroup>
              <Label
                className="fs-12 label-required"
                for="form-signup-lastName"
              >
                LastName
              </Label>
              <Input
                id="form-signup-lastName"
                name="lastName"
                onChange={(e) => handleValidateLastName(e.target.value)}
                invalid={!isEmpty(validates.lastName)}
              />
              {validates.lastName === "error-required" && (
                <FormFeedback>The last name is required.</FormFeedback>
              )}
            </FormGroup>
            <FormGroup>
              <Label className="fs-12 label-required" for="form-signup-email">
                Email
              </Label>
              <Input
                id="form-signup-email"
                name="email"
                placeholder="joinDoe@gmail.com"
                onChange={(e) => handleValidateEmail(e.target.value)}
                invalid={!isEmpty(validates.email)}
              />
              {validates.email === "error-required" && (
                <FormFeedback>The email is required</FormFeedback>
              )}
              {validates.email === "error-invalid" && (
                <FormFeedback>The email is not valid</FormFeedback>
              )}
            </FormGroup>
            <FormGroup>
              <Label for="form-signup-email" className="fs-12 label-required">
                Password
              </Label>
              <Input
                id="form-signup-password"
                name="password"
                type="password"
                onChange={(e) => handleValidatePassword(e.target.value)}
                invalid={!isEmpty(validates.password)}
              />
              {validates.password === "error-required" && (
                <FormFeedback>The password is required</FormFeedback>
              )}
            </FormGroup>
            <FormGroup check className="mb-3">
              <Input id="form-signup-agree-term" type="checkbox" />
              <Label for="form-signup-agree-term" check>
                i agree to{" "}
                <a
                  href="#"
                  className="cursor-pointer link-offset-2 link-underline link-underline-opacity-0 color-indigo-400"
                >
                  privacy policy & terms
                </a>
              </Label>
            </FormGroup>
            <Button className="w-100 bgcolor-indigo-400 mb-3" type="submit">
              Sign Up
            </Button>
            <div className="justify-content-center column-gap-2 d-flex w-100 mb-3">
              <span>Already have an account?</span>
              <a
                className="cursor-pointer link-offset-2 link-underline link-underline-opacity-0 color-indigo-400"
                onClick={() => history.push("/login")}
              >
                Sign in instead
              </a>
            </div>
            <div className="relative line-throught-container mb-3">
              <div className="absolute line-throught-text">or</div>
            </div>
            <div className="icon-container d-flex justify-content-center">
              <SocialButtons />
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
