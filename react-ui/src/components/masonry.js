import React, { Component } from 'react' 
import ReactMasonry from 'react-masonry-component' 
import Gutter from './gutter.js' 
import '../css/masonry.css' 

const masonryOptions = {
  itemSelector: '.card',
  columnWidth: '.card',
  gutter: '.gutter',
  percentPosition: true,
}

class Masonry extends Component {
  render() {
    return (
      <div>
        <div className="masonry-wrapper">
          <ReactMasonry
            className={'masonry-wrapper'}
            options={masonryOptions}
          >
            <Gutter />
            {this.props.children}
          </ReactMasonry>
        </div>
      </div>
    )
  }
}

export default Masonry 