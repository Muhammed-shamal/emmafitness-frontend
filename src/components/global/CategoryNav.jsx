import { useEffect, useState } from "react";
import { MenuOutlined, CloseOutlined } from "@ant-design/icons";
import Link from "next/link";
import fetchApi from "../../utility/api/fetchApi";

export default function CategoryNav() {
    const [open, setOpen] = useState(false);
    const [categories, setCategories] = useState([])

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
                        slug: child.slug
                    })) || []
                }));

                setCategories(structured);
            } catch (e) {
                console.error('Failed to fetch categories', e);
            }
        };

        fetchCategories();
    }, []);

    return (
        <div className="bg-white shadow-sm border-t border-gray-100">
            <div className="container mx-auto px-4">

                {/* Desktop Menu */}
                {/* <div className="hidden md:flex justify-center gap-6 text-sm font-medium py-3">
                    {categories.map((cat, idx) => (
                        <div key={idx} className="relative group">
                            <Link
                                href={`/category/${cat.slug}`}
                                className="hover:text-secondary transition-colors duration-200 text-gray-700"
                            >
                                {cat.name}
                            </Link>

                            {cat.subCategories.map((sub, subIdx) => (
                                <li key={subIdx}>
                                    <Link
                                        href={`/category/${cat.slug}/${sub.slug}`}
                                        className="block px-4 py-2 hover:bg-gray-100"
                                    >
                                        {sub.name}
                                    </Link>
                                </li>
                            ))}

                        </div>
                    ))}
                </div> */}

                {/* Mobile Toggle Button */}
                <div className="flex md:hidden justify-between items-center py-3">
                    <h2 className="text-base font-semibold">Categories</h2>
                    <button
                        onClick={() => setOpen(!open)}
                        className="text-gray-700 text-xl"
                    >
                        {open ? <CloseOutlined /> : <MenuOutlined />}
                    </button>
                </div>

                {/* Mobile Sidebar */}
                <div
                    className={`md:hidden fixed top-0 right-0 h-full w-64 bg-white shadow-lg z-50 transition-transform duration-300 ${open ? "translate-x-0" : "translate-x-full"
                        }`}
                >
                    <div className="flex justify-between items-center p-4 border-b">
                        <h3 className="text-lg font-semibold">Browse Categories</h3>
                        <button onClick={() => setOpen(false)}>
                            <CloseOutlined />
                        </button>
                    </div>

                    <div className="p-4 overflow-y-auto">
                        {categories.map((cat, idx) => (
                            <div key={idx} className="mb-4">
                                <Link
                                    href={`/category/${cat.slug}`}
                                    className="block font-medium text-gray-800 mb-1"
                                >
                                    {cat.name}
                                </Link>

                                {/* Show subcategories */}
                                {cat.subCategories.map((sub, subIdx) => (
                                    <li key={subIdx}>
                                        <Link
                                            href={`/category/${cat.slug}/${sub.slug}`}
                                            className="hover:text-secondary"
                                        >
                                            {sub.name}
                                        </Link>
                                    </li>
                                ))}

                            </div>
                        ))}
                    </div>
                </div>

                {/* Overlay when sidebar open */}
                {open && (
                    <div
                        className="fixed inset-0 bg-black bg-opacity-30 z-40"
                        onClick={() => setOpen(false)}
                    />
                )}
            </div>
        </div>
    );
}
