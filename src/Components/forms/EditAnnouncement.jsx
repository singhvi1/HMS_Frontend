import { useLocation, useParams } from "react-router-dom";
import AnnouncementForm from "./AnnouncementForm";

const EditAnnouncement = () => {
  const { id } = useParams();
  const { state } = useLocation(); // announcement data

  const handleUpdate = (data) => {
    console.log("Updating announcement:", id, data);
  };

  return (
    <AnnouncementForm
      initialData={state}
      onSubmit={handleUpdate}
    />
  );
};

export default EditAnnouncement;
