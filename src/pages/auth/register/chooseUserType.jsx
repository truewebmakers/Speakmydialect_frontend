import { routes } from "@/constants/constant";
import React from "react";

const ChooseUserType = () => {
  return (
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-lg-8 col-md-10">
          <div class="bg-light p-5 rounded shadow-lg register">
            <h1 class="font-weight-bold mb-4">Register</h1>
            <p class="mb-4">Get started with choosing your role</p>
            <div class="row">
              <div class="col-lg-6 mb-4">
                <a href={routes.ClientRegister} class="text-decoration-none">
                  <div class="bg-white border rounded p-5 text-center shadow-sm">
                    <img
                      src="/argos-shared/img/findSupport.06e889f2.svg"
                      alt=""
                      height="48"
                      class="mt-3 mb-4"
                    />
                    <p class="text-dark font-weight-bold fs-5 mb-3">
                      Join As A Client
                    </p>
                    <p class="text-secondary fs-6 mb-0">
                      I want to hire interpreters.
                    </p>
                  </div>
                </a>
              </div>
              <div class="col-lg-6 mb-4">
                <a
                  href={routes.TranslatorRegister}
                  class="text-decoration-none"
                >
                  <div class="bg-white border rounded p-5 text-center shadow-sm">
                    <img
                      src="/argos-shared/img/findSupport.06e889f2.svg"
                      alt=""
                      height="48"
                      class="mt-3 mb-4"
                    />
                    <p class="text-dark font-weight-bold fs-5 mb-3">
                      Join As A Interpreter
                    </p>
                    <p class="text-secondary fs-6 mb-0">I want to get hired.</p>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChooseUserType;
