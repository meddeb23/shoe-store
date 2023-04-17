import Axios from 'axios';
import React, { useContext, useState } from 'react'
import { UserContext } from '../context/UserContext';
import { NavLink } from 'react-router-dom';
import img from '../../images/blog-1.jpg';

export default function Register({ history }) {

    const { setUser, setIsLoggedIn } = useContext(UserContext);
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password1, setPassword1] = useState("");
    const [password2, setPassword2] = useState("");

    const [error, setError] = useState("");
    const [isFetching, setIsFetching] = useState(false);

    const onsubmitForm = async (e) => {
        e.preventDefault();
        try {
            setIsFetching(true)
            const res = await Axios.post('/api/v1/user/register', { firstName, lastName, email, password1, password2 })
            setIsFetching(false)
            if (res.status === 200) {
                setUser(res.data.user);
                setIsLoggedIn(true);
                history.push('/shose')
            }
        }
        catch (error) {
            setIsFetching(false)
            if (error.response.status === 400) {
                setError(error.response.data.message);
            }
        }
    }

    return (
        <div className="form-container" style={{ flexDirection: "row-reverse" }}>
            <div className="form">
                <NavLink to="/">
                    <h1 className="logo">ShoStore</h1>
                </NavLink>
                <form onSubmit={(e) => onsubmitForm(e)}>
                    <h1>Join the marketplace</h1>
                    <div className="input">
                        <input type="text" onChange={(e) => setFirstName(e.target.value)} name="firstname" placeholder="first name" />
                    </div>
                    <div className="input">
                        <input type="text" onChange={(e) => setLastName(e.target.value)} name="lastname" placeholder="Last name" />
                    </div>
                    <div className="input">
                        <input type="email" onChange={(e) => setEmail(e.target.value)} name="email" placeholder="Email" />
                    </div>
                    <div className="input">
                        <input type="password" onChange={(e) => setPassword1(e.target.value)} name="password" placeholder="Password" />
                    </div>
                    <div className="input">
                        <input type="password" onChange={(e) => setPassword2(e.target.value)} name="password" placeholder="Confirme password" />
                    </div>
                    {error && <div className="error">{error}</div>}

                    <button>Register</button>
                    <div className="actions">
                        <div className="redirect">
                            <NavLink to="/login">Login</NavLink>
                        </div>
                    </div>
                </form>
            </div>
            <div className="ad" style={{ backgroundImage: `url(${img})` }}>
                <NavLink to='/'><h1>
                    Digital shoes marketplace
                </h1></NavLink>
                <p>
                    Your perfect place to buy and sell Shoes
                </p>
            </div>
        </div>

    )
}
