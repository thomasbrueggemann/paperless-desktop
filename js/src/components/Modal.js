import React from "react";

class Modal extends React.Component {
    // RENDER
    render() {
        return (
            <div className="modal">
                {this.props.children}
            </div>
        );
    }
}

export default Modal;
