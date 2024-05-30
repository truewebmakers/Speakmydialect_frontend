import Pagination1 from "@/components/section/Pagination1";
import DashboardNavigation from "../header/DashboardNavigation";
import { useState } from "react";
import ServiceCard1 from "../card/ServiceCard1";
import ProjectCard1 from "../card/ProjectCard1";
import JobCard1 from "../card/JobCard1";
import { product1, project1 } from "@/data/product";
import { job1 } from "@/data/job";
import { useLocation } from "react-router-dom";

const tab = [
  "Current Jobs",
  "Upcoming Jobs",
  "Completed Jobs",
  "Canceled Jobs",
];

const ordersTab = [
  "Current Orders",
  "Orders In-Transit",
  "Completed Orders",
  "Canceled Orders",
];

export default function SavedInfo() {
  const [getCurrentTab, setCurrentTab] = useState(0);
  const { pathname } = useLocation();
  console.log(pathname);
  return (
    <>
      <div className="dashboard__content hover-bgc-color">
        <div className="row pb40">
          <div className="col-lg-12">
            <DashboardNavigation />
          </div>
          <div className="col-lg-12">
            <div className="dashboard_title_area">
              {pathname?.includes("/jobs") ? (
                <h2>Job Management</h2>
              ) : (
                <h2>Orders</h2>
              )}

              <p className="text">Lorem ipsum dolor sit amet, consectetur.</p>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-xl-12">
            <div className="ps-widget bgc-white bdrs4 p30 mb30 position-relative">
              <div className="navtab-style1">
                <nav>
                  <div className="nav nav-tabs mb30">
                    {pathname?.includes("/jobs")
                      ? tab.map((item, i) => (
                          <button
                            onClick={() => setCurrentTab(i)}
                            key={i}
                            className={`nav-link fw500 ps-0 ${
                              getCurrentTab === i ? "active" : ""
                            }`}
                          >
                            {item}
                          </button>
                        ))
                      : ordersTab.map((item, i) => (
                          <button
                            onClick={() => setCurrentTab(i)}
                            key={i}
                            className={`nav-link fw500 ps-0 ${
                              getCurrentTab === i ? "active" : ""
                            }`}
                          >
                            {item}
                          </button>
                        ))}
                  </div>
                </nav>
                {/* Current Jobs */}
                {pathname?.includes("jobs")
                  ? getCurrentTab === 0 && (
                      <div className="row">
                        {product1.slice(0, 8).map((item, i) => (
                          <div key={i} className="col-sm-6 col-xl-3">
                            <ServiceCard1 data={item} />
                          </div>
                        ))}
                      </div>
                    )
                  : getCurrentTab === 0 && (
                      <div className="packages_table table-responsive">
                        <table className="table-style3 table at-savesearch">
                          <tbody className="t-body">
                            {job1.slice(0, 4).map((item, i) => (
                              <JobCard1 key={i} data={item} i={i} />
                            ))}
                          </tbody>
                        </table>
                      </div>
                    )}

                {/* Upcoming Jobs */}
                {pathname?.includes("jobs")
                  ? getCurrentTab === 1 && (
                      <div className="row">
                        {project1.slice(0, 6).map((item, i) => (
                          <div key={i} className="col-md-6 col-lg-12 col-xl-6">
                            <ProjectCard1 data={item} />
                          </div>
                        ))}
                      </div>
                    )
                  : getCurrentTab === 1 && (
                      <div className="packages_table table-responsive">
                        <table className="table-style3 table at-savesearch">
                          <tbody className="t-body">
                            {job1.slice(0, 4).map((item, i) => (
                              <JobCard1 key={i} data={item} i={i} />
                            ))}
                          </tbody>
                        </table>
                      </div>
                    )}

                {/*Completed Jobs*/}
                {getCurrentTab === 2 && (
                  <div className="packages_table table-responsive">
                    <table className="table-style3 table at-savesearch">
                      <tbody className="t-body">
                        {job1.slice(0, 4).map((item, i) => (
                          <JobCard1 key={i} data={item} i={i} />
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}

                {/* Canceled Jobs */}
                {pathname?.includes("jobs")
                  ? getCurrentTab === 3 && (
                      <div className="row">
                        {project1.slice(0, 6).map((item, i) => (
                          <div key={i} className="col-md-6 col-lg-12 col-xl-6">
                            <ProjectCard1 data={item} />
                          </div>
                        ))}
                      </div>
                    )
                  : getCurrentTab === 3 && (
                      <div className="packages_table table-responsive">
                        <table className="table-style3 table at-savesearch">
                          <tbody className="t-body">
                            {job1.slice(0, 4).map((item, i) => (
                              <JobCard1 key={i} data={item} i={i} />
                            ))}
                          </tbody>
                        </table>
                      </div>
                    )}
              </div>

              <Pagination1 />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
