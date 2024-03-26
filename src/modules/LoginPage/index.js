/* eslint-disable jsx-a11y/anchor-is-valid */
import { Form, FormGroup, Label, Input, Button } from "reactstrap";
import { ReactComponent as SocialButtons } from "../../assets/social-buttons.svg";
import MeetingImage from "../../assets/meeting.svg";
import "./styles.css";
import { useHistory } from "react-router-dom";

const LoginPage = () => {
  const history = useHistory();

  const handleSubmitForm = (e) => {
    e.preventDefault();
  };

  return (
    <div className="container-fluid vh-100">
      <div className="row">
        <div className="col-8 vh-100 d-flex justify-content-center align-items-center">
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
          <Form>
            <FormGroup>
              <Label className="fs-12 label-required" for="form-login-email">
                Email
              </Label>
              <Input
                id="form-login-email"
                name="email"
                placeholder="joinDoe@gmail.com"
                type="email"
                required
              />
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
                required
              />
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
              onClick={handleSubmitForm}
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
