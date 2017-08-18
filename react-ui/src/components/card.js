import React, { Component } from 'react' 
import '../css/card.css' 

class Card extends Component {
  render() {
    return (
    <div className="column column-block">
        <a className="articleUrl card" target="_blank" href={this.props.url}>
            <div className="picture">
              <img src={this.props.picture} alt="" />
            </div>
            <div className="content">
              <div className="border-wrapper">
                <h3>
                  {this.props.title}
                </h3>
                <span className="desc">{this.props.description}</span>
                <div className="meta">
                  <div className="author">{this.props.author}</div>
                  <div className="date">{this.props.date}</div>
                </div>
              </div>
            </div>
        </a>
    </div>
    )
  }
}

export default Card 