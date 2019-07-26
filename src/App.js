import * as React from 'react';
import './App.css';
import { BrowserRouter as Router, Route } from "react-router-dom"
import HomePage from './pages/HomePage'
import About from './pages/About';
import Contact from './pages/Contact';
import Products from './pages/Products';
import Testimonial from './pages/Testimonial';
import ProductsRegEx from './pages/ProductsRegEx';
import Privacy from './pages/Privacy';
import PlayOnline from './pages/PlayOnline';
import Charts from './pages/Charts';
// import GameControler from './pages/GameControler'


class App extends React.Component {

    componentWillMount() {
        //console.log("App::componentWillMount");
        this.setState({
            routes: [
                { path: "/", component: HomePage, exact: true },
                { path: "/about", component: About, exact: true },
                { path: "/contact", component: Contact, exact: true },
                { path: "/testimonials", component: Testimonial, exact: true },
                { path: "/playonline", component: PlayOnline, exact: true },
                { path: "/products", component: Products, exact: true },
                { path: "/privacy", component: Privacy, exact: true },
                { path: "/charts", component: Charts, exact: true },
                { path: "/products/:productId", component: ProductsRegEx, exact: true },
                { path: "/charts/:chartId", component: Charts, exact: true }
                //  { path: "/playonline/:gameId", component: GameControler, exact: true }


            ]
        })
    }

    componentDidMount() {
        console.log("App::componentDidMount");
    }

    render() {
        //console.log("App::render");
        return (
            <React.Fragment>
                <Router>
                    {this.state.routes.map((route, key) => <Route key={route.path}
                        path={route.path} component={route.component}
                        exact={route.exact === true ? true : false}
                    />)}
                </Router>
            </React.Fragment>
        );
    }
}


export default App;
