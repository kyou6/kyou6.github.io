import type { WorldOption } from './types';
import workExperienceIcon from '../../assets/profile/workexperience.png';
import atticusLogo from '../../assets/workexperience/atticus.png';
import ioneLogo from '../../assets/workexperience/ione.png';

export const workExperienceData: WorldOption = {
    label: "Work Experience",
    color: "#D97724",
    image: workExperienceIcon,
    description: "Professional industry experience, roles held, company projects delivered, teamwork, and engineering contributions.",
    sections: [
        {
            company: "Atticus Advisory Solutions Inc.",
            logo: atticusLogo,
            subtitle: "3 mos",
            location: "Ortigas Center, Pasig City",
            roles: [
                {
                    title: "IT Intern",
                    employmentType: "Internship",
                    period: "Sep 2025 - Nov 2025 · 3 mos",
                    location: "14/F Centerpoint Building, Julia Vargas Avenue corner Garner St., Ortigas Center, Pasig City",
                }
            ]
        },
        {
            company: "iOne Resources Inc.",
            logo: ioneLogo,
            subtitle: "4 mos",
            location: "Barangay San Antonio, Pasig City",
            roles: [
                {
                    title: "IT Management Trainee",
                    employmentType: "Trainee",
                    period: "Feb 2025 - May 2025 · 4 mos",
                    location: "10/F Centerpoint Building, Julia Vargas Avenue corner Garner St., Ortigas Center, Barangay San Antonio, Pasig City",
                }
            ]
        }
    ]
};
