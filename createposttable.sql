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
'Risus',
'"Only a Stradivarius can be used to seduce a Vampire Prince"',
'rpg' );
INSERT INTO posts ( post_no, title, ingress, text_content, category ) 
VALUES (
2, 
'',
'Risus', 
'"While wielding the Sword of Mercy, you always roll dice at least equal to
your foe, but you must spare his life if you win."', 
'rpg');




select * from posts;