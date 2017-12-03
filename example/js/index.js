'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var appId = 'latency';
var apiKey = '6be0576ff61c053d5f9a3225e2a90f76';
var indexName = 'bestbuy';

var client = algoliasearch(appId, apiKey);
var helper = algoliasearchHelper(client, indexName, {
  disjunctiveFacets: ['category'],
  hitsPerPage: 7,
  maxValuesPerFacet: 3
});

var Provider = reactAlgoliaSearchHelper.Provider;
var connect = reactAlgoliaSearchHelper.connect;

var SearchBox = connect()(function (_ref) {
  var helper = _ref.helper;
  return React.createElement('input', {
    className: 'search-box',
    placeholder: 'Search here',
    onChange: function onChange(e) {
      return helper.setQuery(e.target.value).search();
    }
  });
});

var getHighlighted = function getHighlighted(s) {
  return { __html: s };
};

var Hit = function Hit(_ref2) {
  var name = _ref2._highlightResult.name.value;
  return React.createElement('div', { dangerouslySetInnerHTML: getHighlighted(name) });
};

var Hits = connect(function (state) {
  return { results: state.searchResults };
})(function (_ref3) {
  var results = _ref3.results;
  return results && React.createElement(
    'div',
    { className: 'results' },
    results.hits.map(function (hit) {
      return React.createElement(Hit, _extends({ key: hit.objectID }, hit));
    })
  );
});

var Category = function Category(_ref4) {
  var name = _ref4.name;
  var count = _ref4.count;
  var isRefined = _ref4.isRefined;
  var handleClick = _ref4.handleClick;
  return React.createElement(
    'li',
    null,
    React.createElement(
      'label',
      null,
      React.createElement('input', {
        type: 'checkbox',
        checked: isRefined,
        value: name,
        onChange: handleClick
      }),
      name,
      ' ',
      React.createElement(
        'span',
        { className: 'badge' },
        count
      )
    )
  );
};

var Categories = connect(function (state) {
  return {
    categories: state.searchResults && state.searchResults.getFacetValues('category', { sortBy: ['count:desc', 'selected'] }) || []
  };
})(function (_ref5) {
  var categories = _ref5.categories;
  var helper = _ref5.helper;
  return React.createElement(
    'ul',
    { className: 'categories' },
    categories.map(function (category) {
      return React.createElement(Category, _extends({
        key: category.name
      }, category, {
        handleClick: function handleClick(e) {
          return helper.toggleRefine('category', category.name).search();
        }
      }));
    })
  );
});

var Pagination = connect(function (_ref6) {
  var searchResults = _ref6.searchResults;
  return searchResults === null ? { page: 0, nbPages: 0 } : { page: searchResults.page, nbPages: searchResults.nbPages };
})(function (_ref7) {
  var page = _ref7.page;
  var nbPages = _ref7.nbPages;
  var helper = _ref7.helper;
  return React.createElement(
    'div',
    { className: 'pager' },
    React.createElement(
      'button',
      { className: 'previous', onClick: function onClick(e) {
          return helper.setPage(page - 1).search();
        }, disabled: page === 0 },
      'Previous'
    ),
    React.createElement(
      'span',
      { className: 'current-page' },
      page + 1
    ),
    React.createElement(
      'button',
      { className: 'next', onClick: function onClick(e) {
          return helper.setPage(page + 1).search();
        }, disabled: page + 1 >= nbPages },
      'Next'
    )
  );
});

var App = function App() {
  return React.createElement(
    Provider,
    { helper: helper },
    React.createElement(
      'div',
      { className: 'app' },
      React.createElement(SearchBox, null),
      React.createElement(Categories, null),
      React.createElement(Hits, null),
      React.createElement(Pagination, null)
    )
  );
};

ReactDOM.render(React.createElement(App, null), document.querySelector('#root'));

helper.search();