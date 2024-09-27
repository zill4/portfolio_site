import React, { useState } from 'react';
import { addDoc, collection } from 'firebase/firestore';
import { db } from '../firebase';
import MarkdownEditor from '../components/markdownEditor';
import '../styles/Contact.css';
function Contact() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [status, setStatus] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus({ type: 'info', message: 'Sending message...' });

        try {
            await addDoc(collection(db, 'contactMessages'), {
                name,
                email,
                message,
                createdAt: new Date().toISOString()
            });
            setStatus({ type: 'success', message: 'Message sent successfully!' });
            setName('');
            setEmail('');
            setMessage('');
        } catch (error) {
            console.error("Error sending message: ", error);
            setStatus({ type: 'error', message: 'Failed to send message. Please try again.' });
        }
    };

    return (
        <div className="contact">
            <h1>Contact Me</h1>

            {status && (
                <div className={`alert alert-${status.type}`}>
                    {status.message}
                </div>
            )}

            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="name">Name:</label>
                    <input 
                        type="text" 
                        id="name" 
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email:</label>
                    <input 
                        type="email" 
                        id="email" 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="message">Message:</label>
                    <MarkdownEditor 
                        value={message}
                        onChange={setMessage}
                    />
                </div>
                <button type="submit" className="btn">Send Message</button>
            </form>
        </div>
    );
}

export default Contact;