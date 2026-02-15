import { TbPointFilled, TbWorld } from "react-icons/tb";
import { CiClock2, CiMobile1 } from "react-icons/ci";
import { FaAngleRight, FaRegCheckCircle } from "react-icons/fa";
import { GiHistogram } from "react-icons/gi";
import { MdOutlineShield } from "react-icons/md";
import { AppName } from "../utils/constant";
import Banner from "../component/ui/banner";
import Button from "../component/ui/button";
import { features } from "../utils/constant";

export default function Home() {
  const achivement = [
    {
      score: "500 +",
      title: "Schools",
    },
    {
      score: "100K +",
      title: "Students",
    },
    {
      score: "1M + ",
      title: "Exams Taken",
    },
    {
      score: "99.9 %",
      title: "Uptime",
    },
  ];

  const reviews = [
    {
      comment:
        "Mat Learn has transformed how we conduct exams. We reduced exam costs by 60% and get results instantly.",
      image:
        "https://img.freepik.com/free-photo/medium-shot-senior-black-woman-posing_23-2150247840.jpg",
      name: "Mrs. Adaeze Okafor",
      position: "Principal, Unity Secondary School",
    },
    {
      comment:
        "The platform is so easy to use. Even teachers with limited tech skills can create exams quickly.",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQpdhHqogRyUWTH_RBowB7Smb1df49h7snWPg&s",
      name: "Mr. Ibrahim Yusuf",
      position: "ICT Coordinator, Federal Government College",
    },
    ,
    {
      comment:
        "Managing multiple branches is seamless. We can monitor all exams from a single dashboard.",
      image:
        "https://i0.wp.com/norrenberger.com/wp-content/uploads/2024/10/OPY_1637-Edit-Edit.jpg?resize=500%2C500&ssl=1",
      name: "Dr. Chidi Nnaji",
      position: "Director, Bright Future Schools",
    },
  ];

  return (
    <div>
      <div className="pt-16 pb-8 px-[5%] lg:px-[10%] flex flex-col justify-center items-center space-y-5 min-h-150  bg-linear-to-b from-green/30 to-green-10 dark:bg-linear-to-br dark:from-deep_green dark:to-deep_orange ">
        <div className="flex gap-2 justify-center items-center h-10  px-4 rounded-full text-green bg-green/10">
          {" "}
          <TbPointFilled className="text-xl font-bold" />{" "}
          <p className="text-sm">Trusted by 500+ Nigerian Schools</p>
        </div>
        <p className="text-4xl lg:text-6xl lg:w-8/9 md:w-5/7 text-center font-semibold dark:text-white">
          {" "}
          Modern CBT Platform for <span className="text-green">
            African
          </span>{" "}
          <span className="bg-linear-to-r from-green to-amber-300 bg-clip-text text-transparent">
            Schools
          </span>
        </p>{" "}
        <p className=" lg:w-2/3 md:w-5/7 text-center  dark:text-white/50">
          {" "}
          Conduct secure, efficient computer-based tests. Reduce exam costs, get
          instant results, and track student performance across your school or
          network of schools.
        </p>
        <div className="lg:flex lg:gap-8 lg:justify-center items-center lg:h-15  space-y-5 lg:space-y-0">
          {" "}
          <div>
            {" "}
            <Button
              style={
                "flex items-center justify-center gap-2 text-white font-bold dark:text-black h-12 px-4 text-center bg-green rounded-xl  transition-all  hover:scale-x-104 hover:shadow-2xl shadow:xl  shadow-green cursor-pointer "
              }
              name={"Start Free Trials"}
              icon={<FaAngleRight className="text-sm" />}
              href={"/login"}
            />
          </div>
          <div>
            {" "}
            <Button
              style={
                "flex items-center justify-center h-12 w-40 hover:bg-green hover:text-black text-green outline-2 outline-green rounded-xl  font-bold cursor-pointer  "
              }
              name={"Watch Demo"}
              href={"/signup"}
            />
          </div>
        </div>
        <p className="dark:text-white/50 text-center">
          No credit card required • 14-day free trial • Cancel anytime
        </p>
      </div>

      {/* section 2 */}
      <div className="px-[5%] lg:px-[10%] dark:bg-black_bg bg-white_bg min-h-50 py-20 space-y-3">
        {" "}
        <p className="text-3xl text-center font-bold dark:text-white ">
          {" "}
          Everthing You Need
        </p>
        <p className="text-center dark:text-white/60 text-black/50 capitalize">
          Built specifically for Nigerian and African schools , Simple ,
          Powerful and affordable{" "}
        </p>
        <div className="flex flex-wrap gap-4  justify-center">
          {" "}
          {features.slice(1, 7).map((feature) => (
            <div className=" dark:bg-black_card bg-white outline-1 dark:outline-gray-800 outline-white lg:w-100 md:w-2/5 w-full min-h-20  rounded-2xl p-4 space-y-2 shadow-md hover:-translate-y-1 hover:shadow-xl transition-all duration-500 ease-in-out cursor-pointer">
              {" "}
              <p className="flex size-10 justify-center items-center bg-green rounded-lg">
                {" "}
                {feature.icon}
              </p>
              <p className="font-semibold dark:text-white">{feature.name}</p>
              <p className="text-sm text-black/80 dark:text-gray-200">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
      {/* Section 3 */}
      <div className="px-[5%] lg:px-[10%] flex flex-wrap gap-[15%] justify-center items-center h-50 py-6 dark:bg-black bg-white   ">
        {achivement.map((a) => (
          <div className="text-center space-y-2">
            <p className="text-3xl font-bold bg-linear-to-r from-green to-amber-200/50 bg-clip-text text-transparent">
              {a.score}
            </p>
            <p className="dark:text-white_bg/60 text-gray-500">{a.title}</p>
          </div>
        ))}
      </div>
      {/* Section 4 */}
      <div className="px-[5%] lg:px-[10%] dark:bg-black_bg bg-white_bg min-h-50 py-20 space-y-10">
        {" "}
        <p className="text-3xl text-center font-bold dark:text-white ">
          {" "}
          Loved by Educators
        </p>
        <p className="text-center dark:text-white/60 text-black/50 capitalize">
          See what school administrators and teachers are saying about {AppName}
        </p>
        <div className="flex flex-wrap gap-4   justify-center">
          {" "}
          {reviews.map((review) => (
            <div className=" dark:bg-black_card bg-white outline-1 dark:outline-gray-800 dark:text-white/60 text-black/50 outline-white lg:w-100 md:w-2/5 w-full min-h-20  rounded-2xl p-4 space-y-4 shadow-md ">
              <p className="italic"> "{review.comment}"</p>
              <div className="flex gap-4 h-13 items-center">
                {" "}
                <img src={review.image} className="size-15 rounded-full" />
                <div>
                  <p className="text-sm font-bold dark:text-white text-black ">
                    {review.name}
                  </p>{" "}
                  <p className="text-sm ">{review.position}</p>{" "}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Section 5  banner*/}

      <div className="px-[5%] lg:px-[10%] py-20 dark:bg-black bg-white w-full">
        <Banner
          boxStyle={
            "flex justify-center items-center bg-green rounded-3xl w-full min-h-40 "
          }
          text1Style={
            "dark:text-black text-white font-[1000] tracking-wide text-3xl text-center"
          }
          text2Style={
            "dark:text-black/60 text-gray-100  text-center text-lg tracking-wider  "
          }
          text1={"Ready To Transform Your School's Exams?"}
          text2={
            "Join hundreds of Nigerian schools already using Mat Learn. Start your free trial today and see results within days."
          }
          Buttons={[
            {
              name: "Start Free Trial",
              icon: <FaAngleRight className="text-sm" />,
              style:
                "flex gap-4 h-max w-max items-center  text-lg font-bold dark:text-white text-black bg-white dark:bg-black px-6 py-3 rounded-lg cursor-pointer hover:bg-white/90 dark:hover:bg-black/90",
              href: "/features",
            },
            {
              name: "Talk to Sales",

              style:
                "flex gap-4 h-max w-max items-center  text-lg font-bold dark:text-black text-white bg-black dark:bg-white px-6 py-3 rounded-lg cursor-pointer hover:bg-black/80 dark:hover:bg-white/90",
              href: "/features",
            },
          ]}
        />
      </div>
    </div>
  );
}
