'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var APIURL = 'http://121.41.112.93/api/comment/';

var Head = (function (_React$Component) {
  _inherits(Head, _React$Component);

  function Head() {
    _classCallCheck(this, Head);

    _get(Object.getPrototypeOf(Head.prototype), 'constructor', this).apply(this, arguments);
  }

  _createClass(Head, [{
    key: 'handleClick',
    value: function handleClick() {
      console.log('click');
    }
  }, {
    key: 'render',
    value: function render() {
      return React.createElement("div", { id: "head" }, React.createElement("span", { className: "maintitle" }, "CBComment")
      /* 
      <span className="icon logo"></span>
      <input/>
      <span className="icon search" onClick={this.handleClick}></span>
      */
      );
    }
  }]);

  return Head;
})(React.Component);

var Comment = (function (_React$Component2) {
  _inherits(Comment, _React$Component2);

  function Comment() {
    _classCallCheck(this, Comment);

    _get(Object.getPrototypeOf(Comment.prototype), 'constructor', this).apply(this, arguments);
  }

  _createClass(Comment, [{
    key: 'render',
    value: function render() {
      return React.createElement("div", { className: "comment" }, React.createElement("div", { className: "commentbody" }, React.createElement("p", null, this.props.comment)), React.createElement("div", { className: "commenttriangle" }, React.createElement("div", { className: "toptriangle" }), React.createElement("div", { className: "bottomtriangle" })), React.createElement("div", { className: "commentfoot" }, React.createElement("p", null, "来自", React.createElement("strong", null, this.props.location), "的匿名人士对新闻", React.createElement("a", { href: this.props.href, target: "_blank" }, this.props.title), "的评论")));
    }
  }]);

  return Comment;
})(React.Component);

var Foot = (function (_React$Component3) {
  _inherits(Foot, _React$Component3);

  function Foot() {
    _classCallCheck(this, Foot);

    _get(Object.getPrototypeOf(Foot.prototype), 'constructor', this).apply(this, arguments);
  }

  _createClass(Foot, [{
    key: 'render',
    value: function render() {
      return React.createElement("div", { className: "foot" }, React.createElement("div", { className: "more", onClick: this.props.more }, React.createElement("p", null, this.props.moreText)));
    }
  }]);

  return Foot;
})(React.Component);

var Main = (function (_React$Component4) {
  _inherits(Main, _React$Component4);

  function Main(props) {
    _classCallCheck(this, Main);

    _get(Object.getPrototypeOf(Main.prototype), 'constructor', this).call(this, props);
    this.state = { commentData: [], page: 1, moreText: '加载中...' };
  }

  _createClass(Main, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      jx.load(APIURL + '1', (function (res) {
        this.setState({ moreText: '加载更多', commentData: JSON.parse(res) }, null);
      }).bind(this));
    }
  }, {
    key: 'more',
    value: function more() {
      var page = this.state.page + 1;
      var oldData = this.state.commentData;
      jx.load(APIURL + page, (function (res) {
        var newData = oldData.concat(JSON.parse(res));
        this.setState({ commentData: newData, page: page }, null);
      }).bind(this));
    }
  }, {
    key: 'render',
    value: function render() {
      var commentNodes = this.state.commentData.map(function (commentData, i) {
        return React.createElement(Comment, {
          key: i,
          comment: commentData.comment,
          location: commentData.location,
          href: 'http://m.cnbeta.com' + commentData.href,
          title: commentData.title });
      });
      return React.createElement("div", { className: "main" }, React.createElement(Head, null), commentNodes, React.createElement(Foot, { more: this.more.bind(this), moreText: this.state.moreText }));
    }
  }]);

  return Main;
})(React.Component);

React.render(React.createElement(Main, null), document.getElementById('main'));
