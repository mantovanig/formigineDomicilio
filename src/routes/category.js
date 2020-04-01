import { Component, Fragment } from "preact";
import { Link } from "preact-router";
import _isEmpty from "lodash.isempty";
import _get from "lodash.get";

import { ListItem } from "../components/lisItem";


export default class Category extends Component {
   state = {
      filter: ""
   };

   handleChangeFilter = e => {
      const text = e.target.value;
      this.setState({ filter: text });
   };

   renderListByCategories(stores) {
      const { filter } = this.state;
      const regex = new RegExp(`${filter}`, "i");

      return stores
         .filter(e => (filter.length ? regex.test(e.name) : true))
         .map(e => <ListItem {...e} />);
   }

   render({ results, category }) {
      // TODO: handle loading state in the root component
      if (_isEmpty(results)) return null;

      console.log("category", category);
      const categoryResults = _get(results, category);
      const stores = _get(categoryResults, "data");

      return (
         <Fragment>
            <div class="relative p-5 lg:max-w-5xl xl:max-w-6xl lg:m-auto pb-10">
               <input
                  class="bg-white focus:outline-none focus:shadow-outline border border-gray-500 rounded-lg py-2 px-4 block w-full appearance-none leading-normal"
                  type="text"
                  placeholder={`Cerca in ${categoryResults.title}`}
                  onInput={this.handleChangeFilter}
               />
            </div>
            <div class="m-5">
               <Link href="/">
                  <button class="bg-transparent w-full hover:bg-blue-500 text-center text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">
                     <svg
                        class="fill-current inline align-middle"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        width="24"
                        height="24"
                     >
                        <path
                           class="heroicon-ui"
                           d="M14.7 15.3a1 1 0 0 1-1.4 1.4l-4-4a1 1 0 0 1 0-1.4l4-4a1 1 0 0 1 1.4 1.4L11.42 12l3.3 3.3z"
                        />
                     </svg>
                     <span class="align-middle">Torna alle categorie</span>
                  </button>
               </Link>
            </div>
            <div class="relative mb-10 font-sans text-md text-gray-800">
               <p className="text-3xl md:text-4xl capitalize">
                  {categoryResults.icon} {categoryResults.title}
               </p>

               {this.renderListByCategories(stores)}
            </div>
            {/* TODO: make a footer component */}
            <div>
               <p class="mb-5 text-center">
                  Developed with ❤️ by{" "}
                  <a
                     class="text-orange-500"
                     href={process.env.PREACT_APP_DEV_LINK}
                  >
                     {process.env.PREACT_APP_DEV_NAME}
                  </a>
               </p>
            </div>
         </Fragment>
      );
   }
}
