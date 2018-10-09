import Layout from '../components/Layout';
import StyledLink from '../components/StyledLink';

const About = () => {
    return (
        <Layout>
            <h1>About</h1>
            <h3>Dogs are great!</h3>

            <footer>
                <StyledLink href="/">
                    Go Back
                </StyledLink>
            </footer>
        </Layout>
    )
}

export default About;