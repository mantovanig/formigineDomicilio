import { Component, Fragment } from "preact";
import _isEmpty from "lodash.isempty";
import _get from "lodash.get";
import { Link } from "react-router-dom";
import ReactGA from "react-ga";
import useSWR from "swr";

// components
import { ListItem } from "../components/lisItem";
import { CategoryItem } from "../components/CategoryItem";
import { Footer } from "../components/Footer";
import { Header } from "../components/Header";
import { Loader } from "../components/Loader";

import { isProd } from "../utils";

export default class Home extends Component {
   state = {
      filter: "",
   };

   handleChangeFilter = (e) => {
      const text = e.target.value;

      if (isProd) {
         ReactGA.event({
            category: "User",
            label: text,
            action: `Text search in home`,
         });
      }

      this.setState({ filter: text });
   };

   renderListByCategories(results) {
      if (!results) {
         return (
            <div class="w-full h-full flex items-center justify-center">
               <Loader />
            </div>
         );
      }

      if (_isEmpty(results))
         return (
            <div class="w-full h-full flex items-center justify-center">
               <div
                  class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
                  role="alert"
               >
                  <strong class="font-bold">Ops! </strong>
                  <span class="block sm:inline">
                     Nessun risultato trovato
                  </span>
               </div>
            </div>
         );

      return results.map((e) => (
         <ListItem
            id={_get(e, "id")}
            name={_get(e, "elements.name.value")}
            tel={_get(e, "elements.phone.value")}
            site={_get(e, "elements.website.value")}
            mail={_get(e, "elements.mail.value")}
            note={_get(e, "elements.description.value")}
            hasDetails={!_get(e, "elements.checkbox.value")}
         />
      ));
   }

   renderCategoriesList(categories) {
      return (
         <div>
            {categories.map((c) => (
               <Link to={`categorie/${_get(c, "id")}`}>
                  <CategoryItem
                     key={_get(c, "elements.categoryid.value")}
                     name={_get(c, "elements.categoryname.value")}
                     icon={_get(c, "elements.emoji.value")}
                  />
               </Link>
            ))}
         </div>
      );
   }

   render(_, { filter }) {
      const { data, error } = useSWR(
         `${process.env.PREACT_APP_MB_URL}/blocks/773/sections?skip=0&sort=id&take=99&include=elements`
      );
      const { data: searchData } = useSWR(() =>
         !_isEmpty(filter) && filter.length >= 3
            ? `${process.env.PREACT_APP_MB_URL}/blocks/772/sections?include=elements&sort=order&filter[value]=name|${filter}&skip=0&take=999`
            : null
      );

      const categories = _get(data, "items", []);
      const searchResults = _get(searchData, "items");

      if (!data) {
         return (
            <div class="w-full h-screen flex items-center justify-center">
               <Loader />
            </div>
         );
      }

      if (error)
         return (
            <div class="w-full h-screen flex items-center justify-center">
               <div
                  class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
                  role="alert"
               >
                  <strong class="font-bold">Ops! </strong>
                  <span class="block sm:inline">
                     Qualcosa è andato storto, riprova.
                  </span>
               </div>
            </div>
         );

      return (
         <Fragment>
            <Header />
            <div class="relative py-5 lg:max-w-5xl xl:max-w-6xl lg:m-auto pb-10">
               <input
                  class="shadow appearance-none border rounded w-full py-4 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  type="text"
                  placeholder="🔎 Cerca Attività"
                  onInput={this.handleChangeFilter}
               />
            </div>
            <div class="relative mb-10 font-sans text-md text-gray-800">
               {_isEmpty(filter) || filter.length < 3
                  ? this.renderCategoriesList(categories)
                  : this.renderListByCategories(searchResults)}
            </div>
            <Footer />
         </Fragment>
      );
   }
}
