import { Fragment } from "preact";
import { useEffect, useState } from "preact/hooks";
import _isEmpty from "lodash.isempty";
import _get from "lodash.get";
import { createClient } from "contentful";

// components
import { Footer } from "../components/Footer";
import { Header } from "../components/Header";
import { Loader } from "../components/Loader";
import StoreName from "../components/StoreName";
import OpeningHours from "../components/OpeningHours";

const client = createClient({
   // This is the space ID. A space is like a project folder in Contentful terms
   space: "mknnjuohw0w8",
   // This is the access token for this space. Normally you get both ID and the token in the Contentful web app
   accessToken: "Ri-sdcK2C2on3VPAGAz6xBEJdUD7RNmC4jaiGoFIcGk",
});

const Store = () => {
   const [loading, setLoading] = useState(true);
   const [error, setError] = useState(false);
   const [data, setData] = useState(null);

   useEffect(() => {
      setLoading(true);
      client
         .getEntry("6NzfxrPjMz3KMdOcppFrH6")
         .then((entry) => {
            setData(entry);
            setLoading(false);
         })
         .catch(() => setError(true));
   }, []);

   if (loading) {
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


   console.log('data', data);
   const storeName = _get(data, 'fields.name');

   return (
      <Fragment>
         <Header />
         <div class="relative mb-10">
            <StoreName name={storeName} />
            <OpeningHours />
         </div>
         <Footer />
      </Fragment>
   );
};

export default Store;
