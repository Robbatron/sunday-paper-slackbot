import React, { Component } from 'react' 
import '../css/header.css' 

class Header extends Component {
  render() {
    return (
      <div>
        <div className="head">
          <div className="headerobjectswrapper">
            {this.props.weather &&
              <div className="weatherforecastbox">
                <span style={{ fontStyle: 'italic' }}>
                  Weatherforecast for the next 24 hours: Plenty of Sunshine
                </span>
                <br />
                <span>
                  Wind: 7km/h SSE  Temp: 95°F  Hum: 12%
          </span>
              </div>
            }
            <header>{this.props.title}</header>
          </div>

          <div className="subhead">Phoenix, AZ - Sunday July 9, 2017</div>
        </div>
      </div>
    )
  }
}

export default Header 