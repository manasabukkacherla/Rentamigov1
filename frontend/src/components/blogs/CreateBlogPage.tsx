"use client";

import type React from "react";

import { useState, useRef, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  LucideImage,
  X,
  Upload,
  Check,
  AlertCircle,
  ChevronRight,
  ChevronLeft,
  Eye,
  Save,
  Layout,
  Type,
  FileText,
  TagIcon,
  ImageIcon,
  Settings,
  ArrowLeft,
} from "lucide-react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import TipTapImage from "@tiptap/extension-image";
import Link from "@tiptap/extension-link";
import TextAlign from "@tiptap/extension-text-align";
import Underline from "@tiptap/extension-underline";
import { getBlogById, createBlog, updateBlog } from "../blogs/blogService1";
import TagInput from "../blogs/TagInput";
import EditorMenuBar from "../blogs/EditorMenuBar";
import type { Blogpost } from "../Blogs/types";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import { toast } from "react-toastify";

// interface CreateBlog {
//   isEditing: boolean
// }

// const CreateBlogPage: React.FC<CreateBlog> = ({ isEditing }) => {
const CreateBlogPage = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [coverImage, setCoverImage] = useState("");
  const [category, setCategory] = useState("");
  const [readTime, setReadTime] = useState(5);
  // const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<"published" | "draft">("draft");

  const navigate = useNavigate();
  const isEditing = window.location.pathname.includes("edit");
  const id = isEditing ? window.location.pathname.split("/").pop() : null;

  // const validateForm = () => {
  //   const newErrors = {};
  //   // Add validation logic here
  //   setErrors(newErrors);
  //   return Object.keys(newErrors).length === 0;
  // };
  // const navigate = useNavigate()
  // const { id } = useParams<{ id: string }>()
  // const isEditing = !!id

  // // Form state
  // const [title, setTitle] = useState("")
  // const [content, setContent] = useState("")
  // const [excerpt, setExcerpt] = useState("")
  // const [tags, setTags] = useState<string[]>([])
  const [currentTag, setCurrentTag] = useState("");
  // const [coverImage, setCoverImage] = useState<string | null>(null)
  // const [category, setCategory] = useState("Lifestyle")
  // const [readTime, setReadTime] = useState(5)
  // const [isSubmitting, setIsSubmitting] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({});
  // const [successMessage, setSuccessMessage] = useState("")

  // UI state
  const [activeStep, setActiveStep] = useState(0);
  const [showPreview, setShowPreview] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [autoSaveMessage, setAutoSaveMessage] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const previewRef = useRef<HTMLDivElement>(null);

  // Steps for the creation process
  const steps = [
    { id: "basics", title: "Basic Info", icon: <Layout className="h-5 w-5" /> },
    { id: "content", title: "Content", icon: <FileText className="h-5 w-5" /> },
    { id: "media", title: "Media", icon: <ImageIcon className="h-5 w-5" /> },
    {
      id: "metadata",
      title: "Metadata",
      icon: <TagIcon className="h-5 w-5" />,
    },
    {
      id: "settings",
      title: "Settings",
      icon: <Settings className="h-5 w-5" />,
    },
  ];

  // Initialize editor
  const editor = useEditor({
    extensions: [
      StarterKit,
      Placeholder.configure({
        placeholder: "Start writing your amazing blog post here...",
      }),
      TipTapImage.configure({
        allowBase64: true,
      }),
      Link.configure({
        openOnClick: false,
      }),
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
      Underline,
    ],
    content: content,
    onUpdate: ({ editor }) => {
      setContent(editor.getHTML());

      // Clear error when content is edited
      if (errors.content) {
        setErrors((prev) => {
          const newErrors = { ...prev };
          delete newErrors.content;
          return newErrors;
        });
      }

      // Trigger auto-save
      // handleAutoSave()
    },
  });

  useEffect(() => {
    const loadData = async () => {
      if (isEditing && id) {
        try {
          const response = await axios.get(`/api/blog/${id}`);
          if (response.data.success) {
            let blog = response.data.blog;
            if (blog) {
              // Check if the blog is published
              // if (blog.status === 'published') {
              //   toast.error('Published posts cannot be edited');
              //   navigate('/blogs/Dashboard');
              //   return;
              // }

              setTitle(blog.title);
              setContent(blog.content);
              setExcerpt(blog.excerpt || "");
              setTags(blog.tags);
              setCoverImage(blog.coverImage);
              setCategory(blog.category);
              setReadTime(blog.readTime);
              setStatus(blog.status);

              // Update editor content
              if (editor) {
                editor.commands.setContent(blog.content);
              }
            }
          }
        } catch (error) {
          toast.error("Blog not found!");
          navigate("/blogs/Dashboard");
        }
      }
    };

    loadData();
  }, [isEditing, id, editor, navigate]);

  // Scroll to preview when toggled
  useEffect(() => {
    if (showPreview && previewRef.current) {
      previewRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [showPreview]);

  const handleAddTag = () => {
    if (currentTag.trim() && !tags.includes(currentTag.trim())) {
      setTags([...tags, currentTag.trim()]);
      setCurrentTag("");

      // Clear error when tags are added
      if (errors.tags) {
        setErrors((prev) => {
          const newErrors = { ...prev };
          delete newErrors.tags;
          return newErrors;
        });
      }

      // Trigger auto-save
      // handleAutoSave()
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
    // Trigger auto-save
    // handleAutoSave()
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setCoverImage(reader.result as string);

        // Clear error when image is uploaded
        if (errors.coverImage) {
          setErrors((prev) => {
            const newErrors = { ...prev };
            delete newErrors.coverImage;
            return newErrors;
          });
        }

        // Trigger auto-save
        // handleAutoSave()
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerImageUpload = () => {
    fileInputRef.current?.click();
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (activeStep === 0) {
      if (!title.trim()) newErrors.title = "Title is required";
      if (!excerpt.trim()) newErrors.excerpt = "Excerpt is required";
    }

    if (activeStep === 1) {
      if (!content.trim() || content === "<p></p>")
        newErrors.content = "Content is required";
    }

    if (activeStep === 2) {
      if (!coverImage) newErrors.coverImage = "Cover image is required";
    }

    if (activeStep === 3) {
      if (tags.length === 0) newErrors.tags = "At least one tag is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (
    e: React.FormEvent,
    submitStatus: "draft" | "published"
  ) => {
    e.preventDefault();

    if (!validateForm()) {
      const firstError = Object.keys(errors)[0];
      const element = document.getElementById(firstError);
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "center" });
      }
      return;
    }

    setIsSubmitting(true);

    try {
      const user = sessionStorage.getItem("user");
      console.log(sessionStorage.getItem("user"));

      if (user) {
        const author = JSON.parse(user).id;
        console.log(author);

        const blogData = {
          title,
          content,
          excerpt,
          tags,
          media: {
            coverImage: coverImage || "",
          },
          category,
          readTime,
          author,
          status: submitStatus,
        };

        // console.log(blogData)
        // console.log(status)

        if (isEditing && id) {
          const response = await axios.put(`/api/blog/edit/${id}`, blogData);
          if (response.data.success) {
            toast.success("Blog updated successfully");
          } else {
            toast.error("Failed to update the blog");
          }
        } else {
          const response = await axios.post("/api/blog/add", blogData);
          if (response.data.success) {
            toast.success(response.data.message);
          } else {
            toast.error("Failed to create a blog");
          }
        }

        navigate("/blogs/Dashboard");
      } else {
        toast.error("You must be logged in!");
        navigate("/login");
      }
    } catch (error) {
      console.error("Error saving blog:", error);
      setErrors({ submit: "Failed to save blog. Please try again." });
    } finally {
      setIsSubmitting(false);
    }
  };

  const addImageToEditor = (url: string) => {
    if (editor) {
      editor.chain().focus().setImage({ src: url }).run();
    }
  };

  const handleEditorImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        addImageToEditor(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const nextStep = () => {
    if (validateForm()) {
      if (activeStep < steps.length - 1) {
        setActiveStep(activeStep + 1);
      }
    }
  };

  const prevStep = () => {
    if (activeStep > 0) {
      setActiveStep(activeStep - 1);
    }
  };

  const goToStep = (index: number) => {
    if (validateForm()) {
      setActiveStep(index);
    }
  };

  // Calculate estimated read time based on content length
  // useEffect(() => {
  //   if (content) {
  //     // Average reading speed: 200-250 words per minute
  //     // Strip HTML tags and count words
  //     const text = content.replace(/<[^>]*>/g, "")
  //     const wordCount = text.split(/\s+/).filter(Boolean).length
  //     const estimatedTime = Math.max(1, Math.ceil(wordCount / 200))
  //     setReadTime(estimatedTime)
  //   }
  // }, [content])

  // Format date for preview
  const formattedDate = new Date().toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  return (
    <div className="bg-gray-50 min-h-screen pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Header with back button */}
        <div className="flex items-center mb-8">
          <button
            onClick={() => navigate(-1)}
            className="mr-4 p-2 rounded-full hover:bg-gray-200 transition-colors"
            aria-label="Go back"
          >
            <ArrowLeft className="h-5 w-5" />
          </button>
          <h1 className="text-3xl font-bold">
            {isEditing ? "Edit Blog Post" : "Create New Blog Post"}
          </h1>

          {/* Auto-save indicator */}
          <div className="ml-auto flex items-center">
            {isSaving ? (
              <span className="text-gray-500 flex items-center">
                <svg
                  className="animate-spin -ml-1 mr-2 h-4 w-4 text-gray-500"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Saving...
              </span>
            ) : autoSaveMessage ? (
              <span className="text-green-600 flex items-center">
                <Check className="h-4 w-4 mr-1" />
                {autoSaveMessage}
              </span>
            ) : null}
          </div>
        </div>

        {/* {successMessage && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 bg-green-50 border-l-4 border-green-500 p-4 flex items-center"
          >
            <Check className="h-5 w-5 text-green-500 mr-2" />
            <p className="text-green-700">{successMessage}</p>
          </motion.div>
        )} */}

        {errors.submit && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 bg-red-50 border-l-4 border-red-500 p-4 flex items-center"
          >
            <AlertCircle className="h-5 w-5 text-red-500 mr-2" />
            <p className="text-red-700">{errors.submit}</p>
          </motion.div>
        )}

        {/* Progress steps */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            {steps.map((step, index) => (
              <button
                key={step.id}
                onClick={() => goToStep(index)}
                className={`flex flex-col items-center ${
                  index <= activeStep ? "text-black" : "text-gray-400"
                } transition-colors duration-300`}
              >
                <div
                  className={`flex items-center justify-center w-10 h-10 rounded-full mb-2 ${
                    index < activeStep
                      ? "bg-green-100 text-green-600"
                      : index === activeStep
                      ? "bg-black text-white"
                      : "bg-gray-100 text-gray-400"
                  }`}
                >
                  {index < activeStep ? (
                    <Check className="h-5 w-5" />
                  ) : (
                    step.icon
                  )}
                </div>
                <span className="text-xs font-medium hidden sm:block">
                  {step.title}
                </span>
              </button>
            ))}
          </div>
          <div className="relative mt-2">
            <div className="absolute top-0 left-0 h-1 bg-gray-200 w-full rounded"></div>
            <motion.div
              className="absolute top-0 left-0 h-1 bg-black rounded"
              initial={{ width: `${(activeStep / (steps.length - 1)) * 100}%` }}
              animate={{ width: `${(activeStep / (steps.length - 1)) * 100}%` }}
              transition={{ duration: 0.3 }}
            ></motion.div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="space-y-6">
              <AnimatePresence mode="wait">
                {activeStep === 0 && (
                  <motion.div
                    key="step-0"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ duration: 0.3 }}
                    className="bg-white rounded-lg shadow-md p-6"
                  >
                    <h2 className="text-xl font-bold mb-4 flex items-center">
                      <Type className="h-5 w-5 mr-2" />
                      Basic Information
                    </h2>

                    {/* Title */}
                    <div className="mb-6">
                      <label
                        htmlFor="title"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        Title <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        id="title"
                        value={title}
                        onChange={(e) => {
                          setTitle(e.target.value);
                          if (errors.title) {
                            setErrors((prev) => {
                              const newErrors = { ...prev };
                              delete newErrors.title;
                              return newErrors;
                            });
                          }
                          // handleAutoSave()
                        }}
                        className={`w-full px-4 py-3 border ${
                          errors.title ? "border-red-500" : "border-gray-300"
                        } rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent text-lg`}
                        placeholder="Enter a catchy title..."
                      />
                      {errors.title && (
                        <p className="mt-1 text-sm text-red-600">
                          {errors.title}
                        </p>
                      )}
                    </div>

                    {/* Excerpt */}
                    <div>
                      <label
                        htmlFor="excerpt"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        Excerpt <span className="text-red-500">*</span>
                      </label>
                      <textarea
                        id="excerpt"
                        value={excerpt}
                        onChange={(e) => {
                          setExcerpt(e.target.value);
                          if (errors.excerpt) {
                            setErrors((prev) => {
                              const newErrors = { ...prev };
                              delete newErrors.excerpt;
                              return newErrors;
                            });
                          }
                          // handleAutoSave()
                        }}
                        rows={3}
                        className={`w-full px-4 py-3 border ${
                          errors.excerpt ? "border-red-500" : "border-gray-300"
                        } rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent`}
                        placeholder="Write a brief summary of your blog post..."
                      />
                      {errors.excerpt && (
                        <p className="mt-1 text-sm text-red-600">
                          {errors.excerpt}
                        </p>
                      )}
                      <p className="mt-1 text-sm text-gray-500">
                        This will be displayed in blog cards and search results.
                      </p>
                    </div>
                  </motion.div>
                )}

                {activeStep === 1 && (
                  <motion.div
                    key="step-1"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ duration: 0.3 }}
                    className="bg-white rounded-lg shadow-md"
                  >
                    <div className="p-6 pb-0">
                      <h2 className="text-xl font-bold mb-4 flex items-center">
                        <FileText className="h-5 w-5 mr-2" />
                        Content
                      </h2>
                    </div>

                    {/* Rich Text Editor */}
                    <div
                      className={`border-t ${
                        errors.content ? "border-red-500" : "border-gray-200"
                      }`}
                    >
                      <EditorMenuBar editor={editor} />
                      <div className="p-6 min-h-[400px]">
                        <EditorContent
                          editor={editor}
                          className="prose max-w-none min-h-[400px]"
                        />
                      </div>
                      <div className="border-t border-gray-200 p-4 bg-gray-50 flex justify-between items-center">
                        <div>
                          <input
                            type="file"
                            id="editor-image-upload"
                            className="hidden"
                            accept="image/*"
                            onChange={handleEditorImageUpload}
                          />
                          <button
                            type="button"
                            onClick={() =>
                              document
                                .getElementById("editor-image-upload")
                                ?.click()
                            }
                            className="inline-flex items-center px-3 py-2 border border-gray-300 rounded-md text-sm text-gray-700 bg-white hover:bg-gray-50 transition-colors"
                          >
                            <Upload size={16} className="mr-1" />
                            Add Image
                          </button>
                        </div>
                        <div className="text-sm text-gray-500">
                          {content.length > 0
                            ? `${
                                content
                                  .replace(/<[^>]*>/g, "")
                                  .split(/\s+/)
                                  .filter(Boolean).length
                              } words`
                            : "Start writing..."}
                        </div>
                      </div>
                    </div>
                    {errors.content && (
                      <p className="px-6 py-2 text-sm text-red-600">
                        {errors.content}
                      </p>
                    )}
                  </motion.div>
                )}

                {activeStep === 2 && (
                  <motion.div
                    key="step-2"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ duration: 0.3 }}
                    className="bg-white rounded-lg shadow-md p-6"
                  >
                    <h2 className="text-xl font-bold mb-4 flex items-center">
                      <ImageIcon className="h-5 w-5 mr-2" />
                      Media
                    </h2>

                    {/* Cover Image */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Cover Image <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleImageUpload}
                        accept="image/*"
                        className="hidden"
                        id="coverImage"
                      />

                      {coverImage ? (
                        <div className="relative rounded-lg overflow-hidden group">
                          <img
                            src={coverImage || "/placeholder.svg"}
                            alt="Cover preview"
                            className="w-full h-80 object-cover rounded-md transition-transform duration-300 group-hover:scale-105"
                          />
                          <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                            <button
                              type="button"
                              onClick={triggerImageUpload}
                              className="bg-white text-black p-2 rounded-full hover:bg-gray-100 mr-2"
                            >
                              <Upload size={20} />
                            </button>
                            <button
                              type="button"
                              onClick={() => setCoverImage("null")}
                              className="bg-red-500 text-white p-2 rounded-full hover:bg-red-600"
                            >
                              <X size={20} />
                            </button>
                          </div>
                        </div>
                      ) : (
                        <div
                          onClick={triggerImageUpload}
                          className={`w-full h-80 border-2 border-dashed ${
                            errors.coverImage
                              ? "border-red-500"
                              : "border-gray-300"
                          } rounded-md flex flex-col items-center justify-center cursor-pointer hover:border-gray-400 transition-colors`}
                        >
                          <LucideImage
                            size={48}
                            className={
                              errors.coverImage
                                ? "text-red-400"
                                : "text-gray-400"
                            }
                          />
                          <p
                            className={`mt-2 text-sm ${
                              errors.coverImage
                                ? "text-red-500"
                                : "text-gray-500"
                            }`}
                          >
                            Click to upload cover image
                          </p>
                          <p className="mt-1 text-xs text-gray-400">
                            Recommended size: 1200 x 630 pixels
                          </p>
                        </div>
                      )}
                      {errors.coverImage && (
                        <p className="mt-1 text-sm text-red-600">
                          {errors.coverImage}
                        </p>
                      )}
                    </div>
                  </motion.div>
                )}

                {activeStep === 3 && (
                  <motion.div
                    key="step-3"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ duration: 0.3 }}
                    className="bg-white rounded-lg shadow-md p-6"
                  >
                    <h2 className="text-xl font-bold mb-4 flex items-center">
                      <TagIcon className="h-5 w-5 mr-2" />
                      Metadata
                    </h2>

                    {/* Tags */}
                    <div className="mb-6">
                      <TagInput
                        tags={tags}
                        currentTag={currentTag}
                        onTagChange={(value) => {
                          setCurrentTag(value);
                          // handleAutoSave()
                        }}
                        onAddTag={handleAddTag}
                        onRemoveTag={handleRemoveTag}
                        error={errors.tags}
                      />
                    </div>

                    {/* Category */}
                    <div>
                      <label
                        htmlFor="category"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        Category
                      </label>
                      <input
                        type="text"
                        id="category"
                        value={category}
                        onChange={(e) => {
                          setCategory(e.target.value);
                          // handleAutoSave();
                        }}
                        className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                        placeholder="Enter category"
                      />
                    </div>
                  </motion.div>
                )}

                {activeStep === 4 && (
                  <motion.div
                    key="step-4"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ duration: 0.3 }}
                    className="bg-white rounded-lg shadow-md p-6"
                  >
                    <h2 className="text-xl font-bold mb-4 flex items-center">
                      <Settings className="h-5 w-5 mr-2" />
                      Settings & Publish
                    </h2>

                    {/* Read Time */}
                    <div className="mb-6">
                      <label
                        htmlFor="readTime"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        Estimated Read Time (minutes)
                      </label>
                      <div className="flex items-center">
                        <input
                          type="number"
                          id="readTime"
                          value={readTime}
                          onChange={(e) => {
                            setReadTime(Number.parseInt(e.target.value) || 5);
                            // handleAutoSave()
                          }}
                          min="1"
                          max="60"
                          className="w-20 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent text-center"
                        />
                        <span className="ml-2 text-gray-600">minutes</span>
                      </div>
                      <p className="mt-1 text-sm text-gray-500">
                        Automatically calculated based on content length, but
                        you can adjust if needed.
                      </p>
                    </div>

                    {/* Publishing options */}
                    <div className="mb-6">
                      <h3 className="text-md font-medium mb-2">
                        Publishing Options
                      </h3>
                      <div className="bg-gray-50 p-4 rounded-md">
                        <div className="flex items-center mb-4">
                          <input
                            id="publish-now"
                            name="publish-option"
                            type="radio"
                            checked={true}
                            className="h-4 w-4 text-black focus:ring-black border-gray-300"
                          />
                          <label
                            htmlFor="publish-now"
                            className="ml-2 block text-sm text-gray-700"
                          >
                            Publish immediately
                          </label>
                        </div>
                        <div className="flex items-center">
                          <input
                            id="publish-later"
                            name="publish-option"
                            type="radio"
                            disabled
                            className="h-4 w-4 text-black focus:ring-black border-gray-300"
                          />
                          <label
                            htmlFor="publish-later"
                            className="ml-2 block text-sm text-gray-500"
                          >
                            Schedule for later (Coming soon)
                          </label>
                        </div>
                      </div>
                    </div>

                    {/* Final check */}
                    <div className="bg-yellow-50 p-4 rounded-md mb-6">
                      <h3 className="text-md font-medium flex items-center mb-2">
                        <AlertCircle className="h-5 w-5 text-yellow-500 mr-2" />
                        Final Checklist
                      </h3>
                      <ul className="space-y-2 text-sm text-gray-700">
                        <li className="flex items-center">
                          <Check
                            className={`h-4 w-4 mr-2 ${
                              title ? "text-green-500" : "text-gray-300"
                            }`}
                          />
                          Title is compelling and clear
                        </li>
                        <li className="flex items-center">
                          <Check
                            className={`h-4 w-4 mr-2 ${
                              excerpt ? "text-green-500" : "text-gray-300"
                            }`}
                          />
                          Excerpt summarizes the content effectively
                        </li>
                        <li className="flex items-center">
                          <Check
                            className={`h-4 w-4 mr-2 ${
                              content.length > 100
                                ? "text-green-500"
                                : "text-gray-300"
                            }`}
                          />
                          Content is well-written and formatted
                        </li>
                        <li className="flex items-center">
                          <Check
                            className={`h-4 w-4 mr-2 ${
                              coverImage ? "text-green-500" : "text-gray-300"
                            }`}
                          />
                          Cover image is attractive and relevant
                        </li>
                        <li className="flex items-center">
                          <Check
                            className={`h-4 w-4 mr-2 ${
                              tags.length > 0
                                ? "text-green-500"
                                : "text-gray-300"
                            }`}
                          />
                          Tags are appropriate and will help with
                          discoverability
                        </li>
                      </ul>
                    </div>

                    {/* Submit Button */}
                    {/* <div className="flex justify-end">
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className={`inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black transition-colors ${isSubmitting ? "opacity-70 cursor-not-allowed" : ""
                          }`}
                      >
                        {isSubmitting ? (
                          <>
                            <svg
                              className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                            >
                              <circle
                                className="opacity-25"
                                cx="12"
                                cy="12"
                                r="10"
                                stroke="currentColor"
                                strokeWidth="4"
                              ></circle>
                              <path
                                className="opacity-75"
                                fill="currentColor"
                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                              ></path>
                            </svg>
                            {isEditing ? "Updating..." : "Publishing..."}
                          </>
                        ) : (
                          <>
                            <Save className="mr-2 h-5 w-5" />
                            {isEditing ? "Update Post" : "Publish Post"}
                          </>
                        )}
                      </button>
                    </div> */}

                    {/* Submit Buttons */}
                    <div className="flex justify-end space-x-4">
                      <button
                        type="button"
                        onClick={() => {
                          setStatus("draft");
                          handleSubmit(new Event("submit") as any, "draft");
                          // handleSubmit(new Event('submit') as any);
                        }}
                        // onClick={handleDraft}
                        disabled={isSubmitting}
                        className={`inline-flex items-center px-6 py-3 border border-gray-300 text-base font-medium rounded-md shadow-sm text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-colors ${
                          isSubmitting ? "opacity-70 cursor-not-allowed" : ""
                        }`}
                      >
                        <Save className="mr-2 h-5 w-5" />
                        Save as Draft
                      </button>

                      <button
                        type="button"
                        onClick={() => {
                          setStatus("published");
                          handleSubmit(new Event("submit") as any, "published");
                        }}
                        disabled={isSubmitting}
                        className={`inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black transition-colors ${
                          isSubmitting ? "opacity-70 cursor-not-allowed" : ""
                        }`}
                      >
                        {isSubmitting ? (
                          <>
                            <svg
                              className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                            >
                              <circle
                                className="opacity-25"
                                cx="12"
                                cy="12"
                                r="10"
                                stroke="currentColor"
                                strokeWidth="4"
                              ></circle>
                              <path
                                className="opacity-75"
                                fill="currentColor"
                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                              ></path>
                            </svg>
                            {isEditing ? "Updating..." : "Publishing..."}
                          </>
                        ) : (
                          <>
                            <Save className="mr-2 h-5 w-5" />
                            {isEditing ? "Update Post" : "Publish Post"}
                          </>
                        )}
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Navigation buttons */}
              <div className="flex justify-between mt-6">
                <button
                  type="button"
                  onClick={prevStep}
                  className={`inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black ${
                    activeStep === 0 ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                  disabled={activeStep === 0}
                >
                  <ChevronLeft className="mr-2 h-4 w-4" />
                  Previous
                </button>

                {activeStep < steps.length - 1 ? (
                  <button
                    type="button"
                    onClick={nextStep}
                    className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
                  >
                    Next
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </button>
                ) : null}
              </div>
            </form>
          </div>

          {/* Preview panel */}
          <div className="lg:col-span-1">
            <div className="sticky top-8">
              <div className="bg-white rounded-lg shadow-md p-4 mb-4">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-bold text-lg">Preview</h3>
                  <button
                    type="button"
                    onClick={() => setShowPreview(!showPreview)}
                    className="inline-flex items-center px-3 py-1 border border-gray-300 rounded-md text-sm text-gray-700 bg-white hover:bg-gray-50"
                  >
                    <Eye className="h-4 w-4 mr-1" />
                    {showPreview ? "Hide" : "Show"}
                  </button>
                </div>

                {showPreview ? (
                  <div
                    ref={previewRef}
                    className="overflow-hidden transition-all duration-500 ease-in-out"
                  >
                    <div className="rounded-lg overflow-hidden border border-gray-200">
                      {coverImage ? (
                        <img
                          src={coverImage || "/placeholder.svg"}
                          alt="Cover preview"
                          className="w-full h-40 object-cover"
                        />
                      ) : (
                        <div className="w-full h-40 bg-gray-200 flex items-center justify-center">
                          <LucideImage className="h-8 w-8 text-gray-400" />
                        </div>
                      )}
                      <div className="p-4">
                        <div className="flex flex-wrap gap-2 mb-2">
                          {tags.map((tag, index) => (
                            <span
                              key={index}
                              className="text-xs px-2 py-1 bg-gray-100 rounded-full"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                        <h3 className="font-bold text-lg mb-1 line-clamp-2">
                          {title || "Your Title Here"}
                        </h3>
                        <p className="text-gray-600 text-sm mb-2 line-clamp-2">
                          {excerpt || "Your excerpt will appear here..."}
                        </p>
                        <div className="flex justify-between text-xs text-gray-500">
                          <span>By Alex Johnson</span>
                          <span>{formattedDate}</span>
                        </div>
                      </div>
                    </div>

                    <div className="mt-4 border-t border-gray-200 pt-4">
                      <h4 className="font-medium text-sm mb-2">
                        Content Preview:
                      </h4>
                      <div
                        className="prose prose-sm max-h-60 overflow-y-auto p-3 bg-gray-50 rounded-md"
                        dangerouslySetInnerHTML={{
                          __html:
                            content ||
                            "<p>Your content will appear here...</p>",
                        }}
                      />
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    <Eye className="h-8 w-8 mx-auto mb-2 opacity-50" />
                    <p>Click "Show" to preview your blog post</p>
                  </div>
                )}
              </div>

              {/* Blog creation tips */}
              <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                <h3 className="font-medium text-sm mb-2">
                  Tips for Great Blog Posts:
                </h3>
                <ul className="text-xs text-gray-600 space-y-2">
                  <li className="flex items-start">
                    <Check className="h-3 w-3 text-green-500 mr-1 mt-0.5" />
                    Use a compelling title that grabs attention
                  </li>
                  <li className="flex items-start">
                    <Check className="h-3 w-3 text-green-500 mr-1 mt-0.5" />
                    Include high-quality images to enhance visual appeal
                  </li>
                  <li className="flex items-start">
                    <Check className="h-3 w-3 text-green-500 mr-1 mt-0.5" />
                    Break up text with headings, lists, and short paragraphs
                  </li>
                  <li className="flex items-start">
                    <Check className="h-3 w-3 text-green-500 mr-1 mt-0.5" />
                    Use relevant tags to improve discoverability
                  </li>
                  <li className="flex items-start">
                    <Check className="h-3 w-3 text-green-500 mr-1 mt-0.5" />
                    End with a clear call-to-action for readers
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateBlogPage;
