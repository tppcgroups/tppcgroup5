export const translations = {
    English: {
        header: "Accessibility Options",
        accessibilityOptions: "Accessibility Options",
        language: "Language",
        textSize: "Text Size",
        contrastMode: "Contrast Mode",
        highlightLinks: "Highlight Links",
        reduceMotion: "Reduce Motion",
        footer: "Accessibility tools for the Tampa Palms Professional Center website"
    },

    Spanish: {
        header: "Opciones de accesibilidad",
        accessibilityOptions: "Opciones de accesibilidad",
        language: "Idioma",
        textSize: "Tamaño del texto",
        contrastMode: "Modo de contraste",
        highlightLinks: "Resaltar enlaces",
        reduceMotion: "Reducir movimiento",
        footer: "Herramientas de accesibilidad para el sitio web de Tampa Palms Professional Center"
    },

    French: {
        header: "Options d’accessibilité",
        accessibilityOptions: "Options d’accessibilité",
        language: "Langue",
        textSize: "Taille du texte",
        contrastMode: "Mode de contraste",
        highlightLinks: "Mettre en évidence les liens",
        reduceMotion: "Réduire les animations",
        footer: "Outils d’accessibilité pour le site web de Tampa Palms Professional Center"
    },

    Swahili: {
        header: "Chaguo za Ufikiaji",
        accessibilityOptions: "Chaguo za Ufikiaji",
        language: "Lugha",
        textSize: "Ukubwa wa maandishi",
        contrastMode: "Hali ya utofautishaji",
        highlightLinks: "Angazia viungo",
        reduceMotion: "Punguza mwendo",
        footer: "Zana za ufikiaji kwa tovuti ya Tampa Palms Professional Center"
    }
} as const;

export type SupportedLanguage = keyof typeof translations;

