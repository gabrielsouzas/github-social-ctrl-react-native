import { fetchAll } from './src/requests/userRequests';
import Register from './src/pages/Register';
import Home from './src/pages/Home';

export default function App() {
  const test = async () => {
    const following = await fetchAll('following', 'gabrielsouzas');
    console.log(following);
  };

  return <Home />;
}
