import { BugReport } from "./BugDashboard";

const sampleReports: BugReport[] = [
    {
      id: "bug-1",
      title: "Login button not working on mobile devices",
      description:
        "When attempting to log in using the mobile app, the login button becomes unresponsive after tapping it once. This happens consistently on iOS devices.",
      stepsToReproduce:
        "1. Open the mobile app\n2. Enter valid credentials\n3. Tap the login button\n4. Observe that nothing happens",
      email: "sarah.johnson@example.com",
      severity: "high",
      category: "functionality",
      status: "in-progress",
      createdAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(), // 4 days ago
      updatedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(), // 2 days ago
      assignedTo: "dev.team@rentamigo.com",
      comments: [
        {
          author: "Tech Support",
          text: "Reproduced on iPhone 12. Sending to development team.",
          timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
        },
        {
          author: "Developer",
          text: "Found the issue. It's related to a recent update to our authentication service. Working on a fix.",
          timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
        },
      ],
    },
    {
      id: "bug-2",
      title: "Property images not loading in search results",
      description:
        "Property images are showing as broken links in the search results page. This is happening for approximately 30% of listings.",
      email: "mark.wilson@example.com",
      severity: "medium",
      category: "ui",
      status: "pending",
      createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(), // 1 day ago
      imageUrl: "/placeholder.svg?height=300&width=400",
    },
    {
      id: "bug-3",
      title: "Security vulnerability in payment processing",
      description:
        "Discovered a potential security vulnerability in the payment processing flow. The credit card information is visible in the network requests.",
      stepsToReproduce:
        "1. Add property to cart\n2. Proceed to checkout\n3. Enter payment details\n4. Open browser developer tools and monitor network tab\n5. Observe that card details are sent in plaintext",
      email: "security.team@example.com",
      severity: "critical",
      category: "security",
      status: "in-progress",
      createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(), // 2 days ago
      updatedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(), // 1 day ago
      comments: [
        {
          author: "Security Team",
          text: "This is a critical issue. We need to implement proper encryption for all payment data immediately.",
          timestamp: new Date(Date.now() - 1.5 * 24 * 60 * 60 * 1000).toISOString(),
        },
      ],
    },
    {
      id: "bug-4",
      title: "Slow loading times on property details page",
      description:
        "The property details page takes more than 10 seconds to load, especially when there are many high-resolution images.",
      email: "performance.analyst@example.com",
      severity: "medium",
      category: "performance",
      status: "resolved",
      createdAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(), // 10 days ago
      updatedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(), // 5 days ago
      comments: [
        {
          author: "Developer",
          text: "Implemented image lazy loading and compression to improve page load times.",
          timestamp: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
        },
        {
          author: "QA Team",
          text: "Verified fix. Page load time reduced to under 3 seconds.",
          timestamp: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
        },
      ],
    },
    {
      id: "bug-5",
      title: "Incorrect pricing calculation for long-term rentals",
      description:
        "When booking a property for more than 30 days, the system is not applying the monthly discount correctly.",
      stepsToReproduce:
        "1. Search for a property\n2. Select a property with monthly discount\n3. Book for 45 days\n4. Observe that the total price does not reflect the discount",
      email: "finance@example.com",
      severity: "high",
      category: "functionality",
      status: "resolved",
      createdAt: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(), // 15 days ago
      updatedAt: new Date(Date.now() - 12 * 24 * 60 * 60 * 1000).toISOString(), // 12 days ago
    },
    {
      id: "bug-6",
      title: "Filter options not working on mobile",
      description:
        "The property filter options (price range, amenities, etc.) are not working correctly on mobile devices. Selections are not being applied to the search results.",
      email: "ui.designer@example.com",
      severity: "medium",
      category: "ui",
      status: "pending",
      createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(), // 3 days ago
      imageUrl: "/placeholder.svg?height=500&width=300",
    },
    {
      id: "bug-7",
      title: "Email notifications not being sent for new messages",
      description:
        "Users are not receiving email notifications when they get new messages from property owners or other users.",
      email: "communication@example.com",
      severity: "high",
      category: "functionality",
      status: "in-progress",
      createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(), // 5 days ago
      updatedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(), // 1 day ago
    },
    {
      id: "bug-8",
      title: "Map view crashes on certain property locations",
      description:
        "The map view in property details crashes when viewing properties in certain remote locations with limited map data.",
      stepsToReproduce:
        "1. Search for properties in remote areas\n2. Select a property\n3. Navigate to the map view\n4. Observe that the app crashes",
      email: "map.specialist@example.com",
      severity: "low",
      category: "functionality",
      status: "pending",
      createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(), // 7 days ago
    },
    {
      id: "bug-9",
      title: "Accessibility issues with color contrast",
      description:
        "The text color on the booking confirmation page has poor contrast with the background, making it difficult to read for users with visual impairments.",
      email: "accessibility@example.com",
      severity: "medium",
      category: "ui",
      status: "resolved",
      createdAt: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000).toISOString(), // 20 days ago
      updatedAt: new Date(Date.now() - 18 * 24 * 60 * 60 * 1000).toISOString(), // 18 days ago
      imageUrl: "/placeholder.svg?height=400&width=600",
    },
    {
      id: "bug-10",
      title: "Search results pagination not working",
      description:
        "When searching for properties and navigating to page 2 or beyond, the same results from page 1 are shown again.",
      email: "search.team@example.com",
      severity: "high",
      category: "functionality",
      status: "in-progress",
      createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(), // 2 days ago
    },
    {
      id: "bug-11",
      title: "App crashes when uploading large property images",
      description:
        "When property owners try to upload images larger than 5MB, the app crashes without any error message.",
      stepsToReproduce:
        "1. Log in as property owner\n2. Go to add property\n3. Try to upload a high-resolution image (>5MB)\n4. App crashes",
      email: "owner.support@example.com",
      severity: "high",
      category: "functionality",
      status: "pending",
      createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(), // 1 day ago
    },
    {
      id: "bug-12",
      title: "Date picker showing incorrect available dates",
      description: "The availability calendar is showing some dates as available even though they are already booked.",
      email: "calendar.team@example.com",
      severity: "critical",
      category: "functionality",
      status: "in-progress",
      createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(), // 3 days ago
      updatedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(), // 1 day ago
      comments: [
        {
          author: "Product Manager",
          text: "This is causing double bookings and needs to be fixed immediately.",
          timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
        },
      ],
    },
  ]