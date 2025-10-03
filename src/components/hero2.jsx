import Image from "next/image";
import Link from "next/link";
import basicData from "../utility/basicDatas";

export default function BestTrainersSection() {
   return (
    <section className="py-24 bg-gradient-to-br from-white to-gray-50 relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-40 h-40 bg-red-400/20 rounded-full -translate-y-1/2 translate-x-1/2"></div>
        <div className="absolute bottom-10 left-10 w-24 h-24 bg-red-400/10 rounded-full"></div>
        
        <div className="container mx-auto px-4 grid md:grid-cols-2 gap-16 items-center relative z-10">
            {/* Left Side - Content */}
            <div className="space-y-8">
                <div>
                    <h6 className="uppercase text-sm text-red-500 mb-2 tracking-wider font-semibold">
                        Why choose us
                    </h6>
                    <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                        Our complex has <br />
                        <span className="text-red-500">the best trainers</span>
                    </h2>
                    <p className="text-gray-600 text-lg leading-relaxed">
                        At vero eos et accusamus et iusto odio dignissimos ducimus qui
                        blanditiis praesentium voluptatum deleniti atque corrupti quos
                        dolores et quas molestias excepturi.
                    </p>
                </div>

                {/* Training Options */}
                <div className="space-y-6">
                    <div className="flex items-start gap-5 p-4 rounded-xl bg-white shadow-sm hover:shadow-md transition-all duration-300">
                        <div className="flex-shrink-0 w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                            <span className="text-red-500 font-bold text-lg">01</span>
                        </div>
                        <div>
                            <h3 className="font-bold text-gray-800 text-lg">Personal training</h3>
                            <p className="text-gray-500 mt-1">Customized workouts tailored to your specific goals</p>
                        </div>
                    </div>
                    <div className="flex items-start gap-5 p-4 rounded-xl bg-white shadow-sm hover:shadow-md transition-all duration-300">
                        <div className="flex-shrink-0 w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                            <span className="text-red-500 font-bold text-lg">02</span>
                        </div>
                        <div>
                            <h3 className="font-bold text-gray-800 text-lg">Group training</h3>
                            <p className="text-gray-500 mt-1">Motivating sessions with like-minded fitness enthusiasts</p>
                        </div>
                    </div>
                </div>

                {/* CTA Button */}
                <div className="pt-4">
                    <Link
                        href={basicData.whatsapp.slug}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-3 bg-red-500 hover:bg-red-600 text-white font-semibold px-8 py-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                    >
                        Contact Us
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L9 9.414V13a1 1 0 102 0V9.414l1.293 1.293a1 1 0 001.414-1.414z" clipRule="evenodd" />
                        </svg>
                    </Link>
                </div>
            </div>

            {/* Right Side - Image with floating card */}
            <div className="relative">
                <div className="relative w-full h-[550px] rounded-2xl overflow-hidden shadow-2xl">
                    <Image
                        src="/gallery/sideImg.jpg"
                        alt="Professional fitness trainer"
                        fill
                        className="object-cover"
                        priority
                    />
                    {/* Overlay gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                </div>
                
                {/* Floating card */}
                <div className="absolute -bottom-6 -right-6 bg-red-500 text-white p-6 rounded-2xl shadow-2xl w-72">
                    <div className="flex items-start gap-3">
                        <div className="bg-white/20 p-2 rounded-lg">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                            </svg>
                        </div>
                        <p className="font-bold text-lg leading-tight">Choose your perfect plan and trainer</p>
                    </div>
                </div>

                {/* Achievement badge */}
                <div className="absolute -top-6 -left-6 bg-white p-4 rounded-2xl shadow-lg w-44">
                    <div className="text-center">
                        <div className="text-2xl font-bold text-red-500">500+</div>
                        <div className="text-xs text-gray-600 font-medium">SATISFIED CLIENTS</div>
                    </div>
                </div>
            </div>
        </div>
    </section>
);
}
