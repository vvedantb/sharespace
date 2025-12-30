-- Ensure the 'student' table exists
CREATE TABLE IF NOT EXISTS student (
                                       id UUID PRIMARY KEY,
                                       first_name VARCHAR(255) NOT NULL,
    last_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    address VARCHAR(255) NOT NULL,
    date_of_birth DATE NOT NULL,
    registered_date DATE NOT NULL
    );

-- Insert sample students for ecommerce platform
INSERT INTO student (id, first_name, last_name, email, address, date_of_birth, registered_date)
SELECT '123e4567-e89b-12d3-a456-426614174000', 'John', 'Doe', 'john.doe@university.edu', '123 Campus Dr, Springfield', '2002-06-15', '2024-01-10'
    WHERE NOT EXISTS (SELECT 1 FROM student WHERE id = '123e4567-e89b-12d3-a456-426614174000');

INSERT INTO student (id, first_name, last_name, email, address, date_of_birth, registered_date)
SELECT '123e4567-e89b-12d3-a456-426614174001', 'Jane', 'Smith', 'jane.smith@university.edu', '456 Dorm Ave, Shelbyville', '2003-09-23', '2023-12-01'
    WHERE NOT EXISTS (SELECT 1 FROM student WHERE id = '123e4567-e89b-12d3-a456-426614174001');

INSERT INTO student (id, first_name, last_name, email, address, date_of_birth, registered_date)
SELECT '123e4567-e89b-12d3-a456-426614174002', 'Alice', 'Johnson', 'alice.johnson@university.edu', '789 College Blvd, Capital City', '2001-03-12', '2022-06-20'
    WHERE NOT EXISTS (SELECT 1 FROM student WHERE id = '123e4567-e89b-12d3-a456-426614174002');

INSERT INTO student (id, first_name, last_name, email, address, date_of_birth, registered_date)
SELECT '123e4567-e89b-12d3-a456-426614174003', 'Bob', 'Brown', 'bob.brown@university.edu', '321 Student Lane, Springfield', '2002-11-30', '2023-05-14'
    WHERE NOT EXISTS (SELECT 1 FROM student WHERE id = '123e4567-e89b-12d3-a456-426614174003');

INSERT INTO student (id, first_name, last_name, email, address, date_of_birth, registered_date)
SELECT '123e4567-e89b-12d3-a456-426614174004', 'Emily', 'Davis', 'emily.davis@university.edu', '654 Academic Way, Shelbyville', '2004-02-05', '2024-03-01'
    WHERE NOT EXISTS (SELECT 1 FROM student WHERE id = '123e4567-e89b-12d3-a456-426614174004');

INSERT INTO student (id, first_name, last_name, email, address, date_of_birth, registered_date)
SELECT '223e4567-e89b-12d3-a456-426614174005', 'Michael', 'Green', 'michael.green@university.edu', '987 Library St, Springfield', '2001-07-25', '2024-02-15'
    WHERE NOT EXISTS (SELECT 1 FROM student WHERE id = '223e4567-e89b-12d3-a456-426614174005');

INSERT INTO student (id, first_name, last_name, email, address, date_of_birth, registered_date)
SELECT '223e4567-e89b-12d3-a456-426614174006', 'Sarah', 'Taylor', 'sarah.taylor@university.edu', '123 Study Hall Rd, Shelbyville', '2003-04-18', '2023-08-25'
    WHERE NOT EXISTS (SELECT 1 FROM student WHERE id = '223e4567-e89b-12d3-a456-426614174006');

INSERT INTO student (id, first_name, last_name, email, address, date_of_birth, registered_date)
SELECT '223e4567-e89b-12d3-a456-426614174007', 'David', 'Wilson', 'david.wilson@university.edu', '456 Lecture Ave, Capital City', '2000-01-11', '2022-10-10'
    WHERE NOT EXISTS (SELECT 1 FROM student WHERE id = '223e4567-e89b-12d3-a456-426614174007');

INSERT INTO student (id, first_name, last_name, email, address, date_of_birth, registered_date)
SELECT '223e4567-e89b-12d3-a456-426614174008', 'Laura', 'White', 'laura.white@university.edu', '789 Quad Circle, Springfield', '2002-09-02', '2024-04-20'
    WHERE NOT EXISTS (SELECT 1 FROM student WHERE id = '223e4567-e89b-12d3-a456-426614174008');

INSERT INTO student (id, first_name, last_name, email, address, date_of_birth, registered_date)
SELECT '223e4567-e89b-12d3-a456-426614174009', 'James', 'Harris', 'james.harris@university.edu', '321 Freshman Dr, Shelbyville', '2004-11-15', '2023-06-30'
    WHERE NOT EXISTS (SELECT 1 FROM student WHERE id = '223e4567-e89b-12d3-a456-426614174009');

INSERT INTO student (id, first_name, last_name, email, address, date_of_birth, registered_date)
SELECT '223e4567-e89b-12d3-a456-426614174010', 'Emma', 'Moore', 'emma.moore@university.edu', '654 Senior Plaza, Capital City', '2001-08-09', '2023-01-22'
    WHERE NOT EXISTS (SELECT 1 FROM student WHERE id = '223e4567-e89b-12d3-a456-426614174010');

INSERT INTO student (id, first_name, last_name, email, address, date_of_birth, registered_date)
SELECT '223e4567-e89b-12d3-a456-426614174011', 'Ethan', 'Martinez', 'ethan.martinez@university.edu', '987 Graduate Row, Springfield', '2002-05-03', '2024-05-12'
    WHERE NOT EXISTS (SELECT 1 FROM student WHERE id = '223e4567-e89b-12d3-a456-426614174011');

INSERT INTO student (id, first_name, last_name, email, address, date_of_birth, registered_date)
SELECT '223e4567-e89b-12d3-a456-426614174012', 'Sophia', 'Clark', 'sophia.clark@university.edu', '123 Research Park, Shelbyville', '2003-12-25', '2022-11-11'
    WHERE NOT EXISTS (SELECT 1 FROM student WHERE id = '223e4567-e89b-12d3-a456-426614174012');

INSERT INTO student (id, first_name, last_name, email, address, date_of_birth, registered_date)
SELECT '223e4567-e89b-12d3-a456-426614174013', 'Daniel', 'Lewis', 'daniel.lewis@university.edu', '456 Innovation Hub, Capital City', '2000-06-08', '2023-09-19'
    WHERE NOT EXISTS (SELECT 1 FROM student WHERE id = '223e4567-e89b-12d3-a456-426614174013');

INSERT INTO student (id, first_name, last_name, email, address, date_of_birth, registered_date)
SELECT '223e4567-e89b-12d3-a456-426614174014', 'Isabella', 'Walker', 'isabella.walker@university.edu', '789 Tech Center, Springfield', '2002-10-17', '2024-03-29'
    WHERE NOT EXISTS (SELECT 1 FROM student WHERE id = '223e4567-e89b-12d3-a456-426614174014');