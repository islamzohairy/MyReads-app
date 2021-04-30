import React from 'react'

function OpenButton(props) {
    const {handler} = props;
    return (
        <div className="open-search">
            <button onClick={() => handler()}>Add a book</button>
        </div>
    )
}

export default OpenButton
