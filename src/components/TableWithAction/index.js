import React from 'react'
import Tbody from '../TbodyWIthAction'
import Thead from '../Thead'
import Pagination from '../Pagination'

import { Table } from 'react-bootstrap'

const TableWithAction = ({
    withoutPagination,
    handlePageClick,
    actionNotDisplay,
    data,
    thead,
    tbody,
    editUrl,
    deleteAction,
    customAction,
    hendlePageClick,
    status,
    pages,
}) => {
    return (
        <>
            <Table striped borderd hover>
                <Thead text={thead} />
                <Tbody
                    status={status}
                    data={data}
                    display={tbody}
                    editUrl={editUrl}
                    deleteAction={deleteAction}
                    actionNotDisplay={actionNotDisplay}
                    customAction={customAction}
                />
            </Table>
            {!withoutPagination && data.length ? (
                <Pagination pages={pages} hendlePageClick={hendlePageClick} />
            ) : (
                ''
            )}
        </>
    )
}

export default TableWithAction