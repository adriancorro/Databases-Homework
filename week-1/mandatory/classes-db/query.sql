CREATE DATABASE cyf_classes;

 CREATE TABLE mentors (  id        SERIAL PRIMARY KEY,  name      VARCHAR(30) NOT NULL,  years_glasgow     int,  address   VARCHAR(120),  fav_programming_language VARCHAR(30) );

insert into mentors  (name, years_glasgow , address, fav_programming_language) values ('Teo', 4,'barcelona', 'Javascript');
insert into mentors  (name, years_glasgow , address, fav_programming_language) values ('Adrian', 3,'barcelona', 'Javascript');
insert into mentors  (name, years_glasgow , address, fav_programming_language) values ('Pepe', 24,'Praia', 'python');

insert into mentors  (name, years_glasgow , address, fav_programming_language) values ('Nietzsche', 52,'barcelona', 'Javascript');

insert into mentors  (name, years_glasgow , address, fav_programming_language) values ('Kelly Slater', 28,'california', 'Javascript');

CREATE TABLE students(  id        SERIAL PRIMARY KEY,  name      VARCHAR(30) NOT NULL,  address   VARCHAR(120),  graduated_CodeYourFuture bit not null );
                                                                 ^
insert into students(name, address, graduated_CodeYourFuture) values ('Kelly Slater','california', '0');
                                        ^
insert into students(name, address, graduated_CodeYourFuture) values ('adrian','caracas', '0');

insert into students(name, address, graduated_CodeYourFuture) values ('alvaro','barcelona', '1');

insert into students(name, address, graduated_CodeYourFuture) values ('mateo','cali', '0');

insert into students(name, address, graduated_CodeYourFuture) values ('leon','buenos aires', '0');

insert into students(name, address, graduated_CodeYourFuture) values ('manuel','lima', '0');

insert into students(name, address, graduated_CodeYourFuture) values ('emilio','caracas', '0');

insert into students(name, address, graduated_CodeYourFuture) values ('diego','caracas', '0');

insert into students(name, address, graduated_CodeYourFuture) values ('ronar','santo domingo');
 
insert into students(name, address, graduated_CodeYourFuture) values ('Ato','caracas', '0');

insert into students(name, address, graduated_CodeYourFuture) values ('Juan','caracas', '0');

 SELECT * FROM students;


CREATE TABLE classes(  id        SERIAL PRIMARY KEY,  leading_mentor_id INT references mentors(id) ;
,  class_topic VARCHAR(120),  class_date date , class_location   VARCHAR(30) NOT NULL);

insert into classes(leading_mentor_id, class_topic, class_date , class_location ) values (1,'Javascript', '22-06-2021', 'barcelona');

insert into classes(leading_mentor_id, class_topic, class_date , class_location ) values (5,'node.js', '23-06-2021', 'barcelona');

CREATE TABLE assistance(  id        SERIAL PRIMARY KEY,  student_id INT references students(id),  class_id INT references classes(id));

insert into assistance(student_id, class_id) values (1,1);

select * from mentors where  years_glasgow > 5;
select * from mentors where fav_programming_language = 'Javascript';
select * from students where   graduated_codeyourfuture = 1::BIT;
select * from classes where class_date  < '2021-07-01 00:01:00'  ;
select * from assistance where class_id = 1;