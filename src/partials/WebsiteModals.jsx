import React from "react";

class WebsiteModals extends React.Component {
    render() {
        return (
            <div className="modal fade" id="signup-status-modal">
                <div className="modal-dialog modal-lg">
                    <div className="modal-content">
                        <div className="modal-header">
                            <button type="button" className="close" data-dismiss="modal">&times;</button>
                            <h3 className="modal-title">Information</h3>
                        </div>
                        <div className="modal-body">
                            Thank you!
                        </div>

                        <div className="modal-footer">
                            <a href="test" className="btn btn-default" data-dismiss="modal">Close</a>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default WebsiteModals;