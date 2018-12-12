import React from 'react';
import { Link } from 'gatsby';
import Layout from '../components/Layout';

class NotFoundPage extends React.Component {
    render() {
        return (
            <Layout location={this.props.location}>
                <h1>Not Found</h1>
                <p>
                    You just hit a route that doesn&#39;t exist... the sadness.
                    Maybe go to the <Link to="/">main page</Link>?
                </p>
            </Layout>
        );
    }
}

export default NotFoundPage;
