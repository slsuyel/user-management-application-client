import { Table, Button, Spinner } from 'react-bootstrap';

import Swal from 'sweetalert2';
import { baseUrl } from '../../baseUrl/baseUrl';
import { Link } from 'react-router-dom';
import useAllUsers from '../Hooks/useAllUsers';

const UserList = () => {
    const [allUsers, refetch, isLoading] = useAllUsers()

    console.log(allUsers);

    if (isLoading) {
        return (
            <Spinner animation="border" role="status">
                <span className="visually-hidden">Loading...</span>
            </Spinner>
        );
    }

    const handleDelete = (id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                fetch(`${baseUrl}/users/${id}`, {
                    method: 'DELETE',
                })
                    .then((res) => res.json())
                    .then((data) => {
                        if (data.deletedCount > 0) {
                            refetch();
                            Swal.fire('Deleted!', 'User has been deleted.', 'success');
                        }
                    });
            }
        });
    };



    return (
        <div className="container mx-auto w-100">
            <h2 className="text-center">Users  List</h2>
            <div className="table-responsive">
                <Table striped bordered hover>
                    <thead>
                        <tr className='text-center'>
                            <th>#</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Phone</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {allUsers.map((user, index) => (
                            <tr key={user._id}>
                                <td>{index + 1}</td>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>{user.phone}</td>

                                <td className="d-md-flex gap-3 justify-content-center">
                                    <Link to={`/userupdate/${user._id}`}>
                                        <button className="btn-info btn text-nowrap mb-1" >Update User </button>
                                    </Link>

                                    <Button variant="danger" onClick={() => handleDelete(user._id)}>
                                        Delete
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </div>
        </div>
    );
};

export default UserList;
