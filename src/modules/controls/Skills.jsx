import React from "react"

class SkillBlock extends React.Component {
    render() {
        return (
            <div className="col-xs-6 col-sm-4 col-md-4 col-lg-2 skill-img">
                <img src={this.props.skillMeta.image} className="img-responsive" alt={this.props.skillMeta.label} />
                <h6>{this.props.skillMeta.label}</h6>
            </div>

        );
    }
}

class Skills extends React.Component {
    render() {
        return (
            <div className="skills_parent">
                <div className="skills container">
                    <div className="text-center skills-heading" id="skills">
                        <span className="custom-heading">{this.props.skills.heading}</span>
                    </div>

                    <div className="row text-center skills-icon-wrapper">
                        {this.props.skills.list.map((skillMeta, ii) => <SkillBlock skillMeta={skillMeta} key={ii} />)}
                    </div>
                </div>
            </div>

        );
    }
}

export default Skills;