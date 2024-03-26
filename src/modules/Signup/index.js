/* eslint-disable jsx-a11y/anchor-is-valid */
import { useHistory } from "react-router";
import { Button, Form, FormGroup, Input, Label } from "reactstrap";
// import { ReactComponent as GroupImage } from "../../assets/group.svg";
import { ReactComponent as SocialButtons } from "../../assets/social-buttons.svg";
import GroupImage from "../../assets/group.svg";

const Signup = () => {
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
              src={GroupImage}
              alt="group"
              className="object-fit-contain w-100"
            />
          </div>
        </div>
        <div className="col-4 d-flex justify-content-center vh-100 flex-column px-5 row-gap-3">
          <p className="fs-5 fw-semibold m-0">Adventure starts here</p>
          <p className="fs-6 mb-2">Make your app management easy and fun!</p>
          <Form>
            <FormGroup>
              <Label for="form-signup-firstname">Firstname</Label>
              <Input id="form-signup-firstname" name="firstname" />
            </FormGroup>
            <FormGroup>
              <Label for="form-signup-lastname">Lastname</Label>
              <Input id="form-signup-lastname" name="lastname" />
            </FormGroup>
            <FormGroup>
              <Label for="form-signup-email">Email</Label>
              <Input
                id="form-signup-email"
                name="email"
                placeholder="joinDoe@gmail.com"
                type="email"
                required
              />
            </FormGroup>
            <FormGroup>
              <Label
                for="form-signup-email"
                className="d-flex justify-content-between"
              >
                Password
              </Label>
              <Input
                id="form-signup-password"
                name="password"
                type="password"
                required
              />
            </FormGroup>
            <FormGroup check className="mb-3">
              <Input id="form-signup-agree-term" type="checkbox" />
              <Label for="form-signup-agree-term" check>
                i agree to{" "}
                <a
                  href="#"
                  className="link-offset-2 link-underline link-underline-opacity-0 color-indigo-400"
                >
                  privacy policy & terms
                </a>
              </Label>
            </FormGroup>
            <Button
              className="w-100 bgcolor-indigo-400 mb-3"
              type="submit"
              onClick={handleSubmitForm}
            >
              Sign Up
            </Button>
            <div className="justify-content-center column-gap-2 d-flex w-100 mb-3">
              <span>Already have an account?</span>
              <a
                className="link-offset-2 link-underline link-underline-opacity-0 color-indigo-400"
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