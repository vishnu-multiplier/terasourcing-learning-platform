import React, { useEffect, useRef, useState } from "react";
import { createEditor } from "slate";
import { Slate, Editable, withReact } from "slate-react";

const initialValue = [
  {
    type: 'paragraph',
    children: [{ text: 'A line of text in a paragraph.' }],
  },
]

const categories = ["Design", "Development", "Marketing"];
const currencies = ["USD", "EUR", "INR"];

export default function CourseCreationForm() {
  const [title, setTitle] = useState("");
  const [shortIntro, setShortIntro] = useState("");
  const [previewVideo, setPreviewVideo] = useState("");
  const [courseDescription, setCourseDescription] = useState(initialValue);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedCurrency, setSelectedCurrency] = useState(null);
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);
  const [showCurrencyDropdown, setShowCurrencyDropdown] = useState(false);
  const [categorySearch, setCategorySearch] = useState("");
  const [currencySearch, setCurrencySearch] = useState("");
  const [dropdownDirection, setDropdownDirection] = useState("down");
  const [courseImage, setCourseImage] = useState(null);

  const categoryRef = useRef();
  const currencyRef = useRef();
  const editor = useRef(withReact(createEditor()));

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (categoryRef.current && !categoryRef.current.contains(event.target)) {
        setShowCategoryDropdown(false);
      }
      if (currencyRef.current && !currencyRef.current.contains(event.target)) {
        setShowCurrencyDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleDropdownDirection = (ref, setDirection) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const spaceBelow = window.innerHeight - rect.bottom;
    setDirection(spaceBelow < 150 ? "up" : "down");
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setCourseImage(URL.createObjectURL(file));
    }
  };

  const handleSave = () => {
    const payload = {
      title,
      shortIntro,
      previewVideo,
      description: courseDescription,
      category: selectedCategory,
      currency: selectedCurrency,
      image: courseImage,
    };
    console.log("Form payload:", payload);
    // API submission logic here
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">Create New Course</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block mb-1">Course Title</label>
          <input
            className="w-full border px-3 py-2 rounded"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter course title"
          />
        </div>

        <div>
          <label className="block mb-1">Short Introduction</label>
          <input
            className="w-full border px-3 py-2 rounded"
            value={shortIntro}
            onChange={(e) => setShortIntro(e.target.value)}
            placeholder="Brief summary"
          />
        </div>

        <div>
          <label className="block mb-1">Category</label>
          <div className="relative" ref={categoryRef}>
            <input
              className="w-full border px-3 py-2 rounded"
              onFocus={() => {
                handleDropdownDirection(categoryRef, setDropdownDirection);
                setShowCategoryDropdown(true);
              }}
              value={categorySearch || selectedCategory || ""}
              onChange={(e) => setCategorySearch(e.target.value)}
              placeholder="Search or select category"
            />
            {showCategoryDropdown && (
              <div
                className={`absolute z-10 w-full bg-white border rounded shadow-md mt-1 max-h-40 overflow-auto ${
                  dropdownDirection === "up" ? "bottom-full mb-2" : ""
                }`}
              >
                {[...categories, categorySearch].filter(
                  (item, idx, arr) =>
                    item &&
                    item.toLowerCase().includes(categorySearch.toLowerCase()) &&
                    arr.indexOf(item) === idx
                ).map((item) => (
                  <div
                    key={item}
                    className="px-3 py-2 hover:bg-gray-100 cursor-pointer"
                    onClick={() => {
                      setSelectedCategory(item);
                      setCategorySearch("");
                      setShowCategoryDropdown(false);
                    }}
                  >
                    {item}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div>
          <label className="block mb-1">Currency</label>
          <div className="relative" ref={currencyRef}>
            <input
              className="w-full border px-3 py-2 rounded"
              onFocus={() => {
                handleDropdownDirection(currencyRef, setDropdownDirection);
                setShowCurrencyDropdown(true);
              }}
              value={currencySearch || selectedCurrency || ""}
              onChange={(e) => setCurrencySearch(e.target.value)}
              placeholder="Search or select currency"
            />
            {showCurrencyDropdown && (
              <div
                className={`absolute z-10 w-full bg-white border rounded shadow-md mt-1 max-h-40 overflow-auto ${
                  dropdownDirection === "up" ? "bottom-full mb-2" : ""
                }`}
              >
                {[...currencies, currencySearch].filter(
                  (item, idx, arr) =>
                    item &&
                    item.toLowerCase().includes(currencySearch.toLowerCase()) &&
                    arr.indexOf(item) === idx
                ).map((item) => (
                  <div
                    key={item}
                    className="px-3 py-2 hover:bg-gray-100 cursor-pointer"
                    onClick={() => {
                      setSelectedCurrency(item);
                      setCurrencySearch("");
                      setShowCurrencyDropdown(false);
                    }}
                  >
                    {item}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="md:col-span-2">
          <label className="block mb-1">Course Description</label>
          <div className="border rounded p-2 min-h-[150px]">
            <Slate
              editor={editor.current}
              value={courseDescription}
              onChange={(value) => setCourseDescription(value)}
            >
              <Editable placeholder="Enter course description..." />
            </Slate>
          </div>
        </div>

        <div>
          <label className="block mb-1">Preview Video URL</label>
          <input
            className="w-full border px-3 py-2 rounded"
            value={previewVideo}
            onChange={(e) => setPreviewVideo(e.target.value)}
            placeholder="https://example.com/preview"
          />
        </div>

        <div>
          <label className="block mb-1">Upload Course Image</label>
          <input type="file" id="courseImageUpload" onChange={handleImageUpload} />
          {courseImage && (
            <img src={courseImage} alt="Course Preview" className="mt-2 w-48 h-auto rounded" />
          )}
        </div>
      </div>

      <div className="mt-6">
        <button
          onClick={handleSave}
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
        >
          Save
        </button>
      </div>
    </div>
  );
}
