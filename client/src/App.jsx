import { Switch, Route, useHistory } from 'react-router-dom';
import Header from './components/Header';
import AllNotes from './pages/AllNotes';
import MyNotes from './pages/MyNotes';
import { useAuth } from './context/AuthContext';

function App({ noteService }) {
  const history = useHistory();
  const { user, logout } = useAuth();

  const onAllNotes = () => {
    history.push('/');
  };

  const onMyNotes = () => {
    history.push(`/${user.username}`);
  };

  const onLogout = () => {
    if (window.confirm('Do you want to log out?')) {
      logout();
      history.push('/');
    }
  };

  return (
    <div className='app'>
      <Header
        username={user.username}
        onLogout={onLogout}
        onAllNotes={onAllNotes}
        onMyNotes={onMyNotes}
      />
      <Switch>
        (
        <>
          <Route exact path='/'>
            <AllNotes noteService={noteService} />
          </Route>
          <Route exact path='/:username'>
            <MyNotes noteService={noteService} />
          </Route>
        </>
        )
      </Switch>
    </div>
  );
}

export default App;
