import { api } from "@/config/axios";

export type HeaderData = {
    logo: string,
    slogan: string,
    phone: string,
    email: string,
    donateLink: string
}

export interface CarouselData {
  text: string,
  reference: string
}

export type EventData = {
  id: number;
  title: string;
  date: string;
  time: string;
  location: string;
  image: string;
  category: string;
  description: string;
  featured: boolean;
}

export interface ServicesData {
  id: string,
  icon: string,  
  title: string,
  description: string,
  time: string,
  color: string
}

export type ContactData = {
  id: number;
  type: string;
  title: string;
  description: string;
  icon: string;
  iconColor: string;
  primary: string;
  secondary: string | null;
  details: string | null;
}

export async function getHeaderData():Promise<HeaderData | null> {
  try {
    // const response = await api.get(`/church/landing/header`);
     
    // return response.data;
      const data = {
          logo: "St. Mary's",
          slogan: "A community of faith, hope, and love",
          phone: "(123) 456-7890",
          email: "info@stmaryschurch.org",
          donateLink: "/donate"
      };
      return data;
    
  } catch (error: any) {
     if (error.response?.status === 404) {
      return null;
     }

     if (error.response?.status === 400) {
      console.error("Invalid subdomain format:");
      return null;
     }

     console.error("Error fetching subdomain data:", error);
      return null;
  }
}

export async function getHeroCarouselData(): Promise<CarouselData []> {
  try {
    // const response = await api.get(`/church/landing/carousel`);
    // return response.data;
    
     
    const data: CarouselData[] = [
      {
        text: "For I know the plans I have for you, declares the Lord, plans to prosper you and not to harm you, plans to give you hope and a future.",
        reference: "Jeremiah 29:11",
      },
      {
        text: "Trust in the Lord with all your heart and lean not on your own understanding; in all your ways submit to him, and he will make your paths straight.",
        reference: "Proverbs 3:5-6",
      },
      {
        text: "I can do all things through Christ who strengthens me.",
        reference: "Philippians 4:13",
      },
      {
        text: "The Lord is my shepherd, I lack nothing. He makes me lie down in green pastures, he leads me beside quiet waters, he refreshes my soul.",
        reference: "Psalm 23:1-3",
      },
    ];
    return data;
  } catch (error: any) {
    if (error.response?.status === 404) {
      return [];
     }

     if (error.response?.status === 400) {
      console.error("Invalid subdomain format:");
      return [];
     }

     console.error("Error fetching subdomain data:", error);
      return [];
  }
}

export async function getServicesData(): Promise<ServicesData []> {
  try {
    // const response = await api.get(`/church/landing/carousel`);
    // return response.data;
    
     
     const data = [
      {
        id: "sunday-service",
        icon: "sunday-service",
        title: "Sunday Service",
        description: "Join us every Sunday at 9:00 AM and 11:00 AM for powerful worship and life-changing messages.",
        time: "9:00 AM & 11:00 AM",
        color: "text-primary",
      },
      {
        id: "bible-study",
        icon: "bible-study",
        title: "Bible Study",
        description: "Dive deeper into God's Word every Wednesday evening. Grow in knowledge and fellowship.",
        time: "Wednesdays 7:00 PM",
        color: "text-accent",
      },
      {
        id: "prayer-meeting",
        icon: "prayer-meeting",
        title: "Prayer Meeting",
        description: "Experience the power of corporate prayer. Join us as we intercede for our community and world.",
        time: "Fridays 6:00 PM",
        color: "text-chart-5",
      },
      {
        id: "worship-night",
        icon: "worship-night",
        title: "Worship Night",
        description: "An evening of praise and worship. Come and experience God's presence through music.",
        time: "Last Saturday 6:00 PM",
        color: "text-primary",
      },
      {
        id: "childrens-ministry",
        icon: "childrens-ministry",
        title: "Children's Ministry",
        description: "Fun, engaging programs for children to learn about Jesus in age-appropriate ways.",
        time: "Sundays 9:00 AM",
        color: "text-accent",
      },
      {
        id: "youth-fellowship",
        icon: "youth-fellowship",
        title: "Youth Fellowship",
        description: "Dynamic gatherings for teens to connect, grow in faith, and build lasting friendships.",
        time: "Saturdays 4:00 PM",
        color: "text-chart-5",
      },
    ];
    return data;
  } catch (error: any) {
    if (error.response?.status === 404) {
      return [];
     }

     if (error.response?.status === 400) {
      console.error("Invalid subdomain format:");
      return [];
     }

     console.error("Error fetching subdomain data:", error);
      return [];
  }
}

export async function getEventsData(): Promise<EventData[]> {
  try {
    // const response = await api.get(`/church/landing/events`);
    // return response.data;
    
    const data: EventData[] = [
      {
        id: 1,
        title: "Annual Faith Conference 2025",
        date: "March 15-17, 2025",
        time: "9:00 AM - 5:00 PM",
        location: "Main Sanctuary",
        image: "/church-conference-stage-lights.jpg",
        category: "Conference",
        description:
          "Three days of powerful teachings, worship, and fellowship with renowned speakers from around the world.",
        featured: true,
      },
      {
        id: 2,
        title: "Community Outreach Day",
        date: "February 28, 2025",
        time: "10:00 AM - 4:00 PM",
        location: "City Center Park",
        image: "/community-service-volunteers-helping.jpg",
        category: "Outreach",
        description: "Join us as we serve our community with free meals, health screenings, and prayer.",
        featured: false,
      },
      {
        id: 3,
        title: "Youth Revival Night",
        date: "March 8, 2025",
        time: "6:00 PM - 9:00 PM",
        location: "Youth Center",
        image: "/youth-worship-concert-energetic.jpg",
        category: "Youth",
        description: "An electrifying night of worship, testimonies, and powerful messages for the next generation.",
        featured: false,
      },
      {
        id: 4,
        title: "Marriage Enrichment Seminar",
        date: "March 22, 2025",
        time: "2:00 PM - 6:00 PM",
        location: "Fellowship Hall",
        image: "/couple-happy-together-love.jpg",
        category: "Seminar",
        description: "Strengthen your marriage with biblical principles and practical tools for lasting love.",
        featured: false,
      },
      {
        id: 5,
        title: "Easter Celebration Service",
        date: "April 20, 2025",
        time: "7:00 AM & 10:00 AM",
        location: "Main Sanctuary",
        image: "/easter-sunrise-cross-celebration.jpg",
        category: "Special Service",
        description: "Celebrate the resurrection of Jesus Christ with special music, drama, and a powerful message.",
        featured: true,
      },
      {
        id: 6,
        title: "Women's Prayer Breakfast",
        date: "March 1, 2025",
        time: "8:00 AM - 11:00 AM",
        location: "Fellowship Hall",
        image: "/women-praying-together-fellowship.jpg",
        category: "Women",
        description: "A morning of prayer, worship, and encouragement for women of all ages.",
        featured: false,
      },
    ];
    
    return data;
    
  } catch (error: any) {
    if (error.response?.status === 404) {
      return [];
    }

    if (error.response?.status === 400) {
      console.error("Invalid subdomain format:");
      return [];
    }

    console.error("Error fetching events data:", error);
    return [];
  }
}

export async function getContactData(): Promise<ContactData []> {
  try {
    // const response = await api.get(`/church/landing/contact`);
    // return response.data;
    
    const data = [
        {
          id: 1,
          type: "phone",
          title: "Phone Support",
          description: "Call us during business hours",
          icon: "Phone",
          iconColor: "blue",
          primary: "+1 (555) 123-4567",
          secondary: "+1 (555) 987-6543",
          details: "Mon-Fri: 9AM-6PM EST"
        },
        {
          id: 2,
          type: "email",
          title: "Email Support",
          description: "Send us your questions anytime",
          icon: "Mail",
          iconColor: "green",
          primary: "support@parishpro.com",
          secondary: null,
          details: "Response within 24 hours"
        },
        {
          id: 3,
          type: "location",
          title: "Our Location",
          description: "Visit our headquarters",
          icon: "MapPin",
          iconColor: "purple",
          primary: "123 Church Street",
          secondary: "Vatican City, VC 00120",
          details: null
        }
      ];
    
    return data;
    
  } catch (error: any) {
    if (error.response?.status === 404) {
      return [];
    }

    if (error.response?.status === 400) {
      console.error("Invalid subdomain format:");
      return [];
    }

    console.error("Error fetching contact data:", error);
    return [];
  }
}






