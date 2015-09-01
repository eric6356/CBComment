'use strict';

const APIURL = 'http://121.41.112.93/api/comment/';

class Head extends React.Component {
  handleClick(){
    console.log('click')
  }

  render() {
    return(
      React.createElement("div", {id: "head"}, 
        React.createElement("span", {className: "maintitle"}, "CBComment")
        /* 
        <span className="icon logo"></span>
        <input/>
        <span className="icon search" onClick={this.handleClick}></span>
        */
      )
    )
  }
}

class Comment extends React.Component {
  render() {
    return (
      React.createElement("div", {className: "comment"}, 
        React.createElement("div", {className: "commentbody"}, 
          React.createElement("p", null, this.props.comment)
        ), 
        React.createElement("div", {className: "commenttriangle"}, 
          React.createElement("div", {className: "toptriangle"}), 
          React.createElement("div", {className: "bottomtriangle"})
        ), 
        React.createElement("div", {className: "commentfoot"}, 
          React.createElement("p", null, "来自", 
            React.createElement("strong", null, this.props.location), 
            "的匿名人士对新闻", 
            React.createElement("a", {href: this.props.href, target: "_blank"}, this.props.title), 
            "的评论"
          )
        )
      )
    )
  }
}

class Foot extends React.Component {
  render() {
    return (
      React.createElement("div", {className: "foot"}, 
        React.createElement("div", {className: "more", onClick: this.props.more}, React.createElement("p", null, this.props.moreText))
      )
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
      return React.createElement(Comment, {
        key: i, 
        comment: commentData.comment, 
        location: commentData.location, 
        href: 'http://m.cnbeta.com' + commentData.href, 
        title: commentData.title}
      )
    });
    return (
      React.createElement("div", {className: "main"}, 
        React.createElement(Head, null), 
        commentNodes, 
        React.createElement(Foot, {more: this.more.bind(this), moreText: this.state.moreText})
      )
    )
  }
}

React.render(
  React.createElement(Main, null),
  document.getElementById('main')
);