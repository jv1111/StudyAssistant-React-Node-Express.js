import useRecordFetcher from "../../hooks/useRecordFetcher";
import { useParams } from "react-router-dom";

import RecordItems from "../../components/records/RecordItems";
import Pad from "../../components/records/Pad";

import LoadingPage from "../Loading/LoadingPage";

const RecordPage = () => {
  const { recordId } = useParams();
  const { isLoading, record } = useRecordFetcher(recordId);

  if (isLoading) {
    return <LoadingPage />;
  }

  return (
    <div className="mx-auto w-full max-w-(--content-max-width) px-(--page-padding) py-10">
      <Pad record={record}>
        <RecordItems record={record} />
      </Pad>
    </div>
  );
};

export default RecordPage;
