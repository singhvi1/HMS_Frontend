
// const ProfileInfoGrid = ({ student }) => {
const ProfileInfoGrid = ({ student }) => {
  const room =
    student?.block && student?.room_number
      ? `${student.block.toUpperCase()}-${student.room_number}`
      : null;
  const items = [
    ["Phone", student?.user_id?.phone],
    ["Branch", student.branch],
    ["Room", room],
    ["Guardian", student.guardian_name],
    ["Guardian Contact", student.guardian_contact],
    ["Address", student.permanent_address]
  ];
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4 text-sm">
      {items.map(([label, value]) => (
        (value &&
          <p key={label}>
            <b>{label}:</b> {value}
          </p>)
      ))}
    </div>
  );
};

export default ProfileInfoGrid;
