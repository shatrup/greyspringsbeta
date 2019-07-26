import React from "react";
import CountUp from 'react-countup'

class Statistics extends React.Component {
    handleScroll() {
        console.log("Scrolling");
    }
    
     onComplete = () => {
    console.log('Completed!');
  };
  
     onStart = () => {
    console.log('Started!');
  };
  
    componentWillMount() {

    }

    componentDidMount() {

    }
    render() {
        return (
            <div className="statistics-parent" onScroll={this.handleScroll.bind(this)}>
                <div className="container gs_statictics">
                    <div className="row text-center">
                        <div className="col-xs-6 col-sm-3 downloads">                                         
                        <CountUp className="heading" start={400} end={8} 
                        onComplete={this.onComplete} onStart={this.onStart} /> 
                            <span className="heading">M</span>
                            <p className="meta">Downloads</p>
                        </div>
                        <div className="col-xs-6 col-sm-3 reviews">
                    <CountUp className="heading count-heading" start={1500} end={38} onComplete={this.onComplete} onStart={this.onStart} /><span className="heading">K</span>
                            <p className="meta">Reviews</p>
                        </div>
                        <div className="col-xs-6 col-sm-3 apps">
                            <CountUp className="heading count-heading" start={1000} end={12} onComplete={this.onComplete} onStart={this.onStart} /><span className="heading"></span><span className="unit"> </span>
                            <p className="meta">Apps</p>
                        </div>
                        <div className="col-xs-6 col-sm-3 platforms">
                            <CountUp className="heading count-heading" start={500} end={5}  onComplete={this.onComplete} onStart={this.onStart} /><span className="count"></span><span className="unit"> </span>
                            <p className="meta">Platforms</p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Statistics;