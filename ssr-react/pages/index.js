import axios from 'axios'
import Image from '../components/Image';
import Layout from '../components/Layout';
import StyledLink from '../components/StyledLink';

const Home = (props) => {
    const randomNum = Math.floor(Math.random() * 20);
    
    return (
        <Layout>
            <h1> Dogs are Great </h1>
            <h4>
                Let's show them off using a Next Application.
                Here's a random dog for your viewing pleasure.
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