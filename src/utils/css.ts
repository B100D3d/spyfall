const colors = [
    {
        name: "--temp-primary",
        initialValue: "#AAFFA9",
    },
    {
        name: "--temp-secondary",
        initialValue: "#11FFBD",
    },
    {
        name: "--temp-fileInput-gradient1",
        initialValue: "#00c6ff",
    },
    {
        name: "--temp-fileInput-gradient2",
        initialValue: "#0072ff",
    },
]

export const registerCSSColorProperties = () => {
    const hasBrowserSupport =
        typeof window !== "undefined"
            ? typeof (window as any).CSS.registerProperty === "function"
            : false
    const prefersReducedMotion =
        typeof window === "undefined"
            ? { matches: false }
            : window.matchMedia("(prefers-reduced-motion: no-preference)")
    const isEnabled = hasBrowserSupport && prefersReducedMotion.matches
    if (isEnabled) {
        colors.forEach(({ name, initialValue }) => {
            CSS.registerProperty({
                name,
                initialValue,
                syntax: "<color>",
                inherits: false,
            })
        })
    }
}
