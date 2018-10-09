const Layout = (props) => {
    const styles = {
        width: '80%',
        margin: '0 auto',
        fontFamily: 'Helvetica, sans-serif', 
    }
    
    return (
        <section style={styles}>
            {props.children}
        </section>
    );
}

export default Layout;