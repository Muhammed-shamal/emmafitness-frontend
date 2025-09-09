'use client';

import { useState } from "react";
import MarkDownText from "./global/MarkDownText";

const DescriptionWithReadMore = ({ text, maxChars = 250 }) => {
  const [expanded, setExpanded] = useState(false);

  const shouldTruncate = text?.length > maxChars;
  const displayText = expanded || !shouldTruncate ? text : text.slice(0, maxChars) + "...";

  return (
    <div className="text-sm">
      <MarkDownText text={displayText} />

      {shouldTruncate && (
        <button
          className="mt-2 text-blue-600 hover:underline text-xs"
          onClick={() => setExpanded(!expanded)}
        >
          {expanded ? "Read less" : "Read more"}
        </button>
      )}
    </div>
  );
};

export default DescriptionWithReadMore;