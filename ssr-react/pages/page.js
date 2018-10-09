
import Layout from '../components/Layout';
import StyledLink from '../components/StyledLink';

import {withRouter} from 'next/router'

const Page = withRouter((props) => {
    console.log('props are: ', props);
    return (
        <Layout>
            <h1>This is random: {props.router.query.id}</h1>

            <footer>
                <StyledLink href="/">
                    Go Back
                </StyledLink>
            </footer>
        </Layout>
    )
});

export default Page;