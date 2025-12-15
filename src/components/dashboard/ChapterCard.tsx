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
  book_id: string;
  title: string;
  word_count: number;
  updated_at: string;
  book_title: string;
  href: string;
}

export default function ChapterCard({
  title,
  word_count,
  updated_at,
  book_title,
  href,
}: ChapterCardProps) {
  return (
    <Card className="py-4 px-7 hover:shadow-md" rounded="sm">
      <div className="flex flex-col md:flex-row md:justify-between items-start md:items-center gap-9">
        <div className="flex w-full md:w-auto justify-between items-start">
          <div className="flex flex-col gap-1">
            <h3 className="pb-1 font-medium">{title}</h3>
            <p className="text-sm text-secondary-dark/90">{book_title}</p>
            <p className="text-xs text-secondary-dark/70">
              {word_count} words - Last Updated{" "}
              {formatRelativeTime(new Date(updated_at))}
            </p>
          </div>
          <div className="md:hidden">
            <ChapterOptions href={href} />
          </div>
        </div>
        <div className="flex w-full md:w-auto items-center justify-between gap-9">
          <Button color="secondary" responsive={false}>
            Continue Writing
          </Button>
          <div className="hidden md:block">
            <ChapterOptions href={href} />
          </div>
        </div>
      </div>
    </Card>
  );
}

export function ChapterOptions({ href }: { href: string }) {
  return (
    <Dropdown>
      <Dropdown.Button asChild>
        <IconButton altText="Chapter options" variant="standard" inert={true}>
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
