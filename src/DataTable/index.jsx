import React from 'react'

import Pagination from './Pagination'
import Row from './Row'
import Search from './Search'
import Rows from './Rows';

import Users from '../Users.json';

class DataTable extends React.PureComponent {
  state = {
    rows: Users['data-users'],
    currentPageNumber: 0,
    rowsPerPage: 5,
    totalNumberOfPages: 0
  }

  componentWillMount () {
    const totalNumberOfPages = this.calculateTotalNumberOfPages(Users['data-users']);
    this.setState({totalNumberOfPages: totalNumberOfPages});
  }

  calculateTotalNumberOfPages(rows) {
    const { rowsPerPage } = {...this.state};
    if (rowsPerPage === 0) return 0;
    return Math.ceil(rows.length / rowsPerPage); 
  }


  search(event) {
    const rows = Users['data-users'];
    const text = event.target.value;
    let rowsFound = rows;

    if (text) {
      rowsFound = rows.filter((row) => {
        return row.name1.toLowerCase().search(text.toLowerCase()) > -1 ||
         (row.email && row.email.toLowerCase().search(text.toLowerCase()) > -1)
      })
    }

    const totalNumberOfPages = this.calculateTotalNumberOfPages(rowsFound);
    
    this.setState({
      rows: rowsFound,
      currentPageNumber: 0,
      totalNumberOfPages: totalNumberOfPages
    })
  }

  changeToPageNumber(pageNumber) {
    this.setState({ currentPageNumber: pageNumber })
  }

  rowsInPageNumber(pageNumber) {
    const { rowsPerPage } = {...this.state}
    const startIndex = pageNumber * rowsPerPage
    return [startIndex, startIndex + rowsPerPage]
  }

  render() {
    const { rows, currentPageNumber, totalNumberOfPages} = {...this.state};
    const rowsToRender = rows
      .map(row => <Row key={row.per_id} row={row} />)
      .slice(...this.rowsInPageNumber(currentPageNumber));

    return(
      <div>
        <Search onSearch={this.search.bind(this)} />
        <Rows rows={rowsToRender}/>     
        <Pagination
          currentPageNumber={currentPageNumber}
          totalNumberOfPages={totalNumberOfPages}
          onChange={this.changeToPageNumber.bind(this)} />
      </div>
    )
  }
}

export default DataTable
