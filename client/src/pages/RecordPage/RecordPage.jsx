import useRecordFetcher from "../../hooks/useRecordFetcher";
import { useParams } from "react-router-dom";
import LoadingPage from "../Loading/LoadingPage";
import { Pad, RecordItems } from "../../components";

const RecordPage = () => {
  const { recordId } = useParams();
  const { isLoading, record } = useRecordFetcher(recordId);

  if (isLoading) {
    return <LoadingPage />;
  }

  return (
    <div className="recordPage page container">
      <Pad record={record}>
        <RecordItems record={record} />
      </Pad>
    </div>
  );
};

export default RecordPage;
