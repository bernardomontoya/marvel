import React, { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { MuiThemeProvider } from '@material-ui/core/styles';  
import Nav from './components/nav/nav.component';
import Background from './components/common/background.component';
import Theme from './components/common/theme';
import './assets/css/styles.css';
import LoadingScreen from './components/common/loading.component';

// split routes
const Home = lazy(() => import('./components/home/home.component'));
const Characters = lazy(() => import('./components/resource/characters.component'));
const Comics = lazy(() => import('./components/resource/comics.component'));
const Stories = lazy(() => import('./components/resource/stories.component'));
const Favorites = lazy(() => import('./components/resource/favorites/favorites.component'));
const ListElementDetails = lazy(() => import('./components/resource/listElementDetails.component'));

function App() {
  return (
    <Router>
      <MuiThemeProvider theme={ Theme }>
          <Nav/>
          <Suspense fallback={<LoadingScreen/>}>
            <Switch>
                <Route path="/" exact component={Home}></Route>
                <Route path="/characters" exact component={Characters}></Route>
                <Route path="/characters/:id" render={(props) => <ListElementDetails {...props} resource='characters'/> }></Route>
                <Route path="/comics" exact component={Comics}></Route>
                <Route path="/comics/:id" render={(props) => <ListElementDetails {...props} resource='comics'/> }></Route>
                <Route path="/stories" exact component={Stories}></Route>
                <Route path="/stories/:id" render={(props) => <ListElementDetails {...props} resource='stories'/> }></Route>
                <Route path="/favorites" component={Favorites}></Route>
            </Switch>
          </Suspense>
          <Background/>
      </MuiThemeProvider>
    </Router>
  );
}

export default App;