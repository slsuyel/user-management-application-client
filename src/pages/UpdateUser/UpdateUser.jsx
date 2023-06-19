import { useState } from "react";
import { Container, Form, Button } from "react-bootstrap";
import { baseUrl } from "../../baseUrl/baseUrl";
import Swal from "sweetalert2";
import { useParams } from "react-router-dom";
import useAllUsers from "../Hooks/useAllUsers";

const UpdateUser = () => {

    const { id } = useParams();
    const [allUsers] = useAllUsers();
    const user = allUsers.find((item) => item._id === id);
    const [name, setName] = useState(user.name);
    const [email, setEmail] = useState(user.email);
    const [phone, setPhone] = useState(user.phone);


    const handleSubmit = (e) => {
        e.preventDefault();

        fetch(`${baseUrl}/user/${id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name,
                email,
                phone,
            }),
        })
            .then((response) => response.json())
            .then((data) => {
                if (data.modifiedCount > 0) {
                    Swal.fire(
                        'Good!',
                        'User Update successfully',
                        'success'
                    );
                }
            })
            .catch((error) => {
                // Handle any errors
                console.error(error);
            });
    };
    return (
        <Container className="align-items-center d-flex mx-auto row">
            <div className="col-md-6">
                <img
                    src="https://cdn.dribbble.com/users/4241563/screenshots/11874468/media/7796309c77cf752615a3f9062e6a3b3d.gif"
                    alt=""
                    className="w-100"
                />
            </div>
            <Form onSubmit={handleSubmit} className="col-md-6">
                <Form.Group controlId="title">
                    <Form.Label>Name:</Form.Label>
                    <Form.Control
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        className="custom-input"
                    />
                </Form.Group>

                <Form.Group controlId="description">
                    <Form.Label>Email:</Form.Label>
                    <Form.Control
                        as="textarea"
                        type='email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="custom-textarea"
                    />
                </Form.Group>

                <Form.Group controlId="status">
                    <Form.Label>Phone:</Form.Label>
                    <Form.Control
                        type="number"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        required
                        className="custom-select"
                    >

                    </Form.Control>
                </Form.Group>

                <Button variant="primary" className="mt-4" type="submit">
                    Update User
                </Button>
            </Form>
        </Container>
    );
};

export default UpdateUser;
