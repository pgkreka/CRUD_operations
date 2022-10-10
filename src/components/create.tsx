import React, { useState } from "react";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';

function Create() {

    const [name, setName] = useState<string>('');
    const [surname, setSurname] = useState<string>('');
    const [username, setUsername] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [avatar, setAvatar] = useState<string>('');
    const [formErrors, setFormErrors] = useState<any>({});

    const handleSubmit = (event: any) => {
        event.preventDefault();
        let validateObject = validate();

        if (Object.keys(validateObject).length !== 0) {
            return;
        } else {
            var data = {
                'name': name,
                'surname': surname,
                'username': username,
                'email': email,
                'avatar': avatar,
            }

            fetch('http://localhost:8082/users/user', {
                method: 'POST',
                headers: {
                    'Content-Type':'application/json'
                },
                body: JSON.stringify(data)
            })
            .then(res => res.json())
            .then(
                (result) => {
                    if (result) {
                        window.location.href = '/';
                    }
                }
            )
        }
    }

    const validate = () => {
        const errors: any = {};
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
        if (!name) {
            errors.name = "Name is required!";
        }
        if (!surname) {
            errors.surname = "Surneme is required!";
        }
        if (!username) {
            errors.username = "Username is required!";
        }
        if (!email) {
            errors.email = "Email is required!";
        } else if (!regex.test(email)) {
            errors.email = "This is not a valid email format!";
        }
        if (!avatar) {
            errors.avatar = "Avatar is required!";
        }

        setFormErrors(errors);

        return errors;
    }

    return(
        <Container maxWidth="xs">
            <div className="wrapper">
                <form onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                autoComplete="name"
                                name="name"
                                variant="outlined"
                                fullWidth
                                id="name"
                                label="Name"
                                onChange={(e) => setName(e.target.value)}
                                autoFocus
                            />
                            <div className="error-message">{formErrors.name}</div>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                variant="outlined"
                                fullWidth
                                id="surname"
                                label="Surname"
                                onChange={(e) => setSurname(e.target.value)}
                            />
                            <div className="error-message">{formErrors.surname}</div>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                fullWidth
                                id="username"
                                label="Username"
                                onChange={(e) => setUsername(e.target.value)}
                            />
                            <div className="error-message">{formErrors.username}</div>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                fullWidth
                                id="email"
                                label="Email"
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <div className="error-message">{formErrors.email}</div>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                fullWidth
                                id="avatar"
                                label="Avatar"
                                onChange={(e) => setAvatar(e.target.value)}
                            />
                            <div className="error-message">{formErrors.avatar}</div>
                        </Grid>
                    </Grid>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                    >
                        Create
                    </Button>
                </form>
            </div>
        </Container>
    );
}

export default Create;