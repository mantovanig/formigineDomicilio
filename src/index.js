import { h, Component } from 'preact';
import { Router } from 'preact-router';
import { Link } from 'preact-router/match';

import 'tailwindcss/dist/tailwind.min.css';

// Code-splitting is automated for routes
import Home from './routes/home.js';
import Form from './routes/form.js';

// Constants
const SEARCH =
	'https://gist.githubusercontent.com/mantovanig/267ca5a46da0147feb3837b6bf2c3611/raw/FormigineDomicilio.json';

export default class App extends Component {

	state = {
		results: {},
		isHomepage: true,
	}
	
	handleRoute = e => {
		this.currentUrl = e.url;
		this.setState({isHomepage: e.url === "/"});
	};

	componentDidMount() {
		fetch(
			`${SEARCH}?q=${Math.random()
				.toString(36)
				.split('.')}`
		)
			.then(r => r.json())
			.then(json => {
				this.setState({
					results: json,
					resultBkp: json
				});
			});
	}

	render(props, { isHomepage, results }) {
		return (
			<div id="app" class="px-5">
            <nav class="flex justify-end items-center">
					{
						isHomepage
							? null
							: <Link class="m-5 text-blue-500 hover:text-blue-800" href="/">Ritorna alla ricerca</Link>
					}
					<Link class="m-5 bg-blue-500 inline-block hover:bg-blue-700 text-white font-bold px-2 py-1 rounded" href="/form">Aggiungi la tua attività</Link>
				</nav>
            <h1 class="font-sans text-6xl pb-10 text-gray-800 text-center">
					<span role="img" aria-label="biker">
						🚴
					</span>
					Formigine a Domicilio
				</h1>
				<Router onChange={this.handleRoute}>
					<Home path="/" results={results} />
					<Form path="/form" />
				</Router>
			</div>
		);
	}
}
