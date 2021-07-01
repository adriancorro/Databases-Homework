# Class Database

## Submission

Below you will find a set of tasks for you to complete to set up a databases of students and mentors.

To submit this homework write the correct commands for each question here:

```sql


 
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

insert into students(name, address, graduated_CodeYourFuture) values ('ronar','santo domingo' , '0');
 
insert into students(name, address, graduated_CodeYourFuture) values ('Ato','caracas', '0');

insert into students(name, address, graduated_CodeYourFuture) values ('Juan','caracas', '0');

 SELECT * FROM students;


CREATE TABLE classes(  id        SERIAL PRIMARY KEY,  leading_mentor_id INT references mentors(id),  class_topic VARCHAR(120),  class_date date , class_location   VARCHAR(30) NOT NULL);

insert into classes(leading_mentor_id, class_topic, class_date , class_location ) values (1,'Javascript', '22-06-2021', 'barcelona');

insert into classes(leading_mentor_id, class_topic, class_date , class_location ) values (5,'node.js', '23-06-2021', 'barcelona');

CREATE TABLE assistance(  id        SERIAL PRIMARY KEY,  student_id INT references students(id),  class_id INT references classes(id));

insert into assistance(student_id, class_id) values (1,1);

select * from mentors where  years_glasgow > 5;
select * from mentors where fav_programming_language = 'Javascript';
select * from students where   graduated_codeyourfuture = 1::BIT;
select * from classes where class_date  < '2021-07-01 00:01:00'  ;
select * from assistance where class_id = 1;

```

When you have finished all of the questions - open a pull request with your answers to the `Databases-Homework` repository.

## Task

1. Create a new database called `cyf_classes` (hint: use `createdb` in the terminal)
2. Create a new table `mentors`, for each mentor we want to save their name, how many years they lived in Glasgow, their address and their favourite programming language.
3. Insert 5 mentors in the `mentors` table (you can make up the data, it doesn't need to be accurate ;-)).
4. Create a new table `students`, for each student we want to save their name, address and if they have graduated from Code Your Future.
5. Insert 10 students in the `students` table.
6. Verify that the data you created for mentors and students are correctly stored in their respective tables (hint: use a `select` SQL statement).
7. Create a new `classes` table to record the following information:

   - A class has a leading mentor
   - A class has a topic (such as Javascript, NodeJS)
   - A class is taught at a specific date and at a specific location

8. Insert a few classes in the `classes` table
9. We now want to store who among the students attends a specific class. How would you store that? Come up with a solution and insert some data if you model this as a new table.
10. Answer the following questions using a `select` SQL statement:
    - Retrieve all the mentors who lived more than 5 years in Glasgow
    - Retrieve all the mentors whose favourite language is Javascript
    - Retrieve all the students who are CYF graduates
    - Retrieve all the classes taught before June this year
    - Retrieve all the students (retrieving student ids only is fine) who attended the Javascript class (or any other class that you have in the `classes` table).
