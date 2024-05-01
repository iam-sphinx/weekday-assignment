import React, { useState } from "react";

// jdLink: "https://weekday.works";
// jdUid: "cfff35ac-053c-11ef-83d3-06301d0a7178-92010";
// jobDetailsFromCompany: "This is a sample job and you must have displayed it to understand that its not just some random lorem ipsum text but something which was manually written. Oh well, if random text is what you were looking for then here it is: Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages and now in this assignment.";
// jobRole: "frontend";
// location: "delhi ncr";
// maxExp: 6;
// maxJdSalary: 61;
// minExp: 3;
// minJdSalary: null;
// salaryCurrencyCode: "USD";

const Card = ({
  jdLink,
  jdUid,
  jobDetailsFromCompany,
  jobRole,
  location,
  maxExp,
  maxJdSalary,
  minExp,
  minJdSalary,
  salaryCurrencyCode,
}) => {
  const [isShow, setIsShow] = useState(false);
  return (
    <div className="max-w-sm h-full min-h-[500px] rounded-3xl border-2 border-[#e5e5e5] shadow-md p-6 flex justify-between flex-col">
      <div>
        <h1 className="text-xl font-normal text-[#8f8f8f] hover:underline underline-offset-1">
          {jdLink}
        </h1>
        <h1 className="font-normal text-base">{jobRole}</h1>
        <h1 className="font-medium text-sm">{location}</h1>
        <div>
          <div className="relative">
            <p className={`${isShow ? "h-auto" : "h-40"} overflow-hidden`}>
              {jobDetailsFromCompany}
            </p>
            <div
              className={`absolute ${
                isShow && "hidden"
              } bottom-0 h-10 w-full bg-gradient-to-b from-transparent to-white`}
            ></div>
          </div>
          <button
            className="w-full py-3 text-[#4b45db]"
            onClick={() => setIsShow((prev) => !prev)}
          >
            {isShow ? "view less" : "view more"}
          </button>
        </div>
      </div>

      <div>
        <h1 className="font-medium text-lg text-[#8f8f8f]">
          Minimum Experience
        </h1>
        <h1 className="font-normal text-base mb-4">{minExp} years</h1>

        <h1 className="font-medium text-lg text-[#8f8f8f]">
          Maximum Experience
        </h1>
        <h1 className="font-normal text-base mb-4">{maxExp} years</h1>
        <button className="w-full py-3 bg-[#55efc4] rounded-lg font-medium">
          ⚡Easy Apply
        </button>
      </div>
    </div>
  );
};

export default Card;
