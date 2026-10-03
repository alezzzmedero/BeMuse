(() => {
  "use strict";

  const translations = {
    es: {
      pageTitle: "Bemuse Brand | Colecciones",
      pageDescription: "Explora las colecciones de Bemuse Brand.",
      skipLink: "Saltar al contenido",
      brandHome: "Bemuse Brand — inicio",
      mainNavigation: "Navegación principal",
      navHome: "Inicio",
      navBrand: "La marca",
      navCollections: "Colecciones",
      navContact: "Contacto",
      languageGroup: "Cambiar idioma",
      languageSpanish: "Español",
      languageEnglish: "English",
      heroTitle: "Descubre Bemuse Brand.",
      heroDescription: "Explora nuestras colecciones: Invisible, Accessories, Active, Recovery y Sculp.",
      heroLink: "Descubre las colecciones",
      heroImageAlt: "Modelo con una prenda de Bemuse Brand",
      collectionsEyebrow: "Colecciones destacadas",
      collectionsTitle: "Explora las colecciones.",
      collectionsIntro: "Explora las colecciones de Bemuse Brand.",
      categoryInvisible: "Invisible",
      categoryAccessories: "Accessories",
      categoryActive: "Active",
      categoryRecovery: "Recovery",
      categorySculp: "Sculp",
      collectionsLink: "Conoce Bemuse Brand",
      brandTitle: "Bemuse Brand",
      brandDescription: "Encuentra los canales oficiales de Bemuse Brand.",
      socialInstagram: "Visita el perfil oficial",
      socialFacebook: "Visita la página oficial",
      socialWhatsApp: "Escríbenos por WhatsApp",
      socialTikTok: "Visita el perfil oficial",
      ctaTitle: "Descubre tu colección.",
      ctaDescription: "Conoce las cinco categorías de Bemuse Brand.",
      ctaLink: "Ver colecciones",
      footerBrand: "Bemuse Brand",
      footerContact: "Contacto por WhatsApp",
      footerRights: "Todos los derechos reservados."
    },
    en: {
      pageTitle: "Bemuse Brand | Collections",
      pageDescription: "Explore the collections from Bemuse Brand.",
      skipLink: "Skip to content",
      brandHome: "Bemuse Brand — home",
      mainNavigation: "Main navigation",
      navHome: "Home",
      navBrand: "The brand",
      navCollections: "Collections",
      navContact: "Contact",
      languageGroup: "Change language",
      languageSpanish: "Spanish",
      languageEnglish: "English",
      heroTitle: "Discover Bemuse Brand.",
      heroDescription: "Explore our collections: Invisible, Accessories, Active, Recovery and Sculp.",
      heroLink: "Discover the collections",
      heroImageAlt: "Model wearing a Bemuse Brand garment",
      collectionsEyebrow: "Featured collections",
      collectionsTitle: "Explore the collections.",
      collectionsIntro: "Explore the Bemuse Brand collections.",
      categoryInvisible: "Invisible",
      categoryAccessories: "Accessories",
      categoryActive: "Active",
      categoryRecovery: "Recovery",
      categorySculp: "Sculp",
      collectionsLink: "Discover Bemuse Brand",
      brandTitle: "Bemuse Brand",
      brandDescription: "Find Bemuse Brand's official channels.",
      socialInstagram: "Visit the official profile",
      socialFacebook: "Visit the official page",
      socialWhatsApp: "Message us on WhatsApp",
      socialTikTok: "Visit the official profile",
      ctaTitle: "Discover your collection.",
      ctaDescription: "Explore the five Bemuse Brand categories.",
      ctaLink: "View collections",
      footerBrand: "Bemuse Brand",
      footerContact: "Contact us on WhatsApp",
      footerRights: "All rights reserved."
    }
  };

  const languageButtons = document.querySelectorAll("[data-language]");

  const readSavedLanguage = () => {
    try {
      const savedLanguage = window.localStorage.getItem("bemuse-language");
      return savedLanguage === "es" || savedLanguage === "en" ? savedLanguage : null;
    } catch {
      return null;
    }
  };

  const detectBrowserLanguage = () => {
    const preferences = Array.isArray(navigator.languages) && navigator.languages.length
      ? navigator.languages
      : [navigator.language || ""];
    const preferredSupportedLanguage = preferences.find((preference) => /^(es|en)(-|$)/i.test(preference));

    return preferredSupportedLanguage
      ? preferredSupportedLanguage.slice(0, 2).toLowerCase()
      : "es";
  };

  const applyLanguage = (language, shouldSave = false) => {
    if (!translations[language]) return;

    document.documentElement.lang = language;

    document.querySelectorAll("[data-i18n]").forEach((element) => {
      const translation = translations[language][element.dataset.i18n];
      if (translation) element.textContent = translation;
    });

    document.querySelectorAll("[data-i18n-aria-label]").forEach((element) => {
      const translation = translations[language][element.dataset.i18nAriaLabel];
      if (translation) element.setAttribute("aria-label", translation);
    });

    document.querySelectorAll("[data-i18n-alt]").forEach((element) => {
      const translation = translations[language][element.dataset.i18nAlt];
      if (translation) element.setAttribute("alt", translation);
    });

    document.title = translations[language].pageTitle;
    document.querySelector('meta[name="description"]')?.setAttribute("content", translations[language].pageDescription);
    document.querySelector('meta[property="og:title"]')?.setAttribute("content", translations[language].pageTitle);
    document.querySelector('meta[property="og:description"]')?.setAttribute("content", translations[language].pageDescription);

    languageButtons.forEach((button) => {
      const isSelected = button.dataset.language === language;
      button.setAttribute("aria-pressed", String(isSelected));
    });

    if (shouldSave) {
      try {
        window.localStorage.setItem("bemuse-language", language);
      } catch {
        // La página conserva el idioma seleccionado durante esta visita aunque el almacenamiento esté desactivado.
      }
    }
  };

  languageButtons.forEach((button) => {
    button.addEventListener("click", () => applyLanguage(button.dataset.language, true));
  });

  applyLanguage(readSavedLanguage() || detectBrowserLanguage());
})();
