"use client";

import Card from "@/components/ui/Card";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import Tag from "@/components/ui/Tags";
import Textarea from "@/components/ui/Textarea";

import { FaPlus, FaXmark } from "react-icons/fa6";
import { FiUpload } from "react-icons/fi";
import { IoMdImages } from "react-icons/io";

import { useEffect, useRef, useState } from "react";
import { Label } from "@/components/ui/Label";

import Image from "next/image";

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

  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  const [customTags, setCustomTags] = useState<string[]>([]);
  const [newTag, setNewTag] = useState("");
  const [coverImage, setCoverImage] = useState<string | null>(null);
  const [coverFileName, setCoverFileName] = useState<string>("");

  const [loading, setLoading] = useState(false);

  const handleBookTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBookTitle(e.target.value);
  };

  const handleDescriptionChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setDescription(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form Submitted");
  };

  const toggleGenre = (genre: string) => {
    setSelectedGenres((prev) =>
      prev.includes(genre) ? prev.filter((g) => g !== genre) : [...prev, genre]
    );
  };

  const setCustomTagInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewTag(e.target.value);
  };

  const removeCustomTag = (removeTag: string) => {
    setCustomTags(customTags.filter((tag) => tag !== removeTag));
  };

  const addCustomTag = () => {
    if (newTag.trim() !== "" && !customTags.includes(newTag.trim())) {
      setCustomTags([...customTags, newTag.trim()]);
      setNewTag("");
    }
  };

  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      // Validate that input value is not already in tag.
      addCustomTag();
    }
  };

  const handleRemoveCover = () => {
    console.log("Cover removed");
  };

  const handleCoverUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setCoverImage(reader.result as string);
        setCoverFileName(file.name);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-8">
      <div className="space-y-4 md:col-span-1 w-full">
        <div
          className="relative w-full aspect-[2/3] max-w-72 mx-auto 
        bg-gradient-to-br from-[#FAF8F5] to-[#F5EFE7] rounded-lg 
        border-2 border-dashed border-[#E3DAD1] hover:border-primary-base 
        transition-colors cursor-pointer group overflow-hidden"
          onClick={() => document.getElementById("cover-upload")?.click()}
        >
          {coverImage ? (
            <>
              <Image src={coverImage} alt="Book cover" fill />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-colors flex items-center justify-center">
                <div className="opacity-0 group-hover:opacity-100 transition-opacity text-center text-white">
                  <FiUpload className="w-8 h-8 mx-auto mb-2" />
                  <p className="text-sm">Change Cover</p>
                </div>
              </div>
              <Button
                type="button"
                variant="contained"
                color="error"
                size="small"
                className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                onClick={handleRemoveCover}
              >
                <FaXmark className="w-4 h-4" />
              </Button>
            </>
          ) : (
            <div className="absolute inset-0 flex flex-col items-center justify-center text-[#B07A5B] p-6">
              <IoMdImages className="w-16 h-16 mb-3 opacity-40" />
              <p className="text-center mb-1">Click to upload cover</p>
              <p className="text-xs text-center text-muted-foreground">
                JPG, PNG, or WEBP
              </p>
            </div>
          )}
        </div>
        <input
          id="cover-upload"
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleCoverUpload}
        />
        {coverFileName && (
          <p className="text-xs text-muted-foreground text-center truncate">
            {coverFileName}
          </p>
        )}
      </div>

      <Card className={"col-span-2 px-6 md:px-8 py-12 md:py-8 flex flex-col"}>

        <div className="space-y-2 pb-6">
          <h2 className="text-xl font-semibold">Create New Book</h2>
          <p className="">Fill in the details for your new book</p>
        </div>

        {/* Look into: website upload cover image react */}
        {/* Book Title, Description, Genre Tags, Create first chap row */}
        {/* Cancel Submit */}

        <form onSubmit={handleSubmit} noValidate className="space-y-4">

          <Input
            width="small"
            type="text"
            placeholder="Enter your book title"
            label="Book Title"
            value={bookTitle}
            onChange={handleBookTitleChange}
            required
            errorMessage={errors.bookTitle}
            error={!!errors.bookTitle}
          />

          {/* Should be a textarea */}
          <div className="space-y-2">
            <Label htmlFor="Description">Description</Label>
            <Textarea
              id="Description"
              
              placeholder="A brief tagline or synopsis..."
              value={description}
              onChange={handleDescriptionChange}
              rows={3}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="GenreTags" required>
              Genre Tags
            </Label>
            <div className="flex flex-wrap gap-2">
              {GENRE_OPTIONS.map((genre) => (
                <Tag
                  key={genre}
                  variant={selectedGenres.includes(genre) ? "genre" : "custom"}
                  className={
                    selectedGenres.includes(genre)
                      ? "hover:opacity-90 cursor-pointer"
                      : "cursor-pointer opacity-50 hover:opacity-100"
                  }
                  onClick={() => toggleGenre(genre)}
                >
                  {genre}
                  {selectedGenres.includes(genre) ? (
                    <FaXmark className="w-3 h-3 ml-1" />
                  ) : (
                    ""
                  )}
                </Tag>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="CustomGenreTags">Custom Tags (Optional)</Label>
            {customTags.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-2">
                {customTags.map((tag) => (
                  <Tag
                    key={tag}
                    variant="custom"
                    onClick={() => removeCustomTag(tag)}
                    className="hover:opacity-90 cursor-pointer"
                  >
                    {tag}
                    <FaXmark className="w-3 h-3 ml-1" />
                  </Tag>
                ))}
              </div>
            )}

            <div className="flex gap-2">
              <Input
                type="text"
                id="tag"
                width="small"
                value={newTag}
                placeholder="Add a custom tag..."
                onChange={setCustomTagInput}
                onKeyDown={handleInputKeyDown}
              ></Input>
              <Button onClick={addCustomTag}>
                <FaPlus className="w-4 h-4" />
              </Button>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="create-chapter"
              checked={createFirstChapter}
              onCheckedChange={(checked) => setCreateFirstChapter(checked as boolean)}
            />
            <Label htmlFor="create-chapter" className="cursor-pointer">
              Create first chapter now?
            </Label>
          </div>

          <div className="flex gap-3 pt-4">
            <Button
              type="button"
              variant="outlined"
              onClick={() => navigate("/dashboard")}
              className="flex-1 border-[#E3DAD1] text-[#B07A5B] hover:bg-[#FAF8F5]"
            >
              Cancel
            </Button>
            <Button type="submit" className="flex-1 bg-primary hover:bg-primary/90 text-white">
              Create Book
            </Button>
          </div>

        </form>
      </Card>
    </div>
  );
}

export function GenreTags() {
  return <div className="space-y-4"></div>;
}
