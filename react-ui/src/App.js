import React, { Component } from 'react'

// Components
import Card from './components/card'
import Masonry from './components/masonry'
import Header from './components/header'
import firebase from './components/firebase'

// Styles
import './css/app.css'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      articles: []
    }
  }

  componentWillMount() {
    const firebaseRef = firebase.database().ref('articles')
    firebaseRef.on('value', (snapshot) => {
      const items = snapshot.val()
      let articles = []
      for (let item in items) {
        articles.push({
          url: items[item].url,
          author: items[item].author,
          description: items[item].desc,
          image: items[item].image,
          title: items[item].title,
          date: items[item].date
        })
      }
      this.setState({ articles })
    })
  }

  componentWillUnmount() {
    this.firebaseRef.off()
  }

  render() {
    return (
      <div>
        <Header title="The Trilogy Times" weather={false} />
        <Masonry>
          {
            this.state.articles.slice(0).reverse().map((d, i) =>
              (
                <Card
                  key={i}
                  title={d.title}
                  description={d.description}
                  picture={d.image}
                  author={d.author}
                  date={d.date}
                  url={d.url}
                >
                </Card>
              )
            )
          }
        </Masonry>
      </div>
    )
  }
}

export default App
