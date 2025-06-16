"use client";
import React from "react";
import Link from "next/link";
import {
  FiPlus,
  FiSearch,
  FiChevronDown,
  FiEdit,
  FiTrash2,
} from "react-icons/fi";
import DeleteProductModal from "../../../../Model/DeleteProductModal"; // ✅ Make sure this path is correct

interface Product {
  name: string;
  sku: string;
  price: number;
  stock: number;
  status: "Active" | "Low Stock" | "Out of Stock" | string;
}

interface StatusBadgeProps {
  status: Product["status"];
}

const productsData: Product[] = [
  {
    name: "Premium Cotton T-Shirt",
    sku: "TS-001",
    price: 100,
    stock: 200,
    status: "Active",
  },
  {
    name: "Leather Wallet",
    sku: "WL-002",
    price: 50,
    stock: 200,
    status: "Active",
  },
  {
    name: "Wireless Earbuds",
    sku: "EB-003",
    price: 70,
    stock: 12,
    status: "Low Stock",
  },
  {
    name: "Handcrafted Ceramic Mug",
    sku: "MG-004",
    price: 60,
    stock: 32,
    status: "Active",
  },
  {
    name: "Organic Face Cream",
    sku: "MG-005",
    price: 200,
    stock: 0,
    status: "Out of Stock",
  },
  {
    name: "Bamboo Cutting Board",
    sku: "CB-006",
    price: 20,
    stock: 5,
    status: "Low Stock",
  },
];

const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
  let colorClasses = "";
  switch (status) {
    case "Active":
      colorClasses = "bg-green-100 text-green-700";
      break;
    case "Low Stock":
      colorClasses = "bg-yellow-100 text-yellow-700";
      break;
    case "Out of Stock":
      colorClasses = "bg-red-100 text-red-700";
      break;
    default:
      colorClasses = "bg-gray-100 text-gray-700";
  }

  return (
    <span
      className={`w-[84px] h-[24px] px-3 py-[3px] text-xs font-medium rounded-full ${colorClasses}`}
    >
      {status}
    </span>
  );
};

const ProductsPage: React.FC = () => {
  const [products, setProducts] = React.useState<Product[]>(productsData);
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [selectedProduct, setSelectedProduct] = React.useState<Product | null>(
    null
  );

  const openDeleteModal = (product: Product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const closeDeleteModal = () => {
    setIsModalOpen(false);
    setSelectedProduct(null);
  };

  const handleDelete = () => {
    if (selectedProduct) {
      setProducts((prev) => prev.filter((p) => p.sku !== selectedProduct.sku));
      closeDeleteModal();
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
          <h1 className="text-[30px] font-semibold text-gray-800 font-['Poppins'] mb-4 sm:mb-0">
            Products
          </h1>
          <Link
            href="/Product/addProducts" // <-- change to your actual route
            className="flex items-center w-[174px] h-[52px] gap-[10px] rounded bg-[#DB4444] text-white font-semibold py-[10px] px-[20px] shadow-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
          >
            <FiPlus className="mr-2" />
            Add Product
          </Link>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-5 mb-6">
          <div className="relative w-full sm:w-auto flex-grow">
            <FiSearch className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search by name or SKU"
              className="w-full h-[52px] pl-10 pr-3 py-2 border border-[#D1D5DB] rounded-[6px] focus:outline-none focus:ring-2 focus:ring-gray-300 bg-white text-[16px] font-normal"
            />
          </div>

          <div className="relative w-full sm:w-[204px]">
            <select className="w-full h-[52px] appearance-none bg-white border border-[#D1D5DB] rounded-[6px] px-5 py-2 text-[16px]">
              <option>Category</option>
            </select>
            <FiChevronDown className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
          </div>

          <div className="relative w-full sm:w-[204px]">
            <select className="w-full h-[52px] appearance-none bg-white border border-[#D1D5DB] rounded-[6px] px-5 py-2 text-[16px]">
              <option>Stock Status</option>
              <option>Active</option>
              <option>Low Stock</option>
              <option>Out of Stock</option>
            </select>
            <FiChevronDown className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
          </div>
        </div>

        {/* Product Table */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[640px]">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="p-4 text-left text-sm font-semibold text-gray-600">
                    Image
                  </th>
                  <th className="p-4 text-left text-sm font-semibold text-gray-600">
                    Name
                  </th>
                  <th className="p-4 text-left text-sm font-semibold text-gray-600">
                    SKU
                  </th>
                  <th className="p-4 text-left text-sm font-semibold text-gray-600">
                    Price
                  </th>
                  <th className="p-4 text-left text-sm font-semibold text-gray-600">
                    Stock
                  </th>
                  <th className="p-4 text-left text-sm font-semibold text-gray-600">
                    Status
                  </th>
                  <th className="p-4 text-left text-sm font-semibold text-gray-600">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {products.map((product, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="p-4">
                      <div className="w-10 h-10 bg-gray-200 rounded" />
                    </td>
                    <td className="p-4 text-sm font-medium text-gray-800">
                      {product.name}
                    </td>
                    <td className="p-4 text-sm text-gray-600">{product.sku}</td>
                    <td className="p-4 text-sm text-gray-600">
                      ${product.price}
                    </td>
                    <td className="p-4 text-sm text-gray-600">
                      {product.stock}
                    </td>
                    <td className="p-4">
                      <StatusBadge status={product.status} />
                    </td>
                    <td className="p-4">
                      <div className="flex items-center space-x-2">
                        <Link
                          href="/Product/editProduct" // Replace PRODUCT_ID with dynamic value if needed
                          className="w-[92px] h-[40px] flex items-center gap-[6px] border border-gray-300 text-sm text-gray-700 py-[8px] px-[16px] rounded-[4px] hover:bg-gray-100"
                        >
                          <FiEdit size={14} />
                          Edit
                        </Link>
                        <button
                          className="w-[114px] h-[40px] flex items-center gap-[6px] border border-red-200 text-sm text-red-600 py-[8px] px-[16px] rounded-[4px] hover:bg-red-50"
                          onClick={() => openDeleteModal(product)}
                        >
                          <FiTrash2 size={14} />
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Delete Modal */}
        {selectedProduct && (
          <DeleteProductModal
            isOpen={isModalOpen}
            onClose={closeDeleteModal}
            onDelete={handleDelete}
            productName={selectedProduct.name}
          />
        )}
      </div>
    </div>
  );
};

export default ProductsPage;
