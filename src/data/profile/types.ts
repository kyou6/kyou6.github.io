export interface DetailItem {
    label: string;
    value: string;
}

export interface TimelineRole {
    title: string;
    employmentType?: string;
    period?: string;
    location?: string;
    description?: string;
}

export interface DetailGroup {
    title?: string;
    company?: string;
    logo?: string;
    image?: string;
    subtitle?: string;
    location?: string;
    roles?: TimelineRole[];
    items?: DetailItem[];
}

export interface WorldOption {
    label: string;
    color: string;
    path?: string;
    image?: string;
    description?: string;
    details?: DetailItem[];
    sections?: DetailGroup[];
}
