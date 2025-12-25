import { student } from "../../../../data";
import QuickActions from "../../dashboard/QuickActions";
import ProfileHero from "../../profile/ProfileHero";

const StudentHome = () => {
  return (
    <section className="space-y-6">
      <ProfileHero student={student} />
      <QuickActions />
    </section>
  );
};

export default StudentHome;
