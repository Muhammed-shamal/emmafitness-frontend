import { FaDumbbell, FaSwimmingPool } from "react-icons/fa";
import { GiMuscleUp, GiMeal } from "react-icons/gi";

const features = [
  {
    title: "Best equipment",
    description: "Consectetur adipiscing elit, sed do eiusmod tempo.",
    icon: <FaDumbbell className="text-red-500 text-4xl mb-4" />,
  },
  {
    title: "Training plan",
    description: "Consectetur adipiscing elit, sed do eiusmod tempo.",
    icon: <GiMuscleUp className="text-red-500 text-4xl mb-4" />,
  },
  {
    title: "Nutrition plan",
    description: "Consectetur adipiscing elit, sed do eiusmod tempo.",
    icon: <GiMeal className="text-red-500 text-4xl mb-4" />,
  },
  {
    title: "Swimming pool",
    description: "Consectetur adipiscing elit, sed do eiusmod tempo.",
    icon: <FaSwimmingPool className="text-red-500 text-4xl mb-4" />,
  },
];

export default function HeroServicesSection() {
  return (
    <section className="bg-black text-white py-20">
      <div className="container mx-auto px-4 text-center">
        <h5 className="text-sm uppercase text-gray-400 tracking-widest mb-4">
          What we offer
        </h5>
        <h2 className="text-3xl md:text-5xl font-bold mb-10">
          Achieve amazing results <br className="hidden md:block" /> with our services
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 mt-10">
          {features.map((feature, index) => (
            <div key={index} className="flex flex-col items-center text-center">
              {feature.icon}
              <h3 className="font-semibold text-lg text-white mb-2">{feature.title}</h3>
              <p className="text-gray-400 text-sm">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
