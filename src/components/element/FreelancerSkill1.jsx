import { getLanguageName } from "@/utils/commonFunctions";

export default function FreelancerSkill1({ data }) {
  const storedLanguages = sessionStorage.getItem("languages");
  return (
    <>
      <div className="sidebar-widget mb30 pb20 bdrs8">
        <h4 className="widget-title">My Skills</h4>
        <div className="tag-list mt30">
          {data?.user_skills?.map((item, index) => (
            <a key={index}>
              {" "}
              {storedLanguages?.length > 0
                ? getLanguageName(item?.language, JSON.parse(storedLanguages))
                : "Not Specified Yet"}
            </a>
          ))}
        </div>
      </div>
    </>
  );
}
