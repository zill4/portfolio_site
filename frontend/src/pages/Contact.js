function Contact() {
    return (
        <div>
            <h1>Contact Me</h1>


            <div class="alert alert-{{ category }}">message </div>


            <form method="POST" action="{{ url_for('main.contact') }}">
                <div>
                    <label for="name">Name:</label>
                    <input type="text" id="name" name="name" required/>
                </div>
                <div>
                    <label for="email">Email:</label>
                    <input type="email" id="email" name="email" required/>
                </div>
                <div>
                    <label for="message">Message:</label>
                    <textarea id="message" name="message" rows="5" required></textarea>
                </div>
                <button type="submit" class="btn">Send Message</button>
            </form>
        </div>
    );
}

export default Contact;