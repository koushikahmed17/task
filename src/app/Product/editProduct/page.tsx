"use client";
import type { NextPage } from "next";
import Head from "next/head";
import {
  ArrowLeft,
  ChevronDown,
  Trash2,
  Image as ImageIcon,
  X,
} from "lucide-react";
import React, { useState } from "react";

// --- Reusable Helper Components ---

// Form Label
const FormLabel: React.FC<{
  htmlFor: string;
  text: string;
  required?: boolean;
}> = ({ htmlFor, text, required }) => (
  <label
    htmlFor={htmlFor}
    className="block text-sm font-medium text-gray-700 mb-1"
  >
    {text} {required && <span className="text-red-500">*</span>}
  </label>
);

// Custom Radio Button for "Condition"
const ConditionRadio: React.FC<{
  id: string;
  name: string;
  label: string;
  checked: boolean;
  onChange: (id: string) => void;
}> = ({ id, name, label, checked, onChange }) => (
  <div className="flex items-center">
    <input
      id={id}
      name={name}
      type="radio"
      checked={checked}
      onChange={() => onChange(id)}
      className="hidden" // Hide the default radio
    />
    <label htmlFor={id} className="flex items-center cursor-pointer">
      <span
        className={`w-4 h-4 inline-block mr-2 rounded-full border border-gray-400 flex-shrink-0 relative ${
          checked ? "bg-blue-500 border-blue-500" : ""
        }`}
      >
        {checked && (
          <span className="absolute inset-0.5 rounded-full bg-white"></span>
        )}
      </span>
      {label}
    </label>
  </div>
);

// Custom Checkbox-like Radio for "Features"
const FeatureRadio: React.FC<{
  id: string;
  name: string;
  label: string;
  checked: boolean;
  onChange: (id: string) => void;
}> = ({ id, name, label, checked, onChange }) => (
  <div className="flex items-center">
    <input
      id={id}
      name={name}
      type="checkbox" // Using checkbox to allow multiple selections
      checked={checked}
      onChange={() => onChange(id)}
      className="hidden"
    />
    <label htmlFor={id} className="flex items-center cursor-pointer">
      <span
        className={`w-4 h-4 inline-block mr-2 rounded-full border flex-shrink-0 flex items-center justify-center ${
          checked ? "bg-blue-500 border-blue-500" : "border-gray-400"
        }`}
      >
        {checked && <span className="w-1.5 h-1.5 rounded-full bg-white"></span>}
      </span>
      {label}
    </label>
  </div>
);

// --- Main Page Component ---

const EditProductPage: NextPage = () => {
  const [productDetails, setProductDetails] = useState({
    productTitle: "Samsung Galaxy S22 Ultra - 256GB - Phantom Black",
    description:
      "This is a gently used device in excellent working condition. It may show minor cosmetic wear, but functions perfectly. Battery health is strong, and all features are tested and verified.",
    category: "Mobile Phones",
    brand: "Samsung Galaxy",
    model: "S22 Ultra",
    storage: "256GB",
    ram: "12GB",
    colour: "Phantom Black",
    condition: "used",
    features: ["5g", "face-id", "fingerprint", "water-resistant"],
    price: "380",
    salePrice: "300",
    quantity: "1",
    sku: "",
    tags: ["smartphone"],
    newTag: "",
    seoTitle:
      "Buy Samsung Galaxy S22 Ultra - Premium Smartphone with 108MP Camera",
    seoDescription:
      "Shop the Samsung Galaxy S22 Ultra with 256GB storage in Phantom Black. Features include 108MP camera, 5000mAh battery, and Android 12.",
  });

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setProductDetails((prev) => ({ ...prev, [name]: value }));
  };

  const handleConditionChange = (id: string) => {
    setProductDetails((prev) => ({ ...prev, condition: id }));
  };

  const handleFeatureChange = (id: string) => {
    setProductDetails((prev) => {
      const newFeatures = prev.features.includes(id)
        ? prev.features.filter((f) => f !== id)
        : [...prev.features, id];
      return { ...prev, features: newFeatures };
    });
  };

  const removeTag = (tagToRemove: string) => {
    setProductDetails((prev) => ({
      ...prev,
      tags: prev.tags.filter((tag) => tag !== tagToRemove),
    }));
  };

  // Common styles based on your CSS comments
  const inputBaseStyles =
    "w-full h-[52px] rounded-md border border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500 text-[#000000] sm:text-sm";
  const textInputStyles = `${inputBaseStyles} px-[10px]`;
  const selectInputStyles = `${inputBaseStyles} appearance-none bg-white  py-[10px] pl-[20px] pr-[10px]`;

  return (
    <>
      <Head>
        <title>Edit Product Details</title>
        <meta name="description" content="Edit the details of your product" />
      </Head>

      <div className="bg-gray-50 min-h-screen font-sans">
        <div className="max-w-[955px] mx-auto p-4 sm:p-6 lg:p-8">
          {/* Header */}
          <div className="mb-6">
            <div className="flex items-center space-x-3">
              <button className="p-1 rounded-full hover:bg-gray-200">
                <ArrowLeft size={24} className="text-gray-800" />
              </button>
              <h1 className="text-2xl font-semibold text-gray-900">
                Edit Product Details
              </h1>
            </div>
            <p className="mt-1 text-sm text-gray-500 ml-10">
              Edit the details of your product
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-[26px] space-y-8 border border-gray-200">
            {/* Section: General Information */}
            <section>
              <h2 className="text-lg font-semibold text-gray-800 mb-4">
                General Information
              </h2>
              <div className="space-y-6">
                <div>
                  <FormLabel
                    htmlFor="productTitle"
                    text="Product Title"
                    required
                  />
                  <input
                    type="text"
                    name="productTitle"
                    id="productTitle"
                    value={productDetails.productTitle}
                    onChange={handleInputChange}
                    className={textInputStyles}
                  />
                </div>
                <div>
                  <FormLabel
                    htmlFor="description"
                    text="Description"
                    required
                  />
                  <textarea
                    id="description"
                    name="description"
                    value={productDetails.description}
                    onChange={handleInputChange}
                    className="mt-1 block w-full h-[162px] rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500 text-[#000000] sm:text-sm p-[16px]"
                  />
                </div>
                <div>
                  <FormLabel
                    htmlFor="product-images"
                    text="Product Images"
                    required
                  />
                  <div className="mt-2 grid grid-cols-2 sm:grid-cols-4 gap-4">
                    {[1, 2, 3].map((i) => (
                      <div
                        key={i}
                        className="relative aspect-square bg-gray-100 rounded-md flex items-center justify-center group"
                      >
                        <ImageIcon className="w-10 h-10 text-gray-300" />
                        <button className="absolute top-1 right-1 bg-white p-1 rounded-full text-red-500 opacity-0 group-hover:opacity-100 transition-opacity">
                          <Trash2 size={14} />
                        </button>
                      </div>
                    ))}
                    <div className="aspect-square bg-white rounded-md border-2 border-dashed border-gray-300 flex flex-col items-center justify-center text-center p-2 cursor-pointer hover:bg-gray-50">
                      <ImageIcon className="w-8 h-8 text-gray-400" />
                      <span className="mt-1 text-xs text-gray-500">
                        Add Image
                      </span>
                    </div>
                  </div>
                  <p className="mt-2 text-xs text-gray-500">
                    Upload up to 4 images. First image will be used as the
                    product thumbnail.
                  </p>
                </div>
                <div>
                  <FormLabel htmlFor="category" text="Category" required />
                  <div className="relative mt-1">
                    <select
                      id="category"
                      name="category"
                      value={productDetails.category}
                      onChange={handleInputChange}
                      className={selectInputStyles}
                    >
                      <option>Mobile Phones</option> <option>Laptops</option>{" "}
                      <option>Accessories</option>
                    </select>
                    <ChevronDown className="h-5 w-5 text-gray-400 absolute top-1/2 right-3 -translate-y-1/2 pointer-events-none" />
                  </div>
                </div>
              </div>
            </section>

            {/* Section: Specifications */}
            <section>
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold text-gray-800">
                  Specifications
                </h2>
                <button className="text-sm font-medium text-blue-600 hover:text-blue-800">
                  + Add another specification
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-6">
                <div>
                  <FormLabel htmlFor="brand" text="Brand" required />
                  <div className="relative mt-1">
                    <select
                      id="brand"
                      name="brand"
                      value={productDetails.brand}
                      onChange={handleInputChange}
                      className={selectInputStyles}
                    >
                      <option>Samsung Galaxy</option> <option>Apple</option>{" "}
                      <option>Google</option>
                    </select>
                    <ChevronDown className="h-5 w-5 text-gray-400 absolute top-1/2 right-3 -translate-y-1/2 pointer-events-none" />
                  </div>
                </div>
                <div>
                  <FormLabel htmlFor="storage" text="Storage" required />
                  <div className="relative mt-1">
                    <select
                      id="storage"
                      name="storage"
                      value={productDetails.storage}
                      onChange={handleInputChange}
                      className={selectInputStyles}
                    >
                      <option>128GB</option> <option>256GB</option>{" "}
                      <option>512GB</option>
                    </select>
                    <ChevronDown className="h-5 w-5 text-gray-400 absolute top-1/2 right-3 -translate-y-1/2 pointer-events-none" />
                  </div>
                </div>
                <div>
                  <FormLabel htmlFor="model" text="Model" required />
                  <div className="relative mt-1">
                    <select
                      id="model"
                      name="model"
                      value={productDetails.model}
                      onChange={handleInputChange}
                      className={selectInputStyles}
                    >
                      <option>S22 Ultra</option> <option>iPhone 14 Pro</option>{" "}
                      <option>Pixel 7 Pro</option>
                    </select>
                    <ChevronDown className="h-5 w-5 text-gray-400 absolute top-1/2 right-3 -translate-y-1/2 pointer-events-none" />
                  </div>
                </div>
                <div>
                  <FormLabel htmlFor="colour" text="Colour" required />
                  <div className="relative mt-1">
                    <select
                      id="colour"
                      name="colour"
                      value={productDetails.colour}
                      onChange={handleInputChange}
                      className={selectInputStyles}
                    >
                      <option>Phantom Black</option> <option>Space Gray</option>{" "}
                      <option>White</option>
                    </select>
                    <ChevronDown className="h-5 w-5 text-gray-400 absolute top-1/2 right-3 -translate-y-1/2 pointer-events-none" />
                  </div>
                </div>
                <div>
                  <FormLabel htmlFor="ram" text="RAM" required />
                  <div className="relative mt-1">
                    <select
                      id="ram"
                      name="ram"
                      value={productDetails.ram}
                      onChange={handleInputChange}
                      className={selectInputStyles}
                    >
                      <option>8GB</option> <option>12GB</option>{" "}
                      <option>16GB</option>
                    </select>
                    <ChevronDown className="h-5 w-5 text-gray-400 absolute top-1/2 right-3 -translate-y-1/2 pointer-events-none" />
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-6 mt-6">
                {/* Condition and Features */}
                <div>
                  <FormLabel htmlFor="condition" text="Condition" required />
                  <div className="mt-2 space-y-2 text-[#000000]">
                    <ConditionRadio
                      id="new"
                      name="condition"
                      label="New"
                      checked={productDetails.condition === "new"}
                      onChange={handleConditionChange}
                    />
                    <ConditionRadio
                      id="open-box"
                      name="condition"
                      label="Open Box"
                      checked={productDetails.condition === "open-box"}
                      onChange={handleConditionChange}
                    />
                    <ConditionRadio
                      id="refurbished"
                      name="condition"
                      label="Refurbished"
                      checked={productDetails.condition === "refurbished"}
                      onChange={handleConditionChange}
                    />
                    <ConditionRadio
                      id="very-good"
                      name="condition"
                      label="Very Good"
                      checked={productDetails.condition === "very-good"}
                      onChange={handleConditionChange}
                    />
                    <ConditionRadio
                      id="good"
                      name="condition"
                      label="Good"
                      checked={productDetails.condition === "good"}
                      onChange={handleConditionChange}
                    />
                    <ConditionRadio
                      id="used"
                      name="condition"
                      label="Used"
                      checked={productDetails.condition === "used"}
                      onChange={handleConditionChange}
                    />
                    <ConditionRadio
                      id="defective"
                      name="condition"
                      label="Defective"
                      checked={productDetails.condition === "defective"}
                      onChange={handleConditionChange}
                    />
                  </div>
                  <button className="mt-2 text-sm font-medium text-blue-600 hover:text-blue-800">
                    + Add condition
                  </button>
                </div>
                <div>
                  <FormLabel htmlFor="features" text="Features" required />
                  <div className="mt-2 space-y-2 text-[#000000]">
                    <FeatureRadio
                      id="5g"
                      name="features"
                      label="5G"
                      checked={productDetails.features.includes("5g")}
                      onChange={handleFeatureChange}
                    />
                    <FeatureRadio
                      id="wireless-charging"
                      name="features"
                      label="Wireless Charging"
                      checked={productDetails.features.includes(
                        "wireless-charging"
                      )}
                      onChange={handleFeatureChange}
                    />
                    <FeatureRadio
                      id="face-id"
                      name="features"
                      label="Face ID"
                      checked={productDetails.features.includes("face-id")}
                      onChange={handleFeatureChange}
                    />
                    <FeatureRadio
                      id="fingerprint"
                      name="features"
                      label="Fingerprint"
                      checked={productDetails.features.includes("fingerprint")}
                      onChange={handleFeatureChange}
                    />
                    <FeatureRadio
                      id="water-resistant"
                      name="features"
                      label="Water Resistant"
                      checked={productDetails.features.includes(
                        "water-resistant"
                      )}
                      onChange={handleFeatureChange}
                    />
                  </div>
                  <button className="mt-2 text-sm font-medium text-blue-600 hover:text-blue-800">
                    + Add another feature
                  </button>
                </div>
              </div>
            </section>

            {/* Section: Pricing & Inventory */}
            <section>
              <h2 className="text-lg font-semibold text-gray-800 mb-4">
                Pricing & Inventory
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-6">
                <div>
                  <FormLabel htmlFor="price" text="Price($)" required />
                  <input
                    type="text"
                    name="price"
                    id="price"
                    value={productDetails.price}
                    onChange={handleInputChange}
                    className={textInputStyles}
                  />
                </div>
                <div>
                  <FormLabel htmlFor="salePrice" text="Sale Price($)" />
                  <input
                    type="text"
                    name="salePrice"
                    id="salePrice"
                    value={productDetails.salePrice}
                    onChange={handleInputChange}
                    className={textInputStyles}
                  />
                </div>
                <div>
                  <FormLabel htmlFor="quantity" text="Quantity" required />
                  <input
                    type="number"
                    name="quantity"
                    id="quantity"
                    value={productDetails.quantity}
                    onChange={handleInputChange}
                    className={textInputStyles}
                  />
                </div>
                <div>
                  <FormLabel htmlFor="sku" text="SKU" />
                  <input
                    type="text"
                    name="sku"
                    id="sku"
                    placeholder="e.g. SG-DDI"
                    value={productDetails.sku}
                    onChange={handleInputChange}
                    className={textInputStyles}
                  />
                </div>
              </div>
            </section>

            {/* Section: Additional Information */}
            <section>
              <h2 className="text-lg font-semibold text-gray-800 mb-4">
                Additional Information
              </h2>
              <div className="space-y-6">
                <div>
                  <FormLabel htmlFor="tags" text="Tags" />
                  <div className="flex flex-wrap items-center gap-2 p-2 border border-gray-300 rounded-md">
                    {productDetails.tags.map((tag) => (
                      <span
                        key={tag}
                        className="flex items-center bg-gray-100 rounded-md pl-2 pr-1 py-0.5 text-sm"
                      >
                        {tag}
                        <button
                          onClick={() => removeTag(tag)}
                          className="ml-1 text-gray-500 hover:text-gray-800"
                        >
                          <X size={14} />
                        </button>
                      </span>
                    ))}
                    <input
                      type="text"
                      name="newTag"
                      id="tags"
                      value={productDetails.newTag}
                      onChange={handleInputChange}
                      className="flex-grow border-none focus:ring-0 p-0 text-sm"
                      placeholder="e.g. smartphone, android, 5G (separate with commas)"
                    />
                  </div>
                  <p className="mt-2 text-xs text-gray-500">
                    Tags help buyers find your product when searching.
                  </p>
                </div>
                <div>
                  <FormLabel htmlFor="seoTitle" text="SEO Title" />
                  <input
                    type="text"
                    name="seoTitle"
                    id="seoTitle"
                    value={productDetails.seoTitle}
                    onChange={handleInputChange}
                    className={textInputStyles}
                  />
                </div>
                <div>
                  <FormLabel htmlFor="seoDescription" text="SEO Description" />
                  <textarea
                    id="seoDescription"
                    name="seoDescription"
                    value={productDetails.seoDescription}
                    onChange={handleInputChange}
                    className="mt-1 block w-full h-[159px] rounded-md border-gray-300 shadow-sm sm:text-sm p-[20px]"
                  />
                </div>
              </div>
            </section>
          </div>

          {/* Footer Buttons */}
          <div className="mt-8 flex justify-between items-center px-5 h-[117px] border-t border-gray-200">
            <button
              type="button"
              className="flex items-center justify-center w-[132px] h-[52px] space-x-2 text-sm font-medium text-red-600 rounded border border-[#F9D2D9] hover:bg-red-50"
            >
              <Trash2 size={16} />
              <span>Discard</span>
            </button>
            <button
              type="submit"
              className="flex items-center justify-center w-[168px] h-[52px] text-sm font-semibold text-white bg-[#DB4444] rounded-md shadow-sm hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
            >
              Send for Review
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditProductPage;
