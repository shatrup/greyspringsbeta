import React from "react"


class PromoTextBlock extends React.Component {
    render() {
        return (
            <div className="promotional-text hidden-xs">
                <div className="promotional-text-header">{this.props.heroTileData.PromoTextHeader}</div>
                <div className="promotional-text-tagline">{this.props.heroTileData.PromoTextTagLine}</div>
                <div className="promotional-text-readmore">
                    <a href={this.props.heroTileData.PromoReadMoreLink}>Read More</a>
                </div>
            </div>

        );
    }
}

class HeroTile extends React.Component {
    render() {
        return (
            <div className="promotion-template" align="center">
                <div className="container promo_tile">
                    <div className="promotional-block-container">
                        <div style={{ display: "inline-block" }}>
                            <div align="center">
                                <div className="container promo_tile">
                                    <div className="promotional-block-container">
                                        <img id="promotional-image" className="promotional-image img-responsive" src={this.props.heroTileData.PromoImage} alt={this.props.heroTileData.PromoTextHeader} title="Greysprings | Fun learning and educational app for Kids" />
                                        {this.props.heroTileData.hasPromoTextSupport && <PromoTextBlock heroTileData={this.props.heroTileData} />}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="promotional-text visible-xs ">
                        <div className="promotional-text-header">{this.props.heroTileData.PromoTextHeader}</div>
                        <div className="promotional-text-tagline">{this.props.heroTileData.PromoTextTagLine}</div>
                         <div className="promotional-text-readmore">
                            <a href="/about">Read More</a>
                        </div> 
                    </div>
                </div>
            </div>
        );
    }
}

export default HeroTile;