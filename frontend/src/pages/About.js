import React, { useEffect, useState } from 'react';

function About() {

    return (
            <div class="about-container">
                <div class="about-image">
                    <img src="{{ url_for('static', filename='img/profile.svg') }}" alt="Profile Picture"/>
                </div>
                <div class="about-content">
                    <h1>About Me</h1>
                    <p>Here you can write your detailed about content. Describe your skills, experiences, and interests.</p>
                    <p>You can add multiple paragraphs and even include lists or other HTML elements as needed.</p>
                </div>
            </div>
    );
}

export default About;