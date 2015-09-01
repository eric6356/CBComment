'use strict';

class Head extends React.Component {
  handleClick(){
    console.log('click')
  }

  render() {
    return(
      <div id="head">
        <span className="maintitle">CBComment</span>
        {/* 
        <span className="icon logo"></span>
        <input/>
        <span className="icon search" onClick={this.handleClick}></span>
        */}
      </div>
    )
  }
}

class Comment extends React.Component {
  render() {
    return (
      <div className="comment">
        <div className="commentbody">
          <p>{this.props.comment}</p>
        </div>
        <div className="commenttriangle">
          <div className="toptriangle"></div>
          <div className="bottomtriangle"></div>
        </div>
        <div className="commentfoot">
          <p>来自<strong>{this.props.location}</strong>的匿名人士对新闻<a href={this.props.href}>{this.props.title}</a>的评论</p>
        </div>
      </div>
    )
  }
}

class Foot extends React.Component {
  render() {
    return (
      <div className="foot">
        <div className='more' onClick={this.props.more}><p>{this.props.moreText}</p></div>
      </div>
    )
  }
}


class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {commentData: [], page: 0, moreText: '加载中...'}
  }
  componentDidMount(){
    jx.load('http://127.0.0.1:5000/comment/1', function(res){console.log(res)});
    this.setState({moreText: '加载更多'}, null);
  }
  more() {
    //this.setState({moreText: '加载中...'}, null);
    let page = this.state.page + 1;
    let oldData = this.state.commentData;
    let newData = oldData.concat(allData[page-1]);
    this.setState({commentData: newData, page: page}, null)
  }
  render() {
    let commentNodes = this.state.commentData.map(function (commentData, i) {
      return <Comment
        key={i}
        comment={commentData.comment}
        location={commentData.location}
        href={commentData.href}
        title={commentData.title}
      />
    });
    return (
      <div className="main">
        <Head />
        {commentNodes}
        <Foot more={this.more.bind(this)} moreText={this.state.moreText}/>
      </div>
    )
  }
}

React.render(
  <Main />,
  document.getElementById('main')
);