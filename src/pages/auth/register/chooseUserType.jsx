import { Link } from "react-router-dom";
import { routes } from "@/constants/constant";
import React from "react";

const ChooseUserType = () => {
  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-lg-8 col-md-10">
          <div className="bg-light p-5 rounded shadow-lg register">
            <h1 className="font-weight-bold mb-4">Register</h1>
            <p className="mb-4">Get started with choosing your role</p>
            <div className="row">
              <div className="col-lg-6 mb-4">
                <Link
                  to={routes.ClientRegister}
                  className="text-decoration-none"
                >
                  <div className="bg-white border rounded p-5 text-center shadow-sm">
                    <img
                      src="   https://cdn-icons-png.flaticon.com/512/10485/10485059.png "
                      width="48"
                      height="48"
                      alt=""
                      title=""
                      class="img-small"
                    />
                    <p className="text-dark font-weight-bold fs-5 mb-3">
                      Join As A Client
                    </p>
                    <p className="text-secondary fs-6 mb-0">
                      I want to hire interpreters.
                    </p>
                  </div>
                </Link>
              </div>
              <div className="col-lg-6 mb-4">
                <Link
                  to={routes.TranslatorRegister}
                  className="text-decoration-none"
                >
                  <div className="bg-white border rounded p-5 text-center shadow-sm">
                    <img
                      src="   https://cdn-icons-png.flaticon.com/512/4303/4303979.png "
                      width="48"
                      height="48"
                      alt=""
                      title=""
                      class="img-small"
                    />
                    <p className="text-dark font-weight-bold fs-5 mb-3">
                      Join As An Interpreter
                    </p>
                    <p className="text-secondary fs-6 mb-0">
                      I want to get hired.
                    </p>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChooseUserType;
