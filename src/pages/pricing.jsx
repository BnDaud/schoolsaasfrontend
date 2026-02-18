import { IoPricetags } from "react-icons/io5";
import Button from "../component/ui/button";
import Banner from "../component/ui/banner";
import { FaArrowRight, FaRegCheckCircle, FaAngleRight } from "react-icons/fa";
import { schoolPriceTag } from "../utils/constant";
import { RFQ } from "../utils/constant";
export default function Pricing() {
  return (
    <div>
      {/* section 1 */}
      <div className="pt-16 pb-8 px-[5%] lg:px-[10%] flex flex-col justify-center items-center space-y-5 h-100  bg-linear-to-b from-green/30 to-green-10 dark:bg-linear-to-br dark:from-deep_green dark:to-deep_orange ">
        <p className="text-4xl lg:text-6xl lg:w-8/9 md:w-5/7 text-center font-semibold dark:text-white">
          {" "}
          Simple, Transparent{" "}
          <span className="bg-linear-to-r from-green to-amber-300 bg-clip-text text-transparent">
            Pricing
          </span>
        </p>{" "}
        <p className=" lg:w-2/3 md:w-5/7 text-center text-xl dark:text-white/50">
          {" "}
          Choose the plan that fits your school. All plans include a 14-day free
          trial.
        </p>
        <div className="flex gap-3 justify-center items-center h-10  px-4 rounded-full text-green bg-green/10">
          {" "}
          <IoPricetags className="text-xl font-bold" />{" "}
          <p className="text-sm">All plans billed annually</p>
        </div>
      </div>
      {/* section 2 */}
      <div className="pt-16 pb-8 px-[5%] lg:px-[10%] flex flex-wrap gap-4 justify-center dark:bg-black bg-white ">
        {schoolPriceTag.map((detail) => (
          <div
            className={`relative xl:w-3/11 lg:w-5/11 w-11/12 h-150 lg: p-6 rounded-2xl dark:bg-black_card bg-white outline-1    outline-gray-200 space-y-3 shadow-lg hover:-translate-y-1 transition-all ease-in-out duration-700  ${detail.package === "Professional" ? "outline-green dark:outine-green " : "hover:outline-green dark:outline-gray-800 "}`}
          >
            {detail.package === "Professional" ? (
              <p className="absolute -top-4 left-1/2 -translate-x-1/2 flex items-center justify-center font-bold dark:text-black  text-white bg-green w-max px-4 h-8 rounded-full">
                {" "}
                Most Popular
              </p>
            ) : (
              ""
            )}
            <p className="text-center font-bold text-2xl dark:text-white text-black mt-3">
              {detail.package}
            </p>
            <p className="text-center text-sm  dark:text-gray-300 text-gray-600">
              {detail.for}
            </p>{" "}
            <p className="text-center font-bold text-5xl dark:text-white text-black">
              {detail.price}
              <span className="text-center font-bold text-sm  dark:text-gray-300 text-gray-600">
                {" "}
                /student/year
              </span>
            </p>
            <div className="mt-5 space-y-2">
              {detail.benefits.map((point, idx) => (
                <div key={idx} className="flex  h-6 items-center gap-2">
                  <FaRegCheckCircle className="text-green" />
                  <p className="text-sm text-black dark:text-white">{point}</p>
                </div>
              ))}{" "}
            </div>
            <div className="absolute bottom-5 left-1/2 -translate-x-1/2  w-2/3">
              <Button
                name={"Start Free Trial"}
                icon={<FaAngleRight className="text-sm" />}
                style={`flex gap-4 h-max w-full mt-6 justify-center items-center  text-sm font-bold   px-6 py-3 rounded-xl cursor-pointer hover:text-black  ${detail.package === "Professional" ? "bg-green dark:text-black text-white hover:scale-x-105 shadow-green hover:shadow-[0_4px_20px_-4px_rgba(0,0,0,0.2)] transition-all ease-in-out duration-500" : "dark:bg-black hover:bg-amber-600 dark:outline-gray-700 outline outline-gray-300 dark:text-white text-black "} `}
                href={"/signup"}
              />
            </div>
          </div>
        ))}
      </div>

      {/* section 3 */}
      <div className="px-[5%] lg:px-[10%] dark:bg-black_bg bg-white_bg min-h-50 py-20 space-y-10">
        {" "}
        <p className="text-3xl text-center font-bold dark:text-white ">
          {" "}
          Frequently Asked Questions
        </p>
        <p className="text-center dark:text-white/60 text-black/50 capitalize">
          Got questions? We've got answers.
        </p>
        <div className="flex flex-wrap gap-4   justify-center">
          {" "}
          {RFQ.map((r) => (
            <div className=" dark:bg-black_card bg-white outline-1 dark:outline-gray-800 outline-white lg:w-100 md:w-2/5 w-full min-h-25  rounded-2xl p-4 space-y-4 shadow-md ">
              <p className="font-bold text-black dark:text-white text-lg">
                {" "}
                "{r.question}"
              </p>{" "}
              <p className=" italic dark:text-gray-200 text-gray-700  ">
                {r.answer}
              </p>{" "}
            </div>
          ))}
        </div>
      </div>

      {/* section 4 */}
      <div>
        <Banner
          boxStyle={
            "flex justify-center items-center dark:bg-black bg-white  w-full min-h-40 "
          }
          text1Style={
            "dark:text-white text-black font-[1000] tracking-wide text-3xl text-center"
          }
          text2Style={
            "dark:text-white/60 text-gray-700  text-center text-lg tracking-wider  "
          }
          text1={"Still have questions?"}
          text2={
            "Our team is here to help. Get in touch and we'll respond within 24 hours."
          }
          Buttons={[
            {
              name: "Contact Sales",
              icon: <FaArrowRight className="text-xs" />,
              style:
                "flex gap-4 h-max w-max items-center  font-bold dark:text-black text-white bg-green  px-6 py-3 rounded-lg cursor-pointer hover:scale-x-105   shadow-green hover:shadow-[0_4px_20px_-4px_rgba(0,0,0,0.2)] transition-all ease-in-out duration-500",
              href: "/features",
            },
          ]}
        />
      </div>
    </div>
  );
}
