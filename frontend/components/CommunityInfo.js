import { WHYJOINUS } from "../constants";

const CommunityInfo = () => {
  return (
    <div>
      <div className="my-10">
        <p className="bold-20 mb-3">What is TeenVent Community?</p>
        <p>
          At TeenVent, we understand that being a teenager can be both exciting
          and challenging. It is a time filled with new experiences, emotions,
          and questions about life. Here, we provide a safe and supportive space
          where you can express your feelings, share your thoughts, and connect
          with others who understand what you are going through.
        </p>
      </div>

      <div className="my-10">
        <p className="bold-20 mb-3">Why Join Us?</p>
        <ul className="list-disc pl-5 mb-4">
          {WHYJOINUS.map((item, index) => (
            <li key={index}>
              <strong>{item.title}:</strong> {item.description}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default CommunityInfo;
