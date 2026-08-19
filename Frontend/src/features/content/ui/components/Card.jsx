import React from "react";
import { ArrowIcon } from "../../../../shared/ui/components/Icons";
import { useNavigate } from "react-router";

const Card = (props) => {
  const navigate = useNavigate();
  return (
    <div
      className={`w-[25%] h-72 rounded-2xl p-2 hover:-translate-y-1 transition-all`}
    >
      <div
        className={`bg-linear-to-br ${props.gradient} rounded-t-2xl h-3/4 flex flex-col gap-2 text-white pl-5 pt-4`}
      >
        <div className="rounded-full bg-white w-10 h-10 flex justify-center items-center">
          {props.icon}
        </div>
        <h2 className="text-lg font-bold">{props.title}</h2>
        <p className="text-sm ">{props.desc}</p>
      </div>
      <div className="w-full flex justify-center items-center h-1/4 bg-white rounded-b-2xl">
        <button
          onClick={() => navigate(props.link)}
          className={`cursor-pointer w-3/4 bg-linear-to-br ${props.gradient} flex justify-center items-center gap-2 text-white rounded-2xl py-3 `}
        >
          Get Started
        </button>
      </div>
    </div>
  );
};

export default Card;
