import React from "react";
import PropTypes from "prop-types";
import DefaultLayout from "../layouts/defaultLayout";
import HeroTile from "../modules/controls/HeroTile";
import ContactPageModel from "../models/ContactPageModel";
import ScrollButton from "../partials/ScrollButton";

const axios = require("axios");

class ContactSection extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      fields: {},
      errors: {},
      persons: []
    };
  }
  componentDidMount() { }

  getInputVal(id) {
    var element = document.getElementById(id);
    return element.value;
  }

  saveMessage(name, userEmail, cusubject, usermessage) {
    var newMessageRef = this.messagesRef.push();
    newMessageRef.set({
      name: name,
      userEmail: userEmail,
      cusubject: cusubject,
      usermessage: usermessage
    });
  }

  onFormSubmit = e => {
    e.preventDefault();
    console.log(1234);
    // Get values
    var name = this.getInputVal("name");
    var userEmail = this.getInputVal("userEmail");
    var cusubject = this.getInputVal("cusubject");
    var usermessage = this.getInputVal("usermessage");
    // show waiting ring here
    // https://us-central1-greyspringsmail.cloudfunctions.net/contact
    // http://localhost:5000/greyspringsmail/us-central1/contact
    axios
      .get("https://us-central1-greyspringsmail.cloudfunctions.net/contact", {
        params: {
          name: name,
          email: userEmail,
          subject: cusubject,
          message: usermessage
        },
        headers: {
          crossdomain: true
        }
      })
      .then(response => {
        var data = response.data;

        if (data.error) {
          alert("Error submitting form: details: " + data.error);
          // hide waiting ring here. do not reset form data.
        } else {
          alert("Request submitted successfully: " + JSON.stringify(data));
          // reset form
          // hide waiting ring
        }
      })
      .catch(function (error) {
        console.log(error);
      });
    //this.saveMessage(name, userEmail, cusubject, usermessage);

    //    // Show alert
    //    document.querySelector('.alert').style.display = 'block';

    // Hide alert after 3 seconds

    setTimeout(function () {
      document.querySelector('.alert').style.display = 'none';
    });

    // Clear form
    //    document.getElementById('contactusform').reset();

    //    if(this.handleValidation()){
    //        alert("Thank you for Contacting us. We will get back to you soon.");
    //        }
    //    else{
    //        alert("Form has errors.");
    //     }
  };

  handleValidation() {
    let fields = this.state.fields;
    let errors = {};
    let formIsValid = true;

    //Name
    if (!fields["name"]) {
      formIsValid = false;
      errors["name"] = "Cannot be empty";
    }

    if (typeof fields["name"] !== "undefined") {
      if (!fields["name"].match(/^[a-zA-Z]+$/)) {
        formIsValid = false;
        errors["name"] = "Only letters";
      }
    }

    //Email
    if (!fields["email"]) {
      formIsValid = false;
      errors["email"] = "Cannot be empty";
    }

    if (typeof fields["email"] !== "undefined") {
      let lastAtPos = fields["email"].lastIndexOf("@");
      let lastDotPos = fields["email"].lastIndexOf(".");

      if (
        !(
          lastAtPos < lastDotPos &&
          lastAtPos > 0 &&
          fields["email"].indexOf("@@") === -1 &&
          lastDotPos > 2 &&
          fields["email"].length - lastDotPos > 2
        )
      ) {
        formIsValid = false;
        errors["email"] = "Email is not valid";
      }
    }

    this.setState({ errors: errors });
    return formIsValid;
  }

  handleChange(field, e) {
    let fields = this.state.fields;
    fields[field] = e.target.value;
    this.setState({ fields });
  }

  render() {
    return (
      <div className="container contact-us-main-container">
        <section>
          <div className="page-header" id="contactus">
            <h2>Contact Us</h2>
          </div>
          <ul>{this.state.persons}</ul>
          <div className="row">
            <div className="col-md-4 address-wrapper">
              <p>Send us your queries or contact us at the address below</p>
              <address>
                <strong>Greysprings Software Solutions Pvt. Ltd.</strong>
                <br />
                <br />
                <strong>Head Office</strong>
                <br />
                C - 126, Naraina Industrial Area,
                <br />
                Phase 1, First Floor,
                <br />
                New Delhi, 110028
                <br />
                <br />
                <strong>Branch Office</strong>
                <br />
                First floor, Plot 32,
                <br />
                Prof CR Rao Rd, Doyens Colony, <br />
                Serilingampally, <br />
                Hyderabad, Telangana, 500019 <br />
                <br />
                <h4>Phone:</h4>
                <p>+919014250934</p>
                <h4>Email:</h4>
                <p>contact@greysprings.com</p>
              </address>
            </div>
            <div className="col-md-8 contact_form">
              <form
                action=""
                className="form-horizontal"
                name="contactus-form"
                id="contactusform"
                onSubmit={this.onFormSubmit}
              >
                <div className="form-group">
                  <label for="user-name" className="col-lg-2 control-label">
                    Name
                  </label>
                  <div className="col-lg-10">
                    <input
                      type="text"
                      className="form-control"
                      id="name"
                      placeholder="Your name"
                      onChange={this.handleChange.bind(this, "name")}
                      value={this.state.fields["name"]}
                      required
                    />
                    <span className="error">{this.state.errors["name"]}</span>
                  </div>
                </div>
                <div className="form-group">
                  <label for="user-email" className="col-lg-2 control-label">
                    Email
                  </label>
                  <div className="col-lg-10">
                    <input
                      type="email"
                      className="form-control"
                      id="userEmail"
                      name="cuemail"
                      placeholder="someone@example.com"
                      onChange={this.handleChange.bind(this, "email")}
                      value={this.state.fields["email"]}
                      required
                    />
                    <span className="error">{this.state.errors["email"]}</span>
                  </div>
                </div>
                <div className="form-group">
                  <label for="user-msg" className="col-lg-2 control-label">
                    Subject
                  </label>
                  <div className="col-lg-10">
                    <input
                      type="text"
                      className="form-control"
                      id="cusubject"
                      name="cusubject"
                      placeholder=""
                      required
                    />
                  </div>
                </div>
                <div className="form-group">
                  <label for="user-message" className="col-lg-2 control-label">
                    Message
                  </label>
                  <div className="col-lg-10">
                    <textarea
                      name="usermessage"
                      id="usermessage"
                      className="form-control"
                      cols="20"
                      rows="10"
                      placeholder="Write something to us"
                      required
                    />
                    <span className="error">
                      {this.state.errors["usermessage"]}
                    </span>
                  </div>
                </div>
                <div className="form-group">
                  <div className="col-lg-10 col-lg-offset-2">
                    <button
                      type="submit"
                      className="btn btn-primary"
                      value="Submit"
                    >
                      Submit
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </section>
      </div>
    );
  }
}

class Contact extends React.Component {
  state = {};
  componentWillMount() {
    console.log("Contact Page :WillMount");
    new ContactPageModel().getData().then(response => {
      this.setState({
        contact: response.contact,
        heroTileData: response.heroTile
      });
    });
  }

  componentDidMount() {
    console.log("ContactPage::componentDidMount");
  }
  render() {
    var seo = {};
    seo.pageTitle = "Greysprings Contact";

    return (
      <DefaultLayout seo={seo} allData={this.props}>
        {this.state.heroTileData && (
          <HeroTile heroTileData={this.state.heroTileData} />
        )}
        {this.state.contact && <ContactSection contact={this.state.contact} />}
        <ScrollButton />
      </DefaultLayout>
    );
  }
}

Contact.propTypes = {
  title: PropTypes.string
};

export default Contact;
