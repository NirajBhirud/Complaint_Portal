import React from "react";
import { useTranslation } from "react-i18next";

const LanguageSelector = () => {
  const { i18n, t } = useTranslation();

  const changeLanguage = (language) => {
    i18n.changeLanguage(language);
    localStorage.setItem("language", language);
  };

  return (
    <div className="language-selector">
      <label htmlFor="language">
        🌐 {t("language")}
      </label>

      <select
        id="language"
        value={i18n.language}
        onChange={(e) => changeLanguage(e.target.value)}
      >
        <option value="en">{t("english")}</option>
        <option value="mr">{t("marathi")}</option>
        <option value="hi">{t("hindi")}</option>
      </select>
    </div>
  );
};

export default LanguageSelector;