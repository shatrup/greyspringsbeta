import React from "react";
const axios = require('axios');

class WebsiteFooter extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            fields: {},
            errors: {}
        }
    }

    getInputVal(id) {
        var element = document.getElementById(id);
        return element.value;
    }

    handleValidation() {
        let fields = this.state.fields;
        let errors = {};
        let formIsValid = true;

        //Email
        if (!fields["email"]) {
            formIsValid = false;
            errors["email"] = "Cannot be empty";
        }

        if (typeof fields["email"] !== "undefined") {
            let lastAtPos = fields["email"].lastIndexOf('@');
            let lastDotPos = fields["email"].lastIndexOf('.');

            if (!(lastAtPos < lastDotPos && lastAtPos > 0 && fields["email"].indexOf('@@') === -1 && lastDotPos > 2 && (fields["email"].length - lastDotPos) > 2)) {
                formIsValid = false;
                errors["email"] = "Email is not valid";
            }
        }


        this.setState({ errors: errors });
        return formIsValid;
    }

    signupFormSubmit = (e) => {
        e.preventDefault();
        e.preventDefault();
        console.log(1234);
        // Get values
        var userEmail = this.getInputVal('signupUserEmail');
        // show waiting ring here
        // https://us-central1-greyspringsmail.cloudfunctions.net/signup
        // http://localhost:5000/greyspringsmail/us-central1signup
        axios.get("https://us-central1-greyspringsmail.cloudfunctions.net/signup", {
            params: {
                email: userEmail
            },
            headers: {
                crossdomain: true
            },

        }).then((response) => {
            var data = response.data;

            if (data.error) {
                alert("Error signup: details: " + data.error);
                // hide waiting ring here. do not reset form data.
            } else {
                alert("Request signup: " + JSON.stringify(data));
                // reset form
                // hide waiting ring
            }
        }).catch(function (error) {
            console.log(error);
        });

        if (this.handleValidation()) {
            alert("Thank you for Subscribing.");
            document.getElementById("signupform").reset();
        } else {
            alert("Subscription errors.")
        }

        document.getElementById('signupform').reset();

    }

    //   myFunction() {
    //     document.getElementById("signupform").reset();
    //   }

    handleChange(field, e) {
        let fields = this.state.fields;
        fields[field] = e.target.value;
        this.setState({ fields });
    }


    render() {
        return (
            <footer className="footer">
                <div className="container footer-top-row-wrapper">
                    <div className="container">
                        <div className="container footer-top-row">
                            <div className="col-xs-12 col-md-4">
                                <div className="footer-section">
                                    <div className="footer-section-title">Contact Us</div>
                                    <div className="footer-section-item">
                                        <div className="footer-section-item-title">Address</div>
                                        <div className="footer-section-item-text">
                                            C - 126, Naraina Industrial Area, <br />
                                            Phase 1, First Floor, New Delhi 100019, India
                                            </div>
                                    </div>
                                    <div className="footer-section-item">
                                        <div className="footer-section-item-title">Phone</div>
                                        <div className="footer-section-item-text">+91 9014250934</div>
                                    </div>
                                    <div className="footer-section-item">
                                        <div className="footer-section-item-title">Email</div>
                                        <div className="footer-section-item-text"><a href="mailto:contact@greysprings.com" title='ContactUs' >contact@greysprings.com</a></div>
                                        <div className="footer-section-item-text social-links-wrapper">
                                            <div className="social-item">
                                                <a href="https://www.facebook.com/greysprings" target="_blank" rel="noopener noreferrer" title='Facebook'>
                                                    <i className="fa fa-facebook"></i>
                                                </a>
                                            </div>
                                            <div className="social-item">
                                                <a href="https://twitter.com/greysprings" target="_blank" rel="noopener noreferrer" title='Twitter'>
                                                    <i className="fa fa-twitter"></i>
                                                </a>
                                            </div>
                                            <div className="social-item">
                                                <a href="https://plus.google.com/111631486877697048983/" target="_blank" rel="noopener noreferrer" title='Google Plus'>
                                                    <i className="fa fa-google-plus"></i>
                                                </a>
                                            </div>
                                            <div className="social-item">
                                                <a href="https://www.youtube.com/channel/UCSWsOyjT6cOLgizVizviMjQ" target="_blank" rel="noopener noreferrer" title='YouTube'>
                                                    <i className="fa fa-youtube"></i>
                                                </a>
                                            </div>
                                            <div className="social-item">
                                                <a href="https://www.linkedin.com/company/greysprings-software-solutions-pvt-ltd-" target="_blank" rel="noopener noreferrer" title='LinkedIn'>
                                                    <i className="fa fa-linkedin"></i>
                                                </a>
                                            </div>
                                            <div className="social-item">
                                                <a href="http://www.pinterest.com/Greysprings/" target="_blank" rel="noopener noreferrer"><i className="fa fa-pinterest" title='Pinterest'>
                                                </i>
                                                </a>
                                            </div>
                                            <div className="social-item">
                                                <a href="https://www.instagram.com/greyspringsapps/" target="_blank" rel="noopener noreferrer" title='Instagram'>
                                                    <i className="fa fa-instagram"></i>
                                                </a>
                                            </div>
                                            <div className="social-item">
                                                <a href="mailto:contact@greysprings.com"><i className="fa fa-envelope" title='Email'></i></a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="col-xs-12 col-md-4 footer-social-section">
                                <div className="footer-section">
                                    <div className="footer-section-title">Find us on Store</div>
                                    <div className="footer-section-item">
                                        <div className="footer-section-item-text">
                                            <i className="fa fa-caret-right"></i>
                                            <a href="http://windows.microsoft.com/en-us/windows/search#q=greysprings&s=Store" target="_blank" rel="noopener noreferrer" title='Windows store'>
                                                Windows Store
                                                </a>
                                        </div>
                                    </div>
                                    <div className="footer-section-item">
                                        <div className="footer-section-item-text">
                                            <i className="fa fa-caret-right"></i>
                                            <a href="http://www.windowsphone.com/en-us/search?q=greysprings" target="_blank" rel="noopener noreferrer" title='Windows Phone'>
                                                Windows Phone Store
                                                </a>
                                        </div>
                                    </div>
                                    <div className="footer-section-item">
                                        <div className="footer-section-item-text">
                                            <i className="fa fa-caret-right"></i>
                                            <a href="https://play.google.com/store/apps/dev?id=5034930044421076848&hl=en" target="_blank" rel="noopener noreferrer" title='Google Play'>
                                                Google Play
                                                </a>
                                        </div>
                                    </div>
                                    <div className="footer-section-item">
                                        <div className="footer-section-item-text">
                                            <i className="fa fa-caret-right"></i>
                                            <a href="https://itunes.apple.com/us/artist/greysprings-software-solutions/id726944788" target="_blank" rel="noopener noreferrer" title='Apple AppStore'>
                                                Apple AppStore
                                                </a>
                                        </div>
                                    </div>
                                    <div className="footer-section-item">
                                        <div className="footer-section-item-text">
                                            <i className="fa fa-caret-right"></i>
                                            <a href="http://www.amazon.com/s/ref=nb_sb_noss_1?url=search-alias%3Dmobile-apps&field-keywords=greysprings" target="_blank" rel="noopener noreferrer" title='Amazon Store'>
                                                Amazon Store
                                                </a>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="col-xs-12 col-md-4 footer-signup-section">
                                <div className="footer-section">
                                    <div className="footer-section-title">Newsletter</div>
                                    <div className="footer-section-item">
                                        <div className="footer-section-item-title">Email Address:</div>
                                        <div className="footer-section-item-text signup-newsletter-form">
                                            <form className="form-group" id="signupform" onSubmit={this.signupFormSubmit.bind(this)} >
                                                <input className="form-control" id="signupUserEmail" name="signupUserEmail" type="email" size="50" placeholder="Your Email Address" onChange={this.handleChange.bind(this, "email")} value={this.state.fields["email"]} required />
                                                <button type="submit" className="btn btn-info" id="signup-btn" value="Submit" title='Sign Up'>Sign up</button>
                                                <br />
                                                <span className="error">{this.state.errors["email"]}</span>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="container footer-bottom-row-wrapper">
                    <div className="container">
                        <div className="container footer-bottom-row">
                            <div className="col-md-10 hidden-xs hidden-sm">
                                <img src="/images/gs_logo_square_blue_50X50.png" alt="Greysprings Logo" title='Greysprings' />
                                &nbsp; &copy; Greysprings software Solutions Pvt. Ltd
                            </div>

                            <div className="col-xs-12 hidden-lg hidden-md footer-logo-text">
                                <div className="col-xs-12 col-md-1 link-footer-bottom">
                                    <img src="/images/gs_logo_square_blue_50X50.png" alt="Greysprings logo blue square" />
                                </div>
                                <div className="col-xs-12 col-md-11 link-footer-bottom">
                                    &nbsp; &copy; Greysprings software Solutions Pvt. Ltd
                                </div>
                            </div>

                            <div className="col-md-2 hidden-xs hidden-sm link-footer-bottom">
                                <div className="col-xs-6 ">
                                    <a href="/privacy" title='Privcy' >Privacy</a>
                                </div>
                                <div className="col-xs-6">
                                    <a href="/contact" title='Contact'>Contact</a>
                                </div>
                            </div>

                            <div className="col-xs-12 hidden-lg hidden-md link-footer-bottom">
                                <span><a href="/privacy">Privacy</a></span>&nbsp; &nbsp;
                                    <span><a href="/contact">Contact</a></span>
                            </div>

                        </div>
                    </div>
                </div>

            </footer>
        );
    }
}

export default WebsiteFooter;