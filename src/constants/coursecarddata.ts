export const categories = [
    "All",
    "UI/UX",
    "Frontend",
    "Backend",
    "Python",
    "Machine Learning",
    "Artificial Intelligence",
    "Cyber Security",
  ];
  
  export const courseData = [
    {
      id: 1,
      category: "UI/UX",
      title: "UI/UX Design Fundamentals",
      instructor: "Jane Doe",
      description: "Learn the basics of UI/UX design.",
      price: "49.99",
      image: require("../assets/image/banner3.png"),
    },
    {
      id: 2,
      category: "Frontend",
      title: "React for Beginners",
      instructor: "John Smith",
      description: "Master the fundamentals of React.",
      price: "59.99",
      image: require("../assets/image/banner3.png"),
    },
    {
      id: 3,
      category: "Backend",
      title: "Node.js API Development",
      instructor: "Alice Brown",
      description: "Build scalable APIs using Node.js.",
      price: "69.99",
      image: require("../assets/image/banner3.png"),
    },
    {
      id: 4,
      category: "Python",
      title: "Python for Data Science",
      instructor: "David Green",
      description: "Analyze data using Python and Pandas.",
      price: "39.99",
      image: require("../assets/image/banner3.png"),
    },
  ];

  export const recentCourses = [
    { 
      id: 1, 
      image: require("../assets/image/banner3.png"), 
      instructor: 'John Doe', 
      title: 'UI/UX Design', 
      description: 'Learn UI/UX from scratch.', 
      progress: 0.6, // 60% Completed
    },
    { 
      id: 2, 
      image: require("../assets/image/banner3.png"), 
      instructor: 'Jane Smith', 
      title: 'React Native Basics', 
      description: 'Start building mobile apps.', 
      progress: 0.3, // 30% Completed
    },
  ];

  export  const instructorData = [
    {
      id: 1,
      image: require("../assets/image/banner3.png"),
      name: 'John Doe',
      totalCourses: 15,
      rating: 4.8,
    },
    {
      id: 2,
      image: require("../assets/image/banner3.png") ,
      name: 'Jane Smith',
      totalCourses: 20,
      rating: 3.2,
    },
    {
      id: 3,
      image: require("../assets/image/banner3.png") ,
      name: 'Raghav Patel',
      totalCourses: 4,
      rating: 2.8,
    },
    {
      id: 4,
      image: require("../assets/image/banner3.png") ,
      name: 'Jay Patel',
      totalCourses: 20,
      rating: 1.7,
    },
  ];