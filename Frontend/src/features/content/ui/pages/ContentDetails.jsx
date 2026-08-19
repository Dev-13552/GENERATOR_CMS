import React, { useEffect } from "react";
import { useContentHistory } from "../../hooks/useContent";
import { useParams } from "react-router";
import { Copy, ErrorIcon, LoadingIcon } from "../../../../shared/ui/components/Icons";
import { capitalizeWord, getColorType } from "../../../../utils/global";
import moment from "moment";

const ContentDetails = () => {
  const { error, setError, contentDetails, getContentById, isLoading, navigate } = useContentHistory();
    console.log(contentDetails)
  const { id } = useParams();
  console.log(id)

  useEffect(() => {
    getContentById(id);
  }, []);

  return (
    <div className="min-h-screen bg-linear-to-br from-indigo-50 via-white to-purple-50 px-4 py-12">
      <div className="max-w-6xl mx-auto">
        {isLoading && (
          <div className="flex flex-col items-center justify-center min-h-100">
            <LoadingIcon style="animate-spin h-12 w-12 text-indigo-600 mb-4" />
            <p className="text-gray-600 text-lg">Loading content...</p>
          </div>
        )}
        {error && !isLoading && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-2xl mx-auto">
            <p className="text-red-600 text-center flex items-center justify-center gap-2">
              <ErrorIcon style="w-5 h-5" />
              {error?.message}
            </p>
            <button
              onClick={getContentById}
              className="mt-4 mx-auto block bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
            >
              Try Again
            </button>
          </div>
        )}

        {!isLoading && !error && (
          <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
            {/* Header */}
            <div className="bg-linear-to-r from-indigo-600 to-purple-600 p-8">
              <div className="flex items-center gap-3 mb-3">
                <h1 className="text-3xl font-bold text-white">
                  Content Detail
                </h1>
                <span
                  className={`text-xs font-semibold px-3 py-1 rounded-full ${getColorType(
                    contentDetails?.type,
                  )}`}
                >
                  {capitalizeWord(contentDetails?.type)}
                </span>
              </div>
              <p className="text-white text-sm opacity-90">
                {moment(contentDetails?.createdAt).endOf("day").fromNow()}
              </p>
            </div>

            <div className="p-8">
              <div className="bg-gray-50 rounded-lg p-6 border-2 border-gray-200 mb-6">
                <p className="text-gray-800 whitespace-pre-wrap leading-relaxed text-base">
                  {contentDetails?.output}
                </p>
              </div>

              <div className="flex gap-3">
                <button
                //   onClick={() => handleCopy(contentDetails.output)}
                  className="flex-1 bg-indigo-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-indigo-700 transition-colors flex items-center justify-center gap-2"
                >
                  <Copy style="w-5 h-5" />
                  Copy
                </button>
                <button
                  onClick={() => {
                    navigate("/main/content/history");
                  }}
                  className="flex-1 bg-gray-200 text-gray-700 py-3 px-6 rounded-lg font-semibold hover:bg-gray-300 transition-colors"
                >
                  Back to History
                </button>
              </div>

              <div className="mt-8">
                <h2 className="text-xl font-bold text-gray-900 mb-4">
                  Original Content
                </h2>
                <div className="bg-gray-100 rounded-lg p-6 border-2 border-gray-200">
                  <p className="text-gray-700 whitespace-pre-wrap leading-relaxed text-base">
                    {contentDetails?.prompt}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ContentDetails;
