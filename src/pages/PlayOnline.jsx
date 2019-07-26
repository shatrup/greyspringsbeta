import React from "react";
import PropTypes from "prop-types";
import DefaultLayout from "../layouts/defaultLayout";
import PlayGamePageModel from "../models/PlayGamePageModel";
import ScrollButton from "../partials/ScrollButton";

class PlaySection extends React.Component {
  render() {
    return (
      <div class="container game_list_container">
        <div class="text-center" id="products">
          <h1 class="custom-heading">Play Games</h1>
        </div>
        {this.props.gamedata.playGamesList.map((gms, ii) => (
          <div class="col-xs-12 col-sm-6 col-md-4">
            <div class="col-xs-12 image" align="center">
              <a href={gms.uri} title="Click to play ">
                ```{" "}
                <img
                  src={gms.tileUri}
                  class="img-responsive"
                  alt={gms.name}
                  title={gms.name}
                />
              </a>
            </div>
            <div class="col-xs-12 name text-center">
              <h3>{gms.name}</h3>
            </div>
          </div>
        ))}
      </div>
    );
  }
}

class PlayOnline extends React.Component {
  state = {};
  componentWillMount() {
    console.log("Game Page :WillMount");
    new PlayGamePageModel().getData().then(response => {
      this.setState({
        gamedata: response.gamedata
      });
    });
  }

  componentDidMount() {
    console.log("Game Page::componentDidMount");
  }
  render() {
    var seo = {};
    seo.pageTitle = "Greysprings Online";

    return (
      <DefaultLayout seo={seo} allData={this.props}>
        {this.state.gamedata && <PlaySection gamedata={this.state.gamedata} />}
        <ScrollButton />
      </DefaultLayout>
    );
  }
}

PlayOnline.propTypes = {
  title: PropTypes.string
};

export default PlayOnline;
