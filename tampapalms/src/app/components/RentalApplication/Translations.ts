export const translations = {
    English: {
        header: "Accessibility Options",
        accessibilityOptions: "Accessibility Options",
        language: "Language",
        textSize: "Text Size",
        contrastMode: "Contrast Mode",
        highlightLinks: "Highlight Links",
        reduceMotion: "Reduce Motion",
        footer: "Accessibility tools for the Tampa Palms Professional Center website",
        cursorSize: "Cursor Size",
        cursorSmall: "Small",
        cursorMedium: "Medium",
        cursorLarge: "Large",
        reset: "Reset Settings",
    },

    Spanish: {
        header: "Opciones de accesibilidad",
        accessibilityOptions: "Opciones de accesibilidad",
        language: "Idioma",
        textSize: "Tamaño del texto",
        contrastMode: "Modo de contraste",
        highlightLinks: "Resaltar enlaces",
        reduceMotion: "Reducir movimiento",
        footer: "Herramientas de accesibilidad para el sitio web de Tampa Palms Professional Center",
        cursorSize: "Tamaño del Cursor",
        cursorSmall: "Pequeño",
        cursorMedium: "Mediano",
        cursorLarge: "Grande",
        reset: "Restablecer ajustes",
    },

    French: {
        header: "Options d’accessibilité",
        accessibilityOptions: "Options d’accessibilité",
        language: "Langue",
        textSize: "Taille du texte",
        contrastMode: "Mode de contraste",
        highlightLinks: "Mettre en évidence les liens",
        reduceMotion: "Réduire les animations",
        footer: "Outils d’accessibilité pour le site web de Tampa Palms Professional Center",
        cursorSize: "Taille du Curseur",
        cursorSmall: "Petit",
        cursorMedium: "Moyen",
        cursorLarge: "Grand",
        reset: "Réinitialiser les paramètres",
    },

    Swahili: {
        header: "Chaguo za Ufikiaji",
        accessibilityOptions: "Chaguo za Ufikiaji",
        language: "Lugha",
        textSize: "Ukubwa wa maandishi",
        contrastMode: "Hali ya utofautishaji",
        highlightLinks: "Angazia viungo",
        reduceMotion: "Punguza mwendo",
        footer: "Zana za ufikiaji kwa tovuti ya Tampa Palms Professional Center",
        cursorSize: "Ukubwa wa Kielekezi",
        cursorSmall: "Kidogo",
        cursorMedium: "Kati",
        cursorLarge: "Kubwa",
        reset: "Weka upya mipangilio",
    }
} as const;

export type SupportedLanguage = keyof typeof translations;

