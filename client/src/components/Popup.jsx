import React from "react";

const Popup = (props) => {
    if (!props.trigger) return null;
    return (
        <div className="popupBackground">
            <div className="popupPanel">
                {props.children}
                <button
                    className="btn-exit"
                    onClick={() => props.setTrigger(false)}
                >X</button>
            </div>
        </div>
    );
}

export default Popup;