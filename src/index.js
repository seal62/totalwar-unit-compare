import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import App from './App';
import Nav from './components/nav';
import Footer from './components/footer';
import Factions from './components/factions';
import Faction from './components/faction/faction';
import Compare from './components/compare/compare';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
	<BrowserRouter>
		<div>
			<Nav />
			<Switch>
				<Route exact path='/compare' component={Compare} />
				<Route exact path='/factions' component={Factions} />
				<Route path='/:faction' component={Faction} />
				<Route path='/' component={App} />
			</Switch>
			<Footer />
		</div>
	</BrowserRouter>
	, document.getElementById('root'));
registerServiceWorker();
