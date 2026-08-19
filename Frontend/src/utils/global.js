import { toast } from "react-toastify";

const COLOR_MAP = {
  "rewrite": "blue-600",
  "expand": "indigo-600",
  "shorten": "orange-600",
  "seo-content": "cyan-600",
  "generate": "green-600",
  "default": "pink-600"
}


export const downloadImage = async (image) => {
  // if we don't have image url then return
  if (!image) return;
  const res = await fetch(image);
  const blob = await res.blob();
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "download.jpg"; // change file name if needed

  document.body.appendChild(a);
  a.click();
  a.remove();

  window.URL.revokeObjectURL(url);
};

export const capitalizeWord = (str) => {
  if (!str) return;
  return str.charAt(0).toUpperCase() + str.slice(1);
};

export const getColorType = (type) => {
  return COLOR_MAP[type] || COLOR_MAP["pink"];
};

export const handleCopy = async (content) => {
  if (!content) return;
  try {
    await window.navigator.clipboard.writeText(content);
    // toast.success("Content copied");
  } catch (error) {
    console.log(`Failed to copy. Error is ${error}`);
  }
};
