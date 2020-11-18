/* eslint-disable quotes */
import React from 'react'

const Page = (props) => {
  const { pageNumber, currentPageNumber, onChange } = {...props}
  const renderedPageNumber = () => pageNumber + 1
  const click = (event) => {
    event.preventDefault()
    onChange(pageNumber)
  }

  return(
    <li className="page-item mr-1">
      <button className={currentPageNumber === pageNumber ? "page-link button-outline" : "page-link"} onClick={click} >{renderedPageNumber()}</button>
    </li>
  )
}

export default Page
