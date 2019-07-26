import React from "react"
import AppTile from "../micro/AppTile";

class MoreProductsButton extends React.Component {
    render() {
        return (
            <div className="more-reviews-button text-center">
                <a className="btn btn-warning btn-lg" role="button" href="/products" title="See all of our Products">See All</a>
            </div>
        );
    }
}
class ProductOverview extends React.Component {
    render() {
        return (
            <div className="just-wrapper" >
                <div className="container products_at_main_page">
                    <div className="text-center" id="products">
                        <span className="custom-heading">Our Games</span>
                    </div>
                    {this.props.topApps.map((value, ii) => <AppTile appData={value} key={ii} />)}
                </div>
                {this.props.topApps.hasMoreButton && <MoreProductsButton />}
            </div>
        );
    }
}

export default ProductOverview;