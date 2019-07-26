import React from 'react';

class ScrollApp extends React.Component {
    constructor() {
      super();
  
      this.state = {
          intervalId: 0
      };
    }
    
    scrollStep() {
      if (window.pageYOffset === 0) {
          clearInterval(this.state.intervalId);
      }
      window.scroll(0, window.pageYOffset - this.props.scrollStepInPx);
    }
    
    scrollToTop() {
      let intervalId = setInterval(this.scrollStep.bind(this), this.props.delayInMs);
      this.setState({ intervalId: intervalId });
    }
    
    render () {
        return <button title='Move to top' className='scroll' 
                 onClick={ () => { this.scrollToTop(); }}>
                  <span className='arrow-up glyphicon glyphicon-chevron-up'></span>
                </button>;
     }
  } 
  
  class ScrollButton extends React.Component {
    render () {
      return <div className="long">
                <ScrollApp scrollStepInPx="50" delayInMs="16.66"/>
             </div>
    }
  }

export default ScrollButton;

