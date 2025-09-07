import Link from "next/link";

function Title({
  titlePart1,
  titlePart2,
  viewAllUrl = null,
  size = "lg",
  bgType = "none", // "none", "light", "accent", "gradient", "outline"
  className = "",
}) {
  // Background classes based on bgType prop
  const bgClasses = {
    none: "",
    light: "bg-gray-100 px-3 md:px-4 py-2.5 md:py-3 rounded-lg",
    accent:
      "bg-primary-50 px-3 md:px-4 py-2.5 md:py-3 rounded-lg border-l-4 border-primary-600",
    gradient:
      "bg-gradient-to-r from-primary-50 to-secondary-50 px-3 md:px-4 py-2.5 md:py-3 rounded-lg",
    outline:
      "border border-gray-200 px-3 md:px-4 py-2.5 md:py-3 rounded-lg shadow-sm",
  };

  return (
    <div
      className={`mt-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-0 ${bgClasses[bgType]} ${className}`}
    >
      {/* Title text */}
      <h2
        className={`font-bold text-gray-800 tracking-tight break-words ${
          size === "lg"
            ? "text-xl sm:text-2xl md:text-3xl"
            : "text-lg sm:text-xl md:text-2xl"
        }`}
      >
        <span className="text-primary-600">{titlePart1}</span> {titlePart2}
      </h2>

      {/* "View All" link */}
      {viewAllUrl && (
        <Link
          href={viewAllUrl}
          className="text-sm sm:text-base font-medium text-primary-600 hover:text-primary-700 transition-colors flex items-center shrink-0"
        >
          View All
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4 ml-1"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </Link>
      )}
    </div>
  );
}

export default Title;