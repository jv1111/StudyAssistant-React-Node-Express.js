import React from "react";
import { RecordsList, ItemContainer } from "../../components";
import "../../styles/items.css";

const RecordsPage = () => {
    return (
        <div className="recordsPage container">
            <ItemContainer title={"Records"}>
                <RecordsList />
            </ItemContainer>
        </div>
    );
}

export default RecordsPage;