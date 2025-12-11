// Using Slot component from Radix as it merges its own props onto its immediate child- which allows us tp have more composition and customization.
// Might extend this to Input and Dropdown Button.
import { Slot } from "@radix-ui/react-slot";
import { cn } from "@/lib/utils";

interface TagProps {
  variant: "current" | "version" | "genre" | "custom" | "chapter";
  size?: "xs" | "sm";
  asChild?: boolean;
}

export default function Tag({
  className,
  variant,
  size="xs",
  asChild = false,
  ...props
}: React.ComponentProps<"span"> & TagProps) {
  const Comp = asChild ? Slot : "span";

  const variantStyles = {
    current: "bg-primary-base text-white-base border-0",
    version: "bg-neutral-dark/10 text-neutral-dark border-2 border-neutral-dark font-medium",
    genre: "bg-accent-rose text-white-base border-0",
    custom: "bg-transparent text-accent-rose border border-accent-rose",
    chapter: "bg-transparent text-neutral-dark border border-neutral-dark",
  };

  const textSize = {
    xs: "text-xs",
    sm: "text-sm",
  }

  const classStyles = `
  inline-flex items-center justify-center 
  rounded-md border 
  px-2 py-0.5 
  w-fit whitespace-nowrap 
  shrink-0 
  [&>svg]:size-3 gap-1 [&>svg]:pointer-events-none 
  transition-[color,box-shadow] overflow-hidden 
  ${variantStyles[variant]}
  ${textSize[size]}
  `;

  return (
    <Comp data-slot="tag" className={cn(classStyles, className)} {...props} />
  );
}
