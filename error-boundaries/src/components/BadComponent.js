import React from 'react';

class BadComponent extends React.Component {
    render() {
        // Get result does not exist on the props
        const result = this.props.getResult();

        return (
            <h1>
                This has a result: {result}
            </h1>
        )
    }
}

export default BadComponent;