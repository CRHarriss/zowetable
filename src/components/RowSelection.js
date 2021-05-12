import React, { useMemo } from 'react'
import { useTable, useRowSelect } from 'react-table'
import MOCKDATA from './mockdata.json'
import { COLUMNS }  from './columns.js'
import './table.css'
import { Checkbox } from './Checkbox'
 
export const RowSelection = () => {

    const columns = useMemo(() => COLUMNS, [])
    const data = useMemo(() => MOCKDATA, [])

    const tableInstance = useTable({
        columns,
        data
    })

    const {
        getTableProps, 
        getTableBodyProps, 
        headerGroups,
        footerGroups, 
        rows, 
        prepareRow,
        selectedFlatRows
    //} = tableInstance
    } = useTable(
        {
          columns,
          data,
        }, 
        useRowSelect,
        (hooks) => {
            hooks.visibleColumns.push((columns) => {
                return [
                    {
                        id: 'selection',
                        Header: ({ getToggleAllRowsSelectedProps}) => (
                            <Checkbox {...getToggleAllRowsSelectedProps()} />
                        ),
                        Cell: ({ row }) => (
                            <Checkbox { ...row.getToggleRowSelectedProps()} />
                        )
                    },
                    ...columns
                ]
            })
        }
    )

    const firstPageRows = rows.slice(0,10)

    // was rows.map before firstPageRows

    return (
        <>
        <table {...getTableProps()}>
            <thead>
                {headerGroups.map((headerGroup) => (
                    <tr {...headerGroup.getHeaderGroupProps()}>
                        {headerGroup.headers.map((column) => (
                            <th {...column.getHeaderProps()}>{column.render('Header')}</th>
                        ))}
                    </tr>
                ))}
            </thead>
            <tbody {...getTableBodyProps()}>
                {firstPageRows.map((row) => {
                    prepareRow(row)
                    return (
                        <tr {...row.getRowProps()}>
                            {row.cells.map((cell) => {
                                return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                            })}
                        </tr>
                    )
                })}   
            </tbody>
            <tfoot>
                {
                    footerGroups.map(footerGroup => (
                    <tr {...footerGroup.getFooterGroupProps()}>
                        {
                            footerGroup.headers.map(column => (
                                <td {...column.getFooterProps}>
                                    {
                                        column.render('Footer') 
                                    }
                                </td>
                            ))
                        }
                    </tr>    
                    ))
                }
            </tfoot>
        </table>
        <pre>
            <code>
                {JSON.stringify(
                {
                    selectedFlatRows: selectedFlatRows.map((row) => row.original),
                },
                null,
                2
                )}
            </code>
        </pre>
    </>
      
    )
}