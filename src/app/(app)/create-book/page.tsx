"use client";

import Card from "@/components/ui/Card";
import Input from "@/components/ui/Input";
import Badge from "@/components/ui/Badge";

import { FaPlus } from "react-icons/fa6";

import { useEffect, useRef, useState } from "react";

const GENRE_OPTIONS = [
  "Fantasy",
  "Sci-Fi",
  "Mystery",
  "Thriller",
  "Romance",
  "Horror",
  "Historical",
  "Literary Fiction",
  "Young Adult",
  "Adventure",
];

export default function CreateBookPage() {
  const [bookTitle, setBookTitle] = useState("");
  const [description, setDescription] = useState("");

  const [openChapter, setOpenChapter] = useState(false);

  const [error, setError] = useState<string | null>(null);
  const [errors, setErrors] = useState<{ [key: string]: string | null }>({
    bookTitle: null,
    description: null,
    tags: null,
  });

  const [loading, setLoading] = useState(false);

  const handleBookTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBookTitle(e.target.value);
  };

  const handleDescriptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDescription(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form Submitted");
  };

  return (
    <div className="mt-6 flex flex-col w-full gap-6">
      <p>Create Book Page</p>
      <Card>
        <h2>Create New Book</h2>
        <p>Start your next writing project</p>

        {/* Look into: website upload cover image react */}
        {/* Book Title, Description, Genre Tags, Create first chap row */}
        {/* Cancel Submit */}

        <form onSubmit={handleSubmit} noValidate>
          <Input
            type="text"
            placeholder="Enter your book title"
            label="Book Title"
            fullWidth
            value={bookTitle}
            onChange={handleBookTitleChange}
            required
            errorMessage={errors.bookTitle}
            error={!!errors.bookTitle}
          />

          {/* Should be a textarea */}
          <Input
            type="text"
            placeholder="A brief tagline or synopsis..."
            label="Description"
            fullWidth
            value={description}
            onChange={handleDescriptionChange}
            errorMessage={errors.description}
            error={!!errors.description}
          />

          <GenreTags />
        </form>
      </Card>
    </div>
  );
}

export function GenreTags() {
  const dropdownRef = useRef<HTMLDivElement>(null);

  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  const [tags, setTags] = useState<string[]>([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [newTag, setNewTag] = useState("");

  const toggleGenre = (genre: string) => {
    setSelectedGenres((prev) =>
      prev.includes(genre) ? prev.filter((g) => g !== genre) : [...prev, genre]
    );
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewTag(e.target.value);
    setIsDropdownOpen(true);
  };

  const handleAddNewTag = () => {
    if (newTag.trim() !== "" && !tags.includes(newTag.trim())) {
      setTags([...tags, newTag.trim()]);
      setNewTag("");
    }
  };

  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      // Validate that input value is not already in tag.
      handleAddNewTag();
    }
  };

  useEffect(() => {
    const handleClickOutside = (e: React.MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="space-y-2">
      <label
        className={`text-sm font-medium text-secondary-dark after:content-['*'] after:ml-0.5 after:text-negative-base`}
        htmlFor={"tag"}
      >
        Genre Tags
      </label>

      <div className="flex flex-wrap gap-2">
        {GENRE_OPTIONS.map((genre) => (
          <Badge
            key={genre}
            variant={selectedGenres.includes(genre) ? "primary" : "secondary"}
            className="cursor-pointer"
            onClick={() => toggleGenre(genre)}
          >
            {genre}
          </Badge>
        ))}
      </div>

      <div>
        {tags.map((tag, index) => (
          <span key={index} className="">
            {tag}
          </span>
        ))}
      </div>

      <Input
        type="text"
        id="tag"
        placeholder="Add tags..."
        onChange={handleInputChange}
        onKeyDown={handleInputKeyDown}
        onFocus={() => setIsDropdownOpen(true)}
      ></Input>
      {isDropdownOpen && (
        <div
          ref={dropdownRef}
          className="absolute z-50 w-full mt-1 bg-card border rounded-md shadow-lg max-h-64 overflow-y-auto"
        >
          <button
            type="button"
            onClick={() => console.log("Add new tag")}
            className={`w-full flex items-center gap-2 px-3 py-2 border-t hover:bg-accent transition-colors`}
          >
            <FaPlus size={16} />
            <span className="text-sm">
              <span className="text-muted-foreground">Create: </span>
              <span>&quot;{newTag}&quot;</span>
            </span>
          </button>
        </div>
      )}
    </div>
  );
}
