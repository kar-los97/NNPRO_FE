
import {FiChevronsLeft, FiChevronsRight} from "react-icons/all";
import {usePagination, useTable} from "react-table";

const CrvTable = ({columns, data}) => {
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        prepareRow,
        page,
        canPreviousPage,
        canNextPage,
        pageOptions,
        gotoPage,
        nextPage,
        previousPage,
        setPageSize,
        state: {pageIndex, pageSize},
    } = useTable({
        columns,
        data,
        initialState: {pageIndex: 0, hideOnSinglePage: true},
    }, usePagination, hooks => {
        hooks.visibleColumns.push(columns => [
            ...columns
        ])
    });


    return (
        <>
            <div className={"overflow-x-auto relative sm:rounded-lg"}>
                <table className={"w-full text-left text-gray-500 dark:text-gray-400 border"} {...getTableProps()}>
                    <thead className={"text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400"}>
                    {headerGroups.map(headerGroup => (
                        <tr {...headerGroup.getHeaderGroupProps()}>
                            {headerGroup.headers.map(column => (
                                <th {...column.getHeaderProps()} className={"py-3 px-6"}>{column.render('Header')}</th>
                            ))}
                        </tr>
                    ))}
                    </thead>
                    <tbody {...getTableBodyProps()} className={""}>
                    {data.length===0?<tr className={"bg-white-50 border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600"}><td className={"text-center py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white"} colSpan={columns.length}>Žádná data k zobrazení</td></tr>:
                        page.map((row, i) => {
                            prepareRow(row)
                            let style = "";
                            if(i%2===0){
                                style="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600"
                            }else{
                                style="bg-gray-50 border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600";
                            }
                            return (
                                <tr {...row.getRowProps()} className={style}>
                                    {row.cells.map(cell => {
                                        return <td {...cell.getCellProps()}
                                                   className={"py-4 px-6 text-gray-900 whitespace-nowrap dark:text-white"}>{cell.render('Cell')}</td>
                                    })}
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
            {10 <= data.length ?
                <div className="flex flex-wrap items-center justify-center space-x-2 mt-2">
                    <button className={'rounded p-2 bg-blue-600 hover:bg-blue-700 text-white'}
                            onClick={() => previousPage()} disabled={!canPreviousPage}>
                        <FiChevronsLeft/>
                    </button>
                    {' '}
                    <span className={"form-label"}>
                    Stránka{' '}
                        <strong>{pageIndex + 1} z {pageOptions.length}</strong>{' '}
                </span>
                    <button className={'rounded p-2 bg-blue-600 hover:bg-blue-700 text-white'}
                            onClick={() => nextPage()} disabled={!canNextPage}>
                        <FiChevronsRight/>
                    </button>
                    {' '}
                    <span className={"form-label"}>
          | Přejít na stránku:{' '}
                        <input
                            className={"border rounded text-sm"}
                            type="number"
                            defaultValue={pageIndex + 1}
                            onChange={e => {
                                const page = e.target.value ? Number(e.target.value) - 1 : 0
                                gotoPage(page)
                            }}
                            style={{width: '70px'}}
                        />
        </span>{' '}
                    <select
                        className={"border rounded text-sm"}
                        value={pageSize}
                        onChange={e => {
                            setPageSize(Number(e.target.value))
                        }}
                    >
                        {[10, 20, 30, 40, 50].map(pageSize => (
                            <option key={pageSize} value={pageSize}>
                                {pageSize} záznamů
                            </option>
                        ))}
                    </select>
                </div> : <></>}
        </>
    )

}

export default CrvTable;