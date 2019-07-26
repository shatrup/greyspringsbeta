import React from "react";
import PropTypes from "prop-types";
import TopNavBar from "../partials/TopNavBar"
import WebsiteFooter from "../partials/WebsiteFooter"
import WebsiteModals from "../partials/WebsiteModals"
import ScriptsSection from "../modules/header/ScriptsSection"
import Header from "../modules/header/Header"

class DefaultLayout extends React.Component {
    render() {
        return (
            <html className="no-js" lang="en">
                <Header searchMeta={this.props.seo} />
                <body style={{ paddingTop: "20px" }}>
                    <div className="waiting-ring"></div>
                    <div id="root">
                        <TopNavBar />
                        {this.props.children}
                        <WebsiteFooter />
                        <WebsiteModals />
                    </div>
                </body>
                {/* javascript tags */}
                <ScriptsSection />

                {/* shatru: footer relates js: just an hack to include this code here. couldn't include in the partial view */}

                {/* Google Analytics */}
                {/* <script>
                (function (i, s, o, g, r, a, m) {
                    i['GoogleAnalyticsObject'] = r; i[r] = i[r] || function () {
                        (i[r].q = i[r].q || []).push(arguments)
                    }, i[r].l = 1 * new Date(); a = s.createElement(o),
                    m = s.getElementsByTagName(o)[0]; a.async = 1; a.src = g; m.parentNode.insertBefore(a, m)
                })(window, document, 'script', 'https://www.google-analytics.com/analytics.js', 'ga');

                ga('create', 'UA-47207781-1', 'auto');
                ga('send', 'pageview');

                </script> */}

            </html>
        );
    }
}


DefaultLayout.propTypes = {
    title: PropTypes.string,
}

export default DefaultLayout;
