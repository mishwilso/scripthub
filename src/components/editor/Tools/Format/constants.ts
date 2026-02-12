// ============================================================================
// TYPES
// ============================================================================
export type HeadingTag = "p" | "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "caption";

 
 // ==========================================================================
// CONFIGURATION OPTIONS
// ==========================================================================
export const headingOptions: { label: string; value: HeadingTag; size: number; weight: number;}[] = 
    [
        { label: "Paragraph", value: "p", size: 16, weight: 400 },
        { label: "Heading 1", value: "h1", size: 32, weight: 700 },
        { label: "Heading 2", value: "h2", size: 24, weight: 700 },
        { label: "Heading 3", value: "h3", size: 20, weight: 700 },
        { label: "Heading 4", value: "h4", size: 18, weight: 700 },
        { label: "Heading 5", value: "h5", size: 16, weight: 700 },
        { label: "Heading 6", value: "h6", size: 14, weight: 700 },
        { label: "Caption", value: "caption", size: 12, weight: 400 },
    ];

export const fontWeightOptions =
    [
        { label: "Light", value: 300 },
        { label: "Regular", value: 400 },
        { label: "Medium", value: 500 },
        { label: "Semi Bold", value: 600 },
        { label: "Bold", value: 700 },
        { label: "Extra Bold", value: 800 },
    ];

export const fontStyleOptions =
    [
        { label: "Georgia", value: "Georgia, serif" },
        { label: "Literata", value: "var(--font-literata), serif" },
        { label: "Arial", value: "Arial, sans-serif" },
        { label: "Times New Roman", value: "Times New Roman, serif" },
        { label: "Courier New", value: "Courier New, monospace" },
    ];

// ==========================================================================
// COLOR PALETTES DATA
// ==========================================================================
export const text_colors = [
    {
        name: "Purple",
        value: "#C084FC",
        shades: ["#7C3AED", "#A855F7", "#C084FC", "#D8B4FE", "#E9D5FF"],
    },
    {
        name: "Blue",
        value: "#60A5FA",
        shades: ["#2563EB", "#3B82F6", "#60A5FA", "#93C5FD", "#BFDBFE"],
    },
    {
        name: "Cyan",
        value: "#22D3EE",
        shades: ["#0891B2", "#06B6D4", "#22D3EE", "#67E8F9", "#A5F3FC"],
    },
    {
        name: "Green",
        value: "#34D399",
        shades: ["#059669", "#10B981", "#34D399", "#6EE7B7", "#A7F3D0"],
    },
    {
        name: "Yellow",
        value: "#FACC15",
        shades: ["#CA8A04", "#EAB308", "#FACC15", "#FDE047", "#FEF08A"],
    },
    {
        name: "Orange",
        value: "#FB923C",
        shades: ["#EA580C", "#F97316", "#FB923C", "#FDBA74", "#FED7AA"],
    },
    {
        name: "Red",
        value: "#F87171",
        shades: ["#DC2626", "#EF4444", "#F87171", "#FCA5A5", "#FECACA"],
    },
    {
        name: "Pink",
        value: "#F472B6",
        shades: ["#DB2777", "#EC4899", "#F472B6", "#F9A8D4", "#FBCFE8"],
    },
    {
        name: "Black",
        value: "#78716C",
        shades: ["#44403C", "#57534E", "#78716C", "#A8A29E", "#D6D3D1"],
    },
    {
        name: "White",
        value: "#E5E5E5",
        shades: ["#737373", "#A3A3A3", "#E5E5E5", "#F5F5F5", "#FAFAFA"],
    },
];

export const highlight_colors = [
    { name: "Purple", value: "#A855F7" },
    { name: "Blue", value: "#3B82F6" },
    { name: "Cyan", value: "#06B6D4" },
    { name: "Green", value: "#10B981" },
    { name: "Yellow", value: "#EAB308" },
    { name: "Orange", value: "#F97316" },
    { name: "Red", value: "#EF4444" },
    { name: "Pink", value: "#EC4899" },
    { name: "Black", value: "#5e4c3b" },
    { name: "White", value: "#FFFFFF" },
];

// ==========================================================================
// HELPER FUNCTIONS
// ==========================================================================
export const getWeightLabel = (weight: number): string => {
return (
    fontWeightOptions.find((opt) => opt.value === weight)?.label ?? "Regular"
);
};

export const getButtonClass = (isActive: boolean) =>
`flex items-center justify-center aspect-square border rounded-md transition-colors ${
    isActive
    ? "bg-primary-base/20 border-primary-base"
    : "border-neutral-dark/20 hover:bg-neutral-light/30 active:bg-neutral-dark/20"
}`;