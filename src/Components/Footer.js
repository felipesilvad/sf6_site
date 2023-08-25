import {FaTwitter, FaYoutube} from 'react-icons/fa'
import { IconContext } from "react-icons";
import { Button } from 'react-bootstrap';

function FooterComponent() {

  return (
    <footer className="page-footer font-small blue pt-4 footer-bg">
      <div className="container-fluid text-center text-md-left">
        <div className="row">
          {/* <div className="col-md-4 mt-md-0 mt-3">
            <h5 className="text-uppercase ardela">WIP</h5>
            <p>Website still in Work in Progress</p>
          </div>

          <hr className="clearfix w-100 d-md-none pb-0"/>

          <div className="col-md-4 mb-md-0 mb-3">
            <h6 className="">Some Features Being Worked on That Will be Added in the Future</h6>
            <ul className="">
              <li>Home Page</li>
              <li>Search VOD by High level play</li>
              <li>Tournament Specific Page</li>
              <li>Character Specific Page</li>
              <li>Show Results Option on Player VS Player VOD List</li>
            </ul>
          </div> */}

          <div className="col-md-3 mb-md-0 mb-3">
            <div className="d-flex justify-content-center">
              <a className="mx-2" href="https://twitter.com/sf6_showdown">
              <IconContext.Provider value={{ className: "Social-Link" }}>
                <FaTwitter />
              </IconContext.Provider>
              </a>
              <a className="mx-2" href="https://www.youtube.com/@CloudDropll">
                <IconContext.Provider value={{ className: "Social-Link-yt" }}>
                  <FaYoutube />
                </IconContext.Provider>
              </a>
            </div>
            <a target="_blank" href='https://docs.google.com/forms/d/e/1FAIpQLSfCFWAMXxa41o8cysqfgBDiLciD7T-Q1sLTbxhGEPfj7jmm2A/viewform?usp=sf_link' >
              <Button className='ardela font-weight-bold mt-3'>Submit Feedback</Button>
            </a>
          </div>
        </div>
      </div>

      {/* <div className="footer-copyright text-center py-3">© 2020 Copyright:
          <a href="https://mdbootstrap.com/"> MDBootstrap.com</a>
      </div> */}

  </footer>
  );
}

export default FooterComponent;