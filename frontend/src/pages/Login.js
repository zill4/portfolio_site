function Login() {
    return (
        <div>
            <h1>Admin Login</h1>

            <div class="alert alert-{{ category }}"> message </div>


            <form method="POST">
                <div>
                    <label for="username">Username:</label>
                    <input type="text" id="username" name="username" required />
                </div>
                <div>
                    <label for="password">Password:</label>
                    <input type="password" id="password" name="password" required />
                </div>
                <button type="submit">Login</button>
            </form>
        </div>
    );
}

export default Login;