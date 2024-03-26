/* eslint-disable jsx-a11y/anchor-is-valid */
import {
  Form,
  FormGroup,
  Label,
  Input,
  Button,
  FormFeedback,
} from "reactstrap";
import { ReactComponent as SocialButtons } from "../../assets/social-buttons.svg";
import MeetingImage from "../../assets/meeting.svg";
import "./styles.css";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../../appSlice";
import { useState } from "react";
import { regEmail } from "../../constants";
import { isEmpty } from "lodash";

const LoginPage = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [validates, setValidates] = useState(() => ({
    email: "",
    password: "",
  }));

  const accessToken = localStorage.getItem("accessToken");
  if (accessToken) {
    history.push("/dashboard");
  }

  const handleSubmitForm = async (e) => {
    e.preventDefault();
    const result = await Promise.all([
      handleValidateEmail(e.target.elements.email.value),
      handleValidatePassword(e.target.elements.password.value),
    ]);
    if (result.every((value) => value)) {
      dispatch(
        login({
          email: e.target.elements.email.value,
          password: e.target.elements.password.value,
        })
      ).then(() => history.push("/dashboard"));
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

  return (
    <div className="container-fluid vh-100">
      <div className="row">
        <div className="col-8 vh-100 d-flex justify-content-center align-items-center bg-grey">
          <div className="w-75">
            <img
              src={MeetingImage}
              alt="meeting object-fit-contain"
              className="w-100"
            />
          </div>
        </div>
        <div className="col-4 d-flex justify-content-center vh-100 flex-column px-70">
          <div className="header mb-4">
            <p className="fs-18 fw-medium mb-2">
              Welcome to Entrance Test Interview! 👋🏻
            </p>
            <p className="m-0">
              Please sign-in to your account and start the adventure
            </p>
          </div>
          <Form onSubmit={handleSubmitForm}>
            <FormGroup>
              <Label className="fs-12 label-required" for="form-login-email">
                Email
              </Label>
              <Input
                id="form-login-email"
                name="email"
                placeholder="joinDoe@gmail.com"
                invalid={!isEmpty(validates.email)}
                onChange={(e) => handleValidateEmail(e.target.value)}
              />
              {validates.email === "error-required" && (
                <FormFeedback>The email is required</FormFeedback>
              )}
              {validates.email === "error-invalid" && (
                <FormFeedback>The email is not valid</FormFeedback>
              )}
            </FormGroup>

            <FormGroup>
              <Label
                for="form-login-email"
                className="d-flex justify-content-between fs-12"
              >
                <span className="label-required">Password</span>
                <a className="cursor-pointer link-offset-2 link-underline link-underline-opacity-0 color-indigo-400">
                  Forgot Password?
                </a>
              </Label>
              <Input
                id="form-login-password"
                name="password"
                type="password"
                invalid={!isEmpty(validates.password)}
                onChange={(e) => handleValidatePassword(e.target.value)}
              />
              {validates.password === "error-required" && (
                <FormFeedback>The email is required</FormFeedback>
              )}
            </FormGroup>
            <FormGroup check className="mb-3">
              <Input id="form-login-remember" type="checkbox" />{" "}
              <Label className="fs-12" for="form-login-remember" check>
                Remember me
              </Label>
            </FormGroup>
            <Button
              className="w-100 bgcolor-indigo-400 mb-3"
              type="submit"
              // onClick={handleSubmitForm}
            >
              Login
            </Button>
            <div className="justify-content-center column-gap-2 d-flex w-100 mb-3">
              <span>New on our platform?</span>
              <a
                className="cursor-pointer link-offset-2 link-underline link-underline-opacity-0 color-indigo-400"
                onClick={() => history.push("/signup")}
              >
                Create an account
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

export default LoginPage;
