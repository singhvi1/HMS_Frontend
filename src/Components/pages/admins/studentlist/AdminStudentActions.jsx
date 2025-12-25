const AdminStudentActions = ({ student }) => {
    console.log(student)//we will use this sudent data to perform admin actions
  return (
    <div className="bg-white rounded-xl shadow p-4 space-y-4">
      <h3 className="font-semibold text-lg">Admin Actions</h3>

      <div className="flex flex-wrap gap-3">
        <button className="btn-primary">Edit Info</button>
        <button className="btn-warning">Change Status</button>
        <button className="btn-danger">Delete Student</button>
        <button className="btn-secondary">Add Discipline</button>
      </div>
    </div>
  );
};

export default AdminStudentActions;
