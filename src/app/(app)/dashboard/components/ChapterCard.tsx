import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import Dropdown from "@/components/ui/Dropdown";
import IconButton from "@/components/ui/IconButton";

import { BsThreeDotsVertical } from "react-icons/bs";
import { IoTrashOutline } from "react-icons/io5";
import { IoRemoveCircleOutline } from "react-icons/io5";
import { IoEyeOutline } from "react-icons/io5";

import { formatRelativeTime } from "@/lib/utils/formatDates";

export interface ChapterCardProps {
  chapterNum: number | string;
  bookName: string;
  wordCount: number | string;
  lastUpdated: Date;
  href: string;
}

export default function ChapterCard({
  chapterNum,
  bookName,
  wordCount,
  lastUpdated,
  href,
}: ChapterCardProps) {
  return (
    <Card className="py-4 px-7 hover:shadow-md" rounded="sm" >
        <div className="flex flex-col md:flex-row gap-9 md:justify-between items-start">
            <div className="flex flex-col">
                <h3 className="pb-2 font-medium">Chapter {chapterNum}</h3>
                <p className="text-sm text-secondary-dark/90">{bookName}</p>
                <p className="text-xs text-secondary-dark/70">
                {wordCount} words - Last Updated {formatRelativeTime(lastUpdated)}
                </p>
            </div>
            <div className="flex justify-between md:gap-9 my-auto">
                <Button color="secondary">Continue Writing</Button>
                <ChapterOptions href={href} />
            </div>
        </div>
    </Card>
  );
}

export function ChapterOptions({ href }: { href: string }) {
  return (
    <Dropdown>

      <Dropdown.Button>
        <IconButton altText="Chapter options" variant="standard"inert={true}>
          <BsThreeDotsVertical />
        </IconButton>
      </Dropdown.Button>

      <Dropdown.Menu position="top span-left">

        <Dropdown.Option startIcon={<IoEyeOutline />} href={href}>
          View in Book
        </Dropdown.Option>

        <Dropdown.Option startIcon={<IoRemoveCircleOutline />}>
          Remove from List
        </Dropdown.Option>

        <Dropdown.Divider />

        <Dropdown.Option startIcon={<IoTrashOutline />} danger>
          Delete Chapter
        </Dropdown.Option>

      </Dropdown.Menu>
    </Dropdown>
  );
}
