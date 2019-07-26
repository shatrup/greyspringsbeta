import React from "react";
import PropTypes from "prop-types";
import DefaultLayout from "../layouts/defaultLayout";
import PrivacyPageModel from "../models/PrivacyPageModel.js";
import ScrollButton from "../partials/ScrollButton";


class PrivacyInitialBlock extends React.Component {
  render() {
    return (
      <div className="privacy-items">
        <div className="privacy-item">
          <p className="p-heading">
            <b>{this.props.privacy.heading}</b>
          </p>
          <p>{this.props.privacy.details}</p>
        </div>
      </div>
    );
  }
}

class PrivacySection extends React.Component {
  render() {
    return (
      <div className="container privacy-wrapper">
        <div className="container privacy">
          <div className="privacy-initials" />
          {this.props.privacy.initials.map((ups, ii) => (
            <p>{ups} !</p>
          ))}
          <div className="privacy-items">
            {this.props.privacy.items.map((ups, ii) => (
              <PrivacyInitialBlock privacy={ups} key={ii} />
            ))}
          </div>
        </div>
      </div>
    );
  }
}

class Privacy extends React.Component {
  state = {};
  componentWillMount() {
    console.log("About Page :WillMount");
    new PrivacyPageModel().getData().then(response => {
      this.setState({
        privacy: response.privacy
      });
    });
  }

  componentDidMount() {
    console.log("AboutPage::componentDidMount");
  }

  render() {
    console.log("Products:render");
    var seo = {};
    seo.pageTitle = "Greysprings Privacy";

    return (
      <DefaultLayout seo={seo} allData={this.props}>
        <div className="text-center privacy-heading">
          <span className="custom-heading">Privacy Policy</span>
        </div>
        {this.state.privacy && <PrivacySection privacy={this.state.privacy} />}
        <ScrollButton />
      </DefaultLayout>
    );
  }
}

Privacy.propTypes = {
  title: PropTypes.string
};

export default Privacy;
