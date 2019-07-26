import React from "react";

class TopNavBar extends React.Component {
    componentWillMount() {
        this.setState({
            menuItems: [
                { path: "/", title: "Home" },
                { path: "/products", title: "Products" },
                { path: "/playonline", title: "Play Online" },
                { path: "/contact", title: "Contact" },
                { path: "/testimonials", title: "Testimonials" },
                { path: "/about", title: "About" },
                { path: "/charts", title: "Charts" }
            ]
        });
    }

    componentDidMount() {

    }

    render() {
        return (
            <nav className="navbar navbar-default navbar-fixed-top" id="main-navbar">
                <div className="container">
                    <div className="navbar-header">
                        <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar-collapse" aria-expanded="false" aria-controls="navbar">
                            <span className="sr-only">Toggle navigation</span>
                            <span className="icon-bar"></span>
                            <span className="icon-bar"></span>
                            <span className="icon-bar"></span>
                        </button>
                        <a href="/" className="navbar-brand">
                            <div className="navbar-brand-images">
                                <img src="/images/gs_logo.png" className="img-responsive brand-logo-header" alt="Greysprings" title='Gresprings' />
                                <img src="/images/gs_logo_text.png" className="img-responsive brand-text-header" alt="Greysprings" title='Gresprings' />
                            </div>
                        </a>
                    </div>
                    <div id="navbar-collapse" className="collapse navbar-collapse">
                        <ul className="nav navbar-nav navbar-right">

                            {this.state.menuItems.map((item, ii) =>
                                <li key={item.title + "_navbar_item"}>
                                    <a data-toggle="collapse" title={item.title} id="home-menu" data-target=".navbar-collapse"
                                        href={item.path}>
                                        <p>{item.title}</p>
                                    </a>
                                </li>
                            )}

                        </ul>
                    </div>
                </div>
            </nav>
        );
    }
}

export default TopNavBar;