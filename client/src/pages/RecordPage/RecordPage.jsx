import useRecordFetcher from "../../hooks/useRecordFetcher";
import { useParams } from "react-router-dom";
import LoadingPage from "../Loading/LoadingPage";
import Pad from "../../components/records/Pad";
import RecordItems from "../../components/records/RecordItems";

const RecordPage = () => {
  const { recordId } = useParams();
  const { isLoading, record } = useRecordFetcher(recordId);

  if (isLoading) {
    return <LoadingPage />;
  }

  return (
    <div className="record-page">
      <Pad record={record}>
        <RecordItems record={record} />
      </Pad>
    </div>
  );
};

export default RecordPage;
