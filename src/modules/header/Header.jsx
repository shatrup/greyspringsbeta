import React from "react"
import CssSection from "./CssSection"

class Header extends React.Component{
    render()
    {
        return (
            <head>
                <title>{this.props.searchMeta.pageTitle}</title>
                <meta charSet="utf-8" />
                <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <meta name="Greysprings" content="description" />
                <link rel="shortcut icon" href="images/favicon.ico" type="image/x-icon" />
                <link rel="icon" href="images/favicon.ico" type="image/x-icon" />
                <CssSection />
            </head>
        );
    }
}

export default Header;