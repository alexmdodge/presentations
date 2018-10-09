import Link from 'next/link'

const StyledLink = ({as, href, children}) => {
    const styles = {
        padding: '0.5rem',
        color: '#555',
    }
    
    return (
        <Link as={as} href={href}>
            <a style={styles}>
                {children}
            </a>
        </Link>
    );
}

export default StyledLink;