import React, { Component } from 'react'

export class NewsItem extends Component {
  render() {
    let { title, desc, img, button, author, time, source } = this.props;
    return (
      <div>
        <div className="card" style={{ width: "18rem" }}>
        <span className="position-absolute top-0 translate-middle badge rounded-pill bg-danger" style={{zIndex:"1", left:"85%"}}>{source}</span>
          <img src={img ? img : 'data:image/png;base64,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'} className="card-img-top" alt="..." />
          <div className="card-body">
            <h5 className="card-title">{title}...</h5>
            <p className="card-text">{desc}...</p>
            <p className="card-text"><small className="text-muted">By {author ? author : "Unknown"} on {new Date(time).toGMTString()}</small></p>
            <a href={button} rel="noreferrer" target="_blank" className="btn btn-dark">Go somewhere</a>
          </div>
        </div>
      </div>
    )
  }
}

export default NewsItem
