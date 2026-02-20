import { FaAngleRight, FaRegCheckCircle } from "react-icons/fa";
import Banner from "../../component/ui/banner";
import { features } from "../../utils/constant";
import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
export default function Features() {
  const location = useLocation();

  const { featureId } = location.state || {};
  const featuresRef = useRef({});

  useEffect(() => {
    if (featureId) {
      featuresRef.current[featureId]?.scrollIntoView({
        behaviour: "smooth",
        block: "center",
      });
    }
  }, [featureId]);
  return (
    <div>
      {" "}
      <div className="pt-16 pb-8 px-[5%] lg:px-[10%] flex flex-col justify-center items-center space-y-5 min-h-150  bg-linear-to-b from-green/30 to-green-10 dark:bg-linear-to-br dark:from-deep_green dark:to-deep_orange ">
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
      <div className="px-[5%] lg:px-[10%] flex flex-wrap gap-[15%] justify-center items-center min-h-50 py-6 dark:bg-black bg-white   ">
        <div className="flex flex-wrap gap-4  justify-center">
          {" "}
          {features.map((feature) => (
            <div
              className=" dark:bg-black_card bg-white outline-1 dark:outline-gray-800 outline-white lg:w-100 md:w-2/5 w-full min-h-20  rounded-2xl p-4 space-y-2 shadow-md hover:-translate-y-1 hover:shadow-xl transition-all duration-500 ease-in-out "
              ref={(el) => (featuresRef.current[feature.id] = el)}
            >
              {" "}
              <p className="flex size-10 justify-center items-center bg-green rounded-lg">
                {" "}
                {feature.icon}
              </p>
              <p className="font-semibold dark:text-white">{feature.name}</p>
              <p className="text-sm text-black/80 dark:text-gray-200">
                {feature.description}
              </p>
              {feature.checkpoint.map((point, idx) => (
                <div key={idx} className="flex  h-6 items-center gap-2">
                  <FaRegCheckCircle className="text-green" />
                  <p className="text-sm text-black/80 dark:text-gray-200">
                    {point}
                  </p>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
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
