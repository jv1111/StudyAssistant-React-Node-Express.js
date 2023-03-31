import React from "react";
import { RecordsList } from "../../components";
import "../../styles/items.css";

const RecordsPage = () => {

    return (
        <div className="recordsPage container">
            <RecordsList />
        </div>
    );
}

export default RecordsPage;