"use client";

import Card from "@/components/ui/Card";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import Tag from "@/components/ui/Tags"

import { FaPlus, FaXmark } from "react-icons/fa6";

import { useEffect, useRef, useState } from "react";

// Temporary genre options
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

  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  const [customTags, setCustomTags] = useState<string[]>([]);
  const [newTag, setNewTag] = useState("");

  const toggleGenre = (genre: string) => {
    setSelectedGenres((prev) =>
      prev.includes(genre) ? prev.filter((g) => g !== genre) : [...prev, genre]
    );
  };

  const setCustomTagInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewTag(e.target.value);
  };

  const removeCustomTag = (removeTag: string) => {
    setCustomTags(customTags.filter((tag) => tag !== removeTag))
  }

  const addCustomTag = () => {
    if (newTag.trim() !== "" && !customTags.includes(newTag.trim())) {
      setCustomTags([...customTags, newTag.trim()]);
      setNewTag("");
    }
  };

  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault()
      // Validate that input value is not already in tag.
      addCustomTag();
    }
  };

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
          <Tag
            key={genre}
            variant={selectedGenres.includes(genre) ? "genre" : "custom"}
            className= {selectedGenres.includes(genre) ? "hover:opacity-90 cursor-pointer" : "cursor-pointer opacity-50 hover:opacity-100"} 
            onClick={() => toggleGenre(genre)}
          >
            {genre}
            {selectedGenres.includes(genre) ? <FaXmark className="w-3 h-3 ml-1"/> : ""}
          </Tag>
        ))}
      </div>

      <label
        className={`text-sm font-medium text-secondary-dark`}
        htmlFor={"tag"}
      >
        Custom Tags (Optional)
      </label>
      {customTags.length > 0 &&  ( 
        <div className="flex flex-wrap gap-2 mb-2">
          {customTags.map((tag) => (
            <Tag
              key={tag}
              variant="custom"
              onClick={() => removeCustomTag(tag)}
            >
              {tag}
              <FaXmark className="w-3 h-3 ml-1"/>
            </Tag>
          ))}
        </div>
      )}

      <div className="flex gap-2">
        <Input
          type="text"
          id="tag"
          value={newTag}
          placeholder="Add a custom tag..."
          onChange={setCustomTagInput}
          onKeyDown={handleInputKeyDown}
        ></Input>
        <Button onClick={addCustomTag}>
          <FaPlus className="w-4 h-4"/>
        </Button>
      </div>
    </div>
  );
}
