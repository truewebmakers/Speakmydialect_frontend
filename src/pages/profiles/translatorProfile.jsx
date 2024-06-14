import Breadcumb15 from "@/components/breadcumb/Breadcumb15";
import MetaComponent from "@/components/common/MetaComponent";
import TranslatorProfilePage from "@/components/section/TranslatorProfilePage";
import { apiMethods, apiUrls, metaData } from "@/constants/constant";
import UseApi from "@/hook/useApi";
import { getCountries, getLanguages } from "@/utils/commonFunctions";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { toast } from "react-toastify";

export default function FreelancerPageSingle11() {
  const [translatorProfile, setTranslatorProfile] = useState([]);
  const { pathname } = useLocation();
  const uuid = pathname.split("/profile/");
  const [countryList, setCountryList] = useState([]);
  const [languageList, setLanguageList] = useState([]);

  const getTranslatorProfile = async () => {
    try {
      const response = await UseApi(
        apiUrls.getTranslatorProfile + uuid[1],
        apiMethods.GET
      );
      if (response?.status == 200 || response?.status == 201) {
        const profileData = response?.data?.data;
        setTranslatorProfile(profileData);
      }
    } catch (error) {
      toast.error("Error fetching countries");
    }
  };
  useEffect(() => {
    getTranslatorProfile();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const storedCountries = sessionStorage.getItem("countries");
      const storedLanguages = sessionStorage.getItem("languages");

      if (storedCountries?.length > 0) {
        setCountryList(JSON.parse(storedCountries));
      } else {
        await getCountries(setCountryList);
      }
      if (storedLanguages?.length > 0) {
        setLanguageList(JSON.parse(storedLanguages));
      } else {
        await getLanguages(setLanguageList);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      <MetaComponent meta={metaData} />
      <Breadcumb15 translatorProfile={translatorProfile} />
      <TranslatorProfilePage translatorProfile={translatorProfile} />
    </>
  );
}
