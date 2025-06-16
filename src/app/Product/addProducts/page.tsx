import type { NextPage } from "next";
import Head from "next/head";
import { ArrowLeft, UploadCloud, ChevronDown, Trash2 } from "lucide-react";
import React from "react";

// A helper component for consistent labels with required asterisks
const FormLabel: React.FC<{
  htmlFor: string;
  text: string;
  required?: boolean;
}> = ({ htmlFor, text, required }) => (
  <label htmlFor={htmlFor} className="block text-sm font-medium text-gray-700">
    {text} {required && <span className="text-red-500">*</span>}
  </label>
);

// A helper component for consistent radio button options
const RadioOption: React.FC<{ id: string; name: string; label: string }> = ({
  id,
  name,
  label,
}) => (
  <div className="flex items-center">
    <input
      id={id}
      name={name}
      type="radio"
      className="h-4 w-4 text-red-600 border-gray-300 focus:ring-red-500"
    />
    <label htmlFor={id} className="ml-2 block text-sm text-gray-900">
      {label}
    </label>
  </div>
);

// Common class string for most input/select fields based on your comments
const inputStyles =
  "mt-1 block w-full h-[52px] rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500 sm:text-sm px-[10px] placeholder:text-[#7D8184]";

const AddNewProductPage: NextPage = () => {
  return (
    <>
      <Head>
        <title>Add New Product</title>
        <meta name="description" content="Add a new product for sale" />
      </Head>

      <div className="bg-gray-50 min-h-screen font-sans">
        <div className="max-w-[1024px] mx-auto p-4 sm:p-6 lg:p-8">
          {/* Header */}
          <div className="mb-6">
            <div className="flex items-center space-x-3">
              <button className="p-1 rounded-full hover:bg-gray-200">
                <ArrowLeft size={24} className="text-gray-800" />
              </button>
              <h1 className="text-2xl font-semibold text-gray-900">
                Add New Product
              </h1>
            </div>
            <p className="mt-1 text-sm text-gray-500 ml-10">
              Fill in the details to list your product for sale
            </p>
          </div>

          {/* Main form container */}
          <div className="bg-white rounded-lg shadow-sm p-[26px] space-y-[26px] border border-gray-300">
            {/* Section: General Information */}
            <section>
              <h2 className="text-lg font-semibold text-gray-800 mb-4">
                General Information
              </h2>
              <div className="space-y-6">
                <div>
                  <FormLabel
                    htmlFor="product-title"
                    text="Product Title"
                    required
                  />
                  <input
                    type="text"
                    name="product-title"
                    id="product-title"
                    className={inputStyles}
                    placeholder="Enter Product Name"
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
                    className="mt-1 block w-full h-[162px] rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500 sm:text-sm p-4 placeholder:text-[#7D8184]"
                    placeholder="Enter Product Description"
                  />
                </div>
                <div>
                  <FormLabel
                    htmlFor="product-images"
                    text="Product Images"
                    required
                  />
                  <div className="mt-1 flex flex-col justify-center items-center h-[281px] py-[10px] px-5 border-2 border-gray-300 border-dashed rounded-md">
                    <div className="space-y-1 text-center">
                      <UploadCloud className="mx-auto h-12 w-12 text-gray-400" />
                      <p className="text-sm text-gray-600 font-semibold">
                        Drag & drop product images
                      </p>
                      <p className="text-xs text-gray-500">
                        (or CLICK to choose files. PNG, JPG, WEBP up to 10MB
                        each.)
                      </p>
                      <button
                        type="button"
                        className="mt-4 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50"
                      >
                        Select Files
                      </button>
                    </div>
                  </div>
                </div>
                <div>
                  <FormLabel htmlFor="category" text="Category" required />
                  <div className="relative mt-1">
                    <select
                      id="category"
                      name="category"
                      className={`${inputStyles} appearance-none pr-10`}
                      defaultValue="Mobile Phones"
                    >
                      <option>Mobile Phones</option>
                      <option>Laptops</option>
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
                {/* Row 1 */}
                <div>
                  <FormLabel htmlFor="brand" text="Brand" required />
                  <div className="relative mt-1">
                    <select
                      id="brand"
                      name="brand"
                      className={`${inputStyles} appearance-none pr-10`}
                    >
                      <option>Select Brand</option>
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
                      className={`${inputStyles} appearance-none pr-10`}
                    >
                      <option>Select Storage</option>
                    </select>
                    <ChevronDown className="h-5 w-5 text-gray-400 absolute top-1/2 right-3 -translate-y-1/2 pointer-events-none" />
                  </div>
                </div>

                {/* Row 2 */}
                <div>
                  <FormLabel htmlFor="model" text="Model" required />
                  <div className="relative mt-1">
                    <select
                      id="model"
                      name="model"
                      className={`${inputStyles} appearance-none pr-10`}
                    >
                      <option>Select Model</option>
                    </select>
                    <ChevronDown className="h-5 w-5 text-gray-400 absolute top-1/2 right-3 -translate-y-1/2 pointer-events-none" />
                  </div>
                </div>
                <div>{/* Empty cell to match layout */}</div>

                {/* Row 3 */}
                <div>
                  <FormLabel htmlFor="ram-1" text="RAM" required />
                  <div className="relative mt-1">
                    <select
                      id="ram-1"
                      name="ram-1"
                      className={`${inputStyles} appearance-none pr-10`}
                    >
                      <option>Select Ram</option>
                    </select>
                    <ChevronDown className="h-5 w-5 text-gray-400 absolute top-1/2 right-3 -translate-y-1/2 pointer-events-none" />
                  </div>
                </div>
                <div>
                  <FormLabel htmlFor="colour-1" text="Colour" required />
                  <div className="relative mt-1">
                    <select
                      id="colour-1"
                      name="colour-1"
                      className={`${inputStyles} appearance-none pr-10`}
                    >
                      <option>Select Colour</option>
                    </select>
                    <ChevronDown className="h-5 w-5 text-gray-400 absolute top-1/2 right-3 -translate-y-1/2 pointer-events-none" />
                  </div>
                </div>

                {/* Row 4 - Duplicated RAM/Colour */}
                <div>
                  <FormLabel htmlFor="ram-2" text="RAM" required />
                  <div className="relative mt-1">
                    <select
                      id="ram-2"
                      name="ram-2"
                      className={`${inputStyles} appearance-none pr-10`}
                    >
                      <option>Select Ram</option>
                    </select>
                    <ChevronDown className="h-5 w-5 text-gray-400 absolute top-1/2 right-3 -translate-y-1/2 pointer-events-none" />
                  </div>
                </div>
                <div>
                  <FormLabel htmlFor="colour-2" text="Colour" required />
                  <div className="relative mt-1">
                    <select
                      id="colour-2"
                      name="colour-2"
                      className={`${inputStyles} appearance-none pr-10`}
                    >
                      <option>Select Colour</option>
                    </select>
                    <ChevronDown className="h-5 w-5 text-gray-400 absolute top-1/2 right-3 -translate-y-1/2 pointer-events-none" />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-6 mt-6">
                <div>
                  <FormLabel htmlFor="condition" text="Condition" required />
                  <div className="mt-2 space-y-2">
                    <RadioOption id="new" name="condition" label="New" />
                    <RadioOption
                      id="open-box"
                      name="condition"
                      label="Open Box"
                    />
                    <RadioOption
                      id="refurbished"
                      name="condition"
                      label="Refurbished"
                    />
                    <RadioOption
                      id="very-good"
                      name="condition"
                      label="Very Good"
                    />
                    <RadioOption id="good" name="condition" label="Good" />
                    <RadioOption id="used" name="condition" label="Used" />
                    <RadioOption
                      id="defective"
                      name="condition"
                      label="Defective"
                    />
                  </div>
                  <button className="mt-2 text-sm font-medium text-blue-600 hover:text-blue-800">
                    + Add condition
                  </button>
                </div>
                <div>
                  <FormLabel htmlFor="features" text="Features" required />
                  <div className="mt-2 space-y-2">
                    <RadioOption id="5g" name="features" label="5G" />
                    <RadioOption
                      id="wireless-charging"
                      name="features"
                      label="Wireless Charging"
                    />
                    <RadioOption id="face-id" name="features" label="Face ID" />
                    <RadioOption
                      id="fingerprint"
                      name="features"
                      label="Fingerprint"
                    />
                    <RadioOption
                      id="water-resistant"
                      name="features"
                      label="Water Resistant"
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
                    placeholder="0.00"
                    className={inputStyles}
                  />
                </div>
                <div>
                  <FormLabel htmlFor="sale-price" text="Sale Price($)" />
                  <input
                    type="text"
                    name="sale-price"
                    id="sale-price"
                    placeholder="0.00"
                    className={inputStyles}
                  />
                </div>
                <div>
                  <FormLabel htmlFor="quantity" text="Quantity" required />
                  <input
                    type="number"
                    name="quantity"
                    id="quantity"
                    placeholder="0"
                    className={inputStyles}
                  />
                </div>
                <div>
                  <FormLabel htmlFor="sku" text="SKU" />
                  <input
                    type="text"
                    name="sku"
                    id="sku"
                    placeholder="e.g. MP-56h"
                    className={inputStyles}
                  />
                </div>
              </div>
              <div className="mt-6 flex items-center">
                <input
                  id="enable-negotiation"
                  name="enable-negotiation"
                  type="checkbox"
                  className="h-4 w-4 rounded border-gray-300 text-red-600 focus:ring-red-500"
                />
                <label
                  htmlFor="enable-negotiation"
                  className="ml-2 block text-sm text-gray-900"
                >
                  Enable negotiation
                </label>
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
                  <input
                    type="text"
                    name="tags"
                    id="tags"
                    className={inputStyles}
                    placeholder="e.g. smartphone, android 10 (separate with commas)"
                  />
                  <p className="mt-2 text-xs text-gray-500">
                    Tags help buyers find your product when searching.
                  </p>
                </div>
                <div>
                  <FormLabel htmlFor="seo-title" text="SEO Title" />
                  <input
                    type="text"
                    name="seo-title"
                    id="seo-title"
                    className={inputStyles}
                    placeholder="Custom title for search engines"
                  />
                </div>
                <div>
                  <FormLabel htmlFor="seo-description" text="SEO Description" />
                  <textarea
                    id="seo-description"
                    name="seo-description"
                    className="mt-1 block w-full h-[159px] rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500 sm:text-sm p-5 placeholder:text-[#7D8184]"
                    placeholder="Custom description for search engines"
                  />
                </div>
              </div>
            </section>
          </div>

          {/* Footer Buttons */}
          <div className="mt-8 flex justify-between items-center">
            <button
              type="button"
              className="flex items-center justify-center space-x-2 w-[132px] h-[52px] text-sm font-medium text-red-600 bg-red-50 rounded border border-[#F9D2D9] hover:bg-red-100"
            >
              <Trash2 size={16} />
              <span>Discard</span>
            </button>
            <div className="flex items-center space-x-4">
              <button
                type="button"
                className="flex items-center justify-center w-[124px] h-[52px] text-sm font-semibold text-gray-700 bg-white border border-gray-300 rounded shadow-sm hover:bg-gray-50"
              >
                Save Draft
              </button>
              <button
                type="submit"
                className="flex items-center justify-center w-[168px] h-[52px] text-sm font-semibold text-white bg-[#DB4444] rounded shadow-sm hover:bg-[#b93a3a] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
              >
                Submit for Review
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddNewProductPage;
