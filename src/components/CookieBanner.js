const CookieBanner = ({ onAccept }) => {
   return (
      <div
         class="sticky bottom-0 bg-indigo-100 border-t-4 border-indigo-500 rounded-b text-teal-900 px-4 py-3 shadow-md"
         role="alert"
      >
         <div class="flex items-start max-w-screen-lg mx-auto">
            <div class="py-1">
               <svg
                  class="fill-current h-6 w-6 text-teal-500 mr-4"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
               >
                  <path d="M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zm12.73-1.41A8 8 0 1 0 4.34 4.34a8 8 0 0 0 11.32 11.32zM9 11V9h2v6H9v-4zm0-6h2v2H9V5z" />
               </svg>
            </div>
            <div>
               <p class="font-bold">Informativa</p>
               <p class="text-sm">
                  Questo sito o gli strumenti di terze parti in esso integrati e
                  fanno uso di cookie o altri identificatori necessari per il
                  funzionamento e per il raggiungimento delle finalità descritte
                  nella cookie policy. Dichiari di accettare l’utilizzo di
                  cookie o altri identificatori chiudendo o nascondendo questa
                  informativa, cliccando un link o un pulsante o continuando a
                  navigare in altro modo.
               </p>
               <div class="mt-4">
                  <button
                     class="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
                     onClick={onAccept}
                  >
                     Accetto
                  </button>
               </div>
            </div>
         </div>
      </div>
   );
};

export default CookieBanner;
