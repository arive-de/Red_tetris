"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _reactRedux = require("react-redux");

require("./SearchPlayer.scss");

var _path = require("path");

const SearchPlayer = ({
  rooms,
  onJoin
}) => {
  const userList = (0, _reactRedux.useSelector)(state => state.userList);
  const [activeSuggestion, setActiveSuggestion] = (0, _react.useState)(0);
  const [filteredSuggestions, setFilteredSuggestions] = (0, _react.useState)([]);
  const [showSuggestions, setShowSuggestions] = (0, _react.useState)(false);
  const [userInput, setUserInput] = (0, _react.useState)('');

  const onChange = e => {
    setUserInput(e.target.value);
    const filteredSuggestions = userList.filter(m => {
      return m.startsWith(e.target.value);
    });
    setFilteredSuggestions(filteredSuggestions);
    setActiveSuggestion(0);
    setShowSuggestions(true);
  };

  const onJoinRoom = user => () => {
    const joinedRoom = rooms.find(r => r.players.indexOf(user) !== -1);

    if (joinedRoom === undefined) {
      return;
    }

    onJoin(joinedRoom);
  };

  const onKeyDown = e => {
    if (e.keyCode === 13) {
      onJoinRoom(filteredSuggestions[activeSuggestion])();
      setShowSuggestions(false);
      setActiveSuggestion(0);
    } else if (e.keyCode === 38) {
      if (activeSuggestion === 0) {
        return;
      }

      setActiveSuggestion(x => x - 1);
    } else if (e.keyCode === 40) {
      if (activeSuggestion === filteredSuggestions.length - 1) {
        return;
      }

      setActiveSuggestion(x => x + 1);
    }
  };

  let suggestionsListComponent;

  if (showSuggestions && userInput) {
    if (filteredSuggestions.length) {
      suggestionsListComponent = _react.default.createElement("ul", {
        className: "suggestions"
      }, filteredSuggestions.map((suggestion, index) => {
        let className;

        if (index === activeSuggestion) {
          className = 'suggestion-active';
        }

        return _react.default.createElement("li", {
          className: className,
          key: index,
          onClick: onJoinRoom(suggestion)
        }, suggestion);
      }));
    } else {
      suggestionsListComponent = _react.default.createElement("div", {
        className: "no-suggestions"
      }, _react.default.createElement("em", null, "No suggestions, you're on your own!"));
    }
  }

  return _react.default.createElement(_react.Fragment, null, _react.default.createElement("div", {
    className: "input-group"
  }, _react.default.createElement("div", {
    className: "input-group-prepend"
  }, _react.default.createElement("span", {
    className: "input-group-text",
    id: "basic-addon1"
  }, _react.default.createElement("i", {
    className: "fas fa-search"
  }))), _react.default.createElement("input", {
    id: "searchPlayerInput",
    className: "form-control shadow-none",
    onChange: onChange,
    onKeyDown: onKeyDown,
    type: "text",
    value: userInput,
    placeholder: "online users"
  })), suggestionsListComponent);
};

var _default = SearchPlayer;
exports.default = _default;