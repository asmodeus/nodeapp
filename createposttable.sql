DROP TABLE IF EXISTS posts CASCADE;

CREATE TABLE posts (
    post_no integer PRIMARY KEY,
    resource_path text DEFAULT 'none',
    category text NOT NULL, 
    title text,
    ingress text,
    text_content text,
    post_date timestamp with time zone DEFAULT date_trunc('minute', now())
);

INSERT INTO posts ( post_no, ingress, text_content, category ) 
VALUES (
1,
'Welcome into the darkness.',
'Here I display projects I''ve done like this site for example. This site is running on heroku using node.js, express framework, ejs and postgres. The styling is made with a custom twitter bootstrap template. More info on heroku here. Feel free to mail me at <link>theoswe@gmail.com<link> if you are interested in hiring me, or perhaps you just got a question about my work',
'about' );
INSERT INTO posts ( post_no, title, ingress, text_content, category ) 
VALUES (
2, 
'i am not dead yet',
'This is my story.', 
'...', 
'about');




select * from posts;