"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { IconArrowLeft, IconSchool, IconPlus, IconX } from "@tabler/icons-react";
import { useMutation } from "@tanstack/react-query";
import { createMentor } from "@/lib/actions/mentors";

export default function MentorApplicationPage() {
  const router = useRouter();
  const [bio, setBio] = useState("");
  const [expertise, setExpertise] = useState<string[]>([]);
  const [newExpertise, setNewExpertise] = useState("");

  const createMentorMutation = useMutation({
    mutationFn: createMentor,
    onSuccess: () => router.push("/profile"),
  });

  const isSubmitting = createMentorMutation.isPending;

  const addExpertise = () => {
    if (newExpertise.trim() && expertise.length < 6) {
      setExpertise([...expertise, newExpertise.trim()]);
      setNewExpertise("");
    }
  };

  const removeExpertise = (index: number) => {
    setExpertise(expertise.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    createMentorMutation.mutate({ bio, expertise });
  };

  const isFormValid = bio.length >= 50 && expertise.length >= 2;

  return (
    <div className="px-4 py-8">
      <button
        onClick={() => router.back()}
        className="mb-4 flex items-center gap-1 text-gray-500 hover:text-black dark:text-gray-400 dark:hover:text-white transition-colors"
      >
        <IconArrowLeft className="h-5 w-5" stroke={2} />
        Back
      </button>

      <div className="mb-8">
        <div className="flex items-center gap-3">
          <div className="rounded-full bg-purple-100 dark:bg-purple-900/30 p-3">
            <IconSchool className="h-6 w-6 text-purple-600 dark:text-purple-400" stroke={2} />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-black dark:text-white md:text-4xl">
              Become a Mentor
            </h1>
            <p className="mt-1 text-gray-500 dark:text-gray-400">
              Help fellow students and build your reputation
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-2xl">
        <div className="mb-8 rounded-2xl border border-purple-200 dark:border-purple-800 bg-purple-50 dark:bg-purple-900/20 p-6">
          <h2 className="font-semibold text-purple-800 dark:text-purple-300">
            What Mentors Do
          </h2>
          <ul className="mt-3 space-y-2 text-sm text-purple-700 dark:text-purple-400">
            <li>• Answer academic and student-life questions</li>
            <li>• Endorse quality items and sellers</li>
            <li>• Recommend textbooks and resources</li>
            <li>• Help new students navigate university life</li>
          </ul>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="mb-2 block text-sm font-medium text-black dark:text-white">
              Mentor Bio *
            </label>
            <textarea
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              rows={4}
              placeholder="Tell students about yourself, your experience, and how you can help them..."
              className="w-full resize-none rounded-xl border border-gray-300 dark:border-neutral-700 bg-white dark:bg-black px-4 py-3 text-black dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:border-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-600/20"
            />
            <p className="mt-1 text-xs text-gray-400 dark:text-gray-500">
              {bio.length}/500 characters (minimum 50)
            </p>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-black dark:text-white">
              Areas of Expertise * (2-6)
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                value={newExpertise}
                onChange={(e) => setNewExpertise(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addExpertise())}
                placeholder="e.g., Python, Calculus, Essay Writing"
                className="flex-1 rounded-xl border border-gray-300 dark:border-neutral-700 bg-white dark:bg-black px-4 py-3 text-black dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:border-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-600/20"
              />
              <button
                type="button"
                onClick={addExpertise}
                disabled={expertise.length >= 6}
                className="rounded-xl bg-purple-600 px-4 py-3 text-white hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <IconPlus className="h-5 w-5" stroke={2} />
              </button>
            </div>
            {expertise.length > 0 && (
              <div className="mt-3 flex flex-wrap gap-2">
                {expertise.map((skill, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center gap-1 rounded-full bg-purple-100 dark:bg-purple-900/30 px-3 py-1 text-sm text-purple-700 dark:text-purple-400"
                  >
                    {skill}
                    <button
                      type="button"
                      onClick={() => removeExpertise(index)}
                      className="hover:text-purple-900 dark:hover:text-purple-200"
                    >
                      <IconX className="h-3 w-3" stroke={2} />
                    </button>
                  </span>
                ))}
              </div>
            )}
          </div>

          <div className="rounded-xl border border-gray-200 dark:border-neutral-800 bg-gray-50 dark:bg-neutral-900 p-4">
            <h3 className="font-medium text-black dark:text-white">Requirements</h3>
            <ul className="mt-2 space-y-1 text-sm text-gray-600 dark:text-gray-400">
              <li className={bio.length >= 50 ? "text-green-600 dark:text-green-500" : ""}>
                ✓ Bio with at least 50 characters
              </li>
              <li className={expertise.length >= 2 ? "text-green-600 dark:text-green-500" : ""}>
                ✓ At least 2 areas of expertise
              </li>
              <li className="text-green-600 dark:text-green-500">
                ✓ Verified university email
              </li>
            </ul>
          </div>

          <div className="flex gap-3">
            <button
              type="button"
              onClick={() => router.back()}
              className="flex-1 rounded-xl border border-gray-300 dark:border-neutral-700 bg-white dark:bg-black px-6 py-3 font-semibold text-black dark:text-white transition-colors hover:bg-gray-50 dark:hover:bg-neutral-900"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={!isFormValid || isSubmitting}
              className="flex-1 rounded-xl bg-purple-600 px-6 py-3 font-semibold text-white transition-colors hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? "Submitting..." : "Apply to be a Mentor"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
