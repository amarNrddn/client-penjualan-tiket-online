import React from 'react'
import Tbody from '../TbodyWIthAction'
import Thead from '../Thead'

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
            {/* {!withoutPagination && data.length ? (
                <Pagination pages={pages} handlePageClick={handlePageClick} />
            ) : (
                ''
            )} */}
        </>
    )
}

export default TableWithAction