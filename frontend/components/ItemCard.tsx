import Link from "next/link";
import { Card, CardBody, CardFooter, Image } from "@heroui/react";
import { IconPhoto, IconStar } from "@tabler/icons-react";
import { Item } from "@/lib/types";

interface ItemCardProps {
  item: Item;
}

export function ItemCard({ item }: ItemCardProps) {
  return (
    <Link href={`/marketplace/${item.id}`}>
      <Card className="border border-default-200 hover:border-default-300 transition-all">
        <CardBody className="p-0 overflow-hidden">
          <div className="relative aspect-square bg-default-100 flex items-center justify-center">
            {item.images && item.images.length > 0 ? (
              <Image
                src={item.images[0]}
                alt={item.title}
                className="h-full w-full object-cover"
                radius="none"
              />
            ) : (
              <IconPhoto className="h-12 w-12 text-default-300" stroke={1.5} />
            )}
            {item.status === "SOLD" && (
              <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                <span className="text-sm font-medium text-white">Sold</span>
              </div>
            )}
            {item.isMentorRecommended && (
              <div className="absolute top-2 right-2 rounded-full bg-success-500 p-1">
                <IconStar className="h-3 w-3 text-white" fill="currentColor" />
              </div>
            )}
          </div>
        </CardBody>
        <CardFooter className="flex-col items-start p-3">
          <h3 className="font-medium text-black dark:text-white truncate text-sm w-full">
            {item.title}
          </h3>
          <p className="mt-1 font-bold text-danger">
            £{item.price.toFixed(2)}
          </p>
        </CardFooter>
      </Card>
    </Link>
  );
}
