import React, { useEffect, useState } from "react";
import { apiMethods, apiUrls } from "@/constants/constant";
import UseApi from "@/hook/useApi";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { Tooltip } from "react-tooltip";
import { formatDate } from "@/utils/helper";
import AddExperienceModal from "../modal/AddExperienceModal";

export default function WorkExperience() {
  const [experienceList, setExperienceList] = useState([]);
  const [currentExperience, setCurrentExperience] = useState({
    title: "",
    company_name: "",
    location: "",
    start_month: { option: "Select", value: null },
    start_year: { option: "Select", value: null },
    present_working: 0,
    end_month: { option: "Select", value: null },
    end_year: { option: "Select", value: null },
    job_description: "",
  });
  const [employment_type, setEmploymentType] = useState({
    option: "Select",
    value: null,
  });
  const [location_type, setLocationType] = useState({
    option: "Select",
    value: null,
  });

  const [showModal, setShowModal] = useState(false);
  const { user } = useSelector((state) => state.auth);
  const [editId, setEditId] = useState(null);

  // show modal to add new experience field
  const handleAddExperienceField = () => {
    setEditId(null);
    setCurrentExperience({
      title: "",
      company_name: "",
      location: "",
      start_month: { option: "Select", value: null },
      start_year: { option: "Select", value: null },
      present_working: 0,
      end_month: { option: "Select", value: null },
      end_year: { option: "Select", value: null },
      job_description: "",
    });
    setEmploymentType({ option: "Select", value: null });
    setLocationType({ option: "Select", value: null });
    setShowModal(true);
  };

  // close modal while clicking on cross button
  const handleCloseModal = () => {
    setShowModal(false);
  };

  // On change for adding experience fileds
  const handleOnChange = (e) => {
    const { name, value } = e.target;
    if (
      name === "start_year" ||
      name === "end_year" ||
      name === "start_month" ||
      name === "end_month"
    ) {
      setCurrentExperience({
        ...currentExperience,
        [name]: {
          option: value,
          value: value,
        },
      });
    } else {
      setCurrentExperience((prevExperience) => ({
        ...prevExperience,
        [name]: value,
      }));
    }
  };

  const handleFieldChange = (field, option, value) => {
    const newLanguages = { ...currentExperience };
    if (field == "location_type") {
      setLocationType({ option: option, value: value });
    } else if (field == "employment_type") {
      setEmploymentType({ option: option, value: value });
    }
  };

  // getEducation of particulr user
  const getExperience = async () => {
    try {
      const headers = {
        Authorization: `Bearer ${user?.token}`,
      };
      const response = await UseApi(
        apiUrls.getExperience + user?.userInfo?.id,
        apiMethods.GET,
        null,
        headers
      );
      if (response?.status == 200 || response?.status == 201) {
        const educationData = response?.data?.data;
        setExperienceList(educationData);
      }
    } catch (error) {
      toast.error("Error fetching experience");
    }
  };

  // call get Experience
  useEffect(() => {
    getExperience();
  }, []);

  // delete Experience of particular user
  const handleDeleteExperience = (index) => {
    getExperience();
    const newEducationList = [...experienceList];
    const id = newEducationList[index]?.id;

    if (id !== undefined) {
      // If the item has an id, execute the deletion logic
      deleteExperienceId(id)
        .then(() => {
          newEducationList.splice(index, 1);
          setExperienceList(newEducationList);
        })
        .catch((error) => {
          toast.error("Failed to delete experience with id:", id, error);
        });
    } else {
      // If the item doesn't have an id, remove it from the list
      newEducationList.splice(index, 1);
      setExperienceList(newEducationList);
    }
  };

  // Call delete experience api
  const deleteExperienceId = async (id) => {
    try {
      const headers = {
        Authorization: `Bearer ${user?.token}`,
      };
      const response = await UseApi(
        apiUrls.deleteExpirence + id,
        apiMethods.POST,
        null,
        headers
      );
      if (response?.status == 200 || response?.status == 201) {
        toast.success("Deleted Successfully");
      }
    } catch (error) {
      toast.error("Error fetching experience");
    }
  };

  // Add new Experience in modal
  const handleSaveExperience = () => {
    handleCloseModal();
    if (editId !== null) {
      handleEditExpField();
    } else {
      handleSaveAll();
    }
  };

  // Add new Experience Api call
  const handleSaveAll = async () => {
    try {
      const headers = {
        Authorization: `Bearer ${user?.token}`,
      };
      const bodyData = {
        title: currentExperience?.title,
        employment_type: employment_type?.value,
        company_name: currentExperience?.company_name,
        location: currentExperience?.location,
        location_type: location_type?.value,
        start_month: currentExperience?.start_month?.value,
        start_year: currentExperience?.start_year?.value?.toString() || "",
        present_working: currentExperience?.present_working,
        end_month: currentExperience?.end_month?.value,
        end_year: currentExperience?.end_year?.value?.toString() || "",
        job_description: currentExperience?.job_description,
      };
      const response = await UseApi(
        apiUrls.addExperience + user?.userInfo?.id,
        apiMethods.POST,
        bodyData,
        headers
      );
      if (response?.status === 200 || response?.status === 201) {
        toast.success(response?.data?.message);
        getExperience();
      } else {
        toast.error(response?.data?.message);
      }
    } catch (err) {
      toast.error(err);
    }
  };

  // Edit experience field
  const handleEditExperience = (id) => {
    let data = experienceList[id];
    setEditId(data?.id);
    setCurrentExperience({
      title: data?.title,
      company_name: data?.company_name,
      location: data?.location,
      start_month: { option: data?.start_month, value: data?.start_month },
      start_year: { option: data?.start_year, value: data?.start_year },
      present_working: data?.present_working,
      end_month: { option: data?.end_month, value: data?.end_month },
      end_year: { option: data?.end_year, value: data?.end_year },
      job_description: data?.job_description,
    });
    setEmploymentType({
      option: data?.employment_type,
      value: data?.employment_type,
    });
    setLocationType({
      option: data?.location_type,
      value: data?.location_type,
    });
    setShowModal(true);
  };

  // Edit Experience Api Call
  const handleEditExpField = async () => {
    try {
      const headers = {
        Authorization: `Bearer ${user?.token}`,
      };
      const bodyData = {
        title: currentExperience?.title,
        employment_type: employment_type?.value,
        company_name: currentExperience?.company_name,
        location: currentExperience?.location,
        location_type: location_type?.value,
        start_month: currentExperience?.start_month?.value,
        start_year: currentExperience?.start_year?.value?.toString() || "",
        present_working: currentExperience?.present_working,
        end_month: currentExperience?.end_month?.value,
        end_year: currentExperience?.end_year?.value?.toString() || "",
        job_description: currentExperience?.job_description,
      };
      const response = await UseApi(
        apiUrls.editExperience + editId,
        apiMethods.POST,
        bodyData,
        headers
      );
      if (response?.status === 200 || response?.status === 201) {
        toast.success(response?.data?.message);
        getExperience();
      } else {
        toast.error(response?.data?.message);
      }
    } catch (err) {
      toast.error(err);
    }
  };

  const handleChecked = (e) => {
    setCurrentExperience({
      ...currentExperience,
      ["present_working"]: e.target.checked == true ? 1 : 0,
    });
  };

  return (
    <>
      <div className="ps-widget bgc-white bdrs4 p30 mb30 overflow-hidden position-relative">
        <div className="bdrb1 pb15 mb30 d-sm-flex justify-content-between">
          <h5 className="list-title">Work Experience</h5>
          <a
            className="add-more-btn text-thm"
            onClick={handleAddExperienceField}
          >
            <i className="icon far fa-plus mr10" />
            Add Experience
          </a>
        </div>
        <div className="position-relative">
          <div className="educational-quality">
            {experienceList?.map((edu, index) => (
              <div key={index}>
                <div className="m-circle text-thm">M</div>
                <div className="wrapper mb40 position-relative">
                  <div className="del-edit">
                    <div className="d-flex">
                      <a
                        className="icon me-2"
                        id="edit"
                        onClick={() => handleEditExperience(index)}
                      >
                        <Tooltip anchorSelect="#edit" className="ui-tooltip">
                          Edit
                        </Tooltip>
                        <span className="flaticon-pencil" />
                      </a>
                      <a
                        className="icon me-2"
                        id={`edit-${index}`}
                        onClick={() => handleDeleteExperience(index)}
                      >
                        <Tooltip
                          anchorSelect={`#edit-${index}`}
                          className="ui-tooltip"
                        >
                          Delete
                        </Tooltip>
                        <span className="flaticon-delete" />
                      </a>
                    </div>
                  </div>

                  <span className="tag">
                    {edu?.start_month + ", " + edu?.start_year} -{" "}
                    {edu?.end_year
                      ? edu?.end_month + ", " + edu?.end_year
                      : "Present"}
                  </span>
                  <h5 className="mt15">{edu?.title}</h5>
                  <h6 className="text-thm">{edu?.location}</h6>
                  <p>{edu?.job_description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <AddExperienceModal
        show={showModal}
        handleClose={handleCloseModal}
        experience={currentExperience}
        handleOnChange={handleOnChange}
        handleSave={handleSaveExperience}
        handleChecked={handleChecked}
        handleFieldChange={handleFieldChange}
        employment_type={employment_type}
        location_type={location_type}
        editId={editId}
      />
    </>
  );
}
