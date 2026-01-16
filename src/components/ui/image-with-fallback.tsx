"use client";

import Image from "next/image";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Image as ImageIcon } from "lucide-react";

interface ImageWithFallbackProps {
  src: string;
  alt: string;
  fallbackSrc?: string;
  fill?: boolean;
  width?: number;
  height?: number;
  className?: string;
  priority?: boolean;
  sizes?: string;
  quality?: number;
}

export function ImageWithFallback({
  src,
  alt,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  fallbackSrc,
  className,
  ...props
}: ImageWithFallbackProps) {
  const [isError, setIsError] = useState(false);
  const [prevSrc, setPrevSrc] = useState(src);

  if (src !== prevSrc) {
    setPrevSrc(src);
    setIsError(false);
  }

  const handleError = () => {
    setIsError(true);
  };

  if (isError) {
    return <ImagePlaceholder className={className} />;
  }

  return (
    <Image
      {...props}
      src={src}
      alt={alt}
      className={cn(className)}
      onError={handleError}
    />
  );
}

// Placeholder component for when no image is available
interface ImagePlaceholderProps {
  className?: string;
}

export function ImagePlaceholder({
  className,
}: ImagePlaceholderProps) {
  return (
    <div
      className={cn(
        "w-full h-full bg-gray-200 flex items-center justify-center",
        className
      )}
    >
      <ImageIcon className="w-10 h-10 text-gray-400" />
    </div>
  );
}
