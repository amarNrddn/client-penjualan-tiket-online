import React from 'react'
import { Breadcrumb } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'

const SBreadcrumbs = ({ textSecound, textThrid, urlSecound }) => {
    const navigate = useNavigate()

    return (
        <Breadcrumb className='my-2'>
            <Breadcrumb.Item onClick={() => navigate('/')}>Home</Breadcrumb.Item>
            {!textThrid && <Breadcrumb.Item active>{textSecound}</Breadcrumb.Item>}
            {textThrid && (
                <Breadcrumb.Item onClick={() => navigate(urlSecound)}>{textSecound}</Breadcrumb.Item>
            )}
            {textThrid && <Breadcrumb.Item  active>{textThrid}</Breadcrumb.Item>}
        </Breadcrumb>

    )
}

export default SBreadcrumbs