import React from "react";
import DefaultLayout from "../layouts/defaultLayout";
import HeroTile from "../modules/controls/HeroTile"
import StorePresence from "../modules/controls/StorePresence"
import ProductOverview from "../modules/controls/ProductOverview"
import Skills from "../modules/controls/Skills"
import Statistics from "../modules/controls/Statistics"
import HomePageModel from "../models/HomePageModel";
import Testimonials from "../modules/controls/testimonials/Testimonials";
import ScrollButton from "../partials/ScrollButton";

class HomePage extends React.Component {
    state = {}
    componentWillMount() {
        console.log("HomePage::componentWillMount");

        new HomePageModel().getData().then(response => {
            //console.log("=> " + JSON.stringify(response));
            this.setState({
                heroTileData: response.heroTile,
                topApplications: response.topApplications,
                storeLinks: response.storeLinks,
                skills: response.skills,
                testimonials: response.testimonials
            });
        });

    }

    componentDidMount() {
        console.log("HomePage::componentDidMount");
    }

    render() {
        var seo = {};
        seo.pageTitle = "Preschool and Kindergarten games for kids - Greysprings"
        return (
            <DefaultLayout seo={seo} allData={this.props} testdata="hello">
                {this.state.heroTileData && <HeroTile heroTileData={this.state.heroTileData} />}
                {this.state.storeLinks && <StorePresence storeLinks={this.state.storeLinks} />}
                {this.state.topApplications && <ProductOverview topApps={this.state.topApplications} className="container" />}
                {this.state.skills && <Skills skills={this.state.skills} className="container" />}
                {this.state.testimonials && <Testimonials testimonials={this.state.testimonials} />}
                <Statistics />
                <ScrollButton />
            </DefaultLayout>
        );
    }
}

export default HomePage;        