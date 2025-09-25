'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import {
    Grid,
    List,
    Search,
    SlidersHorizontal
} from 'lucide-react';
import fetchApi from '../../utility/api/fetchApi';
import { categoryUrl } from '../../utility/api/constant';

const CategoryListingPage = () => {
    const [loading, setLoading] = useState(false);
    const [viewMode, setViewMode] = useState('grid');
    const [sortBy, setSortBy] = useState('name');
    const [searchQuery, setSearchQuery] = useState('');
    const [showFilters, setShowFilters] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [categories, setCategories] = useState([])

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const res = await fetchApi({ URI: 'public/categories-nav' });
                setCategories(res?.data || []);
            } catch (e) {
                console.error('Failed to fetch categories', e);
            } finally {
                setLoading(false)
            }
        };

        fetchCategories();
    }, []);

    // Filter categories based on search query
    const filteredCategories = categories.filter(category =>
        category.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        category.childre?.some(sub => sub.toLowerCase().includes(searchQuery.toLowerCase()))
    );

    // Sort categories
    const sortedCategories = [...filteredCategories].sort((a, b) => {
        switch (sortBy) {
            case 'name':
                return a.name.localeCompare(b.name);
            case 'count':
                return b.productCount - a.productCount;
            default:
                return 0;
        }
    });

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <header className="bg-white shadow-sm">
                <div className="container mx-auto px-4 py-6">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900">Product Categories</h1>
                            <p className="text-gray-600 mt-1">Browse our wide range of categories</p>
                        </div>

                        <div className="flex items-center gap-3">
                            {/* Search Box */}
                            <div className="relative flex-1 max-w-md">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                                <input
                                    type="text"
                                    placeholder="Search categories..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                                />
                            </div>

                            {/* Mobile Filter Toggle */}
                            <button
                                onClick={() => setShowFilters(!showFilters)}
                                className="md:hidden p-2.5 border border-gray-300 rounded-lg hover:bg-gray-50"
                            >
                                <SlidersHorizontal className="w-5 h-5" />
                            </button>
                        </div>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <div className="container mx-auto px-4 py-8">
                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Sidebar Filters - Hidden on mobile by default */}
                    <aside className={`lg:w-80 ${showFilters ? 'block' : 'hidden'} lg:block`}>
                        <div className="bg-white rounded-lg shadow-sm p-6 sticky top-24">
                            <h3 className="text-lg font-semibold text-gray-900 mb-4">Filters</h3>

                            {/* Sort By */}
                            <div className="mb-6">
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Sort By
                                </label>
                                <select
                                    value={sortBy}
                                    onChange={(e) => setSortBy(e.target.value)}
                                    className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary"
                                >
                                    <option value="name">Name (A-Z)</option>
                                    <option value="count">Product Count</option>
                                </select>
                            </div>

                            {/* Category Filter */}
                            <div className="mb-6">
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Categories
                                </label>
                                <div className="space-y-2">
                                    {categories.map((category) => (
                                        <label key={category.id} className="flex items-center">
                                            <input
                                                type="checkbox"
                                                checked={selectedCategory === category.slug}
                                                onChange={() => setSelectedCategory(
                                                    selectedCategory === category.slug ? null : category.slug
                                                )}
                                                className="rounded text-primary focus:ring-primary"
                                            />
                                            <span className="ml-2 text-sm text-gray-700">
                                                {category.name} ({category.productCount})
                                            </span>
                                        </label>
                                    ))}
                                </div>
                            </div>

                            {/* Quick Stats */}
                            <div className="p-4 bg-gray-50 rounded-lg">
                                <h4 className="font-medium text-gray-900 mb-2">Quick Stats</h4>
                                <p className="text-sm text-gray-600">
                                    {categories.length} total categories
                                </p>
                                <p className="text-sm text-gray-600">
                                    {categories.reduce((sum, cat) => sum + cat.productCount, 0).toLocaleString()}
                                    {' '}total products
                                </p>
                            </div>
                        </div>
                    </aside>

                    {/* Main Content Area */}
                    <main className="flex-1">
                        {/* Controls Bar */}
                        <div className="flex items-center justify-between mb-6">
                            <p className="text-gray-600">
                                Showing {filteredCategories.length} of {categories.length} categories
                            </p>

                            <div className="flex items-center gap-4">
                                {/* View Toggle */}
                                <div className="flex border border-gray-300 rounded-lg overflow-hidden">
                                    <button
                                        onClick={() => setViewMode('grid')}
                                        className={`p-2.5 ${viewMode === 'grid' ? 'bg-primary text-white' : 'text-gray-600 hover:bg-gray-50'}`}
                                    >
                                        <Grid className="w-4 h-4" />
                                    </button>
                                    <button
                                        onClick={() => setViewMode('list')}
                                        className={`p-2.5 ${viewMode === 'list' ? 'bg-primary text-white' : 'text-gray-600 hover:bg-gray-50'}`}
                                    >
                                        <List className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Categories Grid/List */}
                        {filteredCategories.length === 0 ? (
                            <div className="text-center py-16">
                                <div className="w-24 h-24 mx-auto mb-4 text-gray-300">
                                    <svg fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4z" />
                                        <path fillRule="evenodd" d="M18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z" clipRule="evenodd" />
                                    </svg>
                                </div>
                                <h3 className="text-lg font-medium text-gray-900 mb-2">No categories found</h3>
                                <p className="text-gray-600 mb-4">Try adjusting your search or filters</p>
                                <button
                                    onClick={() => {
                                        setSearchQuery('');
                                        setSelectedCategory(null);
                                    }}
                                    className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark"
                                >
                                    Clear Filters
                                </button>
                            </div>
                        ) : viewMode === 'grid' ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                                {sortedCategories.map((category) => (
                                    <motion.div
                                        key={category.id}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.3 }}
                                        className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow overflow-hidden group"
                                    >
                                        <Link href={`/productByCategory/${encodeURIComponent(category._id)}`}>
                                            <div className="relative h-48 overflow-hidden">
                                                <Image
                                                    src={`${categoryUrl}/${category.image}`}
                                                    alt={category.name}
                                                    fill
                                                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                                                />
                                                <div className="absolute inset-0 bg-black bg-opacity-20 group-hover:bg-opacity-30 transition-opacity" />
                                                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full">
                                                    <span className="text-sm font-medium text-gray-900">
                                                        {category.productCount} products
                                                    </span>
                                                </div>
                                            </div>

                                            <div className="p-6">
                                                <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-primary transition-colors">
                                                    {category.name}
                                                </h3>

                                                <div className="flex flex-wrap gap-1 mb-4">
                                                    {category.childre?.slice(0, 3).map((subCat, index) => (
                                                        <span
                                                            key={index}
                                                            className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full"
                                                        >
                                                            {subCat}
                                                        </span>
                                                    ))}
                                                    {category.childre?.length > 3 && (
                                                        <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                                                            +{category.childre?.length - 3} more
                                                        </span>
                                                    )}
                                                </div>

                                                <div className="flex items-center justify-between">
                                                    <span className="text-primary font-medium">
                                                        Explore →
                                                    </span>
                                                </div>
                                            </div>
                                        </Link>
                                    </motion.div>
                                ))}
                            </div>
                        ) : (
                            <div className="space-y-4">
                                {sortedCategories.map((category) => (
                                    <motion.div
                                        key={category.id}
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ duration: 0.3 }}
                                        className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow p-6 group"
                                    >
                                        <Link href={`/productByCategory/${encodeURIComponent(category._id)}`} className="flex flex-col md:flex-row gap-6">
                                            <div className="relative w-full md:w-48 h-32 rounded-lg overflow-hidden flex-shrink-0">
                                                <Image
                                                    src={`${categoryUrl}/${category.image}`}
                                                    alt={category.name}
                                                    fill
                                                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                                                />
                                                <div className="absolute inset-0 bg-black bg-opacity-20 group-hover:bg-opacity-30 transition-opacity" />
                                            </div>

                                            <div className="flex-1">
                                                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                                                    <div>
                                                        <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-primary transition-colors">
                                                            {category.name}
                                                        </h3>
                                                        <p className="text-gray-600 mb-3">
                                                            {category.productCount} products available
                                                        </p>

                                                        <div className="flex flex-wrap gap-1 mb-4">
                                                            {category.childre?.slice(0, 4).map((subCat, index) => (
                                                                <span
                                                                    key={index}
                                                                    className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full"
                                                                >
                                                                    {subCat}
                                                                </span>
                                                            ))}
                                                            {category.childre?.length > 4 && (
                                                                <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                                                                    +{category.childre?.length - 4} more
                                                                </span>
                                                            )}
                                                        </div>
                                                    </div>

                                                    <div className="flex-shrink-0">
                                                        <span className="inline-flex items-center px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors">
                                                            View Products
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </Link>
                                    </motion.div>
                                ))}
                            </div>
                        )}
                    </main>
                </div>
            </div>
        </div>
    );
};

export default CategoryListingPage;