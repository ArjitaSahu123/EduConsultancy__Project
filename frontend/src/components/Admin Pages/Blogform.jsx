import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { publishBlog, updateBlog, getUserId } from '../../services/blog-service';

const Blogform = ({ mode = 'create', blogData = null, onClose, onBlogUpdated }) => {
    const [image, setImage] = useState(null);
    const [loading, setLoading] = useState(false);

    const categories = ["EDUCATION", "LIFESTYLE", "TECHNOLOGY", "DESIGN"];

    // Zod schema for validation
    const schema = z.object({
        title: z.string().min(1, "Title is required"),
        content: z.string().min(5, "Content must be at least 5 characters long"),
        category: z.string().nonempty("Category is required"),
        image: z
            .instanceof(File)
            .refine((file) => !file || file.size <= 5 * 1024 * 1024, {
                message: "File size is too large. Please upload a smaller image.",
            })
            .refine((file) => mode === 'edit' || file !== undefined, {
                message: "Image is required when creating a blog.",
            })
            .optional(),
    });

    const { register, handleSubmit, formState: { errors }, setValue, reset } = useForm({
        resolver: zodResolver(schema),
        defaultValues: {
            category: '',
        }
    });

    useEffect(() => {
        if (mode === 'edit' && blogData) {
            setValue("title", blogData.title || '');
            setValue("content", blogData.content || '');
            setValue("category", blogData.category || '');
        }
    }, [mode, blogData, setValue]);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImage(file);
        }
    };

    const onSubmit = async (data) => {
        setLoading(true);

        try {
            let userId = null;

            if (mode === 'create') {
                userId = await getUserId();
            }

            const blogDtoObj = {
                userId: userId || blogData?.userId,
                title: data.title,
                content: data.content,
                category: data.category,
            };

            const formData = new FormData();

            if (mode === 'create') {
                if (image) {
                    formData.append('file', image);
                } else {

                    throw new Error("Image is required when creating a blog.");
                }
                formData.append('blogDto', JSON.stringify(blogDtoObj));
                await publishBlog(formData);
                toast.success("Blog published successfully!");
            } else if (mode === 'edit') {
                if (image) {
                    formData.append('file', image);
                } else {
                    formData.append('file', new Blob(), '');
                }
                formData.append('blogDtoObj', JSON.stringify(blogDtoObj));
                await updateBlog(blogData.blogId, formData);
                toast.success("Blog updated successfully!");
            }

            reset();
            onClose();

            if (onBlogUpdated) {
                onBlogUpdated();
            }
        } catch (error) {
            console.error(error);
            toast.error(error.message || "An error occurred");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-white p-6 rounded-md shadow-md w-full max-w-xl">
            <h2 className="text-2xl font-bold mb-4">{mode === 'edit' ? 'Edit Blog' : 'Create Blog'}</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="mb-4">
                    <label className="block text-sm font-semibold mb-2">Title</label>
                    <input
                        type="text"
                        {...register('title')}
                        className={`w-full p-2 border rounded-md ${errors.title ? 'border-red-500' : ''}`}
                    />
                    {errors.title && <span className="text-red-500 text-sm">{errors.title.message}</span>}
                </div>

                <div className="mb-4">
                    <label className="block text-sm font-semibold mb-2">Content</label>
                    <textarea
                        {...register('content')}
                        className={`w-full h-64 p-2 border rounded-md ${errors.content ? 'border-red-500' : ''}`}
                    />
                    {errors.content && <span className="text-red-500 text-sm">{errors.content.message}</span>}
                </div>

                <div className="mb-4">
                    <label className="block text-sm font-semibold mb-2">Category</label>
                    <select
                        {...register('category')}
                        className={`w-full p-2 border rounded-md ${errors.category ? 'border-red-500' : ''}`}
                    >
                        <option value="" disabled>Select a category</option>
                        {categories.map((cat) => (
                            <option key={cat} value={cat}>
                                {cat}
                            </option>
                        ))}
                    </select>
                    {errors.category && <span className="text-red-500 text-sm">{errors.category.message}</span>}
                </div>

                <div className="mb-4">
                    <label className="block text-sm font-semibold mb-2">Upload Image</label>
                    <input
                        type="file"
                        onChange={handleImageChange}
                        className={`w-full p-2 border rounded-md ${errors.image ? 'border-red-500' : ''}`}
                    />
                    {errors.image && <span className="text-red-500 text-sm">{errors.image.message}</span>}
                </div>

                <div className="mb-4 flex justify-between">
                    <button
                        type="button"
                        onClick={onClose}
                        className="bg-gray-500 text-white py-2 px-4 rounded-md"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className="bg-blue-500 text-white py-2 px-4 rounded-md"
                        disabled={loading}
                    >
                        {loading ? "Publishing..." : "Publish"}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default Blogform;
