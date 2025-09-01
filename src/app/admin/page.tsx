'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Save, Upload, Eye, EyeOff, Settings, Home, Users, FileText, Lock, Unlock, Plus, Trash2, Code, ExternalLink, X } from 'lucide-react';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import Link from 'next/link';

// Types for content management
interface ContentSection {
  id: string;
  title: string;
  type: 'text' | 'textarea' | 'image' | 'array' | 'accordion' | 'pages' | 'footerLinks' | 'navMenu' | 'checkbox';
  value: string | string[];
  placeholder?: string;
  maxLength?: number;
}

interface ContentData {
  hero: ContentSection[];
  navigation: ContentSection[];
  footer: ContentSection[];
  general: ContentSection[];
  whySourced: ContentSection[];
  pages: ContentSection[];
  footerLinks: ContentSection[];
}

export default function AdminDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [activeTab, setActiveTab] = useState('hero');
  const [contentData, setContentData] = useState<ContentData>({
    hero: [],
    navigation: [],
    footer: [],
    general: [],
    whySourced: [],
    pages: [],
    footerLinks: []
  });
  const [hasChanges, setHasChanges] = useState(false);
  const [previewMode, setPreviewMode] = useState(false);

  // Simple authentication (in production, use proper auth)
  const handleLogin = () => {
    if (password === 'admin123') { // Change this to a secure password
      setIsAuthenticated(true);
      localStorage.setItem('admin-auth', 'true');
    } else {
      alert('Invalid password');
    }
  };

  useEffect(() => {
    const authStatus = localStorage.getItem('admin-auth');
    if (authStatus === 'true') {
      setIsAuthenticated(true);
    }
  }, []);

  // Load content from API when authenticated
  useEffect(() => {
    const loadContent = async () => {
      if (!isAuthenticated) return;

      try {
        const response = await fetch('/api/content');
        if (response.ok) {
          const apiContent = await response.json();
          setContentData(apiContent);
        } else {
          // Fallback to localStorage
          const savedContent = localStorage.getItem('site-content');
          if (savedContent) {
            setContentData(JSON.parse(savedContent));
          }
        }
      } catch (error) {
        console.error('Error loading content:', error);
        // Fallback to localStorage
        const savedContent = localStorage.getItem('site-content');
        if (savedContent) {
          try {
            setContentData(JSON.parse(savedContent));
          } catch (parseError) {
            console.error('Error parsing saved content:', parseError);
          }
        }
      }
    };

    loadContent();
  }, [isAuthenticated]);

  const handleContentChange = (sectionKey: keyof ContentData, itemId: string, newValue: string | string[]) => {
    setContentData(prev => ({
      ...prev,
      [sectionKey]: prev[sectionKey].map(item =>
        item.id === itemId ? { ...item, value: newValue } : item
      )
    }));
    setHasChanges(true);
  };

  // console.log(contentData, 'contentData');

  const handleArrayItemChange = (sectionKey: keyof ContentData, itemId: string, index: number, newValue: string) => {
    setContentData(prev => ({
      ...prev,
      [sectionKey]: prev[sectionKey].map(item => {
        if (item.id === itemId && Array.isArray(item.value)) {
          const newArray = [...item.value];
          newArray[index] = newValue;
          return { ...item, value: newArray };
        }
        return item;
      })
    }));
    setHasChanges(true);
  };

  const addArrayItem = (sectionKey: keyof ContentData, itemId: string) => {
    setContentData(prev => ({
      ...prev,
      [sectionKey]: prev[sectionKey].map(item => {
        if (item.id === itemId && Array.isArray(item.value)) {
          let temp = { ...item, value: [...item.value, 'Acordion Item 3'] };
          return { ...item, value: [...item.value, 'Acordion Item 3'] };
        }
        return item;
      })
    }));
    setHasChanges(true);
  };

  const removeArrayItem = (sectionKey: keyof ContentData, itemId: string, index: number) => {
    setContentData(prev => ({
      ...prev,
      [sectionKey]: prev[sectionKey].map(item => {
        if (item.id === itemId && Array.isArray(item.value)) {
          const newArray = item.value.filter((_, i) => i !== index);
          return { ...item, value: newArray };
        }
        return item;
      })
    }));
    setHasChanges(true);
  };

  const handleImageUpload = (sectionKey: keyof ContentData, itemId: string, file: File) => {
    // Validate file for favicon
    if (itemId === 'site-favicon') {
      const validTypes = ['image/x-icon', 'image/vnd.microsoft.icon', 'image/png', 'image/svg+xml'];

      if (!validTypes.includes(file.type) && !file.name.endsWith('.ico')) {
        alert('Please upload a valid favicon file (.ico, .png, or .svg)');
        return;
      }

      // Check file size (favicons should be small)
      if (file.size > 1024 * 1024) { // 1MB limit
        alert('Favicon file size should be less than 1MB');
        return;
      }
    }

    // For now, convert to data URL (in production, upload to cloud storage)
    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      handleContentChange(sectionKey, itemId, result);

      // For favicon, also update the document favicon immediately for preview
      if (itemId === 'site-favicon') {
        const link = document.querySelector("link[rel*='icon']") as HTMLLinkElement || document.createElement('link');
        link.type = file.type;
        link.rel = 'shortcut icon';
        link.href = result;
        document.getElementsByTagName('head')[0].appendChild(link);
      }
    };

    reader.onerror = () => {
      alert('Error reading file. Please try again.');
    };

    reader.readAsDataURL(file);
  };

  const handleMediaUpload = (sectionKey: keyof ContentData, itemId: string, file: File) => {
    // Validate file for favicon
    const validImageTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
    const validVideoTypes = ['video/mp4', 'video/webm', 'video/ogg'];

    if (!validImageTypes.includes(file.type) && !validVideoTypes.includes(file.type)) {
      alert('Please upload a valid image (JPEG, PNG, GIF, WebP) or video (MP4, WebM, OGG) file');
      return;
    }
    if (file.size > 10 * 1024 * 1024) { // 10MB limit for all files
      alert('File size should be less than 10MB');
      return;
    }

    // Convert to data URL (in production, upload to cloud storage)
    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      setContentData(prev => ({
        ...prev,
        [sectionKey]: prev[sectionKey].map(item => {
          if (item.id === itemId) {
            const currentValue = Array.isArray(item.value) ? item.value : [];
            return { ...item, value: [...currentValue, result] };
          }
          return item;
        })
      }));
      setHasChanges(true);

      const input = document.getElementById(`upload-${itemId}`) as HTMLInputElement;
      if (input) {
        input.value = '';
      }
    };

    reader.onerror = () => {
      alert('Error reading file. Please try again.');
    };

    reader.readAsDataURL(file);
  };

  const handleMediaDelete = (sectionKey: keyof ContentData, itemId: string, index: number) => {
    setContentData(prev => ({
      ...prev,
      [sectionKey]: prev[sectionKey].map(item => {
        if (item.id === itemId && Array.isArray(item.value)) {
          const newArray = item.value.filter((_, i) => i !== index);
          return { ...item, value: newArray };
        }
        return item;
      })
    }));
    setHasChanges(true);
  };

  const saveChanges = async () => {
    try {
      // Save to localStorage (immediate fallback)
      // localStorage.setItem('site-content', JSON.stringify(contentData));

      // Also save to API endpoint for persistence
      const response = await fetch('/api/content', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(contentData),
      });

      if (!response.ok) {
        console.warn('API save failed, but localStorage save succeeded');
      }

      setHasChanges(false);
      alert('Changes saved successfully!');
    } catch (error) {
      console.error('Error saving changes:', error);
      alert('Error saving changes. Please try again.');
    }
  };

  const logout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('admin-auth');
    setPassword('');
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md"
        >
          <div className="text-center mb-6">
            <Lock className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h1 className="text-2xl font-bold text-gray-900">Admin Login</h1>
            <p className="text-gray-600">Enter password to access dashboard</p>
          </div>
          <div className="space-y-4">
            <input
              type="password"
              placeholder="Enter admin password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleLogin()}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
            />
            <button
              onClick={handleLogin}
              className="w-full bg-black text-white py-3 rounded-lg hover:bg-gray-800 transition-colors"
            >
              Login
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  const tabs = [
    { id: 'hero', label: 'Hero Section', icon: Home },
    { id: 'navigation', label: 'Navigation', icon: Settings },
    { id: 'whySourced', label: 'Why Sourced', icon: Users },
    { id: 'pages', label: 'Pages', icon: FileText },
    { id: 'footerLinks', label: 'Footer Links', icon: ExternalLink },
    { id: 'footer', label: 'Footer', icon: FileText },
    { id: 'general', label: 'General', icon: Users },
    { id: 'admin', label: 'Admin Dashboard', icon: Users },
  ];

  const renderContentEditor = (section: ContentSection, sectionKey: keyof ContentData) => {
    switch (section.type) {
      case 'text':
        return (
          <input
            type="text"
            value={section.value as string}
            onChange={(e) => handleContentChange(sectionKey, section.id, e.target.value)}
            placeholder={section.placeholder}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
          />
        );
      case 'checkbox':
        return (
          <div>
            <Checkbox id={`checkbox-${sectionKey}`}></Checkbox>
            <Label htmlFor={`checkbox-${sectionKey}`}>{section.placeholder}</Label>
          </div>
        ) //checbox case unimplemented yet
      case 'textarea':
        return (
          <div>
            <textarea
              value={section.value as string}
              onChange={(e) => handleContentChange(sectionKey, section.id, e.target.value)}
              placeholder={section.placeholder}
              maxLength={section.maxLength}
              rows={4}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
            />
            {section.maxLength && (
              <p className="text-sm text-gray-500 mt-1">
                {(section.value as string).length}/{section.maxLength} characters
              </p>
            )}
          </div>
        );

      case 'image':
        return (
          <div className="space-y-3">
            {
              section.id === 'brand-logo' || section.id === 'site-favicon' ? (
                <>
                  <div className="flex items-center space-x-4">
                    {section.value && (
                      <div className="flex-shrink-0">
                        <img
                          src={section.value as string}
                          alt={section.title}
                          className={`object-cover border rounded-lg ${section.id === 'brand-logo'
                            ? 'h-16 w-16 border-2 border-gray-300 shadow-sm'
                            : section.id === 'site-favicon'
                              ? 'h-8 w-8 border border-gray-300 bg-white p-1'
                              : 'h-20 w-20 border'
                            }`}
                        />
                        {section.id === 'brand-logo' && (
                          <p className="text-xs text-gray-500 mt-1 text-center">Square Logo</p>
                        )}
                        {section.id === 'site-favicon' && (
                          <div className="text-center">
                            <p className="text-xs text-gray-500 mt-1">Favicon</p>
                            <p className="text-xs text-gray-400">Browser icon</p>
                          </div>
                        )}
                      </div>
                    )}
                    <div className="flex-1">
                      <input
                        type="file"
                        accept={section.id === 'site-favicon' ? '.ico,.png,.svg,image/x-icon,image/png,image/svg+xml' : 'image/*'}
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            handleImageUpload(sectionKey, section.id, file);
                          }
                        }}
                        className="hidden"
                        id={`upload-${section.id}`}
                      />
                      <label
                        htmlFor={`upload-${section.id}`}
                        className="inline-flex items-center px-4 py-2 bg-gray-100 text-gray-700 rounded-lg cursor-pointer hover:bg-gray-200 transition-colors"
                      >
                        <Upload className="h-4 w-4 mr-2" />
                        {section.id === 'site-favicon' ? 'Upload Favicon' : 'Upload Image'}
                      </label>
                      {section.id === 'brand-logo' && (
                        <p className="text-xs text-gray-600 mt-2">
                          For best results, upload a square image (1:1 aspect ratio) like 512x512px
                        </p>
                      )}
                      {section.id === 'site-favicon' && (
                        <p className="text-xs text-gray-600 mt-2">
                          Upload a small icon (16x16 or 32x32 pixels). Supported formats: .ico, .png, .svg
                        </p>
                      )}
                    </div>
                  </div>
                  <input
                    type="text"
                    value={section.value as string}
                    onChange={(e) => handleContentChange(sectionKey, section.id, e.target.value)}
                    placeholder="Or enter image URL"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                  />
                </>

              ) : (

                <div className="space-y-3">
                  <div className="flex flex-wrap gap-4">
                    {Array.isArray(section.value) && section.value.map((media, index) => (
                      <div key={index} className="relative flex-shrink-0">
                        {media.startsWith('data:video/') ? (
                          <video
                            src={media}
                            className="object-cover rounded-lg h-20 w-20 border"
                            controls
                          />
                        ) : (
                          <img
                            src={media}
                            alt={`${section.title}-${index}`}
                            className="object-cover rounded-lg h-20 w-20 border"
                          />
                        )}
                        <button
                          onClick={() => handleMediaDelete(sectionKey, section.id, index)}
                          className="absolute top-0 right-0 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
                          title="Delete"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                  <div className="flex-1">
                    <input
                      type="file"
                      accept="image/*,video/*"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          handleMediaUpload(sectionKey, section.id, file);
                        }
                      }}
                      className="hidden"
                      id={`upload-${section.id}`}
                    />
                    <label
                      htmlFor={`upload-${section.id}`}
                      className="inline-flex items-center px-4 py-2 bg-gray-100 text-gray-700 rounded-lg cursor-pointer hover:bg-gray-200 transition-colors"
                    >
                      <Upload className="h-4 w-4 mr-2" />
                      Upload Image or Video
                    </label>
                  </div>
                </div>
              )
            }
          </div>
        );

      case 'pages':
        return (
          <div className="space-y-4">
            {(section.value as string[]).map((item, index) => {
              const [slug, title, html] = item.split('|');
              return (
                <div key={index} className="border border-gray-200 rounded-lg p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium text-gray-900 flex items-center gap-2">
                      <Code className="h-4 w-4" />
                      Page {index + 1}: /{slug || 'new-page'}
                    </h4>
                    <div className="flex items-center gap-2">
                      <a
                        href={`/${slug}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-1 text-blue-600 hover:bg-blue-50 rounded"
                        title="Preview page"
                      >
                        <ExternalLink className="h-4 w-4" />
                      </a>
                      <button
                        onClick={() => removeArrayItem(sectionKey, section.id, index)}
                        className="p-1 text-red-600 hover:bg-red-50 rounded"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-3">
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">URL Slug</label>
                        <input
                          type="text"
                          value={slug || ''}
                          onChange={(e) => {
                            const newValue = `${e.target.value}|${title || ''}|${html || ''}`;
                            handleArrayItemChange(sectionKey, section.id, index, newValue);
                          }}
                          placeholder="page-url"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Page Title</label>
                        <input
                          type="text"
                          value={title || ''}
                          onChange={(e) => {
                            const newValue = `${slug || ''}|${e.target.value}|${html || ''}`;
                            handleArrayItemChange(sectionKey, section.id, index, newValue);
                          }}
                          placeholder="Page Title"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">HTML Content</label>
                      <textarea
                        value={html || ''}
                        onChange={(e) => {
                          const newValue = `${slug || ''}|${title || ''}|${e.target.value}`;
                          handleArrayItemChange(sectionKey, section.id, index, newValue);
                        }}
                        placeholder="<h1>Page Title</h1><p>Page content...</p>"
                        rows={8}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent font-mono text-sm"
                      />
                      <p className="text-xs text-gray-500 mt-1">
                        You can use HTML tags like &lt;h1&gt;, &lt;p&gt;, &lt;div&gt;, &lt;img&gt;, etc.
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}

            <button
              onClick={() => {
                const newPage = 'new-page|New Page|<h1>New Page</h1><p>Add your content here...</p>';
                addArrayItem(sectionKey, section.id);
                const currentItems = section.value as string[];
                const newItems = [...currentItems];
                newItems.push(newPage);
                handleContentChange(sectionKey, section.id, newItems);
              }}
              className="w-full px-4 py-3 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-gray-400 hover:text-gray-700 transition-colors flex items-center justify-center gap-2"
            >
              <Plus className="h-4 w-4" />
              Add New Page
            </button>
          </div>
        );

      case 'footerLinks':
        return (
          <div className="space-y-4">
            {(section.value as string[]).map((item, index) => {
              const [columnTitle, links] = item.split('|');
              return (
                <div key={index} className="border border-gray-200 rounded-lg p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium text-gray-900">Footer Column {index + 1}</h4>
                    <button
                      onClick={() => removeArrayItem(sectionKey, section.id, index)}
                      className="p-1 text-red-600 hover:bg-red-50 rounded"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>

                  <div className="grid grid-cols-1 gap-3">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Column Title</label>
                      <input
                        type="text"
                        value={columnTitle || ''}
                        onChange={(e) => {
                          const newValue = `${e.target.value}|${links || ''}`;
                          handleArrayItemChange(sectionKey, section.id, index, newValue);
                        }}
                        placeholder="Column Title"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Links</label>
                      <textarea
                        value={links || ''}
                        onChange={(e) => {
                          const newValue = `${columnTitle || ''}|${e.target.value}`;
                          handleArrayItemChange(sectionKey, section.id, index, newValue);
                        }}
                        placeholder="slug:Display Name,another-slug:Another Link"
                        rows={3}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                      />
                      <p className="text-xs text-gray-500 mt-1">
                        Format: slug:Display Name,another-slug:Another Link
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}

            <button
              onClick={() => {
                const newColumn = 'New Column|new-link:New Link';
                addArrayItem(sectionKey, section.id);
                const currentItems = section.value as string[];
                const newItems = [...currentItems];
                newItems[newItems.length - 1] = newColumn;
                handleContentChange(sectionKey, section.id, newItems);
              }}
              className="w-full px-4 py-3 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-gray-400 hover:text-gray-700 transition-colors flex items-center justify-center gap-2"
            >
              <Plus className="h-4 w-4" />
              Add New Footer Column
            </button>
          </div>
        );

      case 'accordion':
        return (
          <div className="space-y-4">
            {(section.value as string[]).map((item, index) => {
              const [title, description, icon] = item.split('|');
              return (
                <div key={index} className="border border-gray-200 rounded-lg p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium text-gray-900">Accordion Item {index + 1}</h4>
                    <button
                      onClick={() => removeArrayItem(sectionKey, section.id, index)}
                      className="p-1 text-red-600 hover:bg-red-50 rounded"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>

                  <div className="grid grid-cols-1 gap-3">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                      <input
                        type="text"
                        value={title || ''}
                        onChange={(e) => {
                          const newValue = `${e.target.value}|${description || ''}|${icon || 'Users'}`;
                          handleArrayItemChange(sectionKey, section.id, index, newValue);
                        }}
                        placeholder="Enter accordion title"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                      <textarea
                        value={description || ''}
                        onChange={(e) => {
                          const newValue = `${title || ''}|${e.target.value}|${icon || 'Users'}`;
                          handleArrayItemChange(sectionKey, section.id, index, newValue);
                        }}
                        placeholder="Enter accordion description"
                        rows={3}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Icon</label>
                      <select
                        value={icon || 'Users'}
                        onChange={(e) => {
                          const newValue = `${title || ''}|${description || ''}|${e.target.value}`;
                          handleArrayItemChange(sectionKey, section.id, index, newValue);
                        }}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                      >
                        <option value="Users">Users (People)</option>
                        <option value="FileText">FileText (Document)</option>
                        <option value="Calendar">Calendar</option>
                        <option value="CreditCard">CreditCard (Payment)</option>
                        <option value="Settings">Settings</option>
                        <option value="Image">Image</option>
                      </select>
                    </div>
                  </div>
                </div>
              );
            })}

            <button
              onClick={() => {
                const newAccordion = 'New Accordion Title|Enter description here|Users';
                addArrayItem(sectionKey, section.id);
                // Update the last item with the template
                const currentItems = section.value as string[];
                const newItems = [...currentItems];
                newItems.push(newAccordion);
                handleContentChange(sectionKey, section.id, newItems);
              }}
              className="w-full px-4 py-3 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-gray-400 hover:text-gray-700 transition-colors flex items-center justify-center gap-2"
            >
              <Plus className="h-4 w-4" />
              Add New Accordion Item
            </button>
          </div>
        );

      case 'navMenu':
        return (
          <div className="space-y-4">
            {(section.value as string[]).map((item, index) => {
              const [label, url] = item.split('|');
              return (
                <div key={index} className="border border-gray-200 rounded-lg p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium text-gray-900">Menu Item {index + 1}</h4>
                    <button
                      onClick={() => removeArrayItem(sectionKey, section.id, index)}
                      className="p-1 text-red-600 hover:bg-red-50 rounded"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Display Text</label>
                      <input
                        type="text"
                        value={label || ''}
                        onChange={(e) => {
                          const newValue = `${e.target.value}|${url || ''}`;
                          handleArrayItemChange(sectionKey, section.id, index, newValue);
                        }}
                        placeholder="Menu item text"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">URL</label>
                      <input
                        type="text"
                        value={url || ''}
                        onChange={(e) => {
                          const newValue = `${label || ''}|${e.target.value}`;
                          handleArrayItemChange(sectionKey, section.id, index, newValue);
                        }}
                        placeholder="/page-url or https://external.com"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                      />
                    </div>
                  </div>

                  <div className="text-xs text-gray-500">
                    Preview: <span className="font-mono bg-gray-100 px-1 rounded">{label || 'Menu Text'}</span> → <span className="font-mono bg-gray-100 px-1 rounded">{url || '/url'}</span>
                  </div>
                </div>
              );
            })}

            <button
              onClick={() => {
                // addArrayItem(sectionKey, section.id);
                const currentItems = section.value as string[];
                const newItems = [...currentItems];
                const newMenuItem = `New Menu Item ${newItems.length + 1}|/new-page-${newItems.length + 1}`;
                newItems.push(newMenuItem);
                handleContentChange(sectionKey, section.id, newItems);
              }}
              className="w-full px-4 py-3 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-gray-400 hover:text-gray-700 transition-colors flex items-center justify-center gap-2"
            >
              <Plus className="h-4 w-4" />
              Add New Menu Item
            </button>
          </div>
        );

      case 'array':
        return (
          <div className="space-y-3">
            {(section.value as string[]).map((item, index) => (
              <div key={index} className="flex items-center space-x-2">
                <input
                  type="text"
                  value={item}
                  onChange={(e) => handleArrayItemChange(sectionKey, section.id, index, e.target.value)}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                />
                <button
                  onClick={() => removeArrayItem(sectionKey, section.id, index)}
                  className="px-3 py-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-colors"
                >
                  Remove
                </button>
              </div>
            ))}
            <button
              onClick={() => addArrayItem(sectionKey, section.id)}
              className="px-4 py-2 bg-green-100 text-green-600 rounded-lg hover:bg-green-200 transition-colors"
            >
              Add Item
            </button>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <h1 className="text-xl font-bold text-gray-900">Sourced Dashboard</h1>
              {hasChanges && (
                <span className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs rounded-full">
                  Unsaved Changes
                </span>
              )}

            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setPreviewMode(!previewMode)}
                className="flex items-center px-3 py-2 text-gray-600 hover:text-gray-900 transition-colors"
              >
                {previewMode ? <EyeOff className="h-4 w-4 mr-2" /> : <Eye className="h-4 w-4 mr-2" />}
                {previewMode ? 'Edit Mode' : 'Preview Mode'}
              </button>
              <button
                onClick={saveChanges}
                disabled={!hasChanges}
                className="flex items-center px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Save className="h-4 w-4 mr-2" />
                Save Changes
              </button>
              <button
                onClick={logout}
                className="flex items-center px-3 py-2 text-gray-600 hover:text-gray-900 transition-colors"
              >
                <Unlock className="h-4 w-4 mr-2" />
                Logout
              </button>
              <Link href="/" className="text-gray-600 hover:text-gray-900 transition-colors inline-flex flex-row items-center rounded-lg bg-gray-100 p-2">
                <Home className="h-4 w-4" />
                <span className="sr-only">Go to Home</span>
              </Link>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex space-x-8">
          {/* Sidebar */}
          <div className="w-64 flex-shrink-0">
            <nav className="space-y-2">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return tab.id != 'admin' ? (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center px-4 py-3 text-left rounded-lg transition-colors ${activeTab === tab.id
                      ? 'bg-black text-white'
                      : 'text-gray-600 hover:bg-gray-100'
                      }`}
                  >
                    <Icon className="h-5 w-5 mr-3" />
                    {tab.label}
                  </button>
                ) : (
                  <a
                    key={tab.id}
                    href="/dashboard"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`w-full flex items-center px-4 py-3 text-left rounded-lg transition-colors ${activeTab === tab.id
                      ? 'bg-black text-white'
                      : 'text-gray-600 hover:bg-gray-100'
                      }`}
                  >
                    <Icon className="h-5 w-5 mr-3" />
                    {tab.label}
                  </a>
                )
              })}
            </nav>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-white rounded-lg shadow-sm p-6"
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                {tabs.find(tab => tab.id === activeTab)?.label}
              </h2>

              <div className="space-y-6">
                {contentData[activeTab as keyof ContentData].map((section) => {
                  return (
                    <div key={section.id} className="border-b border-gray-200 pb-6 last:border-b-0">
                      <label className="block text-sm font-medium text-gray-700 mb-3">
                        {section.title}
                      </label>
                      {renderContentEditor(section, activeTab as keyof ContentData)}
                    </div>
                  )
                })}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
} 