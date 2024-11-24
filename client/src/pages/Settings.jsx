import Footer from "../components/Footer";
import Header from "../components/Header";

export const Settings = () => {
    return (
        <>

            <Header />
        <main class="settings-container">
            <h1>Account Settings</h1>
            <p>Update your username, email, or password below.</p>
            <form id="settings-form">
                <div class="form-group">
                    <label for="username">Change Username:</label>
                    <input type="text" id="username" name="username" placeholder="Enter new username" required />
                </div>
                <div class="form-group">
                    <label for="email">Change Email:</label>
                    <input type="email" id="email" name="email" placeholder="Enter new email" required />
                </div>
                <div class="form-group">
                    <label for="password">Change Password:</label>
                    <input type="password" id="password" name="password" placeholder="Enter new password" required />
                </div>
                <div class="form-group">
                    <button type="submit" class="save-btn">Save Changes</button>
                </div>
            </form>
        </main>

            <Footer />

        </>

    )
}