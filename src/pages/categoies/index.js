import React, { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import SBreadcrumbs from '../../components/Breadcrumbs';
import SButton from '../../components/Button';
import Table from '../../components/TableWithAction';
import { useSelector, useDispatch } from 'react-redux';
import { fetchCategories } from '../../redux/categories/action';
import SAlert from '../../components/Alert';
import Swal from 'sweetalert2';
import { deletData } from '../../utils/fetch';
import { setNotif } from '../../redux/notif/action';
import { accessCategories } from '../../consts/access';

const CategoriesPage = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const notif = useSelector((state) => state.notif);
    const categories = useSelector((state) => state.categories);
    const [access, setAccess] = useState({
        tambah: false,
        hapus: false,
        edit: false,
    });

    const checkAccess = () => {
        let { role } = localStorage.getItem('auth')
            ? JSON.parse(localStorage.getItem('auth'))
            : {};
        const access = { tambah: false, hapus: false, edit: false };
        Object.keys(accessCategories).forEach(function (key, index) {
            if (accessCategories[key].indexOf(role) >= 0) {
                access[key] = true;
            }
        });
        setAccess(access);
    };

    useEffect(() => {
        checkAccess();
    }, []);

    useEffect(() => {
        dispatch(fetchCategories());
    }, [dispatch]);

    const handleDelete = (id) => {
        Swal.fire({
            title: 'Apa kamu yakin?',
            text: 'Anda tidak akan dapat mengembalikan ini!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Iya, Hapus',
            cancelButtonText: 'Batal',
        }).then(async (result) => {
            if (result.isConfirmed) {
                const res = await deletData(`/cms/categories/${id}`);
                dispatch(
                    setNotif(
                        true,
                        'success',
                        `berhasil hapus kategori ${res.data.data.name}`
                    )
                );
                dispatch(fetchCategories());
            }
        });
    };

    return (
        <Container className='mt-3'>
            <SBreadcrumbs textSecound={'Categories'} />

            {access.tambah && (
                <SButton
                    className={'mb-3'}
                    action={() => navigate('/categories/create')}
                >
                    Tambah
                </SButton>
            )}

            {notif.status && (
                <SAlert type={notif.typeNotif} message={notif.message} />
            )}

            <Table
                status={categories.status}
                thead={['Nama', 'Aksi']}
                data={categories.data}
                tbody={['name']}
                editUrl={access.edit ? `/categories/edit` : null}
                deleteAction={access.hapus ? (id) => handleDelete(id) : null}
                withoutPagination
            />
        </Container>
    );
}

export default CategoriesPage;   