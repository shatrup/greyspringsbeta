import React from "react";
import PropTypes from "prop-types";
import DefaultLayout from "../layouts/defaultLayout";
import HeroTile from "../modules/controls/HeroTile";
import StorePresence from "../modules/controls/StorePresence"
import Skills from "../modules/controls/Skills"
import ProductOverview from "../modules/controls/ProductOverview"
import Statistics from "../modules/controls/Statistics"
import ProductsPageModel from "../models/ProductsPageModel";
import ScrollButton from "../partials/ScrollButton";

class Products extends React.Component {

    state = {}
    componentWillMount() {
        console.log("HomePage::componentWillMount");

        new ProductsPageModel().getData().then(response => {
            //console.log("=> " + JSON.stringify(response));
            this.setState({
                heroTileData: response.heroTile,
                topApplications: response.topApplications,
                storeLinks: response.storeLinks,
                skills: response.skills
            });
        });

    }

    componentDidMount() {
        console.log("HomePage::componentDidMount");
    }

    render() {
        console.log("Products:render");
        var seo = {};
        seo.pageTitle = "Greysprings Products"
        //var data = Utilities.getproductPageData()

        return (
             <DefaultLayout seo={seo} allData={this.props} testdata="hello"> 
                {this.state.heroTileData && <HeroTile heroTileData={this.state.heroTileData} />}
                {this.state.storeLinks && <StorePresence storeLinks={this.state.storeLinks} />}
                {this.state.topApplications && <ProductOverview topApps={this.state.topApplications} className="container" />}
                {this.state.skills && <Skills skills={this.state.skills} className="container" />}
                <Statistics />
                <ScrollButton />
            </DefaultLayout>
        );
    }
}

Products.propTypes = {
    title: PropTypes.string,
}

export default Products;