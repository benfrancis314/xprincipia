import React from 'react';
import SearchForm from '../components/search/SearchForm.jsx';
import SearchUnit from '../components/search/SearchUnit.jsx';
// import SearchMore from '../components/search/SideBarMore.jsx';

export default class SearchContainer extends React.Component {
   render() {
      return (
        <div id="searchBox">
            <SearchForm />
            <div id="searchElements">
              <SearchUnit />
              {/*<SearchMore />*/}
            </div>
        </div>
      );
   }
}
