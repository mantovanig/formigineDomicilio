import { h, Component, createContext } from 'preact';
import { Router } from 'preact-router';
import { Link } from 'preact-router/match';

import 'tailwindcss/dist/tailwind.min.css';

// Routes
import Home from './routes/home.js';
import Form from './routes/form.js';
import Category from './routes/category';

// Components
import { Dialog } from './components/dialog.js';

// Constants
const SEARCH = process.env.PREACT_APP_DATA_SOURCE;

export const Action = createContext({})

// stubs
import resultsMock from './assets/formigineDomicilio.json';

export default class App extends Component {

	state = {
		results: {},
		isHomepage: true,
		isPopupOpen: false,
		popupNumbers: [],
	}
	
	handleRoute = e => {
		this.currentUrl = e.url;
		this.setState({isHomepage: e.url === "/"});
	};

	setPopupNumbers = (e, numberArray) => {
		e.preventDefault();

		this.setState({
			popupNumbers: numberArray,
			isPopupOpen: true
		})
	}

	closePopup = (e) => {	
		if (e.currentTarget === e.target) {
			this.setState({ isPopupOpen: false })
		}
	}

	componentDidMount() {
		fetch(
			`${SEARCH}?q=${Math.random()
				.toString(36)
				.split('.')}`
		)
			.then(r => r.json())
			.then(json => {
				this.setState({
					results: resultsMock,
					resultBkp: resultsMock
				});
			});
	}

	componentDidUpdate() {
		const { isPopupOpen } = this.state;
		
		const root = document.documentElement;
		root.style.setProperty('--popup-visible', isPopupOpen ? 'hidden': 'initial')
	}

	render(props, { isHomepage, results, popupNumbers, isPopupOpen }) {
		return (
			<Action.Provider value={{setPopupNumbers: this.setPopupNumbers}}>
				<div id="app" class="px-5 max-w-screen-md mx-auto">
					<nav class="flex justify-center md:justify-end items-center">
						{
							isHomepage
								? null
								: <Link class="m-2 ml-0 my-5 md:m-5 text-blue-500 hover:text-blue-800 text-sm md:text-base" href="/">Ritorna alla home</Link>
						}
						<Link class="m-2 my-5 md:m-5 mr-0 bg-blue-500 inline-block hover:bg-blue-700 text-white font-bold text-xs md:text-base px-2 py-1 rounded" href="/form">Aggiungi un'attività</Link>
					</nav>
					<h1 class="font-sans text-4xl md:text-5xl lg:text-6xl pt-10 text-gray-800 text-center capitalize">
						<span class="block sm:inline-block" role="img" aria-label="biker">
							🚴
						</span>
						{`${process.env.PREACT_APP_CITY} a Domicilio`}
					</h1>
					<Router onChange={this.handleRoute}>
						<Home path="/" results={results} />
						<Form path="/form" />
						<Category path="categorie/:category" results={results} />
					</Router>
				</div>
				<Dialog isOpen={isPopupOpen} closePopup={this.closePopup} telNumbers={popupNumbers} />
			</Action.Provider>
		);
	}
}
