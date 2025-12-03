"use client";

import Card from "@/components/ui/Card";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import Tag from "@/components/ui/Tags";
import Textarea from "@/components/ui/Textarea";
import LoadingOverlay from "@/components/ui/LoadingOverlay";
import ErrorBanner from "@/components/ui/ErrorBanner";

import { Checkbox } from "@/components/ui/Checkbox";

import { FaPlus, FaXmark } from "react-icons/fa6";
import { FiUpload } from "react-icons/fi";
import { IoMdImages } from "react-icons/io";

import { useEffect, useRef, useState } from "react";
import { Label } from "@/components/ui/Label";

import Image from "next/image";
import { useRouter } from "next/navigation";

import { useAuth } from "@/context/AuthContext";
import {
  createBook,
  NewBook,
  uploadBookCover,
  getBookCoverURL,
} from "@/lib/api/books";
import { createChapter } from "@/lib/api/chapters";

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

const COLOR_PALETTE = [
  { name: "Coral", color: "#E88A7F" },
  { name: "Terracotta", color: "#D97757" },
  { name: "Sage", color: "#8FA88E" },
  { name: "Forest", color: "#5a6e5a" },
  { name: "Plum", color: "#9B7E9E" },
  { name: "Navy", color: "#4A5D7E" },
  { name: "Burgundy", color: "#8B4A5B" },
  { name: "Teal", color: "#5A8D8C" },
];

const DESCRIPTION_MAX = 1000;

export default function CreateBookPage() {
  // ==========================================
  // AUTH
  const { user } = useAuth();

  // ==========================================
  // ROUTING
  const router = useRouter();

  // ==========================================
  // FORM STATE
  // Book details
  const [bookTitle, setBookTitle] = useState("");
  const [description, setDescription] = useState("");
  const [coverFile, setCoverFile] = useState<File | null>(null);
  const [coverImage, setCoverImage] = useState<string | null>(null);
  const [coverFileName, setCoverFileName] = useState<string>("");
  const [selectedColor, setSelectedColor] = useState<string | null>(null);

  // Genre and tag management
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  const [customTags, setCustomTags] = useState<string[]>([]);
  const [newTag, setNewTag] = useState("");

  // Options
  const [createFirstChapter, setCreateFirstChapter] = useState(false);

  // ==========================================
  // UI STATE
  const [loading, setLoading] = useState(false);
  const [charCount, setCharCount] = useState(0);

  // ==========================================
  // ERROR STATE
  const [error, setError] = useState<string | null>(null);
  const [errors, setErrors] = useState<{ [key: string]: string | null }>({
    bookTitle: null,
    description: null,
    genre: null,
    coverImage: null,
  });

  // ==========================================
  // FORM INPUT HANDLERS
  const handleBookTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBookTitle(e.target.value);
  };

  const handleDescriptionChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setDescription(e.target.value);
  };

  // ==========================================
  // GENRE MANAGEMENT
  // Toggle predefined genre selection
  const toggleGenre = (genre: string) => {
    setSelectedGenres((prev) =>
      prev.includes(genre) ? prev.filter((g) => g !== genre) : [...prev, genre]
    );
  };

  // ==========================================
  // CUSTOM TAG MANAGEMENT
  // Update custom tag input field
  const setCustomTagInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewTag(e.target.value);
  };

  // Add custom tag to list
  const addCustomTag = () => {
    if (newTag.trim() !== "" && !customTags.includes(newTag.trim())) {
      setCustomTags([...customTags, newTag.trim()]);
      setNewTag("");
    }
  };

  // Remove custom tag from list
  const removeCustomTag = (removeTag: string) => {
    setCustomTags(customTags.filter((tag) => tag !== removeTag));
  };

  // Handle Enter key to add tag
  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addCustomTag();
    }
  };

  // ==========================================
  // COVER IMAGE MANAGEMENT
  // Handle cover image upload
  const handleCoverUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setCoverImage(reader.result as string);
        setCoverFileName(file.name);
      };
      reader.readAsDataURL(file);
      setSelectedColor(null);
      setCoverFile(file);
    }
  };

  // Remove uploaded cover image
  const handleRemoveCover = (e: React.MouseEvent<HTMLButtonElement>) => {
    setCoverImage(null);
    setCoverFileName("");
    setSelectedColor(null);
    e.stopPropagation();
  };

  const handleCustomCover = (color: string) => {
    setCoverImage(null);
    setCoverFileName("");
    setSelectedColor(color);
  };

  // ==========================================
  // FORM VALIDATION & SUBMISSION
  // Validate form fields
  const validateForm = () => {
    const newErrors: { [key: string]: string | null } = {
      bookTitle: null,
      description: null,
      genre: null,
      coverImage: null,
    };

    let isValid = true;

    // Book Title Validation
    if (!bookTitle.trim()) {
      newErrors.bookTitle = "Book Title is required.";
      isValid = false;
    } else if (bookTitle.length < 2) {
      newErrors.bookTitle = "Book Title should be at least 2 characters.";
      isValid = false;
    } else if (bookTitle.length > 100) {
      newErrors.bookTitle = "Book Title should be less than 100 characters.";
      isValid = false;
    }

    // Genre Validation
    if (selectedGenres.length === 0) {
      newErrors.genre = "At least one genre must be selected.";
      isValid = false;
    }

    // Book Cover Validation
    if (!coverImage && !selectedColor) {
      newErrors.coverImage = "Must have a book cover selected.";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    if (!validateForm()) {
      setLoading(false);
      return;
    }

    try {
      if (!user) {
        setError("You must be logged in to create a book");
        return;
      }

      let bookData: NewBook;
      if (coverFile) {
        //First upload cover image and grab url
        const bookCoverData = await uploadBookCover(
          coverFile,
          coverFileName,
          user.id
        );
        const bookUrl = await getBookCoverURL(bookCoverData.path);

        bookData = await createBook({
          cover_url: bookUrl.publicUrl,
          description: description,
          genres: selectedGenres,
          custom_genres: customTags,
          is_public: false,
          title: bookTitle,
          user_id: user.id,
          word_count: 0,
        });

        console.log(bookData);
      } else {
        bookData = await createBook({
          book_color: selectedColor,
          description: description,
          genres: selectedGenres,
          custom_genres: customTags,
          is_public: false,
          title: bookTitle,
          user_id: user.id,
          word_count: 0,
        });

        console.log(bookData);
      }
      // Check if chapter should be made
      if (createFirstChapter) {
        if (bookData && bookData.id) {
          const chapterData = await createChapter({
            book_id: bookData.id,
            order_index: 1,
            title: "Untitled Chapter",
          });
          router.push(`/books/${bookData.id}/chapters/${chapterData.id}`);
        } else {
          router.push(`/books/${bookData.id}`);
        }
      } else {
        router.push(`/books/${bookData.id}`);
      }
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "An unexpected error occurred";
      setLoading(false);
      setError(errorMessage);
      console.error("Error creating book:", err);
    } finally {
      setLoading(false);
    }
  };

  // ========================================
  // USE EFFECT
  useEffect(() => {
    setCharCount(description.length);
  }, [description]);

  return (
    <div>
      <LoadingOverlay
        isVisible={loading}
        message="Crafting your story's beginning..."
      />

      <ErrorBanner
        message={error}
        onClose={() => setError(null)}
        duration={5000}
      />

      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="space-y-4 my-auto md:col-span-1 w-full">
          <div className="space-y-2 pt-6">
            <h2 className="text-xl font-semibold">Book Cover</h2>
            <p className="">Upload an image for your book cover</p>
          </div>
          <div
            className="box-border relative w-full aspect-[2/3] max-w-72 mx-auto 
          bg-gradient-to-br from-[#FAF8F5] to-[#F5EFE7] rounded-lg 
          border-2 border-dashed border-[#E3DAD1] hover:border-primary-base 
          transition-colors cursor-pointer group overflow-hidden"
            onClick={() => document.getElementById("cover-upload")?.click()}
          >
            {coverImage ? (
              <>
                <Image src={coverImage} alt="Book cover" fill />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-colors flex items-center justify-center">
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity text-center text-white-base">
                    <FiUpload className="w-8 h-8 mx-auto mb-2" />
                    <p className="text-sm">Change Cover</p>
                  </div>
                </div>
                <button
                  type="button"
                  className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity z-30 text-white-base bg-negative-base/75 px-2 py-2 rounded-sm hover:bg-negative-base"
                  onClick={handleRemoveCover}
                >
                  <FaXmark className="w-4 h-4" />
                </button>
              </>
            ) : selectedColor ? (
              <>
                <div
                  className="absolute inset-0 flex flex-col items-center justify-center p-6"
                  style={{ backgroundColor: selectedColor }}
                >
                  {/* Decorative elements */}
                  <div className="absolute top-10 left-6 right-6 pt-2 h-36 bg-white-base/15 rounded-2xl  overflow-hidden">
                    {" "}
                    <h3
                      className="text-white-base text-center px-4 leading-tight line-clamp-3"
                      style={{
                        fontFamily: "serif",
                        fontSize: "2rem",
                        fontWeight: "bold",
                      }}
                    >
                      {bookTitle || "Your Book Title"}{" "}
                    </h3>
                  </div>
                  <div className="absolute top-52 left-6 right-6 h-5 bg-white-base/15 rounded-2xl" />
                  <div className="absolute top-60 left-6 right-6 h-5 bg-white-base/15 rounded-2xl" />
                </div>
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-colors flex items-center justify-center">
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity text-center text-white-base">
                    <FiUpload className="w-8 h-8 mx-auto mb-2" />
                    <p className="text-sm">Upload Cover</p>
                  </div>
                </div>
                <button
                  type="button"
                  className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity z-30 text-white-base bg-negative-base/75 px-2 py-2 rounded-sm hover:bg-negative-base"
                  onClick={handleRemoveCover}
                >
                  <FaXmark className="w-4 h-4" />
                </button>
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
          {(coverFileName || selectedColor) && (
            <p className="text-xs text-muted-foreground text-center truncate">
              {coverFileName ? `${coverFileName}` : "Generated Cover"}
            </p>
          )}
          {errors.coverImage && (
            <p
              id={`coverImage-error`}
              className="text-sm text-negative-base text-center"
            >
              {errors.coverImage}
            </p>
          )}
          <div className="space-y-3 w-full">
            <p className="border-t-2 pt-4 text-center">
              Or choose a color for a default cover:
            </p>
            <div className="grid grid-cols-4 gap-3 max-w-xs mx-auto">
              {COLOR_PALETTE.map((colorOption) => (
                <button
                  key={colorOption.name}
                  type="button"
                  onClick={() => handleCustomCover(colorOption.color)}
                  className={`w-full aspect-square rounded-full transition-all hover:scale-105 ${
                    selectedColor === colorOption.color
                      ? "ring-4 ring-offset-2 ring-neutral-base"
                      : "hover:ring-2 ring-offset-2 ring-neutral-base"
                  }`}
                  style={{ backgroundColor: colorOption.color }}
                  title={colorOption.name}
                />
              ))}
            </div>
          </div>
        </div>

        <Card className={"col-span-2 px-6 md:px-8 py-12 md:py-8 flex flex-col"}>
          <div className="space-y-2 pb-6">
            <h2 className="text-xl font-semibold">Create New Book</h2>
            <p className="">Fill in the details for your new book</p>
          </div>

          {/* Look into: website upload cover image react */}
          {/* Book Title, Description, Genre Tags, Create first chap row */}
          {/* Cancel Submit */}

          <form onSubmit={handleSubmit} noValidate className="space-y-6">
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
                maxLength={DESCRIPTION_MAX}
              />
              <p className={`text-right text-sm`}>
                {charCount}/{DESCRIPTION_MAX}
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="GenreTags" required>
                Genre Tags
              </Label>
              <div className="flex flex-wrap gap-2">
                {GENRE_OPTIONS.map((genre) => (
                  <Tag
                    key={genre}
                    variant={
                      selectedGenres.includes(genre) ? "genre" : "custom"
                    }
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
              {errors.genre && (
                <p id={`genre-error`} className="text-sm text-negative-base">
                  {errors.genre}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="CustomGenreTags">Custom Tags (Optional)</Label>
              {customTags.length > 0 && (
                <div className="flex flex-wrap gap-2 pb-1">
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
                <Button color="secondary" onClick={addCustomTag}>
                  <FaPlus className="w-4 h-4" />
                </Button>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="create-chapter"
                checked={createFirstChapter}
                onCheckedChange={(checked) =>
                  setCreateFirstChapter(checked as boolean)
                }
              />
              <Label htmlFor="create-chapter" className="cursor-pointer">
                Create first chapter now?
              </Label>
            </div>

            <div className="flex gap-3 pt-4">
              <Button
                type="button"
                variant="outlined"
                onClick={() => router.push("/dashboard")}
                className="flex-1 border-[#E3DAD1] text-[#B07A5B] hover:bg-[#FAF8F5]"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="flex-1 bg-primary hover:bg-primary/90 text-white"
              >
                Create Book
              </Button>
            </div>
          </form>
        </Card>
      </div>
    </div>
  );
}
