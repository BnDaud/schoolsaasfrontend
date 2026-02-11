import { FaAngleRight, FaRegCheckCircle } from "react-icons/fa";
import Banner from "../component/ui/banner";

export default function Features() {
  return (
    <div>
      {" "}
      <div className="pt-16 px-[5%] lg:px-[10%] flex flex-col justify-center items-center space-y-5 min-h-150  bg-linear-to-b from-green/30 to-green-10 dark:bg-linear-to-br dark:from-deep_green dark:to-deep_orange ">
        <p className="text-4xl lg:text-6xl lg:w-8/9 md:w-5/7 text-center font-semibold dark:text-white">
          {" "}
          Powerful Features for <span className="text-green">Modern</span>{" "}
          <span className="bg-linear-to-r from-green to-amber-300 bg-clip-text text-transparent">
            Education
          </span>
        </p>{" "}
        <p className=" lg:w-2/3 md:w-5/7 text-center text-2xl dark:text-white/50">
          Everything you need to conduct secure, efficient computer-based tests.
          Built specifically for African schools.
        </p>
      </div>
      {/* Section 2 */}
      <div className="px-[5%] lg:px-[10%] flex flex-wrap gap-[15%] justify-center items-center h-50 py-6 dark:bg-black bg-white   "></div>
      {/* section 3*/}
      <div className="px-[5%] lg:px-[10%] py-20 dark:bg-black_bg bg-white_bg w-full">
        <Banner
          boxStyle={
            "flex justify-center items-center bg-green rounded-3xl w-full min-h-40 "
          }
          text1Style={
            "dark:text-black text-white font-[1000] tracking-wide text-3xl text-center"
          }
          text2Style={
            "dark:text-black/60 text-gray-100  text-center text-2xl tracking-wider  "
          }
          text1={"Ready To Get Started?"}
          text2={"Start your 14-day free trial today. No credit card required."}
          Buttons={[
            {
              name: "Start Free Trial",
              icon: <FaAngleRight className="text-sm" />,
              style:
                "flex gap-4 h-max w-max items-center  text-lg font-bold dark:text-white text-black bg-white dark:bg-black px-6 py-3 rounded-lg cursor-pointer hover:bg-white/90 dark:hover:bg-black/90",
              href: "/",
            },
          ]}
        />
      </div>
    </div>
  );
}
