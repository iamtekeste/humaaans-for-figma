import * as React from 'react';
import * as ReactDOM from 'react-dom';
import Humaaans from './Humaaans';
import humaaanListSource from './humaaanList';
import './ui.css';

declare function require(path: string): any;

class App extends React.Component {
  state = {
    searchTerm: '',
    humaaanList: humaaanListSource
  };
  importHumaaan = humaaan => {
    parent.postMessage(
      { pluginMessage: { type: 'import-humaaan', humaaan } },
      '*'
    );
  };
  filterHumaaans = event => {
    const searchTerm = event.target.value;
    const { humaaanList } = this.state;

    let filteredHumaaans = humaaanList.filter(humaaan => {
      return (
        humaaan.toLocaleLowerCase().indexOf(searchTerm.toLocaleLowerCase()) >= 0
      );
    });
    if (!searchTerm) {
      filteredHumaaans = humaaanListSource;
    }
    this.setState({ searchTerm, humaaanList: filteredHumaaans });
  };
  render() {
    const { searchTerm, humaaanList } = this.state;
    return (
      <div>
        <div className="InputAddOn">
          <span className="InputAddOn-item">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="feather feather-search"
            >
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
          </span>
          <input
            className="InputAddOn-field"
            type="text"
            value={searchTerm}
            onChange={this.filterHumaaans}
            placeholder="Search illustrations of people"
          />
        </div>
        <Humaaans
          importHumaaan={this.importHumaaan}
          humaaanList={humaaanList}
        />
        <div className="credits">
          made by{' '}
          <a target="_blank" href="https://twitter.com/tkmadeit">
            @tkmadeit{' '}
          </a>
          with illustrations from{' '}
          <a target="_blank" href="https://www.humaaans.com/">
            Humaaans
          </a>
        </div>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('react-page'));
