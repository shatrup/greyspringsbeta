import React from "react"

class AppTile extends React.Component {

    renderStoreLinks(storeMeta) {
        const links = [];
        for (var ii = 0; ii < storeMeta.length; ++ii) {
            var storeData = storeMeta[ii];
            var storeLink = storeData.link.Length === 0 ? null : storeData.link;
            var appAvailableOnStore = storeData.link.Length === 0 ? false : true;
            var containerCssClass = "col-xs-2 direct-download-links " + storeData.cssClass;
            links.push(
                <div className={containerCssClass} key={ii}>
                    <a href={storeLink} className={appAvailableOnStore ? "" : "app_coming_soon"} target="_blank" rel="noopener noreferrer">
                        <img src={storeData.image} className="img-responsive" alt={storeData.name} title={storeData.name} />
                    </a>
                </div>
            );
        }

        return links;
    }

    render() {
        return (
            <a href={"/products/" + this.props.appData.applicationId}>
                <div className="col-xs-12 col-md-6 product-tile-parent">
                    <div className="col-xs-12 product-tile-container">
                        <img src={this.props.appData.tile} alt={this.props.appData.name} className="img-responsive" title={this.props.appData.name} />
                    </div>
                    <div className="col-xs-12 white-background">
                        <div className="product-meta-section">
                            <div className="col-xs-4 col-sm-3 col-lg-2 app-icon-wrapper">
                                <img src={this.props.appData.icon} className="product-icon img-responsive" alt={this.props.appData.name} title={this.props.appData.name} />
                            </div>
                            <div className="col-xs-8 col-sm-9 col-lg-10 product-meta-wrapper">
                                <div className="col-xs-12 product-title app-title">
                                    {this.props.appData.name}
                                </div>
                                <div className="col-xs-12 product-meta-divider"></div>

                                {this.renderStoreLinks(this.props.appData.storeMeta)}
                            </div>
                        </div>
                    </div>
                </div>
            </a>
        );
    }
}

export default AppTile;