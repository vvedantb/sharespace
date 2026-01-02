-- Sample data for development

-- Users
INSERT INTO users (id, cognito_id, email, first_name, last_name, username, university, course, year_of_study, bio, is_verified, created_at)
VALUES
('11111111-1111-1111-1111-111111111111', 'cognito-1', 'john.doe@university.ac.uk', 'John', 'Doe', 'johndoe', 'University of London', 'Computer Science', 3, 'Final year CS student interested in software engineering', true, CURRENT_TIMESTAMP),
('22222222-2222-2222-2222-222222222222', 'cognito-2', 'jane.smith@university.ac.uk', 'Jane', 'Smith', 'janesmith', 'University of London', 'Mathematics', 2, 'Maths enthusiast looking to help fellow students', true, CURRENT_TIMESTAMP),
('33333333-3333-3333-3333-333333333333', 'cognito-3', 'bob.wilson@university.ac.uk', 'Bob', 'Wilson', 'bobwilson', 'University of London', 'Physics', 1, 'First year physics student', false, CURRENT_TIMESTAMP);

-- Items
INSERT INTO items (id, seller_id, title, description, price, category, item_condition, status, course_code, university, views, saves, is_mentor_recommended, created_at)
VALUES
('aaaa1111-1111-1111-1111-111111111111', '11111111-1111-1111-1111-111111111111', 'Data Structures and Algorithms Textbook', 'Excellent condition, barely used. Perfect for CS201.', 25.00, 'TEXTBOOKS', 'LIKE_NEW', 'ACTIVE', 'CS201', 'University of London', 42, 5, false, CURRENT_TIMESTAMP),
('aaaa2222-2222-2222-2222-222222222222', '22222222-2222-2222-2222-222222222222', 'Calculus Notes Bundle', 'Complete notes for MATH101-103. Hand-written with examples.', 15.00, 'NOTES', 'GOOD', 'ACTIVE', 'MATH101', 'University of London', 28, 3, true, CURRENT_TIMESTAMP),
('aaaa3333-3333-3333-3333-333333333333', '11111111-1111-1111-1111-111111111111', 'MacBook Pro Stand', 'Aluminium laptop stand, ergonomic design.', 35.00, 'ELECTRONICS', 'NEW', 'ACTIVE', NULL, 'University of London', 15, 2, false, CURRENT_TIMESTAMP);

-- Mentor Profiles
INSERT INTO mentor_profiles (id, user_id, bio, endorsements, total_answers, helpful_answers, is_verified)
VALUES
('bbbb1111-1111-1111-1111-111111111111', '11111111-1111-1111-1111-111111111111', 'Happy to help with programming and algorithms!', 12, 45, 38, true),
('bbbb2222-2222-2222-2222-222222222222', '22222222-2222-2222-2222-222222222222', 'Mathematics tutor with 2 years experience', 8, 32, 28, true);

-- Mentor Expertise
INSERT INTO mentor_expertise (mentor_id, expertise)
VALUES
('bbbb1111-1111-1111-1111-111111111111', 'Java'),
('bbbb1111-1111-1111-1111-111111111111', 'Python'),
('bbbb1111-1111-1111-1111-111111111111', 'Algorithms'),
('bbbb2222-2222-2222-2222-222222222222', 'Calculus'),
('bbbb2222-2222-2222-2222-222222222222', 'Linear Algebra');

-- Questions
INSERT INTO questions (id, asker_id, title, content, category, course_code, status, created_at)
VALUES
('cccc1111-1111-1111-1111-111111111111', '33333333-3333-3333-3333-333333333333', 'Best resources for learning Python?', 'I am a first year student looking to learn Python for my CS course. What are the best online resources?', 'ACADEMIC', 'CS101', 'ANSWERED', CURRENT_TIMESTAMP),
('cccc2222-2222-2222-2222-222222222222', '33333333-3333-3333-3333-333333333333', 'Tips for surviving first year?', 'Any advice for managing workload and making friends in first year?', 'STUDENT_LIFE', NULL, 'OPEN', CURRENT_TIMESTAMP);

-- Answers
INSERT INTO answers (id, question_id, mentor_id, content, helpful_count, is_endorsed, created_at)
VALUES
('dddd1111-1111-1111-1111-111111111111', 'cccc1111-1111-1111-1111-111111111111', '11111111-1111-1111-1111-111111111111', 'I would recommend starting with Python.org official tutorial, then moving to Codecademy. For practice, try LeetCode easy problems.', 8, true, CURRENT_TIMESTAMP);

-- Reviews
INSERT INTO reviews (id, reviewer_id, reviewee_id, item_id, rating, comment, created_at)
VALUES
('eeee1111-1111-1111-1111-111111111111', '33333333-3333-3333-3333-333333333333', '11111111-1111-1111-1111-111111111111', 'aaaa1111-1111-1111-1111-111111111111', 5, 'Great seller, textbook was in perfect condition!', CURRENT_TIMESTAMP);

-- Conversations
INSERT INTO conversations (id, participant1_id, participant2_id, item_id, created_at)
VALUES
('ffff1111-1111-1111-1111-111111111111', '33333333-3333-3333-3333-333333333333', '11111111-1111-1111-1111-111111111111', 'aaaa1111-1111-1111-1111-111111111111', CURRENT_TIMESTAMP);

-- Messages
INSERT INTO messages (id, conversation_id, sender_id, content, is_read, sent_at)
VALUES
('1111aaaa-1111-1111-1111-111111111111', 'ffff1111-1111-1111-1111-111111111111', '33333333-3333-3333-3333-333333333333', 'Hi, is the textbook still available?', true, CURRENT_TIMESTAMP),
('1111bbbb-1111-1111-1111-111111111111', 'ffff1111-1111-1111-1111-111111111111', '11111111-1111-1111-1111-111111111111', 'Yes it is! When would you like to pick it up?', false, CURRENT_TIMESTAMP);

-- Notifications
INSERT INTO notifications (id, user_id, type, title, description, link, is_read, created_at)
VALUES
('2222aaaa-1111-1111-1111-111111111111', '11111111-1111-1111-1111-111111111111', 'MESSAGE', 'New message', 'Bob Wilson sent you a message', '/messages', false, CURRENT_TIMESTAMP);
