'use strict';

const APIURL = 'http://121.41.112.93/api/comment/';

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
          <p>来自
            <strong>{this.props.location}</strong>
            的匿名人士对新闻
            <a href={this.props.href} target="_blank">{this.props.title}</a>
            的评论
          </p>
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
    this.state = {commentData: [], page: 1, moreText: '加载中...'}
  }
  componentDidMount(){
    jx.load(APIURL+'1', function(res){
      this.setState({moreText: '加载更多', commentData: JSON.parse(res)}, null);
    }.bind(this));
  }
  more() {
    let page = this.state.page + 1;
    let oldData = this.state.commentData;
    jx.load(APIURL+page, function(res){
      let newData = oldData.concat(JSON.parse(res));
      this.setState({commentData: newData, page: page}, null)
    }.bind(this));
  }
  render() {
    let commentNodes = this.state.commentData.map(function (commentData, i) {
      return <Comment
        key={i}
        comment={commentData.comment}
        location={commentData.location}
        href={'http://m.cnbeta.com' + commentData.href}
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
