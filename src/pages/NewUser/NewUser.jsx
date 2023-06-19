import { useState } from 'react';
import { Container } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { baseUrl } from '../../baseUrl/baseUrl';
import Swal from 'sweetalert2';

const NewUser = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        // Validate form inputs
        if (!name || !email || !phone) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Please fill in all fields!',
            });
            return;
        }


        const user = {
            name: name,
            email: email,
            phone: phone,
        };

        fetch(`${baseUrl}/users`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(user),
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.insertedId) {
                    setName('');
                    setEmail('');
                    setPhone('');
                    Swal.fire({
                        icon: 'success',
                        title: 'Success!',
                        text: 'New user added successfully!',
                    });
                }
            });
    };

    return (
        <Container className='align-items-center d-flex mx-auto row'>
            <div className='col-md-6'>
                <img
                    src='https://cdn.dribbble.com/users/4241563/screenshots/11874468/media/7796309c77cf752615a3f9062e6a3b3d.gif'
                    alt=''
                    className='w-100'
                />
            </div>
            <Form onSubmit={handleSubmit} className='col-md-6'>
                <Form.Group controlId='name'>
                    <Form.Label>User Name:</Form.Label>
                    <Form.Control
                        type='text'
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        className='custom-input'
                    />
                </Form.Group>

                <Form.Group controlId='email'>
                    <Form.Label>Email Address:</Form.Label>
                    <Form.Control
                        type='email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className='custom-input'
                    />
                </Form.Group>

                <Form.Group controlId='phone'>
                    <Form.Label>Phone Number:</Form.Label>
                    <Form.Control
                        type='tel'
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        required
                        className='custom-input'
                    />
                </Form.Group>

                <Button variant='primary' className='mt-4' type='submit'>
                    Add User
                </Button>
            </Form>
        </Container>
    );
};

export default NewUser;
