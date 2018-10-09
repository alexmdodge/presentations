import Layout from '../components/Layout';
import StyledLink from '../components/StyledLink';
import Image from '../components/Image';

import axios from 'axios'

const Home = (props) => {
    const randomNum = Math.floor(Math.random() * 20);
    
    return (
        <Layout>
            <h1> Test Page </h1>
            <h4>
                This is the home page of a Next Application.
            </h4>

            <Image src={props.dog}/>

            <footer>
                <StyledLink href="/about">
                    About Me
                </StyledLink>
                <StyledLink 
                    as={`/page/${randomNum}`}
                    href={`/page?id=page-${randomNum}`}
                >
                    Random Page
                </StyledLink>
            </footer>
        </Layout>
    );
}

Home.getInitialProps = async function () {
    const result = await axios.get('https://dog.ceo/api/breeds/image/random');

    return {
        dog: result.data.message,
    };
}

export default Home;