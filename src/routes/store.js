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
import AdditionalInfo from "../components/AdditionalInfo";
import Description from "../components/Description";
import Products from "../components/Products";
import Contacts from "../components/Contacts";


// TODO: create a React Context for contentful client istance
const client = createClient({
   space: process.env.PREACT_APP_CF_SPACE,
   accessToken: process.env.PREACT_APP_CF_TOKEN,
});

const Store = ({ id }) => {
   const [loading, setLoading] = useState(true);
   const [error, setError] = useState(false);
   const [data, setData] = useState(null);

   useEffect(() => {
      setLoading(true);
      client
         .getEntry(id)
         .then((entry) => {
            setData(entry);
            setLoading(false);
         })
         .catch(() => setError(true));
   }, [id]);

   // TODO: use placeholder block instead of this loader
   if (loading) {
      return (
         <div class="w-full h-screen flex items-center justify-center">
            <Loader />
         </div>
      );
   }

   // TODO: make a common components for errors
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

   const storeName = _get(data, "fields.name");
   const openingHours = _get(data, "fields.openingHours");
   const shippingCosts = _get(data, "fields.shippingCosts");
   const minimoOrdine = _get(data, "fields.minimoOrdine");
   const website = _get(data, "fields.website");
   const instagram = _get(data, "fields.instagram");
   const facebook = _get(data, "fields.facebook");
   const description = _get(data, "fields.description");
   const products = _get(data, "fields.products");
   const operatorName = _get(data, "fields.operatorName");
   const phone = _get(data, "fields.phone");
   const mail = _get(data, "fields.mail");
   const whatsapp = _get(data, "fields.whatsapp");

   const categoryEmoji = _get(data, "fields.category.fields.emoji");

   return (
      <Fragment>
         <Header />
         <div class="relative pb-8">
            <StoreName name={storeName} categoryEmoji={categoryEmoji} class="mb-8" />
            <div class="mb-6 hidden md:block">
               <Contacts operatorName={operatorName} phone={phone} mail={mail} whatsapp={whatsapp} />
            </div>
            <div class="mb-6">
               <OpeningHours openings={openingHours} />
            </div>
            <div class="mb-6">
               <AdditionalInfo
                  shippingCosts={shippingCosts}
                  minimoOrdine={minimoOrdine}
                  website={website}
                  instagram={instagram}
                  facebook={facebook}
               />
            </div>
            <div class="mb-6">
               <Description description={description} />
            </div>
            <div>
               <Products products={products} />
            </div>
         </div>
         <div class="hidden md:block">
            <Footer />
         </div>
      </Fragment>
   );
};

export default Store;
