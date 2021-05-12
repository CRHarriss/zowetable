import React, { useState, useEffect } from 'react';
import { useTable } from 'react-table';

//test code

var result = [{
  "map_recipient_name": "Tax payer Name",
  "map_delivery_company_name": null,
  "map_delivery_street_address": "Address1",
  "map_delivery_apt_suite": "Address2",
  "map_delivery_city": "City",
  "map_delivery_state": "State",
  "map_delivery_zip": "Zip",
  "map_delivery_zip_4": "Zip+4",
  "map_customer_reference_number": "Notice Number",
  "map_notice": null,
  "map_recipient_email": null,
  "map_send_email": null,
  "map_standardize_address": null
},{
  "map_recipient_name": "Tax payer Name #2",
  "more data goes here...": "foobar"
}];

result.forEach(function(o) {
  Object.keys(o).forEach(function(key) {
    console.log(key + ' = ' + o[key]);
  })
});

//code continues


function Example() {

const columns = React.useMemo(
    () => [
      {
        Header: 'City',
        accessor: 'col1', // accessor is the "key" in the data
      },
      {
        Header: 'Temperature',
        accessor: 'col2',
      },
      {
        Header: 'Weather Forecast',
        accessor: 'col3', // accessor is the "key" in the data
      },
    ],
    []
)

const data = React.useMemo(
     () => [
       {
         col1: 'Minsk',
         col2: '27',
         col3: 'rain',
       },
       {
         col1: 'Vilnius',
         col2: '30',
         col3: 'rain',
       },
       {
         col1: 'London',
         col2: '23',
         col3: 'rain',
       },
     ],
     []
 )



 const {
   getTableProps,
   getTableBodyProps,
   headerGroups,
   rows,
   prepareRow,
 } = useTable({ columns, data })

 return (
     <div>
       <table {...getTableProps()} >
         <thead>
         {headerGroups.map(headerGroup => (
             <tr {...headerGroup.getHeaderGroupProps()}>
               {headerGroup.headers.map(column => (
                   <th
                       {...column.getHeaderProps()}
                       style={{
                         borderBottom: 'solid 3px red',
                         color: 'black',
                       }}
                   >
                     {column.render('Header')}
                   </th>
               ))}
             </tr>
         ))}
         </thead>
         <tbody {...getTableBodyProps()}>
         {rows.map(row => {
           prepareRow(row)
           return (
               <tr {...row.getRowProps()}>
                 {row.cells.map(cell => {
                   return (
                       <td
                           {...cell.getCellProps()}
                           style={{
                             padding: '10px',
                             border: 'solid 1px gray',
                           }}
                       >
                         {cell.render('Cell')}
                       </td>
                   )
                 })}
               </tr>
           )
         })}
         </tbody>
       </table>
     </div>
 );
}

export default Example;
