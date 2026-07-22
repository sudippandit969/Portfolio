"use client";

import { useState, useRef } from "react";
import { usePortfolioContext } from "@/context/PortfolioContext";
import { Project } from "@/data/projects";
import { Certificate } from "@/data/certificates";
import { BlogPost } from "@/data/blogs";
import { X, Save, Plus, Trash2, Edit3, Sparkles, CheckCircle2, RotateCcw, Download, LayoutDashboard, User, Code, FileText, Award, Lock, LogOut, KeyRound, Upload, BookOpen } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

export function AdminDashboardModal() {
  const {
    siteConfig,
    projects,
    skills,
    certificates,
    research,
    blogs,
    isAdminOpen,
    setIsAdminOpen,
    isAuthenticated,
    authenticateAdmin,
    logoutAdmin,
    updateSiteConfig,
    addProject,
    updateProject,
    deleteProject,
    addBlog,
    updateBlog,
    deleteBlog,
    addSkill,
    deleteSkill,
    toggleSkillHighlight,
    updateCertificates,
    saveToDisk,
    resetToDefault
  } = usePortfolioContext();

  const [activeTab, setActiveTab] = useState<"personal" | "projects" | "blogs" | "certs" | "skills">("personal");
  const [saveStatus, setSaveStatus] = useState<string>("");
  const [pinInput, setPinInput] = useState<string>("");
  const [pinError, setPinError] = useState<string>("");
  const [isUploading, setIsUploading] = useState(false);

  // File Input Refs
  const projectFileRef = useRef<HTMLInputElement>(null);
  const blogFileRef = useRef<HTMLInputElement>(null);
  const certFileRef = useRef<HTMLInputElement>(null);
  const profileFileRef = useRef<HTMLInputElement>(null);

  // Personal Info Form State
  const [personalForm, setPersonalForm] = useState(siteConfig);

  // New Project Form State
  const [showAddProjectForm, setShowAddProjectForm] = useState(false);
  const [newProjectForm, setNewProjectForm] = useState<Partial<Project>>({
    title: "",
    shortDescription: "",
    detailedDescription: "",
    technologies: ["Python", "React.js"],
    category: "Full Stack",
    projectImage: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80",
    liveUrl: "",
    githubUrl: "",
    status: "Completed",
    featured: true,
    date: new Date().getFullYear().toString(),
    tags: ["Full Stack"]
  });

  // New Blog Post Form State
  const [showAddBlogForm, setShowAddBlogForm] = useState(false);
  const [newBlogForm, setNewBlogForm] = useState<Partial<BlogPost>>({
    title: "",
    excerpt: "",
    content: "",
    category: "Career & Stories",
    readTime: "4 min read",
    coverImage: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=1200&q=80",
    tags: ["Career", "Learnings"],
    featured: true
  });

  // New Certificate Form State
  const [showAddCertForm, setShowAddCertForm] = useState(false);
  const [newCertForm, setNewCertForm] = useState<Partial<Certificate>>({
    title: "",
    issuingOrganization: "Coursera / Meta",
    date: "2024",
    credentialId: "",
    certificateImage: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=800&q=80",
    description: "",
    skillsLearned: ["Python", "SQL"],
    verificationLink: "",
    featured: true
  });

  // New Skill Form State
  const [selectedCategoryForSkill, setSelectedCategoryForSkill] = useState(skills[0]?.id || "programming-languages");
  const [newSkillName, setNewSkillName] = useState("");
  const [newSkillLevel, setNewSkillLevel] = useState<"Expert" | "Advanced" | "Proficient">("Advanced");
  const [newSkillHighlight, setNewSkillHighlight] = useState(true);

  if (!isAdminOpen) return null;

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setPinError("");
    const ok = authenticateAdmin(pinInput);
    if (!ok) {
      setPinError("Invalid Admin Secret PIN Code. Try again.");
    }
  };

  // Generic Image Upload Handler
  const handleFileUpload = async (file: File): Promise<string | null> => {
    try {
      setIsUploading(true);
      const data = new FormData();
      data.append("file", file);

      const res = await fetch("/api/admin/upload", {
        method: "POST",
        headers: {
          "x-admin-pin": siteConfig.adminPin
        },
        body: data
      });

      const json = await res.json();
      setIsUploading(false);
      if (res.ok && json.url) {
        return json.url;
      }
      return null;
    } catch (e) {
      setIsUploading(false);
      console.error("Upload error", e);
      return null;
    }
  };

  const handleProjectImageFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const url = await handleFileUpload(e.target.files[0]);
      if (url) {
        setNewProjectForm((prev) => ({ ...prev, projectImage: url }));
        setSaveStatus("Project image uploaded!");
        setTimeout(() => setSaveStatus(""), 3000);
      }
    }
  };

  const handleBlogImageFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const url = await handleFileUpload(e.target.files[0]);
      if (url) {
        setNewBlogForm((prev) => ({ ...prev, coverImage: url }));
        setSaveStatus("Blog cover image uploaded!");
        setTimeout(() => setSaveStatus(""), 3000);
      }
    }
  };

  const handleCertImageFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const url = await handleFileUpload(e.target.files[0]);
      if (url) {
        setNewCertForm((prev) => ({ ...prev, certificateImage: url }));
        setSaveStatus("Certificate image uploaded!");
        setTimeout(() => setSaveStatus(""), 3000);
      }
    }
  };

  const handleProfileImageFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const url = await handleFileUpload(e.target.files[0]);
      if (url) {
        const updated = { ...personalForm, profileImage: url };
        setPersonalForm(updated);
        updateSiteConfig(updated);
        await saveToDisk("siteConfig", updated);
        setSaveStatus("Profile picture updated!");
        setTimeout(() => setSaveStatus(""), 3000);
      }
    }
  };

  const handleSavePersonalInfo = async () => {
    updateSiteConfig(personalForm);
    const ok = await saveToDisk("siteConfig", personalForm);
    setSaveStatus(ok ? "Personal info saved to disk!" : "Saved in session!");
    setTimeout(() => setSaveStatus(""), 3000);
  };

  const handleCreateProject = async () => {
    if (!newProjectForm.title || !newProjectForm.shortDescription) return;

    const isEditing = !!newProjectForm.id && projects.some(p => p.id === newProjectForm.id);

    const created: Project = {
      id: newProjectForm.id || newProjectForm.title.toLowerCase().replace(/\s+/g, "-"),
      title: newProjectForm.title,
      shortDescription: newProjectForm.shortDescription,
      detailedDescription: newProjectForm.detailedDescription || newProjectForm.shortDescription,
      technologies: newProjectForm.technologies || ["React"],
      category: (newProjectForm.category as any) || "Full Stack",
      projectImage: newProjectForm.projectImage || "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80",
      liveUrl: newProjectForm.liveUrl,
      githubUrl: newProjectForm.githubUrl,
      status: newProjectForm.status || "Completed",
      featured: newProjectForm.featured !== undefined ? newProjectForm.featured : true,
      date: newProjectForm.date || "2024",
      tags: newProjectForm.tags || ["Project"]
    };

    let ok = false;
    if (isEditing) {
      updateProject(created.id, created);
      const updatedProjects = projects.map(p => p.id === created.id ? created : p);
      ok = await saveToDisk("projects", updatedProjects);
      setSaveStatus(ok ? "Project updated & saved to disk!" : "Project updated!");
    } else {
      addProject(created);
      const updatedProjects = [created, ...projects];
      ok = await saveToDisk("projects", updatedProjects);
      setSaveStatus(ok ? "Project added & saved to disk!" : "Project added!");
    }

    setShowAddProjectForm(false);
    setNewProjectForm({ title: "", shortDescription: "", detailedDescription: "" });
    setTimeout(() => setSaveStatus(""), 3000);
  };

  const handleCreateBlog = async () => {
    if (!newBlogForm.title || !newBlogForm.excerpt || !newBlogForm.content) return;

    const isEditing = !!newBlogForm.id && blogs.some(b => b.id === newBlogForm.id);

    const created: BlogPost = {
      id: newBlogForm.id || newBlogForm.title.toLowerCase().replace(/\s+/g, "-"),
      title: newBlogForm.title,
      slug: newBlogForm.slug || newBlogForm.title.toLowerCase().replace(/\s+/g, "-"),
      excerpt: newBlogForm.excerpt,
      content: newBlogForm.content,
      date: newBlogForm.date || new Date().toLocaleDateString("en-US", { month: "short", year: "numeric" }),
      readTime: newBlogForm.readTime || "4 min read",
      category: (newBlogForm.category as any) || "Career & Stories",
      tags: newBlogForm.tags || ["Article"],
      coverImage: newBlogForm.coverImage || "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=1200&q=80",
      featured: newBlogForm.featured !== undefined ? newBlogForm.featured : true,
      author: newBlogForm.author || siteConfig.name
    };

    let ok = false;
    if (isEditing) {
      updateBlog(created.id, created);
      const updatedBlogs = blogs.map(b => b.id === created.id ? created : b);
      ok = await saveToDisk("blogs", updatedBlogs);
      setSaveStatus(ok ? "Article updated & saved to disk!" : "Article updated!");
    } else {
      addBlog(created);
      const updatedBlogs = [created, ...blogs];
      ok = await saveToDisk("blogs", updatedBlogs);
      setSaveStatus(ok ? "Article published & saved to disk!" : "Article published!");
    }

    setShowAddBlogForm(false);
    setNewBlogForm({ title: "", excerpt: "", content: "" });
    setTimeout(() => setSaveStatus(""), 3000);
  };

  const handleCreateCert = async () => {
    if (!newCertForm.title || !newCertForm.issuingOrganization) return;

    const created: Certificate = {
      id: newCertForm.title.toLowerCase().replace(/\s+/g, "-"),
      title: newCertForm.title,
      issuingOrganization: newCertForm.issuingOrganization,
      date: newCertForm.date || "2024",
      credentialId: newCertForm.credentialId,
      certificateImage: newCertForm.certificateImage || "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=800&q=80",
      description: newCertForm.description || newCertForm.title,
      skillsLearned: newCertForm.skillsLearned || ["Python"],
      verificationLink: newCertForm.verificationLink,
      featured: true
    };

    const updatedCerts = [created, ...certificates];
    updateCertificates(updatedCerts);
    const ok = await saveToDisk("certificates", updatedCerts);

    setShowAddCertForm(false);
    setSaveStatus(ok ? "Certificate added & saved!" : "Certificate added!");
    setTimeout(() => setSaveStatus(""), 3000);
  };

  const handleCreateSkill = async () => {
    if (!newSkillName.trim()) return;

    addSkill(selectedCategoryForSkill, {
      name: newSkillName.trim(),
      level: newSkillLevel,
      highlight: newSkillHighlight
    });

    const updatedSkills = skills.map((cat) => {
      if (cat.id === selectedCategoryForSkill) {
        return {
          ...cat,
          skills: [...cat.skills, { name: newSkillName.trim(), level: newSkillLevel, highlight: newSkillHighlight }]
        };
      }
      return cat;
    });

    const ok = await saveToDisk("skills", updatedSkills);
    setNewSkillName("");
    setSaveStatus(ok ? "Skill added & saved!" : "Skill added!");
    setTimeout(() => setSaveStatus(""), 3000);
  };

  const handleDownloadBackup = () => {
    const backupData = {
      siteConfig,
      projects,
      blogs,
      skills,
      certificates,
      research
    };
    const blob = new Blob([JSON.stringify(backupData, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `Sudip_Pandit_Portfolio_Backup_${new Date().toISOString().split("T")[0]}.json`;
    a.click();
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 lg:p-8">
        
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setIsAdminOpen(false)}
          className="absolute inset-0 bg-slate-950/80 backdrop-blur-md"
        />

        {/* Modal Dialog */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 20 }}
          className="relative w-full max-w-4xl overflow-hidden rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 p-6 sm:p-8 shadow-2xl z-10 max-h-[92vh] flex flex-col justify-between"
        >
          
          {/* Header */}
          <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-slate-800">
            <div className="flex items-center space-x-2.5">
              <div className="p-2 rounded-xl bg-cyan-500/10 border border-cyan-500/40 text-cyan-600 dark:text-cyan-400">
                <LayoutDashboard className="h-5 w-5" />
              </div>
              <div>
                <h2 className="font-sans text-xl font-extrabold">Web App Admin CMS</h2>
                <p className="font-mono text-xs text-slate-500 dark:text-slate-400">
                  Image Uploads & Portfolio Content Manager
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              {isAuthenticated && (
                <button
                  onClick={logoutAdmin}
                  className="flex items-center space-x-1 p-2 rounded-xl bg-red-500/10 text-red-500 border border-red-500/30 text-xs font-mono"
                  title="Lock Admin CMS"
                >
                  <LogOut className="h-4 w-4" />
                  <span>Lock</span>
                </button>
              )}
              <button
                onClick={() => setIsAdminOpen(false)}
                className="p-2 rounded-full bg-slate-100 dark:bg-slate-950 text-slate-500 hover:text-slate-900 dark:hover:text-white border border-slate-200 dark:border-slate-800"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          </div>

          {/* PIN Code Lock Screen */}
          {!isAuthenticated ? (
            <div className="py-12 px-4 max-w-sm mx-auto text-center space-y-5">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-cyan-500/10 border border-cyan-500/40 text-cyan-600 dark:text-cyan-400 shadow-glow-cyan">
                <Lock className="h-8 w-8" />
              </div>

              <div>
                <h3 className="font-sans text-xl font-extrabold text-slate-900 dark:text-white">Admin Authentication</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                  Enter your Secret Admin PIN code to unlock website edits.
                </p>
              </div>

              <form onSubmit={handleLoginSubmit} className="space-y-4">
                <div className="relative">
                  <KeyRound className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                  <input
                    type="password"
                    required
                    placeholder="Enter Admin PIN"
                    value={pinInput}
                    onChange={(e) => setPinInput(e.target.value)}
                    className="w-full rounded-xl border border-slate-300 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 py-3 pl-10 pr-4 text-center font-mono text-base tracking-widest text-slate-900 dark:text-white focus:border-cyan-500 focus:outline-none shadow-sm"
                  />
                </div>

                {pinError && (
                  <p className="text-xs font-mono text-red-500">{pinError}</p>
                )}

                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 font-mono text-xs font-bold text-white shadow-glow-cyan hover:scale-[1.01] transition-transform"
                >
                  Unlock Admin Dashboard
                </button>
              </form>
            </div>
          ) : (
            /* Admin CMS Content */
            <>
              {/* Navigation Tabs */}
              <div className="mt-4 flex items-center overflow-x-auto space-x-2 pb-2 scrollbar-none border-b border-slate-200 dark:border-slate-800">
                <button
                  onClick={() => setActiveTab("personal")}
                  className={`flex items-center space-x-1.5 px-4 py-2 rounded-xl font-mono text-xs font-semibold transition-all shrink-0 ${
                    activeTab === "personal"
                      ? "bg-cyan-500 text-slate-950 shadow-glow-cyan"
                      : "bg-slate-100 dark:bg-slate-950 text-slate-600 dark:text-slate-400"
                  }`}
                >
                  <User className="h-3.5 w-3.5" />
                  <span>Personal & Bio</span>
                </button>

                <button
                  onClick={() => setActiveTab("projects")}
                  className={`flex items-center space-x-1.5 px-4 py-2 rounded-xl font-mono text-xs font-semibold transition-all shrink-0 ${
                    activeTab === "projects"
                      ? "bg-cyan-500 text-slate-950 shadow-glow-cyan"
                      : "bg-slate-100 dark:bg-slate-950 text-slate-600 dark:text-slate-400"
                  }`}
                >
                  <Code className="h-3.5 w-3.5" />
                  <span>Projects ({projects.length})</span>
                </button>

                <button
                  onClick={() => setActiveTab("blogs")}
                  className={`flex items-center space-x-1.5 px-4 py-2 rounded-xl font-mono text-xs font-semibold transition-all shrink-0 ${
                    activeTab === "blogs"
                      ? "bg-cyan-500 text-slate-950 shadow-glow-cyan"
                      : "bg-slate-100 dark:bg-slate-950 text-slate-600 dark:text-slate-400"
                  }`}
                >
                  <BookOpen className="h-3.5 w-3.5" />
                  <span>Blogs ({blogs.length})</span>
                </button>

                <button
                  onClick={() => setActiveTab("certs")}
                  className={`flex items-center space-x-1.5 px-4 py-2 rounded-xl font-mono text-xs font-semibold transition-all shrink-0 ${
                    activeTab === "certs"
                      ? "bg-cyan-500 text-slate-950 shadow-glow-cyan"
                      : "bg-slate-100 dark:bg-slate-950 text-slate-600 dark:text-slate-400"
                  }`}
                >
                  <Award className="h-3.5 w-3.5" />
                  <span>Certificates ({certificates.length})</span>
                </button>

                <button
                  onClick={() => setActiveTab("skills")}
                  className={`flex items-center space-x-1.5 px-4 py-2 rounded-xl font-mono text-xs font-semibold transition-all shrink-0 ${
                    activeTab === "skills"
                      ? "bg-cyan-500 text-slate-950 shadow-glow-cyan"
                      : "bg-slate-100 dark:bg-slate-950 text-slate-600 dark:text-slate-400"
                  }`}
                >
                  <Sparkles className="h-3.5 w-3.5" />
                  <span>Skills</span>
                </button>
              </div>

              {/* Save / Upload Status Banner */}
              {saveStatus && (
                <div className="mt-3 p-3 rounded-xl bg-emerald-100 dark:bg-emerald-950/60 border border-emerald-500/40 text-xs font-mono text-emerald-800 dark:text-emerald-300 flex items-center space-x-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                  <span>{saveStatus}</span>
                </div>
              )}

              {/* Tab Body Content */}
              <div className="my-5 flex-1 overflow-y-auto max-h-[52vh] pr-2 space-y-6">
                
                {/* Tab 1: Personal Info & Profile Picture Editor */}
                {activeTab === "personal" && (
                  <div className="space-y-4 text-xs">
                    {/* Profile Picture Uploader */}
                    <div className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 flex flex-col sm:flex-row items-center space-y-3 sm:space-y-0 sm:space-x-4">
                      <div className="relative h-20 w-20 rounded-2xl overflow-hidden border-2 border-cyan-500 shadow-glow-cyan shrink-0 bg-slate-900">
                        <Image
                          src={personalForm.profileImage || "/profile.jpg"}
                          alt="Profile Preview"
                          fill
                          className="object-cover object-top"
                        />
                      </div>
                      <div className="space-y-2 text-center sm:text-left flex-1">
                        <h4 className="font-mono font-bold text-slate-900 dark:text-white">Profile Photo</h4>
                        <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                          <input
                            ref={profileFileRef}
                            type="file"
                            accept="image/*"
                            onChange={handleProfileImageFileChange}
                            className="hidden"
                          />
                          <button
                            type="button"
                            onClick={() => profileFileRef.current?.click()}
                            disabled={isUploading}
                            className="inline-flex items-center space-x-1.5 rounded-xl bg-cyan-500 px-3 py-1.5 font-mono text-xs font-bold text-slate-950 hover:bg-cyan-400"
                          >
                            <Upload className="h-3.5 w-3.5" />
                            <span>{isUploading ? "Uploading..." : "Upload New Photo"}</span>
                          </button>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block font-mono text-slate-700 dark:text-slate-300 mb-1">Full Name</label>
                        <input
                          type="text"
                          value={personalForm.name}
                          onChange={(e) => setPersonalForm({ ...personalForm, name: e.target.value })}
                          className="w-full rounded-xl border border-slate-300 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 px-3 py-2 text-slate-900 dark:text-white"
                        />
                      </div>
                      <div>
                        <label className="block font-mono text-slate-700 dark:text-slate-300 mb-1">Email</label>
                        <input
                          type="email"
                          value={personalForm.contact.email}
                          onChange={(e) =>
                            setPersonalForm({
                              ...personalForm,
                              contact: { ...personalForm.contact, email: e.target.value }
                            })
                          }
                          className="w-full rounded-xl border border-slate-300 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 px-3 py-2 text-slate-900 dark:text-white"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block font-mono text-slate-700 dark:text-slate-300 mb-1">Bio Summary</label>
                      <textarea
                        rows={2}
                        value={personalForm.bio}
                        onChange={(e) => setPersonalForm({ ...personalForm, bio: e.target.value })}
                        className="w-full rounded-xl border border-slate-300 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 px-3 py-2 text-slate-900 dark:text-white"
                      />
                    </div>

                    <button
                      onClick={handleSavePersonalInfo}
                      className="inline-flex items-center space-x-2 rounded-xl bg-cyan-500 px-5 py-2 text-xs font-mono font-semibold text-slate-950 hover:bg-cyan-400"
                    >
                      <Save className="h-4 w-4" />
                      <span>Save Personal Info to Disk</span>
                    </button>
                  </div>
                )}

                {/* Tab 2: Projects Manager */}
                {activeTab === "projects" && (
                  <div className="space-y-4 text-xs">
                    <div className="flex items-center justify-between">
                      <h3 className="font-mono text-xs font-bold text-slate-700 dark:text-slate-300 uppercase">
                        Projects Catalog
                      </h3>
                      <button
                        onClick={() => {
                          if (!showAddProjectForm) {
                            setNewProjectForm({ title: "", shortDescription: "", detailedDescription: "" });
                          }
                          setShowAddProjectForm(!showAddProjectForm);
                        }}
                        className="inline-flex items-center space-x-1 rounded-lg bg-cyan-500 px-3 py-1.5 font-mono text-xs font-bold text-slate-950 hover:bg-cyan-400"
                      >
                        <Plus className="h-3.5 w-3.5" />
                        <span>Add New Project</span>
                      </button>
                    </div>

                    {showAddProjectForm && (
                      <div className="p-4 rounded-2xl border border-cyan-500/40 bg-cyan-950/20 space-y-3">
                        <h4 className="font-mono font-bold text-cyan-400">Add New Project</h4>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <input
                            type="text"
                            placeholder="Project Title *"
                            value={newProjectForm.title}
                            onChange={(e) => setNewProjectForm({ ...newProjectForm, title: e.target.value })}
                            className="rounded-xl border border-slate-300 dark:border-slate-800 bg-white dark:bg-slate-950 px-3 py-2 text-slate-900 dark:text-white"
                          />
                          <select
                            value={newProjectForm.category}
                            onChange={(e) => setNewProjectForm({ ...newProjectForm, category: e.target.value as any })}
                            className="rounded-xl border border-slate-300 dark:border-slate-800 bg-white dark:bg-slate-950 px-3 py-2 text-slate-900 dark:text-white"
                          >
                            <option value="Full Stack">Full Stack</option>
                            <option value="AI & Machine Learning">AI & Machine Learning</option>
                            <option value="Data Analytics & BI">Data Analytics & BI</option>
                            <option value="Web Applications">Web Applications</option>
                          </select>
                        </div>

                        {/* Project Image Uploader */}
                        <div className="p-3 rounded-xl border border-slate-300 dark:border-slate-800 bg-white dark:bg-slate-950 space-y-2">
                          <label className="block font-mono text-[11px] text-slate-700 dark:text-slate-300 font-bold">
                            Project Banner Image
                          </label>
                          <div className="flex items-center space-x-3">
                            <input
                              ref={projectFileRef}
                              type="file"
                              accept="image/*"
                              onChange={handleProjectImageFileChange}
                              className="hidden"
                            />
                            <button
                              type="button"
                              onClick={() => projectFileRef.current?.click()}
                              disabled={isUploading}
                              className="inline-flex items-center space-x-1.5 rounded-lg border border-cyan-500/40 bg-cyan-500/10 px-3 py-1.5 font-mono text-xs font-semibold text-cyan-600 dark:text-cyan-400 hover:bg-cyan-500 hover:text-slate-950"
                            >
                              <Upload className="h-3.5 w-3.5" />
                              <span>{isUploading ? "Uploading..." : "Upload Image File"}</span>
                            </button>
                            <span className="text-[10px] text-slate-500">or paste URL below</span>
                          </div>
                          <input
                            type="url"
                            placeholder="Image URL"
                            value={newProjectForm.projectImage}
                            onChange={(e) => setNewProjectForm({ ...newProjectForm, projectImage: e.target.value })}
                            className="w-full rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 px-3 py-1.5 font-mono text-[11px]"
                          />
                        </div>

                        <input
                          type="text"
                          placeholder="Short Description *"
                          value={newProjectForm.shortDescription}
                          onChange={(e) => setNewProjectForm({ ...newProjectForm, shortDescription: e.target.value })}
                          className="w-full rounded-xl border border-slate-300 dark:border-slate-800 bg-white dark:bg-slate-950 px-3 py-2 text-slate-900 dark:text-white"
                        />

                        <button
                          onClick={handleCreateProject}
                          className="w-full py-2 rounded-xl bg-cyan-500 text-slate-950 font-mono font-bold hover:bg-cyan-400"
                        >
                          Save New Project
                        </button>
                      </div>
                    )}

                    <div className="space-y-2">
                      {projects.map((proj) => (
                        <div
                          key={proj.id}
                          className="flex items-center justify-between p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-xs"
                        >
                          <div className="flex items-center space-x-3">
                            <div className="relative h-10 w-14 rounded-lg overflow-hidden border border-slate-700 shrink-0">
                              <Image src={proj.projectImage} alt={proj.title} fill className="object-cover" />
                            </div>
                            <div>
                              <span className="font-bold text-slate-900 dark:text-white">{proj.title}</span>
                              <span className="font-mono text-[10px] text-cyan-600 dark:text-cyan-400 block">{proj.category}</span>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            <button
                              onClick={() => {
                                setNewProjectForm(proj);
                                setShowAddProjectForm(true);
                              }}
                              className="p-1.5 rounded bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 hover:bg-cyan-500/20"
                              title="Edit Project"
                            >
                              <Edit3 className="h-3.5 w-3.5" />
                            </button>
                            <button
                              onClick={() => deleteProject(proj.id)}
                              className="p-1.5 rounded bg-red-500/10 text-red-500 hover:bg-red-500/20"
                              title="Delete Project"
                            >
                              <Trash2 className="h-3.5 w-3.5" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Tab 3: Blogs & Stories Manager */}
                {activeTab === "blogs" && (
                  <div className="space-y-4 text-xs">
                    <div className="flex items-center justify-between">
                      <h3 className="font-mono text-xs font-bold text-slate-700 dark:text-slate-300 uppercase">
                        Blogs & Story Posts
                      </h3>
                      <button
                        onClick={() => {
                          if (!showAddBlogForm) {
                            setNewBlogForm({ title: "", excerpt: "", content: "" });
                          }
                          setShowAddBlogForm(!showAddBlogForm);
                        }}
                        className="inline-flex items-center space-x-1 rounded-lg bg-cyan-500 px-3 py-1.5 font-mono text-xs font-bold text-slate-950 hover:bg-cyan-400"
                      >
                        <Plus className="h-3.5 w-3.5" />
                        <span>Write New Story</span>
                      </button>
                    </div>

                    {/* New Blog Article Form */}
                    {showAddBlogForm && (
                      <div className="p-4 rounded-2xl border border-cyan-500/40 bg-cyan-950/20 space-y-3">
                        <h4 className="font-mono font-bold text-cyan-400">Write New Article / Story</h4>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <input
                            type="text"
                            placeholder="Article Title *"
                            value={newBlogForm.title}
                            onChange={(e) => setNewBlogForm({ ...newBlogForm, title: e.target.value })}
                            className="rounded-xl border border-slate-300 dark:border-slate-800 bg-white dark:bg-slate-950 px-3 py-2 text-slate-900 dark:text-white"
                          />
                          <select
                            value={newBlogForm.category}
                            onChange={(e) => setNewBlogForm({ ...newBlogForm, category: e.target.value as any })}
                            className="rounded-xl border border-slate-300 dark:border-slate-800 bg-white dark:bg-slate-950 px-3 py-2 text-slate-900 dark:text-white"
                          >
                            <option value="Career & Stories">Career & Stories</option>
                            <option value="Software Engineering">Software Engineering</option>
                            <option value="Cloud & DevOps">Cloud & DevOps</option>
                            <option value="Data Analytics">Data Analytics</option>
                            <option value="AI Research">AI Research</option>
                          </select>
                        </div>

                        {/* Article Cover Image Uploader */}
                        <div className="p-3 rounded-xl border border-slate-300 dark:border-slate-800 bg-white dark:bg-slate-950 space-y-2">
                          <label className="block font-mono text-[11px] text-slate-700 dark:text-slate-300 font-bold">
                            Cover Image
                          </label>
                          <div className="flex items-center space-x-3">
                            <input
                              ref={blogFileRef}
                              type="file"
                              accept="image/*"
                              onChange={handleBlogImageFileChange}
                              className="hidden"
                            />
                            <button
                              type="button"
                              onClick={() => blogFileRef.current?.click()}
                              disabled={isUploading}
                              className="inline-flex items-center space-x-1.5 rounded-lg border border-cyan-500/40 bg-cyan-500/10 px-3 py-1.5 font-mono text-xs font-semibold text-cyan-600 dark:text-cyan-400 hover:bg-cyan-500 hover:text-slate-950"
                            >
                              <Upload className="h-3.5 w-3.5" />
                              <span>{isUploading ? "Uploading..." : "Upload Cover Image"}</span>
                            </button>
                          </div>
                        </div>

                        <input
                          type="text"
                          placeholder="Short Excerpt *"
                          value={newBlogForm.excerpt}
                          onChange={(e) => setNewBlogForm({ ...newBlogForm, excerpt: e.target.value })}
                          className="w-full rounded-xl border border-slate-300 dark:border-slate-800 bg-white dark:bg-slate-950 px-3 py-2 text-slate-900 dark:text-white"
                        />

                        <div>
                          <label className="block font-mono text-slate-700 dark:text-slate-300 mb-1">
                            Full Story / Article Content *
                          </label>
                          <textarea
                            rows={6}
                            placeholder="Write your article story here..."
                            value={newBlogForm.content}
                            onChange={(e) => setNewBlogForm({ ...newBlogForm, content: e.target.value })}
                            className="w-full rounded-xl border border-slate-300 dark:border-slate-800 bg-white dark:bg-slate-950 px-3 py-2 text-slate-900 dark:text-white font-sans text-xs"
                          />
                        </div>

                        <button
                          onClick={handleCreateBlog}
                          className="w-full py-2 rounded-xl bg-cyan-500 text-slate-950 font-mono font-bold hover:bg-cyan-400"
                        >
                          Publish Article
                        </button>
                      </div>
                    )}

                    {/* Existing Blogs List */}
                    <div className="space-y-2">
                      {blogs.map((b) => (
                        <div
                          key={b.id}
                          className="flex items-center justify-between p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950"
                        >
                          <div className="flex items-center space-x-3">
                            <div className="relative h-10 w-14 rounded-lg overflow-hidden border border-slate-700 shrink-0">
                              <Image src={b.coverImage} alt={b.title} fill className="object-cover" />
                            </div>
                            <div>
                              <span className="font-bold text-slate-900 dark:text-white block">{b.title}</span>
                              <span className="font-mono text-[10px] text-cyan-600 dark:text-cyan-400">{b.category} • {b.date}</span>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            <button
                              onClick={() => {
                                setNewBlogForm(b);
                                setShowAddBlogForm(true);
                              }}
                              className="p-1.5 rounded bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 hover:bg-cyan-500/20"
                              title="Edit Article"
                            >
                              <Edit3 className="h-3.5 w-3.5" />
                            </button>
                            <button
                              onClick={() => deleteBlog(b.id)}
                              className="p-1.5 rounded bg-red-500/10 text-red-500 hover:bg-red-500/20"
                              title="Delete Article"
                            >
                              <Trash2 className="h-3.5 w-3.5" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Tab 4: Certificates Manager */}
                {activeTab === "certs" && (
                  <div className="space-y-4 text-xs">
                    <div className="flex items-center justify-between">
                      <h3 className="font-mono text-xs font-bold text-slate-700 dark:text-slate-300 uppercase">
                        Certificates & Badges
                      </h3>
                      <button
                        onClick={() => setShowAddCertForm(!showAddCertForm)}
                        className="inline-flex items-center space-x-1 rounded-lg bg-cyan-500 px-3 py-1.5 font-mono text-xs font-bold text-slate-950 hover:bg-cyan-400"
                      >
                        <Plus className="h-3.5 w-3.5" />
                        <span>Add Certificate</span>
                      </button>
                    </div>

                    {showAddCertForm && (
                      <div className="p-4 rounded-2xl border border-cyan-500/40 bg-cyan-950/20 space-y-3">
                        <h4 className="font-mono font-bold text-cyan-400">Add New Certificate</h4>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <input
                            type="text"
                            placeholder="Certificate Title *"
                            value={newCertForm.title}
                            onChange={(e) => setNewCertForm({ ...newCertForm, title: e.target.value })}
                            className="rounded-xl border border-slate-300 dark:border-slate-800 bg-white dark:bg-slate-950 px-3 py-2 text-slate-900 dark:text-white"
                          />
                          <input
                            type="text"
                            placeholder="Issuing Org (e.g. AWS, Meta, Google) *"
                            value={newCertForm.issuingOrganization}
                            onChange={(e) => setNewCertForm({ ...newCertForm, issuingOrganization: e.target.value })}
                            className="rounded-xl border border-slate-300 dark:border-slate-800 bg-white dark:bg-slate-950 px-3 py-2 text-slate-900 dark:text-white"
                          />
                        </div>

                        <button
                          onClick={handleCreateCert}
                          className="w-full py-2 rounded-xl bg-cyan-500 text-slate-950 font-mono font-bold hover:bg-cyan-400"
                        >
                          Save Certificate
                        </button>
                      </div>
                    )}

                    <div className="space-y-2">
                      {certificates.map((cert) => (
                        <div
                          key={cert.id}
                          className="flex items-center justify-between p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950"
                        >
                          <div className="flex items-center space-x-3">
                            <div className="relative h-10 w-14 rounded-lg overflow-hidden border border-slate-700 shrink-0">
                              <Image src={cert.certificateImage} alt={cert.title} fill className="object-cover" />
                            </div>
                            <div>
                              <span className="font-bold text-slate-900 dark:text-white block">{cert.title}</span>
                              <span className="font-mono text-[10px] text-cyan-600 dark:text-cyan-400">{cert.issuingOrganization}</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

              </div>

              {/* Footer Actions */}
              <div className="pt-4 border-t border-slate-200 dark:border-slate-800 flex flex-wrap items-center justify-between gap-3">
                <button
                  onClick={resetToDefault}
                  className="flex items-center space-x-1 text-xs font-mono text-slate-500 hover:text-red-500"
                >
                  <RotateCcw className="h-3.5 w-3.5" />
                  <span>Reset Defaults</span>
                </button>

                <div className="flex items-center space-x-3">
                  <button
                    onClick={handleDownloadBackup}
                    className="flex items-center space-x-1.5 rounded-xl border border-slate-300 dark:border-slate-800 bg-slate-100 dark:bg-slate-950 px-4 py-2 font-mono text-xs text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white"
                  >
                    <Download className="h-3.5 w-3.5" />
                    <span>Backup JSON</span>
                  </button>

                  <button
                    onClick={() => setIsAdminOpen(false)}
                    className="rounded-xl bg-cyan-500 px-5 py-2 font-mono text-xs font-bold text-slate-950 hover:bg-cyan-400 shadow-glow-cyan"
                  >
                    Done
                  </button>
                </div>
              </div>
            </>
          )}

        </motion.div>
      </div>
    </AnimatePresence>
  );
}
