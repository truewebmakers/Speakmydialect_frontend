import React, { useEffect, useState } from "react";
import { apiMethods, apiUrls } from "@/constants/constant";
import UseApi from "@/hook/useApi";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import AddEducationModal from "../modal/AddEducationModal";
import { Tooltip } from "react-tooltip";

export default function Education() {
  const [educationList, setEducationList] = useState([]);
  const [currentEducation, setCurrentEducation] = useState({
    degree_name: "",
    university_name: "",
    year_start: "",
    year_end: "",
    any_info: "",
  });
  const [showModal, setShowModal] = useState(false);
  const { user } = useSelector((state) => state.auth);
  const [editId, setEditId] = useState(null);

  // show modal to add new education field
  const handleAddEducationField = () => {
    setEditId(null);
    setCurrentEducation({
      degree_name: "",
      university_name: "",
      year_start: "",
      year_end: "",
      any_info: "",
    });
    setShowModal(true);
  };

  // close modal while clicking on cross button
  const handleCloseModal = () => {
    setShowModal(false);
  };

  // On change for adding education fileds
  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setCurrentEducation({
      ...currentEducation,
      [name]: value,
    });
  };

  // getEducation of particulr user
  const getEduaction = async () => {
    try {
      const headers = {
        Authorization: `Bearer ${user?.token}`,
      };
      const response = await UseApi(
        apiUrls.getEducation + user?.userInfo?.id,
        apiMethods.GET,
        null,
        headers
      );
      if (response?.status == 200 || response?.status == 201) {
        const educationData = response?.data?.data;
        setEducationList(educationData);
      }
    } catch (error) {
      toast.error("Error fetching education");
    }
  };

  // call get Education
  useEffect(() => {
    getEduaction();
  }, []);

  // delete Education of particular user
  const handleDeleteEducation = (index) => {
    getEduaction();
    const newEducationList = [...educationList];
    const id = newEducationList[index]?.id;

    if (id !== undefined) {
      // If the item has an id, execute the deletion logic
      deleteEducationId(id)
        .then(() => {
          newEducationList.splice(index, 1);
          setEducationList(newEducationList);
        })
        .catch((error) => {
          toast.error("Failed to delete education with id:", id, error);
        });
    } else {
      // If the item doesn't have an id, remove it from the list
      newEducationList.splice(index, 1);
      setEducationList(newEducationList);
    }
  };

  // Call delete education api
  const deleteEducationId = async (id) => {
    try {
      const headers = {
        Authorization: `Bearer ${user?.token}`,
      };
      const response = await UseApi(
        apiUrls.deleteEducation + id,
        apiMethods.POST,
        null,
        headers
      );
      if (response?.status == 200 || response?.status == 201) {
        toast.success("Deleted Successfully");
      }
    } catch (error) {
      toast.error("Error fetching education");
    }
  };

  // Add new Education in modal
  const handleSaveEducation = () => {
    setEducationList([...educationList, currentEducation]);
    handleCloseModal();
    if (editId !== null) {
      handleEditEduField();
    } else {
      handleSaveAll();
    }
  };

  // Add new Education Api call
  const handleSaveAll = async () => {
    try {
      const headers = {
        Authorization: `Bearer ${user?.token}`,
      };
      const bodyData = currentEducation;
      const response = await UseApi(
        apiUrls.addEducation + user?.userInfo?.id,
        apiMethods.POST,
        bodyData,
        headers
      );
      if (response?.status === 200 || response?.status === 201) {
        toast.success(response?.data?.message);
        getEduaction();
      } else {
        toast.error(response?.data?.message);
      }
    } catch (err) {
      toast.error(err);
    }
  };

  // Edit education field
  const handleEditEducation = (id) => {
    let data = educationList[id];
    setEditId(data?.id);
    setCurrentEducation({
      degree_name: data?.degree_name,
      university_name: data?.university_name,
      year_start: data?.year_start,
      year_end: data?.year_end,
      any_info: data?.any_info,
    });
    setShowModal(true);
  };

  // Edit Education Api Call
  const handleEditEduField = async () => {
    try {
      const headers = {
        Authorization: `Bearer ${user?.token}`,
      };
      const bodyData = currentEducation;
      const response = await UseApi(
        apiUrls.editEducation + editId,
        apiMethods.POST,
        bodyData,
        headers
      );
      if (response?.status === 200 || response?.status === 201) {
        toast.success(response?.data?.message);
        getEduaction();
      } else {
        toast.error(response?.data?.message);
      }
    } catch (err) {
      toast.error(err);
    }
  };

  return (
    <>
      <div className="ps-widget bgc-white bdrs4 p30 mb30 overflow-hidden position-relative">
        <div className="bdrb1 pb15 mb30 d-sm-flex justify-content-between">
          <h5 className="list-title">Education</h5>
          <a
            className="add-more-btn text-thm"
            onClick={handleAddEducationField}
          >
            <i className="icon far fa-plus mr10" />
            Add Education
          </a>
        </div>
        <div className="position-relative">
          <div className="educational-quality">
            {educationList?.map((edu, index) => (
              <div key={index}>
                <div className="m-circle text-thm">M</div>
                <div className="wrapper mb40 position-relative">
                  <div className="del-edit">
                    <div className="d-flex">
                      <a
                        className="icon me-2"
                        id="edit"
                        onClick={() => handleEditEducation(index)}
                      >
                        <Tooltip anchorSelect="#edit" className="ui-tooltip">
                          Edit
                        </Tooltip>
                        <span className="flaticon-pencil" />
                      </a>
                      <a
                        className="icon me-2"
                        id={`edit-${index}`}
                        onClick={() => handleDeleteEducation(index)}
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
                    {edu.year_start} - {edu.year_end}
                  </span>
                  <h5 className="mt15">{edu.degree_name}</h5>
                  <h6 className="text-thm">{edu.university_name}</h6>
                  <p>{edu.any_info}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <AddEducationModal
        show={showModal}
        handleClose={handleCloseModal}
        education={currentEducation}
        handleOnChange={handleOnChange}
        handleSave={handleSaveEducation}
      />
    </>
  );
}
