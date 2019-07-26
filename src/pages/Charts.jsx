import React from "react";
import PropTypes from "prop-types";
import DefaultLayout from "../layouts/defaultLayout";
import ChartPageModel from "../models/ChartPageModel";
import ScrollButton from "../partials/ScrollButton";


class PopulateChart extends React.Component {
    render() {
        // var hasContainerClass = this.props.className === "container";
        // var className = "";
        return (

            <div className="container game_list_container" >
                <audio id="audio" ref="audio"></audio>
                <div className="container chart-parent">

                    <div className="text-center" id="products">
                        <h1 className="page-heading text-uppercase">{this.props.chartType}</h1>
                    </div>
                    {/* // <row><br></br></row> */}

                </div>

                {this.props.tileList.map((value, ii) => <ChartItem tileData={value} index={ii} />)}

            </div>
        );
    }
}

class ChartItem extends React.Component {
    play(fileName) {
        //var audio = document.getElementById("audio");
        //var audio = new Audio(fileName);
        var audio = this.refs.audio;
        if (audio !== undefined) {
            audio.setAttribute('src', fileName);
            audio.play();
        }
    }

    render() {
        var obj = this.props.tileData;
        var index = this.props.index;
        var chartType = this.props.chartType;

        var items = [];

        if (index > 0 && index % 3 === 0.0) {
            items.push(<div className="clearfix"></div>);
        }

        return (
            <div>
                {items}
                <div className="col-xs-12 col-sm-6 col-md-4" style={{ marginBottom: 60 + "px" }} onClick={this.play("/cocoshtml/apps/Charts/Resources/audio_mid/common/" + chartType + "/" + obj.tileAudioId + ".mp3")}>
                    <img src={"/cocoshtml/apps/Charts/Resources/" + obj.imgUri} class="img-responsive center-block" alt={obj.title} title={obj.title}></img>
                    <div class="col.xs.12 object-name">
                        <h4 class="text-center">{obj.title}</h4>
                    </div>
                </div>
            </div>
        );
    }

}

class Charts extends React.Component {
    state = {};
    // var chartId = this.props.fruits;
    componentWillMount() {
        var chartId = "fruits"
        console.log("Charts Page :WillMount");
        new ChartPageModel().getData(this.props.match.params.chartId).then(response => {
            this.setState({
                chartdata: response.chartdata
            });
        });
    }

    componentDidMount() {
        console.log("Charts Page::componentDidMount");
    }
    render() {
        var seo = {};
        seo.pageTitle = "Kids Learning Games | Charts"
        // var chartId = this.props.chartId;
        // var data = Utilities.getChartData(chartId);

        return (
            // <div className="shwrap">
            <DefaultLayout seo={seo} allData={this.props}>
                {/* <div class="text-center" id="products">
                        <h1 class="custom-heading"> Charts </h1>
                    </div> */}
                {this.state.chartdata && <PopulateChart tileList={this.state.chartdata.tileList} chartType={this.state.chartdata.type} />}
                <ScrollButton />
            </DefaultLayout>
            // </div>
        );
    }
}

Charts.propTypes = {
    title: PropTypes.string
};

export default Charts;
