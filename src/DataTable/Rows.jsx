/* eslint-disable linebreak-style */
/* eslint-disable indent */
import React from 'react'

const Rows = (props) => {
    return(
      <div>
        <table>
          <tbody>
            {props.rows}
          </tbody>
        </table>
      </div>  
    )
}

export default Rows;