import { contactDetails, AppName, whyContactUs } from "../../utils/constant";
import Button from "../../component/ui/button";
import { FaTelegramPlane } from "react-icons/fa";
export default function Contact() {
  return (
    <div>
      {" "}
      <div className="pt-16 pb-8 px-[5%] lg:px-[10%] flex flex-col justify-center items-center space-y-5 h-100  bg-linear-to-b from-green/30 to-green-10 dark:bg-linear-to-br dark:from-deep_green dark:to-deep_orange ">
        <p className="text-4xl lg:text-6xl lg:w-8/9 md:w-5/7 text-center font-semibold dark:text-white">
          {" "}
          Get in
          <span className="bg-linear-to-r from-green to-amber-300 bg-clip-text text-transparent">
            Touch
          </span>
        </p>{" "}
        <p className=" lg:w-2/3 md:w-5/7 text-center text-xl dark:text-white/50">
          {" "}
          Have questions? We'd love to hear from you. Send us a message and
          we'll respond as soon as possible.
        </p>
      </div>
      {/* Section 2 */}
      <div className="px-[5%] lg:px-[10%] py-10 flex flex-col gap-4 min-h-50 items-center justify-center bg-white dark:bg-black space-y-3">
        <div className=" w-full lg:w-[90%] space-y-3">
          <div className="flex flex-wrap gap-5  justify-center">
            {contactDetails.map((item) => (
              <div className="flex flex-col items-center justify-center md:size-65 w-full h-60 px-4 rounded-2xl dark:bg-black_card bg-white outline-1 dark:outline-gray-800 dark:text-white/60 text-black/50 outline-gray-200 space-y-5 shadow-lg hover:-translate-y-1 transition-all ease-in-out duration-700 hover:shadow-2xl ">
                <p className="flex items-center justify-center rounded-2xl bg-green/20 size-15">
                  {" "}
                  {item.icon}
                </p>
                <p className="font-bold text-lg dark:text-white text-black">
                  {item.title}
                </p>
                <p className="dark:text-gray-300  text-gray-700 text-center">
                  {" "}
                  {item.description}
                </p>
                <p className="text-green font-bold text-xl text-center truncate md:w-8/9">
                  {" "}
                  {item.contact}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* Section 3  */}
      <div className="p-16 px-[5%] lg:px-[10%] xl:flex gap-5  justify-center items-stretch min-h-100 bg-white_bg dark:bg-black space-y-10">
        {" "}
        <div className=" space-y-5 dark:text-gray-300 text-gray-700 w-full lg:w-5/12 bg-white dark:bg-black_bg min-h-100 p-10 rounded-2xl shadow-lg ">
          <p className="text-2xl font-bold dark:text-white text-black">
            Send us a message
          </p>{" "}
          <form className="mt-5 space-y-4 text-black dark:text-white">
            <div className="md:flex justify-between space-y-4">
              <div className="flex flex-col md:w-[48%] w-full dark:text-white ">
                {" "}
                <label className="font-bold mb-2">
                  {" "}
                  Full Name <span>*</span>
                </label>
                <input
                  className="px-4 py-1 text-sm text-black dark:text-white font-semibold rounded-xl h-10 border dark:border-gray-800 border-gray-200 bg-white_bg dark:bg-black hover:border-transparent focus:outline-none focus:ring-2 focus:ring-green focus:ring-offset-2"
                  placeholder="Your Full Name"
                  type="text"
                />
              </div>{" "}
              <div className="flex flex-col md:w-[48%] w-full font-bold dark:text-white ">
                {" "}
                <label className="mb-2">
                  {" "}
                  Email Address <span>*</span>
                </label>
                <input
                  className="px-4 py-1 text-sm text-black dark:text-white font-semibold rounded-xl h-10 border border-gray-200 dark:border-gray-800 bg-white_bg dark:bg-black hover:border-transparent focus:outline-none focus:ring-2 focus:ring-green focus:ring-offset-2"
                  placeholder="you@email.com"
                  type="email"
                />
              </div>{" "}
            </div>{" "}
            <div className="md:flex justify-between space-y-4 pt-4 md:pt-0">
              <div className="flex flex-col md:w-[48%] w-full dark:text-white ">
                {" "}
                <label className="font-bold mb-2"> Phone Number</label>
                <input
                  className="px-4 py-1 text-sm text-black dark:text-white font-semibold rounded-xl h-10 border border-gray-200 dark:border-gray-800 bg-white_bg dark:bg-black hover:border-transparent focus:outline-none focus:ring-2 focus:ring-green focus:ring-offset-2"
                  placeholder="+234 xxx xxx xxxx"
                  type="text"
                />
              </div>{" "}
              <div className="flex flex-col md:w-[48%] w-full font-bold dark:text-white ">
                {" "}
                <label className="mb-2"> School/Organization</label>
                <input
                  className="px-4 py-1 text-sm text-black dark:text-white font-semibold rounded-xl h-10 border border-gray-200 dark:border-gray-800 bg-white_bg dark:bg-black hover:border-transparent focus:outline-none focus:ring-2 focus:ring-green focus:ring-offset-2"
                  placeholder="Your School Name "
                  type="text"
                />
              </div>{" "}
            </div>{" "}
            <div className=" ">
              {" "}
              <label className="font-bold ">I need help with *</label>
              <select className="px-4 py-1 my-2 text-sm w-full text-black dark:text-white font-semibold rounded-xl h-10 border border-gray-200 dark:border-gray-800 bg-white_bg dark:bg-black hover:border-transparent focus:outline-none focus:ring-2 focus:ring-green focus:ring-offset-2">
                {" "}
                <option>General Inquiry</option>{" "}
                <option>Sales - Pricing & Plans</option>{" "}
                <option>Support - Technical Help</option>
                <option>Partnerships - Collaboration</option>{" "}
              </select>
            </div>
            <div className=" ">
              {" "}
              <label className="font-bold ">Message *</label>
              <textarea
                className="px-4 py-3 my-2 text-sm w-full text-black dark:text-white font-semibold rounded-xl h-30 border border-gray-200 dark:border-gray-800 bg-white_bg dark:bg-black hover:border-transparent focus:outline-none focus:ring-2 focus:ring-green focus:ring-offset-2"
                placeholder="Tell us how we can help you..."
              ></textarea>
            </div>
            <Button
              name={"Send Message"}
              icon={<FaTelegramPlane />}
              style={
                "flex gap-2 min-h-10  w-full items-center justify-center text-lg font-bold bg-green dark:text-black text-white py-2 rounded-xl cursor-pointer hover:scale-x-105 transition-all ease-in-out duration-500 outline-1 hover:shadow-xl outline-gray-300 dark:outline-gray-800"
              }
              href={"/features"}
            />
          </form>
        </div>
        <div className="space-y-5 s w-full lg:w-5/12  min-h-100 p-10">
          <p className="text-2xl font-bold dark:text-white text-black">
            {" "}
            Why Contact Us?
          </p>

          <div className="space-y-3">
            {whyContactUs.map((p) => (
              <div className="flex gap-4 min-h-10 items-start">
                {" "}
                <div>
                  {" "}
                  <p className="flex items-center justify-center rounded-xl bg-green/20 size-10 ">
                    {p.icon}
                  </p>{" "}
                </div>
                <div>
                  <p className="font-bold text-lg dark:text-white ">{p.name}</p>{" "}
                  <p className="text-gray-800 dark:text-gray-300">
                    {" "}
                    {p.comment}
                  </p>
                </div>
              </div>
            ))}{" "}
          </div>
          <div className="p-5 bg-white dark:bg-black_bg rounded-xl min-h-20 space-y-2 lg:mt-2 shadow-lg">
            {" "}
            <p className="mb-3 text-lg font-bold dark:text-white text-black">
              {" "}
              Office Hours
            </p>
            <div className="flex justify-between">
              <p className="text-gray-800 dark:text-gray-300">
                {" "}
                Monday - Friday
              </p>{" "}
              <p className="text-black dark:text-white font-semibold">
                {" "}
                8:00 AM - 6:00 PM WAT
              </p>
            </div>{" "}
            <div className="flex justify-between">
              <p className="text-gray-800 dark:text-gray-300"> Saturday</p>{" "}
              <p className="text-black dark:text-white font-semibold">
                {" "}
                9:00 AM - 1:00 PM WAT
              </p>
            </div>{" "}
            <div className="flex justify-between">
              <p className="text-gray-800 dark:text-gray-300"> Sunday</p>{" "}
              <p className="text-black dark:text-white font-semibold">
                {" "}
                Closed
              </p>
            </div>
          </div>
          <div className="p-5 bg-white dark:bg-black_bg rounded-xl min-h-40 space-y-5 lg:mt-2 shadow-lg">
            {" "}
            <p className=" text-lg font-bold dark:text-white text-black">
              {" "}
              Looking to partner with us?
            </p>{" "}
            <p className="text-gray-800 dark:text-gray-300">
              {" "}
              We're always looking to collaborate with educational institutions,
              NGOs, and government agencies.
            </p>
            <Button
              name={"Partnership Inquiry"}
              icon={""}
              style={
                "flex  h-max w-full items-center justify-center text-lg font-bold dark:text-white text-black bg-white_bg dark:bg-black  py-2 rounded-xl cursor-pointer hover:bg-amber-500 outline-1 outline-gray-300 dark:outline-gray-800"
              }
              href={"/features"}
            />
          </div>
        </div>
      </div>{" "}
    </div>
  );
}
