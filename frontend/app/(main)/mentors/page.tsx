"use client";
import React, { useState } from "react";
import { Input, Button, Card, CardBody, CardFooter, Avatar, Chip } from "@heroui/react";
import { IconSearch, IconFilter, IconStarFilled, IconMessageCircle, IconSchool, IconCertificate } from "@tabler/icons-react";

//Mock Data 
const MENTORS = [
  {
    id: 1,
    name: "Sarah Jenkins",
    course: "Computer Science (Year 3)",
    image: "",
    expertise: ["Python", "Data Structures", "IN2013"],
    rating: 4.9,
    reviews: 24,
    isVerified: true,
    isOnline: true, // Green
    bio: "I can help you understand the hardest parts of algorithms."
  },
  {
    id: 2,
    name: "David Chen",
    course: "Software Engineering (Year 4)",
    image: "",
    expertise: ["React", "System Design", "Cloud"],
    rating: 5.0,
    reviews: 12,
    isVerified: true,
    isOnline: false, // RED (Offline)
    bio: "Currently interning at Amazon. Happy to review your CV and code."
  },
  {
    id: 3,
    name: "Emily Rose",
    course: "Data Science (Year 2)",
    image: "",
    expertise: ["Statistics", "SQL"],
    rating: 4.7,
    reviews: 8,
    isVerified: false,
    isOnline: true, // Green
    bio: "Love statistics! I run the Data Science society study group."
  },
  {
    id: 4,
    name: "Michael Ross",
    course: "Cyber Security (Year 3)",
    image: "",
    expertise: ["Network Security", "Java", "Linux"],
    rating: 4.8,
    reviews: 31,
    isVerified: true,
    isOnline: true, // Green
    bio: " Ask me anything about Linux."
  }
];

export default function MentorsPage() {
  const [search, setSearch] = useState("");

  const filteredMentors = MENTORS.filter(mentor => 
    mentor.name.toLowerCase().includes(search.toLowerCase()) ||
    mentor.expertise.some(skill => skill.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="max-w-4xl mx-auto p-4 space-y-6 pb-20">
      
      {/*  Header Section  */}
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-bold">Find a Mentor</h1>
        <p className="text-gray-500 text-sm">
          Connect with senior students for academic help, career advice, or code reviews.
        </p>
      </div>

      {/*  Search & Filters  */}
      <div className="flex gap-2">
        <Input 
          startContent={<IconSearch className="text-gray-400" />}
          placeholder="Search by name, subject (e.g. Java), or course..."
          value={search}
          onValueChange={setSearch}
          classNames={{ inputWrapper: "bg-white dark:bg-neutral-900" }}
        />
        <Button variant="flat" isIconOnly className="bg-white dark:bg-neutral-900">
          <IconFilter size={20} />
        </Button>
      </div>

      {/*  Mentors Grid  */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredMentors.map((mentor) => (
          <Card key={mentor.id} className="w-full hover:shadow-md transition-shadow">
            <CardBody className="flex flex-row gap-4 p-4">
              {/* Avatar Column */}
              <div className="flex flex-col items-center gap-2">
                <Avatar 
                  src={mentor.image} 
                  className="w-16 h-16 text-large" 
                  isBordered 
                  color={mentor.isOnline ? "success" : "default"} 
                />
                <div className="flex items-center gap-1 text-xs font-bold text-amber-500">
                  <IconStarFilled size={12} />
                  <span>{mentor.rating}</span>
                  <span className="text-gray-400 font-normal">({mentor.reviews})</span>
                </div>
              </div>

              {/* Info Column */}
              <div className="flex-1 space-y-2">
                <div>
                    <div className="flex items-center gap-2">
                        <h3 className="font-bold text-lg">{mentor.name}</h3>
                        {mentor.isVerified && (
                             <IconCertificate size={16} className="text-green-600" />
                        )}
                    </div>
                    <p className="text-xs text-gray-500 flex items-center gap-1">
                        <IconSchool size={12} /> {mentor.course}
                    </p>
                </div>
                
                <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-2">
                    {mentor.bio}
                </p>

                {/* Expertise Tags */}
                <div className="flex flex-wrap gap-1 pt-1">
                    {mentor.expertise.map((skill) => (
                        <Chip key={skill} size="sm" variant="flat" className="h-6 text-xs bg-gray-100 dark:bg-neutral-800">
                            {skill}
                        </Chip>
                    ))}
                </div>
              </div>
            </CardBody>
            
            <CardFooter className="pt-0 pb-4 px-4 flex justify-between items-center">
                 {mentor.isOnline ? (
                    // GREEN CHIP (Active)
                    <Chip 
                        size="md" 
                        variant="flat" 
                        className="bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300"
                    >
                        • Active now
                    </Chip>
                 ) : (
                    // RED CHIP (Offline) 
                    <Chip 
                        size="md" 
                        variant="flat" 
                        className="bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-300"
                    >
                        • Offline
                    </Chip>
                 )}

                 <Button 
                    size="sm" 
                    color="primary" 
                    variant="solid" 
                    className="font-medium"
                    endContent={<IconMessageCircle size={16} />}
                 >
                    Request Help
                 </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
