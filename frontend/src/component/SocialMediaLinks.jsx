import React from 'react';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from 'react-icons/fa';

const SocialMediaLinks = () => {
  return (
    <div className="social-media-links text-center mt-10">
      {/* <h2 className="text-2xl font-bold text-gray-800 mb-4">Follow Us</h2> */}
      <div className="flex justify-center space-x-6">
        <a
          href="https://www.facebook.com"
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-500 hover:text-blue-600 transition-colors duration-300"
          aria-label="Facebook"
        >
          <FaFacebookF size={24} />
        </a>
        <a
          href="https://www.twitter.com"
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-500 hover:text-blue-400 transition-colors duration-300"
          aria-label="Twitter"
        >
          <FaTwitter size={24} />
        </a>
        <a
          href="https://www.instagram.com"
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-500 hover:text-pink-600 transition-colors duration-300"
          aria-label="Instagram"
        >
          <FaInstagram size={24} />
        </a>
        <a
          href="https://www.linkedin.com"
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-500 hover:text-blue-800 transition-colors duration-300"
          aria-label="LinkedIn"
        >
          <FaLinkedinIn size={24} />
        </a>
      </div>
    </div>
  );
};

export default SocialMediaLinks;
