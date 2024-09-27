const About = () => {
  return (
    <div>
      {/* Sección superior con imagen y texto */}
      <div className="flex justify-center items-center min-h-[50vh] bg-gray-100 p-10 mt-0 space-x-4">
        <div className="text-left lg:w-2/5">
          <h1 className="text-4xl font-bold mb-4">Teenvent</h1>
          <p className="text-lg">
            TeenVent is a mental health and wellness app that delivers services
            and resources meant to improve the quality of life for those dealing
            with mental and emotional health struggles.
          </p>
        </div>

        <div>
          <img
            src="/images/teenvent1.png"
            alt="Teenvent Image"
            className="w-80 h-auto rounded-full shadow-lg"
          />
        </div>
      </div>

      {/* Línea divisoria */}
      <div className="my-8 border-t border-gray-200"></div>

      {/* Nueva sección con el título "Our purpose" */}
      <div className="bg-gray-100 p-10">
        <h1 className="text-4xl font-bold mb-4 text-center">Our purpose</h1>
        <p className="text-lg text-center">
          TeenVent provides Gamified Stress Management, Parent/Guardian
          Educational resources, and Mood and Progress Tracking for teens
          dealing with mental and emotional health struggles.
        </p>
      </div>

      <div className="flex justify-center">
        <img
          src="/images/teenvent2.jpg"
          alt="Teenvent Image"
          className="mx-auto w-96 h-96 object-cover rounded-full shadow-lg"
        />
      </div>
    </div>
  );
};

export default About;
