import { useRouter } from 'next/router';
import Calendar from '../../components/calendar.jsx';

function UserHome() {
  const router = useRouter();
  const { user } = router.query;
  return (
    <div>
      Hello {user}.
      <Calendar />
    </div>
  );
}

export default UserHome;
