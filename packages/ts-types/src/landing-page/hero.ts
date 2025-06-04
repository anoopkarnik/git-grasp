
export interface HeroSectionProps  {
    documentationLink?: string;
    appointmentLink?: string;
    tagline?: string;
    description?: string;
    blogLink?: string;
    getStartedLink?: string;
    version: string;
    videoUrl?: string;
    images: ImageProps[];
    
}

export interface ImageProps {
    title: string;
    imageUrl: string;
}
