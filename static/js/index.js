'use strict';

const data = [
  {
    comment: "飘飘袅袅十三余，霜叶红于二月花。笑问客从何处来，牧童遥指杏花村。",
    location: "浙江省杭州市",
    href: "#",
    title: "九月九日忆山东兄弟"
  },{
    comment: "飘飘袅袅十三余，霜叶红于二月花。笑问客从何处来，牧童遥指杏花村。",
    location: "浙江省杭州市",
    href: "#",
    title: "九月九日忆山东兄弟"
  },{
    comment: "飘飘袅袅十三余，霜叶红于二月花。笑问客从何处来，牧童遥指杏花村。",
    location: "浙江省杭州市",
    href: "#",
    title: "九月九日忆山东兄弟"
  }
];
const data2 = [
  {
    comment: "树树皆秋色，山山唯落辉",
    location: "广东省广州市",
    href: "#",
    title: "野望"
  },{
    comment: "树树皆秋色，山山唯落辉",
    location: "广东省广州市",
    href: "#",
    title: "野望"
  },{
    comment: "树树皆秋色，山山唯落辉",
    location: "广东省广州市",
    href: "#",
    title: "野望"
  },{
    comment: "树树皆秋色，山山唯落辉",
    location: "广东省广州市",
    href: "#",
    title: "野望"
  },{
    comment: "树树皆秋色，山山唯落辉",
    location: "广东省广州市",
    href: "#",
    title: "野望"
  }
];
const data3 = [
  {
    comment: "南村群童欺我老无力，公然抱茅入竹去",
    location: "湖南省长沙市",
    href: "#",
    title: "回乡偶书"
  },{
    comment: "南村群童欺我老无力，公然抱茅入竹去",
    location: "湖南省长沙市",
    href: "#",
    title: "回乡偶书"
  },{
    comment: "南村群童欺我老无力，公然抱茅入竹去",
    location: "湖南省长沙市",
    href: "#",
    title: "回乡偶书"
  },{
    comment: "南村群童欺我老无力，公然抱茅入竹去",
    location: "湖南省长沙市",
    href: "#",
    title: "回乡偶书"
  },{
    comment: "南村群童欺我老无力，公然抱茅入竹去",
    location: "湖南省长沙市",
    href: "#",
    title: "回乡偶书"
  }
];

const allData = [data, data2, data3];

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
          React.createElement("p", null, "来自", React.createElement("strong", null, this.props.location), "的匿名人士对新闻", React.createElement("a", {href: this.props.href}, this.props.title), "的评论")
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
      return React.createElement(Comment, {
        key: i, 
        comment: commentData.comment, 
        location: commentData.location, 
        href: commentData.href, 
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