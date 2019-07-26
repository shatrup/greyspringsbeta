import React from "react";
import PropTypes from "prop-types";
import DefaultLayout from "../layouts/defaultLayout";
import HeroTile from "../modules/controls/HeroTile";
import TestimonialPageModel from "../models/TestimonialPageModel";
import ScrollButton from "../partials/ScrollButton";

class TestimonialBlock extends React.Component {
    render() {
        return (
            <div className="item">
                <blockquote>
                    <p>{this.props.testimonial.text}</p>
                    <footer>{this.props.testimonial.by}</footer>
                </blockquote>
            </div>
            );
        }
}

// class MoreTestimonialsButton extends React.Component {
//     render() {
//         return (
//             <div className="more-reviews-button text-center">
//                 <a className="btn btn-info btn-lg" role="button" href="/testimonials">More Reviews</a>
//             </div>
//         );
//     }
// }

class Testimonials extends React.Component {
    render() {
        return (
            <div className="container testimonials-parent-page">
                <section>
                    <div className="page-header text-center" id="testimonials">
                        <span className="custom-heading">{this.props.testimonials.heading}</span>
                    </div>

                    <div className="row">
                        {this.props.testimonials.list.map((testimonial, ii) => 
                        <TestimonialBlock testimonial={testimonial} key={ii} />)}
                    </div>
                </section>
            </div>
        );
    }
}


class Testimonial extends React.Component {
    state = {}
    componentWillMount(){
        console.log("Testimonial Page :WillMount");
        new TestimonialPageModel().getData().then(response => {
            //console.log("=> " + JSON.stringify(response));
            this.setState({
                heroTileData: response.heroTile,
                testimonials: response.testimonials
            });
        });
    }
    componentDidMount() {
        console.log("AboutPage::componentDidMount");
    }
    render() {
        var seo = {};
        seo.pageTitle = "Greysprings Testimonials";

        return (
                 <DefaultLayout seo={seo} allData={this.props}>                     
                 {this.state.heroTileData && <HeroTile heroTileData={this.state.heroTileData} />}
                 {this.state.testimonials && <Testimonials testimonials={this.state.testimonials} />}
                 <ScrollButton />
                </DefaultLayout>
        );
    }
}

Testimonial.propTypes = {
    title: PropTypes.string,
}

export default Testimonial;