import React from "react";
import PropTypes from "prop-types";
import DefaultLayout from "../layouts/defaultLayout";
import HeroTile from "../modules/controls/HeroTile";
import AboutPageModel from "../models/AboutPageModel";
import ScrollButton from "../partials/ScrollButton";

class TitledParagraphListItem extends React.Component {
  render() {
    var sectionData = this.props.sectionData;
    var items = [];
    for (let index = 0; index < sectionData.items.length; index++) {
      const element = sectionData.items[index];
      var rt = sectionData.renderingType;
      rt = rt === "list" ? "li" : "p";
      var itemElement = React.createElement(rt, { key: index }, element);
      items.push(itemElement);
    }

    if (sectionData.renderingType === "list") {
      var orderedList = React.createElement(
        "ul",
        { className: "unordered-list" },
        items
      );
      items = orderedList;
    }

    return (
      <div className="col-sm-6">
        <div className="headings-about-page" id="about-us">
          <span className="custom-heading">{sectionData.title}</span>
        </div>
        {items}
      </div>
    );
  }
}

class CoreTeamMember extends React.Component {
  render() {
    return (
      <div className="col-xs-12 col-sm-6 col-md-4">
        <div className="col-xs-12 image" align="center">
          <img
            src={this.props.memberData.image}
            className="img-responsive"
            alt="greysprings founder"
            title={this.props.memberData.name}
          />
        </div>
        <div className="col-xs-12 name text-center">
          <h3>{this.props.memberData.name}</h3>
        </div>
        <div className="col-xs-12 designation text-center">
          <p>{this.props.memberData.designation}</p>
        </div>
        <div className="col-xs-12 contact-links text-center">
          {this.props.memberData.contact.map((contactItem, ii) => (
            <a
              href={contactItem.link}
              target="_blank"
              key={ii}
              rel="noopener noreferrer"
              title={contactItem.link}
            >
              <span className={"fa " + contactItem.cssClass} />
            </a>
          ))}
        </div>
      </div>
    );
  }
}

class CoreTeam extends React.Component {
  render() {
    return (
      <div className="container core-team">
        <div className="text-center headings-about-page" id="core-team">
          <span className="custom-heading">
            {this.props.coreTeamData.title}
          </span>
        </div>
        {this.props.coreTeamData.members.map((memberData, ii) => (
          <CoreTeamMember memberData={memberData} key={ii} />
        ))}
      </div>
    );
  }
}

class AboutSection extends React.Component {
  render() {
    var sections = this.props.aboutContents;
    var items = [];
    var keyIndex = 0;
    for (let index = 0; index < sections.length; index++) {
      const element = sections[index];
      items.push(
        <TitledParagraphListItem sectionData={element} key={++keyIndex} />
      );
      if (index % 2 === 1) {
        items.push(<div className="clearfix" key={++keyIndex} />);
      }
    }
    return (
      <div className="just-wrapper">
        <div className="container products_at_main_page">
          <div className="row about-section">{items}</div>
        </div>
      </div>
    );
  }
}

class About extends React.Component {
  state = {};
  componentWillMount() {
    console.log("About Page :WillMount");
    new AboutPageModel().getData().then(response => {
      //console.log("=> " + JSON.stringify(response));
      this.setState({
        heroTileData: response.heroTile,
        aboutContents: response.sections,
        coreTeamData: response.coreTeam
      });
    });
  }

  componentDidMount() {
    console.log("AboutPage::componentDidMount");
  }

  render() {
    console.log("Products:render");
    var seo = {};
    seo.pageTitle = "Greysprings About";
    return (
      <DefaultLayout seo={seo} allData={this.props} testdata="hello">
        {this.state.heroTileData && (
          <HeroTile heroTileData={this.state.heroTileData} />
        )}
        {this.state.aboutContents && (
          <AboutSection aboutContents={this.state.aboutContents} />
        )}
        {this.state.coreTeamData && (
          <CoreTeam coreTeamData={this.state.coreTeamData} />
        )}
        <ScrollButton />
      </DefaultLayout>
    );
  }
}

About.propTypes = {
  title: PropTypes.string
};

export default About;
