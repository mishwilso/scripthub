import Card from "@/components/ui/Card";
import CustomLink from "@/components/ui/CustomLink";
import Dropdown from "@/components/ui/Dropdown";
import IconButton from "@/components/ui/IconButton";

import { BsThreeDotsVertical } from "react-icons/bs";
import { IoTrashOutline } from "react-icons/io5";
import { IoRemoveCircleOutline } from "react-icons/io5";
import { IoEyeOutline } from "react-icons/io5";
import { MdDragIndicator } from "react-icons/md";

import { formatRelativeTime } from "@/lib/utils/formatDates";
import { Chapter } from "@/lib/api/chapters";

export interface ChapterCardProps {
  chapter: Chapter;
  onDragStart: (chapterId: string) => void;
  onDragOver: (chapterId: string) => void;
  onDrop: (chapterId: string) => void;
  onDragEnd: () => void;
  isDragging: boolean;
}

export default function ChapterCard({
  chapter,
  onDragStart,
  onDragOver,
  onDrop,
  onDragEnd,
  isDragging,
}: ChapterCardProps) {
  // When drag start
  const handleDragStart = (event: React.DragEvent<HTMLDivElement>) => {
    // Store what chapter we are dragging
    event.dataTransfer.effectAllowed = "move";
    event.dataTransfer.setData("chapterId", chapter.id);
    onDragStart(chapter.id);
  };

  // When drag is over 0 drop the effects
  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault(); // allow for drop effect
    event.dataTransfer.dropEffect = "move";
    onDragOver(chapter.id);
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    onDrop(chapter.id);
  };

  const handleDragEnd = () => {
    onDragEnd();
  };

  return (
    <Card
      className={`cursor-grab active:cursor-grabbing py-6 px-7 hover:shadow-lg hover:border-outline-input hover:bg-neutral-dark/5 ${
        isDragging ? "opacity-50 scale-95" : "opacity-100 scale-100"
      }`}
      rounded="sm"
      draggable={true}
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      onDragEnd={handleDragEnd}
    >
      <div className="flex flex-col md:flex-row md:justify-between items-start md:items-center gap-9">
        <div className="flex w-full md:w-auto justify-between items-center gap-4">
          <MdDragIndicator size={24} />
          <div className="space-y-1">
            <h3 className="font-bold text-neutral-dark">{chapter.title}</h3>
            <p className="text-xs text-secondary-dark/70">
              {chapter.word_count} words - Last Updated{" "}
              {formatRelativeTime(new Date(chapter.updated_at))}
            </p>
          </div>
          <div className="md:hidden">
            <ChapterOptions href={"/"} />
          </div>
        </div>
        <div className="flex w-full md:w-auto items-center justify-between gap-9">
          <CustomLink color="secondary" href={`/editor/${chapter.id}`}>
            Continue Writing
          </CustomLink>
          <div className="hidden md:block">
            <ChapterOptions href={"/"} />
          </div>
        </div>
      </div>
    </Card>
  );
}

export function ChapterOptions({ href }: { href: string }) {
  return (
    <Dropdown>
      <Dropdown.Button>
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
