import { Container, Row, Col } from "react-bootstrap";
import React from "react";

function graphimages() {
  return (
    <>
      <div className="row graph_row">
        <div className="graph_img">
          <button
            type="button"
            className="btn btn-primary"
            data-toggle="modal"
            data-target=".bs-example-modal-new"
          >
            open modal
          </button>

          <div
            className="modal fade bs-example-modal-new"
            tabindex="-1"
            role="dialog"
            aria-labelledby="myLargeModalLabel"
            aria-hidden="true"
          >
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <button
                    type="button"
                    className="close"
                    data-dismiss="modal"
                    aria-label="Close"
                  >
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div className="modal-body">
                  <div className="body-message">
                    <div className="row">
                      <div className="col-6">
                        <h4>Once SPOT broke this level, it rallied$3.00</h4>
                      </div>
                      <div className="col-6">
                        <img src="assets/images/btn-bf.png" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default graphimages;
