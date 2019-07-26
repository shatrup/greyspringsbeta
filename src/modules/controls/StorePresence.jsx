import React from "react"

class StoreLinkItem extends React.Component {
    render() {
        var storeLinkLength = this.props.data.link.length != null ? this.props.data.link.length : 0;
        var cssClass = "col-xs-2 direct-download-links " + this.props.data.cssClass;
        return (
            <div className={cssClass}>
                <a href={storeLinkLength === 0 ? null : this.props.data.link} target="_blank"
                    className={storeLinkLength === 0 ? "app_coming_soon" : null} rel="noopener noreferrer">
                    <img src={this.props.data.image} className='img-responsive' alt={this.props.data.alt} title={this.props.data.alt} />
                </a>
            </div>
        );
    }
}

class StorePresence extends React.Component {
    render() {
        var cssClasses = "col-md-2 app-icon-wrapper ";
        //var logoVisible = "logo-visible";
        if (this.props.location === "/") {
            cssClasses = cssClasses + "hidden-sm hidden-xs";
            //logoVisible = "padding-left-0";
        }
        else {
            // "col-xs-4 col-sm-3".format
            cssClasses = cssClasses + "col-xs-4 col-sm-3";
        }

        return (
            <div className="app_store_links_parent">
                <div className="container product-page-details-links-wrapper @logoVisible">
                    <div className="container product-meta-section-parent-container">
                        <div className="row container product-meta-section">
                            <div className="col-xs-12 col-md-8 product-meta-section-wrapper">
                                <div className={cssClasses}>
                                    <img title='Greysprings Software Solutions Pvt. Ltd.' src={this.props.storeLinks.icon} className="product-icon img-responsive"
                                        alt={this.props.storeLinks.name + " icon"} />
                                </div>

                                <div className="col-xs-8 col-sm-9 col-md-10 product-meta-wrapper @logoVisible">
                                    <div className="col-xs-12 product-title">
                                        {this.props.storeLinks.name}
                                    </div>
                                    <div className="col-xs-12 product-meta-divider divider-line-store"></div>
                                    <div className="col-xs-12 col-md-8 appstore-links">
                                        {this.props.storeLinks.storeMeta.map((value, ii) => <StoreLinkItem data={value} key={ii} />)}
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

export default StorePresence;