import { Fragment } from "preact";
import _isEmpty from "lodash.isempty";
import _get from "lodash.get";
import { useParams } from "react-router-dom";
import useSWR from "swr";

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

const Store = () => {
   const { id } = useParams();
   const { data, error } = useSWR(() => `${process.env.PREACT_APP_MB_URL}/sections/${id}/elements?skip=0&sort=id&take=30`);
   const { data: productsData } = useSWR(() => `${process.env.PREACT_APP_MB_URL}/blocks/774/sections?include=elements&sort=order&filter[value]=store|${id}&skip=0&take=30`);

   const categoryId = _get(data, 'items.category.value.section_id');
   const { data: categoryData } = useSWR(() => `${process.env.PREACT_APP_MB_URL}/sections/${categoryId}/elements?skip=0&sort=id&take=30`);

   // TODO: use placeholder block instead of this loader
   if (!data) {
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

   const storeName = _get(data, "items.name.value");
   const openingHours = _get(data, "items.openinghours.value");
   const shippingCosts = _get(data, "items.shippingcosts.value");
   const minimoOrdine = _get(data, "items.minimoordine.value");
   const website = _get(data, "items.website.value");
   const instagram = _get(data, "items.instagram.value");
   const facebook = _get(data, "items.facebook.value");
   const description = _get(data, "items.description.value");
   const operatorName = _get(data, "items.operatorname.value");
   const phone = _get(data, "items.phone.value");
   const mail = _get(data, "items.mail.value");
   const whatsapp = _get(data, "items.whatsapp.value");

   const categoryEmoji = _get(categoryData, "items.emoji.value");

   const products = _get(productsData, "items", []).map((p) => ({
      id: _get(p, "id"),
      url: _get(p, "elements.immagine.value[0].url"),
      title: _get(p, "elements.name.value"),
   }));

   return (
      <Fragment>
         <Header />
         <div class="relative pb-8">
            <StoreName
               name={storeName}
               categoryEmoji={categoryEmoji}
               class="mb-8"
            />
            <div class="mb-6 hidden md:block">
               <Contacts
                  operatorName={operatorName}
                  phone={phone}
                  mail={mail}
                  whatsapp={whatsapp}
               />
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
            <div><Products products={products} /></div>
         </div>
         <div class="block">
            <Footer />
         </div>
      </Fragment>
   );
};

export default Store;
