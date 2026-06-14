// Global type definitions untuk OrangeDel

export interface NavItem {
  label: string;
  href: string;
}

export interface Testimonial {
  id: number;
  name: string;
  role: string;
  message: string;
  avatar?: string;
}

export interface Product {
  id: number;
  name: string;
  description: string;
  image: string;
  tags: string[];
}

export interface GalleryItem {
  id: number;
  src: string;
  alt: string;
  caption?: string;
}
