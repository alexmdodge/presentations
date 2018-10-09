const Image = (props) => {
    return (
        <img 
            src={props.src}
            alt={props.alt}
            style={{
                maxWidth: '40vw',
                maxHeight: '40vh',
                margin: '0 auto',
            }}
        />
    );
};

export default Image;