-- Create enum for industries
CREATE TYPE industry_type AS ENUM (
    'technology',
    'healthcare',
    'finance',
    'education',
    'manufacturing',
    'retail'
);

-- Create career_paths table
CREATE TABLE career_paths (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    industry industry_type NOT NULL,
    role_title TEXT NOT NULL,
    role_level TEXT NOT NULL,
    required_skills TEXT[] NOT NULL,
    recommended_skills TEXT[] NOT NULL,
    min_salary INTEGER NOT NULL,
    max_salary INTEGER NOT NULL,
    growth_rate DECIMAL(4,2) NOT NULL, -- Annual growth rate as percentage
    job_outlook TEXT NOT NULL,
    education_requirements TEXT[] NOT NULL,
    experience_years INTEGER NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Create index on industry for faster lookups
CREATE INDEX career_paths_industry_idx ON career_paths(industry);

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = TIMEZONE('utc'::text, NOW());
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger to automatically update updated_at
CREATE TRIGGER update_career_paths_updated_at
    BEFORE UPDATE ON career_paths
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Insert sample data for each industry
INSERT INTO career_paths (
    industry,
    role_title,
    role_level,
    required_skills,
    recommended_skills,
    min_salary,
    max_salary,
    growth_rate,
    job_outlook,
    education_requirements,
    experience_years
) VALUES 
-- Technology Industry Roles
(
    'technology',
    'Software Engineer',
    'Entry Level',
    ARRAY['JavaScript', 'Python', 'Git', 'Data Structures'],
    ARRAY['TypeScript', 'React', 'Node.js', 'AWS'],
    60000,
    90000,
    15.5,
    'Very positive with high demand across sectors',
    ARRAY['Bachelor''s in Computer Science', 'Related Technical Degree'],
    0
),
(
    'technology',
    'Senior Software Engineer',
    'Senior',
    ARRAY['System Design', 'Architecture Patterns', 'Team Leadership', 'Advanced Algorithms'],
    ARRAY['Microservices', 'Cloud Architecture', 'Mentoring', 'Agile Methodologies'],
    120000,
    180000,
    12.0,
    'Strong growth with emphasis on leadership and architecture skills',
    ARRAY['Bachelor''s in Computer Science', 'Master''s preferred'],
    5
),
-- Healthcare Industry Roles
(
    'healthcare',
    'Registered Nurse',
    'Entry Level',
    ARRAY['Patient Care', 'Medical Records', 'Basic Life Support', 'Clinical Assessment'],
    ARRAY['Advanced Cardiac Life Support', 'Critical Care', 'Leadership'],
    55000,
    75000,
    10.5,
    'Consistent demand with opportunities for specialization',
    ARRAY['Bachelor''s in Nursing', 'RN License'],
    0
),
-- Finance Industry Roles
(
    'finance',
    'Financial Analyst',
    'Entry Level',
    ARRAY['Financial Modeling', 'Excel', 'Data Analysis', 'Research'],
    ARRAY['Python', 'SQL', 'Bloomberg Terminal', 'CFA Level 1'],
    65000,
    85000,
    8.5,
    'Stable growth with increasing emphasis on technical skills',
    ARRAY['Bachelor''s in Finance', 'Business', 'Economics'],
    0
),
-- Education Industry Roles
(
    'education',
    'K-12 Teacher',
    'Entry Level',
    ARRAY['Curriculum Development', 'Classroom Management', 'Assessment Methods'],
    ARRAY['Educational Technology', 'Special Education', 'ESL'],
    45000,
    65000,
    7.5,
    'Steady demand with focus on technology integration',
    ARRAY['Bachelor''s in Education', 'Teaching License'],
    0
),
-- Manufacturing Industry Roles
(
    'manufacturing',
    'Process Engineer',
    'Entry Level',
    ARRAY['Process Optimization', 'Quality Control', 'Safety Standards', 'CAD'],
    ARRAY['Six Sigma', 'Lean Manufacturing', 'Automation'],
    58000,
    80000,
    6.5,
    'Moderate growth with increasing automation focus',
    ARRAY['Bachelor''s in Engineering'],
    0
),
-- Retail Industry Roles
(
    'retail',
    'Retail Manager',
    'Entry Level',
    ARRAY['Sales', 'Inventory Management', 'Team Leadership', 'Customer Service'],
    ARRAY['Visual Merchandising', 'E-commerce', 'Analytics'],
    40000,
    60000,
    5.5,
    'Evolving field with growing digital emphasis',
    ARRAY['Bachelor''s in Business', 'Retail Management'],
    0
); 