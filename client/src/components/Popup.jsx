import React from "react";

const Popup = (props) => {
    if (!props.trigger) return null;
    return (
        <div className="popupBackground">
            <div className="popupPanel">
                {props.children}
                <button
                    onClick={() => props.setTrigger(false)}
                >Close</button>
            </div>
        </div>
    );
}

export default Popup;