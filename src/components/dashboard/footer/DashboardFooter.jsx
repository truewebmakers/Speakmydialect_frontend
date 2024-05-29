export default function DashboardFooter() {
  return (
    <>
      <footer className="dashboard_footer pt30 pb30">
        <div className="container">
          <div className="row align-items-center justify-content-center justify-content-md-between">
            <div className="col-auto">
              <div className="copyright-widget">
                <p className="mb-md-0">
                  Copyright © 2024 {new Date().getFullYear()} Powered By
                  SpeakMyDialect.com.au. All rights reserved.
                </p>
              </div>
            </div>
            <div className="col-auto">
              <div className="footer_bottom_right_btns at-home8 text-center text-lg-end"></div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
