import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";

const useSelectedLanguage = () => {
  const { i18n } = useTranslation();
  const [selectedLanguage, setSelectedLanguage] = useState("en");
  useEffect(() => {
    console.log(i18n.language);
    setSelectedLanguage(i18n.language);
  }, [i18n.language]);

  return {
    selectedLanguage,
  };
};

export default useSelectedLanguage;
