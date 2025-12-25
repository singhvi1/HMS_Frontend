const AdminRoomActions = ({ student }) => {
    console.log(student)//we will use this sudent data to perform admin actions
    return (
        <div className="bg-white rounded-xl shadow p-4 space-y-4">
            <h3 className="font-semibold text-lg">Admin Actions</h3>

            <div className="flex flex-wrap gap-3">
                <button className=" btn btn-primary">Edit Student</button>
                <button className="btn btn-danger">Delete Room</button>
                <button className="btn btn-danger">Delete Student</button>
                <button className="btn btn-secondary">Add Discipline</button>
            </div>
        </div>
    );
};

export default AdminRoomActions;
