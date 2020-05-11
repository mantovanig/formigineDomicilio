import SETTINGS from "../settings.json";

export const Footer = () => {
   return (
      <div>
         <p class="text-center mb-8">
            Made by{" "}
            <a
               class="text-blue-500"
               href={SETTINGS.PREACT_APP_DEV_LINK}
               target="_BLANK"
               rel="noopener noreferrer"
            >
               {SETTINGS.PREACT_APP_DEV_NAME}
            </a>
            {" "}with{" "}
            <a
               class="text-blue-500"
               href="https://web.mburger.cloud/"
               target="_BLANK"
               rel="noopener noreferrer"
            >MBruger</a>
         </p>
         {/* <p class="text-center mb-5">
            (forked from
            <a
               class="text-orange-500"
               href={SETTINGS.PREACT_APP_AUTHOR_LINK}
               target="_BLANK"
               rel="noopener noreferrer"
            >
               {" "}{SETTINGS.PREACT_APP_AUTHOR_NAME}
            </a>
            )
         </p> */}
      </div>
   );
};
