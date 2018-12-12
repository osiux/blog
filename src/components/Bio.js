import React from 'react';

// Import typefaces
import 'typeface-montserrat';
import 'typeface-merriweather';

import profilePic from './profile-pic.jpg';
import { rhythm } from '../utils/typography';

class Bio extends React.Component {
    render() {
        return (
            <div
                style={{
                    display: 'flex',
                    marginBottom: rhythm(2.5),
                }}
            >
                <p>
                    Escrito por <strong>Eduardo Reveles</strong>, dev & gamer
                    viviendo en la caótica Ciudad de México.{' '}
                    <a href="https://twitter.com/osiux">Sígueme en twitter</a>
                </p>
            </div>
        );
    }
}

export default Bio;
