import React from "react"

class TestimonialBlock extends React.Component {
    render() {
        return (
            <div className="col-xs-12 col-md-4">
                <blockquote>
                    <p>{this.props.testimonial.text}</p>
                    <footer>{this.props.testimonial.by}</footer>
                </blockquote>
            </div>
        );
    }
}

class MoreTestimonialsButton extends React.Component {
    render() {
        return (
            <div className="more-reviews-button text-center">
                <a className="btn btn-info btn-lg" role="button" href="/testimonials" title="Click to see more Reviews">More Reviews</a>
            </div>
        );
    }
}

class Testimonials extends React.Component {
    render() {
        return (
            <div className="container testimonials-parent">
                <section>
                    <div className="page-header text-center" id="testimonials">
                        <span className="custom-heading">{this.props.testimonials.heading}</span>
                    </div>

                    <div className="row">
                        {this.props.testimonials.list.map((testimonial, ii) => <TestimonialBlock testimonial={testimonial} key={ii} />)}
                    </div>
                </section>
                {this.props.testimonials.hasMoreButton && <MoreTestimonialsButton />}
            </div>
        );
    }
}

export default Testimonials;