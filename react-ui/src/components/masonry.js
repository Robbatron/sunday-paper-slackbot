import React, { Component } from 'react' 
import ReactMasonry from 'react-masonry-component' 
// import Gutter from './gutter.js' 
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
        <div className="masonry-wrapper ">
          <ReactMasonry
            className={'masonry-wrapper row small-up-2 medium-up-3 large-up-4'}
            options={masonryOptions}
          >

            {this.props.children}
          </ReactMasonry>
        </div>
    )
  }
}

export default Masonry 