import React from 'react';

const Footer = () => (
  <footer className="footer fixed-bottom">
    <div className="container-fluid">
      <div className="row align-items-center flex-row-reverse">
        <div className="col-auto ml-lg-auto">
          <div className="row align-items-center">
            <div className="col-auto">
              <ul className="list-inline list-inline-dots mb-0">
                <li className="list-inline-item"></li>
              </ul>
            </div>
          </div>
        </div>
        <div className="col-12 col-lg-auto mt-3 mt-lg-0 text-center"></div>
      </div>
    </div>
    <div className="row footer-wave"></div>
  </footer>
);

export default Footer;
