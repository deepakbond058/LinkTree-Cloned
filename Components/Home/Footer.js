import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 py-10">
      {/* Container */}
      <div className="container mx-auto px-6">
        {/* About Section */}
        <div className="space-y-4">
          <h2 className="text-white text-lg font-semibold">About LinkTree</h2>
          <p className="text-sm">
            LinkTree makes it simple to unify your online presence. Share links,
            grow your audience, and engage with your community—all in one place.
          </p>
        </div>
        {/* Divider */}
        <div className="my-8 border-t border-gray-700"></div>

        {/* Bottom Section */}
        <div className="flex flex-col gap-5 md:flex-row justify-between items-center text-sm">
          <p>
            &copy; {new Date().getFullYear()} LinkTree. All rights reserved.
          </p>
          <div className="flex gap-5 items-center">
            <p className="text-xl">Made With <span className="text-2xl">❤️</span> By <Link href="https://github.com/deepakbond058" className="hover:underline cursor-pointer">Deepak Singh</Link></p>
            <Link href="https://github.com/deepakbond058" target="_blank">     
            <svg
              
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 30 30"
              className="fill-white h-10 w-10"
            >
              <path d="M15,3C8.373,3,3,8.373,3,15c0,5.623,3.872,10.328,9.092,11.63C12.036,26.468,12,26.28,12,26.047v-2.051 c-0.487,0-1.303,0-1.508,0c-0.821,0-1.551-0.353-1.905-1.009c-0.393-0.729-0.461-1.844-1.435-2.526 c-0.289-0.227-0.069-0.486,0.264-0.451c0.615,0.174,1.125,0.596,1.605,1.222c0.478,0.627,0.703,0.769,1.596,0.769 c0.433,0,1.081-0.025,1.691-0.121c0.328-0.833,0.895-1.6,1.588-1.962c-3.996-0.411-5.903-2.399-5.903-5.098 c0-1.162,0.495-2.286,1.336-3.233C9.053,10.647,8.706,8.73,9.435,8c1.798,0,2.885,1.166,3.146,1.481C13.477,9.174,14.461,9,15.495,9 c1.036,0,2.024,0.174,2.922,0.483C18.675,9.17,19.763,8,21.565,8c0.732,0.731,0.381,2.656,0.102,3.594 c0.836,0.945,1.328,2.066,1.328,3.226c0,2.697-1.904,4.684-5.894,5.097C18.199,20.49,19,22.1,19,23.313v2.734 c0,0.104-0.023,0.179-0.035,0.268C23.641,24.676,27,20.236,27,15C27,8.373,21.627,3,15,3z"></path>
            </svg>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
