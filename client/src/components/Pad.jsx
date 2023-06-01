import React from "react";
import { useSelector } from "react-redux";

const Pad = ({ children, record }) => {

    const auth = useSelector(state => state.auth);
    const numberOfItems = record.items.length;

    return (
        <div className="pad">

            <div className="topDescription">
                <div className="right">
                    <label className="bold">Name: <label className="normal">{auth.user.username}</label></label>
                    <label className="bold">subject:
                        <label className="normal">{record.subject}</label>
                    </label>
                </div>

                <div className="left">
                    <label className="bold">
                        Date:
                        <label className="normal">
                            {record.date}
                        </label>
                    </label>
                    <label className="bold">
                        Score: {numberOfItems}/
                        <label className="normal">
                            {record.score}
                        </label>
                    </label>
                </div>
            </div>

            <div className="body">
                {children}
            </div>
        </div>
    )
}

export default Pad;