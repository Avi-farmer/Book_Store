

const AboutImg = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row items-center">
        {/* Image Section */}
        <div className="md:w-1/2 mb-4 md:mb-0">
          {/* Replace with your image */}
          <img
            src="/path/to/your/image1.jpg" 
            alt="About Us Image 1"
            className="rounded-lg shadow-lg w-full h-auto"
          />
        </div>

        {/* Content Section */}
        <div className="md:w-1/2 md:pl-8">
          <h2 className="text-3xl font-bold mb-4">About Our Website</h2>
          <p className="text-gray-700 mb-4">
            {/* Replace with your about content */}
            Welcome to our website! We are dedicated to providing you with the best experience. 
            Our mission is to... [Add your detailed description here]
          </p>
          <p className="text-gray-700">
            {/* Add more content if needed */}
            Feel free to explore our site and learn more about what we offer.
          </p>
        </div>
      </div>

      {/* Optional: Add another image or section */}
      <div className="mt-8">
         {/* Replace with your image */}
         {/*
         <img
           src="/path/to/your/image2.jpg" 
           alt="About Us Image 2"
           className="rounded-lg shadow-lg w-full h-auto"
         />
         */}
      </div>
    </div>
  );
};

export default AboutImg;
