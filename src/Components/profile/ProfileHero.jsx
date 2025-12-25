import ProfileAvatar from "./ProfileAvatar";
import ProfileInfoGrid from "./ProfileInfoGrid";

const ProfileHero = ({ student }) => {

  return (
    <div className="bg-white rounded-xl shadow p-6 flex flex-col md:flex-row gap-8">
      <ProfileAvatar
        image_url={student.image_url}
        name={student.full_name}
        size={200}
      />

      <div className="flex-1 flex flex-col justify-center pl-0 md:pl-6">
        <div className="justify-around">
          <h1 className="text-2xl font-bold text-center md:text-left">
            {student.full_name}
          </h1>

          <p className="text-gray-500 text-center md:text-left">
            {student.email}
          </p>

          {student.sid && <p className="text-sm text-gray-600 mt-1 text-center md:text-left">
            Student ID: {student.sid}
          </p>}
        </div>

        <ProfileInfoGrid student={student} />
      </div>
    </div>
  );


};

export default ProfileHero;
