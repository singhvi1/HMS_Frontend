import NavBar from '../../../layout/NavBar';
import Topbar from '../../../layout/Topbar';
import Header from './Header';
import RoomTable from './RoomTable';

const Allotment = () => {
  // Mock data for the stats cards


  return (
    <>
      <Topbar />
      <NavBar />
      <div className="w-full bg-gray-50 min-h-screen">

        <Header />
        <div className="p-6">
          <RoomTable />
        </div>

      </div>
    </>
  );
};

export default Allotment;