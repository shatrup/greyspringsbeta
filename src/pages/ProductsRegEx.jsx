import React, { Component } from 'react';
import DefaultLayout from "../layouts/defaultLayout";
import StorePresence from "../modules/controls/StorePresence";
import ProductsRegExModel from '../models/ProductsRegExModel';
import HeroTile from '../modules/controls/HeroTile';
import ScrollButton from '../partials/ScrollButton';
import Statistics from '../modules/controls/Statistics';
import ProductOverview from '../modules/controls/ProductOverview';
import Slider from 'react-slick'



class ProductDescription extends React.Component {

    render() {
        return (
            <div className="container">
                <div className="container product-description-main-container">

                {/* < Product Description section > */}

                <div className="container description-section-container">
                    <ul id="description_tab" className="nav nav-pills nav-justified app-desc-nav">
                        <li className="active tab-description">
                            <a href="#Description" title="Description" data-toggle="tab">Description</a></li>
                    </ul>

                    <div className="tab-content">
                        <div className="tab-pane fade in active" id="Description">
                            <div className="row product-description-wrapper">
                                <div className="col-xs-12 custom-heading margin-top-1em">Description</div>

                                {/* <!-- Product description cover line section --> */}

                                <div className="col-xs-12 product-description-container">
                                    <div className="product-description-coverline">
                                        <p>{this.props.productDescriptions.coverLine}</p>
                                    </div>
                                </div>
                                <div className="col-xs-12 product-description-paragraphs">
                                    {this.props.productDescriptions.paragraphs.map((item, key) =>
                                        <li key={key}>{item} </li>
                                    )}
                                </div>

                                {/* <!-- Product features section - start --> */}
                                <div class="col-xs-12 custom-heading">{this.props.productDescriptions.features.title}</div>
                                <div className="col-xs-12 product-features-container">
                                    <ul>
                                        {this.props.productDescriptions.features.list.map((item, key) =>
                                            <li key={key}>{item} </li>
                                        )}
                                    </ul>
                                </div>

                                {/* <!-- List of Games - start --> */}

                                <div className="col-xs-12 custom-heading">List of Games</div>
                                <div className="col-xs-12 product-description-games-list">
                                    <ul>
                                        {this.props.productDescriptions.gamesList.map((item, key) =>
                                            <p key={key}>{item} </p>
                                        )}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        );
    }
}

class ProductScreenShots extends React.Component {
    render() {
        var settings = {
            dots: true,
            infinite: true,
            speed: 500,
            slidesToShow: 2,
            slidesToScroll: 1
          };
        return (
            <div className="container bxslider-container">
                <div className="screenshots-carousel-heading" id="screenshots-carousel">
                    <span className="custom-heading">Screenshots</span>
                </div>
                <div class="col-xs-12 bxslider-wrapper" style={{marginTop: '1em'}}>
                    <Slider {...settings} >

                        {this.props.screenshots.map((screenshot, ii) =>
                            <div className="slide bx-clone">
                                <img src={screenshot.image}  className="img-responsive" key={screenshot.caption + "_" + ii} title={screenshot.caption } alt='xyz' />
                                <p className="legend">{screenshot.caption }</p>
                        </div>
                        )}
                        
                    </Slider>                    
                </div>
            </div>
        );
    }
}

class ProductsRegEx extends Component {
    state = {};
    componentWillMount() {
        new ProductsRegExModel().getData(this.props.match.params.productId).then(response => {
            console.log("=> " + JSON.stringify(response));
            this.setState({
                productDetails: response.productDetails,
                productDescriptions: response.productDescriptions,
                heroTileData: response.heroTile,
                screenshots: response.screenshots,
                storeLinks: response.storeLinks,
                topApplications: response.topApplications
            });
        });
    }

    componentDidMount() {
        console.log("ProductsRegEx::componentDidMount");
    }

    render() {
        var seo = {};
        seo.pageTitle = "Greysprings Products"

        return (
            <DefaultLayout seo={seo} allData={this.props} testdata="hello">
                {this.state.heroTileData && <HeroTile heroTileData={this.state.heroTileData} />}
                {this.state.storeLinks && <StorePresence storeLinks={this.state.storeLinks} />}
                {this.state.screenshots && <ProductScreenShots screenshots={this.state.screenshots} />}
                {this.state.productDescriptions && <ProductDescription productDescriptions={this.state.productDescriptions} />}
                
                {this.state.topApplications && <ProductOverview topApps={this.state.topApplications} className="container" />}
                <Statistics />
                <ScrollButton />
            </DefaultLayout>
        );
    }
}

export default ProductsRegEx;