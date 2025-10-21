import { useEffect, useState } from "react";
import Link from "next/link";
import { MenuOutlined, CloseOutlined, DownOutlined } from '@ant-design/icons';
import fetchApi from "../../utility/api/fetchApi";

export default function CategoryNav() {
    const [loading, setLoading] = useState(true);
    const [open, setOpen] = useState(false);
    const [categories, setCategories] = useState([])
    const [activeCategory, setActiveCategory] = useState(null);


    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const res = await fetchApi({ URI: 'public/categories-nav' });
                const raw = res?.data || [];

                // Map into structure expected by your UI
                const structured = raw.map(cat => ({
                    id: cat._id,
                    name: cat.name,
                    slug: cat.slug,
                    subCategories: cat.children?.map(child => ({
                        name: child.name,
                        slug: child.slug,
                        id: child._id
                    })) || []
                }));

                // Define your preferred order
                const order = [
                    'Cardio',
                    'Strength plate loaded',
                    'Strength pin loaded',
                    'Benches',
                    'Weights',
                    'Accessories',
                    'Floor mats'
                ];

                // Sort based on order
                const sorted = structured.sort((a, b) => {
                    const indexA = order.indexOf(a.name);
                    const indexB = order.indexOf(b.name);

                    // If not found in order, push to the end
                    if (indexA === -1 && indexB === -1) return 0;
                    if (indexA === -1) return 1;
                    if (indexB === -1) return -1;

                    return indexA - indexB;
                });

                setCategories(sorted);
            } catch (e) {
                console.error('Failed to fetch categories', e);
            } finally {
                setLoading(false);
            }
        };

        fetchCategories();
    }, []);



    // Desktop dropdown handlers
    const handleCategoryEnter = (categoryId) => {
        setActiveCategory(categoryId);
    };

    const handleCategoryLeave = () => {
        setActiveCategory(null);
    };

    return (
        <div className="bg-white shadow-sm border-t border-gray-100 relative">
            <div className="container mx-auto px-4">
                {/* Mobile Toggle Button */}
                <div className="flex md:hidden justify-between items-center py-3">
                    <h2 className="text-base font-semibold text-gray-800">Browse Categories</h2>
                    <button
                        onClick={() => setOpen(!open)}
                        className="text-gray-700 p-2 rounded-md hover:bg-gray-100 transition-colors"
                        aria-label="Toggle categories menu"
                    >
                        {open ? <CloseOutlined className="text-lg" /> : <MenuOutlined className="text-lg" />}
                    </button>
                </div>

                {/* Desktop Navigation */}
                <nav className="hidden md:block">
                    <ul className="flex space-x-6 lg:space-x-8 py-3">
                        {loading ? (
                            // Skeleton loading for desktop
                            Array.from({ length: 5 }).map((_, index) => (
                                <li key={index} className="h-6 bg-gray-200 rounded w-20 animate-pulse"></li>
                            ))
                        ) : (
                            categories.map((category) => (
                                <li
                                    key={category.id}
                                    className="relative group"
                                    onMouseEnter={() => handleCategoryEnter(category.id)}
                                    onMouseLeave={handleCategoryLeave}
                                >
                                    <Link
                                        href={`/productByCategory/${encodeURIComponent(category.id)}`}
                                        className="flex items-center text-sm font-medium text-gray-700 hover:text-primary transition-colors py-2"
                                    >
                                        {category.name}
                                        {category.subCategories.length > 0 && (
                                            <DownOutlined className="ml-1 text-xs" />
                                        )}
                                    </Link>

                                    {/* Desktop Dropdown */}
                                    {category.subCategories.length > 0 && activeCategory === category.id && (
                                        <div className="absolute top-full left-0 w-48 bg-white shadow-lg rounded-md border border-gray-100 z-50 mt-1 py-2">
                                            {category.subCategories.map((subCategory) => (
                                                <Link
                                                    key={subCategory.slug}
                                                    href={`/productByCategory/${encodeURIComponent(subCategory.id)}`}
                                                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-primary transition-colors"
                                                >
                                                    {subCategory.name}
                                                </Link>
                                            ))}
                                        </div>
                                    )}
                                </li>
                            ))
                        )}
                    </ul>
                </nav>

                {/* Mobile Sidebar */}
                <div
                    className={`md:hidden fixed top-0 right-0 h-full w-64 bg-white shadow-xl z-50 transition-transform duration-300 ease-in-out ${open ? "translate-x-0" : "translate-x-full"
                        }`}
                >
                    <div className="flex justify-between items-center p-4 border-b border-gray-200">
                        <h3 className="text-lg font-semibold text-gray-800">Categories</h3>
                        <button
                            onClick={() => setOpen(false)}
                            className="p-1 rounded-md hover:bg-gray-100 transition-colors"
                            aria-label="Close menu"
                        >
                            <CloseOutlined className="text-lg" />
                        </button>
                    </div>

                    <div className="p-4 overflow-y-auto h-[calc(100%-64px)]">
                        {loading ? (
                            // Skeleton loading for mobile
                            Array.from({ length: 8 }).map((_, index) => (
                                <div key={index} className="mb-4">
                                    <div className="h-5 bg-gray-200 rounded w-32 mb-2 animate-pulse"></div>
                                    <ul className="pl-4 space-y-2">
                                        {Array.from({ length: 3 }).map((_, subIndex) => (
                                            <li key={subIndex} className="h-4 bg-gray-100 rounded w-24 animate-pulse"></li>
                                        ))}
                                    </ul>
                                </div>
                            ))
                        ) : (
                            categories.map((category) => (
                                <div key={category.id} className="mb-6">
                                    <Link
                                        href={`/productByCategory/${encodeURIComponent(category.id)}`}
                                        className="block font-medium text-gray-800 mb-2 text-base hover:text-primary transition-colors"
                                        onClick={() => setOpen(false)}
                                    >
                                        {category.name}
                                    </Link>

                                    {/* Subcategories */}
                                    {category.subCategories.length > 0 && (
                                        <ul className="pl-4 space-y-2 border-l border-gray-200 ml-2">
                                            {category.subCategories.map((subCategory) => (
                                                <li key={subCategory.slug}>
                                                    <Link
                                                        href={`/productByCategory/${encodeURIComponent(subCategory.id)}`}
                                                        className="block py-1 text-sm text-gray-600 hover:text-primary transition-colors"
                                                        onClick={() => setOpen(false)}
                                                    >
                                                        {subCategory.name}
                                                    </Link>
                                                </li>
                                            ))}
                                        </ul>
                                    )}
                                </div>
                            ))
                        )}
                    </div>
                </div>

                {/* Overlay when sidebar open */}
                {open && (
                    <div
                        className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
                        onClick={() => setOpen(false)}
                    />
                )}
            </div>
        </div>
    );
}
