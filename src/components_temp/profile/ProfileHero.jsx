import BackButton from "../common/ui/Backbutton";
import { StatusBadge } from "../common/ui/ProfileComponents";
import ProfileAvatar from "./ProfileAvatar";
import ProfileInfoGrid from "./ProfileInfoGrid";

const ProfileHero = ({ student }) => {
  return (

    <>
      <BackButton />
      <div className="bg-white rounded-xl shadow p-6 flex flex-col md:flex-row gap-8">

        <ProfileAvatar
          image_url={student?.image_url || "https://avatars.githubusercontent.com/u/120703712?v=4"}
          name={student?.user_id?.full_name}
          size={220}
        />

        <div className="flex-1 flex flex-col justify-center pl-0 md:pl-6">
          <div className="justify-around">
            <div className=" flex gap-2">
              <h1 className="text-2xl font-bold text-center md:text-left ">
                {student?.user_id?.full_name}

              </h1>
              <StatusBadge status={student?.user_id?.status} />
            </div>

            <p className="text-gray-500 text-center md:text-left">
              {student?.user_id?.email}
            </p>

            {student.sid && <p className="text-sm text-gray-600 mt-1 text-center md:text-left">
              Student ID: {student.sid}
            </p>}
          </div>

          <ProfileInfoGrid student={student} />
        </div>
      </div>
    </>
  );


};

export default ProfileHero;
