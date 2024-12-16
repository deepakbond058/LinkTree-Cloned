import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 py-10">
      {/* Container */}
      <div className="container mx-auto px-6">
          {/* About Section */}
          <div className="space-y-4">
            <h2 className="text-white text-lg font-semibold">About LinkTree</h2>
            <p className="text-sm">
              LinkTree makes it simple to unify your online presence. Share links, grow your audience, and engage with your community—all in one place.
            </p>
          </div>
        {/* Divider */}
        <div className="my-8 border-t border-gray-700"></div>

        {/* Bottom Section */}
        <div className="flex flex-col gap-5 md:flex-row justify-between items-center text-sm">
          <p>&copy; {new Date().getFullYear()} LinkTree. All rights reserved.</p>
          <div className="flex gap-5">
            <div className="hover:text-white cursor-pointer">
              Privacy Policy
            </div>
            <div className="hover:text-white cursor-pointer">
              Terms of Service
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
