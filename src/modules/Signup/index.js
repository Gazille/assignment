/* eslint-disable jsx-a11y/anchor-is-valid */
import { useHistory } from "react-router";
import { Button, Form, FormGroup, Input, Label } from "reactstrap";
// import { ReactComponent as GroupImage } from "../../assets/group.svg";
import { ReactComponent as SocialButtons } from "../../assets/social-buttons.svg";
import GroupImage from "../../assets/group.svg";
import { useDispatch } from "react-redux";
import { signup } from "../../appSlice";

const Signup = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  const handleSubmitForm = (e) => {
    e.preventDefault();
    dispatch(
      signup({
        email: "test997@gmail.com",
        password: "12345678",
        firstName: "Dev",
        lastName: "Mr",
      })
    );
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
          <Form>
            <FormGroup>
              <Label
                className="fs-12 label-required"
                for="form-signup-firstname"
              >
                Firstname
              </Label>
              <Input id="form-signup-firstname" name="firstname" />
            </FormGroup>
            <FormGroup>
              <Label
                className="fs-12 label-required"
                for="form-signup-lastname"
              >
                Lastname
              </Label>
              <Input id="form-signup-lastname" name="lastname" />
            </FormGroup>
            <FormGroup>
              <Label className="fs-12 label-required" for="form-signup-email">
                Email
              </Label>
              <Input
                id="form-signup-email"
                name="email"
                placeholder="joinDoe@gmail.com"
                type="email"
                required
              />
            </FormGroup>
            <FormGroup>
              <Label for="form-signup-email" className="fs-12 label-required">
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
                  className="cursor-pointer link-offset-2 link-underline link-underline-opacity-0 color-indigo-400"
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
