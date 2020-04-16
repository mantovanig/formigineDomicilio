const Description = ({ description }) => {
   return (
      <div>
         <h3 class="font-sans text-xl font-medium mb-2">Cosa facciamo</h3>
         {description.split("\n").map((item, i) => (
            <p key={i} class="text-sm text-gray-600">{item}</p>
         ))}
      </div>
   );
};

export default Description;
