import { FaUser } from "react-icons/fa6";
import Image from "next/image";

interface AvatarProps {
  src?: string | null;
  alt?: string;
  size?: "small" | "medium" | "large";
  fallbackIcon?: React.ReactNode;
}

export default function Avatar({
  src,
  alt = "User avatar",
  size = "medium",
  fallbackIcon,
}: AvatarProps) {
  const sizeStyles = {
    small: "w-8 h-8",
    medium: "w-10 h-10",
    large: "w-16 h-16",
  };

  const iconSizes = {
    small: 16,
    medium: 20,
    large: 32,
  };

  return (
    <div
      className={`${sizeStyles[size]} rounded-full overflow-hidden bg-secondary-base flex items-center justify-center`}
    >
      {src ? (
        <Image src={src} alt={alt} className="w-full h-full object-cover" />
      ) : (
        fallbackIcon || <FaUser size={iconSizes[size]} color="#FFFFFF" />
      )}
    </div>
  );
}
