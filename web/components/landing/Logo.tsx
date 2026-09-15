import Image from "next/image";
import Link from "next/link";

export function Logo({
  href = "/",
  priority = false,
}: {
  href?: string;
  priority?: boolean;
}) {
  return (
    <Link href={href} className="flex items-center gap-2.5">
      <Image
        src="/icon.png"
        alt=""
        width={28}
        height={28}
        className="rounded-md"
        priority={priority}
      />
      <span className="font-instrumentSerif text-[1.65rem] italic leading-none tracking-tight text-white">
        ShareSpace
      </span>
    </Link>
  );
}
