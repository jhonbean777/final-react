
import React, { Component } from "react";
import "./Footer.css";

// Footer component
export default class Footer extends Component {
  render() {
    return (

      <footer className="main-footer fixed-bottom">
        <div className="container">
          <div className="row">
            <div className="col-sm-12">
              <p>Copyright © {new Date().getFullYear()} All rights reserved.</p>
            </div>
          </div>
        </div>
      </footer>

    );
  }
}









