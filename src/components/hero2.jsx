import Image from "next/image";
import Link from "next/link";

export default function BestTrainersSection() {
    return (
        <section className="py-20 bg-white">
            <div className="container mx-auto px-4 grid md:grid-cols-2 gap-10 items-center relative">
                {/* Left Side - Image */}
                <div className="relative">
                    <div className="relative w-full h-[500px] rounded-xl overflow-hidden">
                        <Image
                            src="/gallery/young-fitness-man-studio.jpg" // Replace with your image path
                            alt="Trainer"
                            fill
                            className="object-cover"
                        />
                    </div>
                    <div className="absolute bottom-6 left-6 bg-rose-500 text-white p-6 rounded-md text-lg font-semibold shadow-lg w-64">
                        Choose your plan and trainer
                    </div>
                </div>

                {/* Right Side - Text Content */}
                <div>
                    <h6 className="uppercase text-sm text-gray-400 mb-2 tracking-wide">
                        Why choose us
                    </h6>
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 leading-snug">
                        Our complex has <br /> the best trainers
                    </h2>
                    <p className="text-gray-500 mb-8">
                        At vero eos et accusamus et iusto odio dignissimos ducimus qui
                        blanditiis praesentium voluptatum deleniti atque.
                    </p>

                    {/* Training Options */}
                    <div className="space-y-4 mb-8">
                        <div className="flex items-start gap-4">
                            <span className="text-red-500 font-bold text-xl">01.</span>
                            <span className="font-semibold text-gray-800">Personal training</span>
                        </div>
                        <div className="flex items-start gap-4">
                            <span className="text-red-500 font-bold text-xl">02.</span>
                            <span className="font-semibold text-gray-800">Group training</span>
                        </div>
                    </div>

                    {/* CTA Button */}
                    <Link
                        href="https://wa.me/971563296585"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block bg-red-400 hover:bg-red-500 text-black font-semibold px-6 py-3 rounded shadow transition duration-300"
                    >
                        Contact US
                    </Link>

                </div>

                {/* Optional yellow design element */}
                <div className="hidden md:block absolute top-0 right-0 w-32 h-32 bg-red-400 rounded-bl-[60%] z-0"></div>
            </div>
        </section>
    );
}
