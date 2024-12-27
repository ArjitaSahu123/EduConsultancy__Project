import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { addProduct, updateProduct } from "../../services/product-service";

const ProductSchema = z.object({
    title: z.string().min(1, "Title is required"),
    description: z
        .string()
        .min(10, "Description must be at least 10 characters long"),
    price: z
        .number({ invalid_type_error: "Price must be a number" })
        .positive("Price must be a positive number"),
    category: z.string().min(1, "Category is required"),
});

const ProductForm = ({
    mode = "create",
    productData = null,
    onClose,
    onProductUpdated,
}) => {
    const [image, setImage] = useState(null);
    const [loading, setLoading] = useState(false);

    const categories = ["EDUCATION", "LIFESTYLE", "TECHNOLOGY", "DESIGN"];

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(ProductSchema),
        defaultValues: {
            title: "",
            description: "",
            price: "",
            category: "",
        },
    });

    useEffect(() => {
        if (mode === "edit" && productData) {
            reset({
                title: productData.title || "",
                description: productData.description || "",
                price: productData.price || "",
                category: productData.category || "",
            });
        }
    }, [mode, productData, reset]);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            if (file.size > 5 * 1024 * 1024) {
                toast.error("File size is too large. Please upload a smaller image.");
                return;
            }
            setImage(file);
        }
    };

    const onSubmit = async (data) => {
        if (mode === "create" && !image) {
            toast.error("Please upload an image.");
            return;
        }

        setLoading(true);

        try {
            const productDto = {
                ...data,
                rating: 5,
                productImage: "default.png",
                productUrl: "url",
            };

            const formData = new FormData();

            if (mode === "create") {
                if (image) {
                    formData.append("file", image);
                }
                formData.append("productDto", JSON.stringify(productDto));
                await addProduct(formData);
                toast.success("Product added successfully!");
            } else if (mode === "edit") {
                if (image) {
                    formData.append("file", image);
                } else {
                    formData.append("file", new Blob(), "");
                }
                formData.append("productDtoObj", JSON.stringify(productDto));
                await updateProduct(productData.productId, formData);
                toast.success("Product updated successfully!");
            }

            reset();
            setImage(null);

            if (onProductUpdated) {
                onProductUpdated();
            }

            onClose();
        } catch (error) {
            console.error(error);
            toast.error(error.message || "An error occurred while processing the product.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-white p-6 rounded-md shadow-md w-full max-w-xl">
            <h2 className="text-2xl font-bold mb-4">
                {mode === "edit" ? "Edit Product" : "Create Product"}
            </h2>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="mb-4">
                    <label className="block text-sm font-semibold mb-2">Title</label>
                    <input
                        type="text"
                        {...register("title")}
                        className={`w-full p-2 border rounded-md ${errors.title ? "border-red-500" : ""
                            }`}
                    />
                    {errors.title && (
                        <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>
                    )}
                </div>

                <div className="mb-4">
                    <label className="block text-sm font-semibold mb-2">Description</label>
                    <textarea
                        {...register("description")}
                        className={`w-full p-2 border h-64 rounded-md ${errors.description ? "border-red-500" : ""
                            }`}
                    />
                    {errors.description && (
                        <p className="text-red-500 text-sm mt-1">
                            {errors.description.message}
                        </p>
                    )}
                </div>

                <div className="mb-4">
                    <label className="block text-sm font-semibold mb-2">Price</label>
                    <input
                        type="number"
                        {...register("price", { valueAsNumber: true })}
                        className={`w-full p-2 border rounded-md ${errors.price ? "border-red-500" : ""
                            }`}
                    />
                    {errors.price && (
                        <p className="text-red-500 text-sm mt-1">{errors.price.message}</p>
                    )}
                </div>

                <div className="mb-4">
                    <label className="block text-sm font-semibold mb-2">Category</label>
                    <select
                        {...register("category")}
                        className={`w-full p-2 border rounded-md ${errors.category ? "border-red-500" : ""
                            }`}
                    >
                        <option value="" disabled>
                            Select a category
                        </option>
                        {categories.map((cat) => (
                            <option key={cat} value={cat}>
                                {cat}
                            </option>
                        ))}
                    </select>
                    {errors.category && (
                        <p className="text-red-500 text-sm mt-1">{errors.category.message}</p>
                    )}
                </div>

                <div className="mb-4">
                    <label className="block text-sm font-semibold mb-2">Upload Image</label>
                    <input
                        type="file"
                        onChange={handleImageChange}
                        className="w-full p-2 border rounded-md"
                    />
                </div>

                <div className="mb-4 flex justify-between">
                    <button
                        type="button"
                        onClick={onClose}
                        className="bg-gray-500 text-white py-2 px-4 rounded-md btn"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className="bg-blue-500 text-white py-2 px-4 rounded-md btn"
                        disabled={loading}
                    >
                        {loading ? "Submitting..." : "Submit"}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default ProductForm;
