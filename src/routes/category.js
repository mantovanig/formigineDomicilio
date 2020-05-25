import { Component, Fragment } from "preact";
import { useParams } from "react-router-dom";
import _get from "lodash.get";
import ReactGA from "react-ga";
import useSWR from "swr";

import { ListItem } from "../components/lisItem";
import { Footer } from "../components/Footer";
import { Header } from "../components/Header";
import { Loader } from "../components/Loader";

import { isProd } from "../utils";

export default class Category extends Component {
   state = {
      filter: "",
   };

   handleChangeFilter = (e) => {
      const text = e.target.value;
      const { category } = useParams();

      if (isProd) {
         ReactGA.event({
            category: "User",
            label: text,
            action: `Text search in ${category}`,
         });
      }

      this.setState({ filter: text });
   };

   renderListByCategories(stores) {
      const { filter } = this.state;
      const regex = new RegExp(`${filter}`, "i");

      return stores
         .filter((e) =>
            filter.length ? regex.test(_get(e, "elements.name.value")) : true
         )
         .map((e) => (
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

   render() {
      const { category } = useParams();
      const { data, error } = useSWR(
         () =>
            `${process.env.PREACT_APP_MB_URL}/blocks/772/sections?include=elements&sort=order&filter[value]=category|${category}&skip=0&take=999`
      );
      const { data: categoryData } = useSWR(
         () =>
            `${process.env.PREACT_APP_MB_URL}/sections/${category}/elements?skip=0&sort=id&take=30`
      );

      const stores = _get(data, "items");

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
            <Header parentRoute="/" />
            <div class="relative py-5 mb-8 lg:mb-8 lg:max-w-5xl xl:max-w-6xl lg:m-auto">
               <input
                  class="shadow appearance-none border rounded w-full py-4 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  type="text"
                  placeholder={`🔎  Cerca in ${_get(
                     categoryData,
                     "items.categoryname.value"
                  )}`}
                  onInput={this.handleChangeFilter}
               />
            </div>
            <div class="relative mb-10 font-sans text-md text-gray-800">
               <p className="text-3xl md:text-4xl capitalize">
                  {_get(categoryData, "items.emoji.value")}{" "}
                  {_get(categoryData, "items.categoryname.value")}
               </p>

               {this.renderListByCategories(stores)}
            </div>
            <Footer />
         </Fragment>
      );
   }
}
