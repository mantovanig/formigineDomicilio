import { Component, Fragment } from "preact";
import _get from "lodash.get";

import { ListItem } from "../components/lisItem";
import { Footer } from "../components/Footer";
import { Header } from "../components/Header";

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
      const categoryResults = _get(results, category);
      const stores = _get(categoryResults, "data");

      return (
         <Fragment>
            <Header />
            <div class="relative py-5 mb-8 lg:mb-8 lg:max-w-5xl xl:max-w-6xl lg:m-auto">
               <input
                  class="shadow appearance-none border rounded w-full py-4 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  type="text"
                  placeholder={`🔎 Cerca in ${categoryResults.title}`}
                  onInput={this.handleChangeFilter}
               />
            </div>
            <div class="relative mb-10 font-sans text-md text-gray-800">
               <p className="text-3xl md:text-4xl capitalize">
                  {categoryResults.icon} {categoryResults.title}
               </p>

               {this.renderListByCategories(stores)}
            </div>
            <Footer />
         </Fragment>
      );
   }
}
