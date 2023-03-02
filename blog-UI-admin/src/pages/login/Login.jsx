import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import { useLoginMutation } from "../../app/services/auth.service";
import styles from "./Login.module.css";

function Login() {
    const { isAuthenticated } = useSelector((state) => state.auth);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [login] = useLoginMutation();
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

        login({ email, password })
            .unwrap()
            .then(() => {
                alert("Login thành công");

                setTimeout(() => {
                    navigate("/admin/blogs")
                }, 1500)
            })
            .catch((err) => {
                alert(err);
            });
    };

    if(isAuthenticated) {
        return <Navigate to={"/admin/blogs"}/>
    }

    return (
        <div className={styles.loginContainer}>
            <div className={styles.loginPage}>
                <div className={styles.form}>
                    <form onSubmit={handleSubmit}>
                        <input
                            type="text"
                            placeholder="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <input
                            type="password"
                            placeholder="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <button type="submit">login</button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Login;
