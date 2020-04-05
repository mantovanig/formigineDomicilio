import SETTINGS from '../settings.json';

export const Footer = () => {
   return (
      <div>
         <p class="mb-5 text-center">
            Developed with ❤️ by{" "}
            <a
               class="text-orange-500"
               href={SETTINGS.PREACT_APP_DEV_LINK}
               target="_BLANK"
               rel="noopener noreferrer"
            >
               {SETTINGS.PREACT_APP_DEV_NAME}
            </a>
            <span> - </span>
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
         </p>
      </div>
   );
};
