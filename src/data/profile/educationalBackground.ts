import type { WorldOption } from './types';
import educationIcon from '../../assets/profile/education.png';

export const educationalBackgroundData: WorldOption = {
    label: "Educational Background",
    color: "#C68E42",
    image: educationIcon,
    description: "My academic background, degrees, relevant coursework, and continuous learning journey in computer science and software development.",
    sections: [
        {
            title: "College",
            items: [
                { label: "School", value: "Rizal Technological University" },
                { label: "Course", value: "Information Technology" },
                { label: "Degree", value: "Bachelor's Degree" },
                { label: "Graduated", value: "2026" }
            ]
        },
        {
            title: "Senior High School",
            items: [
                { label: "School", value: "Our Lady of Guadalupe College" },
                { label: "Strand", value: "Information and Communications Technology" },
                { label: "Level", value: "Senior High School Graduate" },
                { label: "Graduated", value: "2022" }
            ]
        },
        {
            title: "Junior High School",
            items: [
                { label: "School", value: "Mataas na Paaralang Neptali A. Gonzales" },
                { label: "Program", value: "Special Program in the Arts" },
                { label: "Level", value: "Junior High School Graduate" },
                { label: "Graduated", value: "2020" }
            ]
        }
    ]
};
