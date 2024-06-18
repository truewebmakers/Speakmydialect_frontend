import { menus, loggedInMenu } from "@/data/navigation";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";

import { useRef } from "react";
import { Sidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import { useSelector } from "react-redux";

export default function NavSidebar() {
  const { pathname } = useLocation();
  const crossRef = useRef(null);
  const { user } = useSelector((state) => state.auth);

  return (
    <>
      <div
        className="offcanvas offcanvas-start"
        tabIndex={-1}
        id="offcanvasExample"
        aria-labelledby="offcanvasExampleLabel"
      >
        <div className="offcanvas-header border-bottom">
          <Link to="/">
            <img alt="Header Logo" src="/images/logo.jpeg" />
          </Link>
          <button
            ref={crossRef}
            type="button"
            className="btn-close"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          />
        </div>
        <div className="offcanvas-body">
          <div className="ui-navigation-sidebar">
            <Sidebar>
              <Menu>
                {user?.token?.length > 0
                  ? loggedInMenu.map((item, i) => (
                      <MenuItem
                        key={i}
                        component={<Link to={item?.path} />}
                        className={
                          item.path === pathname ? "ui-mobile-active" : ""
                        }
                      >
                        <span data-bs-dismiss="offcanvas">{item?.name}</span>
                      </MenuItem>
                    ))
                  : menus.map((item, i) => (
                      <MenuItem
                        key={i}
                        component={<Link to={item?.path} />}
                        className={
                          item.path === pathname ? "ui-mobile-active" : ""
                        }
                      >
                        <span data-bs-dismiss="offcanvas">{item?.name}</span>
                      </MenuItem>
                    ))}
              </Menu>
            </Sidebar>
          </div>
        </div>
      </div>
    </>
  );
}
